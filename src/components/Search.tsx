import React from "react";
import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import Card from "@components/Card";
import { slugify } from "@utils/slugify";
import type { BlogFrontmatter } from "@schemas/content";

export type SearchItem = {
  title: string;
  description: string;
  data: BlogFrontmatter;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(20);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
    setVisibleCount(20);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["title", "description", "data.tags"],
        minMatchCharLength: 1,
        threshold: 0.45,
      }),
    [searchList]
  );
  const popularTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    searchList.forEach(({ data }) =>
      data.tags?.forEach(tag => tagCount.set(tag, (tagCount.get(tag) || 0) + 1))
    );
    return [...tagCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [searchList]);

  useEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    const query = inputVal.trim();
    const inputResult = query.length > 0 ? fuse.search(query) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(null, "", newRelativePathQuery);
    } else {
      history.replaceState(null, "", window.location.pathname);
    }
  }, [fuse, inputVal]);

  return (
    <>
      <label className="relative mt-8 block">
        <span className="sr-only">搜索文章</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
        </span>
        <input
          className="block w-full rounded-2xl bg-skin-card/60 py-4 pl-11
        pr-3 placeholder:italic placeholder:text-skin-base/75
        focus:outline-2 focus:outline-skin-accent"
          placeholder="搜索任意文章..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          ref={inputRef}
          data-testid="search-input"
        />
      </label>

      {inputVal.trim().length > 0 && (
        <div className="mt-8 text-sm text-skin-muted" aria-live="polite">
          按相关度找到 {searchResults?.length || 0} 篇有关「{inputVal.trim()}
          」的文章
        </div>
      )}

      {inputVal.trim().length === 0 && (
        <div className="mt-10 rounded-2xl bg-skin-card/45 p-6">
          <p className="m-0 text-sm text-skin-muted">
            可以从这些常写的主题开始
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
            {popularTags.map(([tag, count]) => (
              <a
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="text-sm font-medium hover:text-skin-accent"
              >
                {tag} <span className="text-skin-muted">{count}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {inputVal.trim().length > 0 && searchResults?.length === 0 && (
        <div className="mt-10 rounded-2xl bg-skin-card/45 p-6">
          <p className="m-0 font-semibold">没有找到相关记录</p>
          <p className="mt-2 text-sm text-skin-muted">
            试试更短的关键词，或从标签页浏览主题。
          </p>
          <a
            href="/tags"
            className="mt-4 inline-block text-sm font-semibold text-skin-accent"
          >
            浏览全部标签 ↗
          </a>
        </div>
      )}

      <ul>
        {searchResults &&
          searchResults
            .slice(0, visibleCount)
            .map(({ item, refIndex }) => (
              <Card
                href={`/posts/${slugify(item.data)}`}
                frontmatter={item.data}
                variant="search"
                key={`${refIndex}-${slugify(item.data)}`}
              />
            ))}
      </ul>

      {searchResults && searchResults.length > visibleCount && (
        <button
          type="button"
          className="mx-auto mt-8 flex min-h-11 items-center rounded-full bg-skin-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-skin-card-muted"
          onClick={() => setVisibleCount(count => count + 20)}
        >
          再看 {Math.min(20, searchResults.length - visibleCount)} 篇
        </button>
      )}
    </>
  );
}
