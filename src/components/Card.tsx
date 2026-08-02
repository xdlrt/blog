// import Datetime from "./Datetime";
import type { BlogFrontmatter } from "@schemas/content";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
  index?: number;
  variant?: "editorial" | "archive" | "search" | "lead";
  initiallyHidden?: boolean;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  index,
  variant = "archive",
  initiallyHidden = false,
}: Props) {
  const { title, description, pubDatetime, tags } = frontmatter;
  const date = new Date(pubDatetime).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Shanghai",
  });
  const category = tags?.[0] || "未分类";
  const isEditorial = variant === "editorial" || variant === "lead";

  return (
    <li
      className={`article-card relative ${initiallyHidden ? "hidden" : ""} ${
        variant === "lead" ? "article-card-lead" : ""
      } ${isEditorial ? "rounded-2xl" : "rounded-xl"}`}
    >
      <a
        href={href}
        className={`group block rounded-[inherit] transition-colors focus-visible:no-underline ${
          isEditorial
            ? "px-5 py-6 hover:bg-skin-card/55"
            : "px-2 py-5 hover:bg-skin-card/40 sm:px-4 sm:py-5"
        }`}
      >
        <div className="card-meta mb-3 flex items-center justify-between gap-4 text-xs tracking-[0.12em] text-skin-muted">
          <span>{index ? String(index).padStart(2, "0") : category}</span>
          <time dateTime={new Date(pubDatetime).toISOString()}>{date}</time>
        </div>
        <div className="card-body">
          {secHeading ? (
            <h2 className="card-title text-xl font-semibold leading-snug transition-colors group-hover:text-skin-accent sm:text-[1.35rem]">
              {title}
            </h2>
          ) : (
            <h3 className="card-title text-xl font-semibold leading-snug transition-colors group-hover:text-skin-accent sm:text-[1.35rem]">
              {title}
            </h3>
          )}
          <p className="mt-2 leading-relaxed text-skin-muted">{description}</p>
        </div>
        <span
          className={`card-arrow mt-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-skin-card text-skin-base transition-transform group-hover:translate-x-1 ${
            isEditorial ? "" : "sm:hidden"
          }`}
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </li>
  );
}
