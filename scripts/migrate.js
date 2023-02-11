// Hexo to astro
const fs = require('fs');
const matter = require('gray-matter');

const originPosts = fs.readdirSync('source/_posts');

originPosts.forEach((path) => {
  const file = fs.readFileSync(`source/_posts/${path}`);
  const fileObj = matter(file);
  const { data, content } = fileObj;
  const { title, abbrlink, date, tags, categories, description } = data;
  const frontMatter = {
    title,
    postSlug: abbrlink,
    pubDatetime: date,
    tags: [categories || ''].concat(tags || []),
    description: description || (content.split('<!-- more -->\n')[0] || '').replaceAll('\n', ''),
  };
  const newFile = matter.stringify(content, frontMatter);
  fs.writeFileSync(`source/_posts/${path}`, newFile);
});
