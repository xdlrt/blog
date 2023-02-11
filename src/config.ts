import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://yeshu.cloud",
  author: "也树",
  desc: "In progress to be a product maker.",
  title: "一颗小树",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/xdlrt",
    linkTitle: ` ${SITE.title} 的 Github 主页`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yeshu_in_future",
    linkTitle: `${SITE.title} 的 Twitter 主页`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:xdlrt0111@163.com",
    linkTitle: `发送邮件到 ${SITE.title}`,
    active: true,
  },
  {
    name: "RSS",
    href: "/rss.xml",
    linkTitle: `${SITE.title} 的 RSS 订阅源`,
    active: true,
  },
];
