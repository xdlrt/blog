const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function makeNewsletterIndex() {
  const directory = path.resolve(__dirname, '../src/content/newsletter');
  const filePrefix = 'newsletter-';
  const fileExtension = '.md';

  // 同步地读取当前目录下的文件
  const files = fs.readdirSync(directory);

  let maxNumber = 0;

  // 正则表达式，匹配 "newsletter-" 后面的数字
  const regex = new RegExp(`^${filePrefix}(\\d+)${fileExtension}$`);

  // 遍历文件名，查找最大的数字
  files.forEach(file => {
    const match = file.match(regex);
    if (match) {
      const number = parseInt(match[1], 10);
      if (!isNaN(number)) {
        maxNumber = Math.max(maxNumber, number);
      }
    }
  });
  
  return maxNumber + 1;
}

const args = process.argv.slice(2);

const templateName = args[0] || 'newsletter';
const slug = args[1] ? args[1] : `${templateName}-${makeNewsletterIndex()}`;

// console.log('templateName:', templateName, ';slug:', slug);

const templateFile = fs.readFileSync(`src/templates/${templateName}.md`);
const { content, data: frontmatter } = matter(templateFile);
frontmatter.postSlug = slug;
frontmatter.pubDatetime = new Date();

// console.log(frontmatter);

fs.writeFileSync(`src/content/${templateName}/${slug}.md`, matter.stringify(content.replace('{{index}}', makeNewsletterIndex()), frontmatter));