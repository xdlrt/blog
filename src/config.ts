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
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:xdlrt0111@163.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
];
