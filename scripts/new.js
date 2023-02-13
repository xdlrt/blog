const fs = require('fs');
const matter = require('gray-matter');

const args = process.argv.slice(2);

const templateName = args[0];
const slug = args[1];

// console.log('templateName:', templateName, ';slug:', slug);

const templateFile = fs.readFileSync(`src/templates/${templateName}.md`);
const {content,data: frontmatter} = matter(templateFile);
frontmatter.postSlug = slug;
frontmatter.pubDatetime = new Date();

// console.log(frontmatter);

fs.writeFileSync(`src/content/${templateName}/${slug}.md`, matter.stringify(content, frontmatter));