// inspired by https://github.com/howiefh/hexo-generator-calendar

'use strict';

module.exports = function (locals) {
  var configRoot = this.config.root;

  var posts = locals.posts.sort('date')
    .filter(function (post) {
      return post.published;
    }).map(function (post) {
      return {
        title: post.title,
        date: post.date.format('YYYY-MM-DD'),
        link: configRoot + post.path
      };
    }).reduce(function (prev, cur) {
      var key = cur.date;
      if (!prev.hasOwnProperty(key)) {
        prev[key] = 0;
      }
      prev[key]++;
      return prev;
    }, {});

  return {
    path: 'calendar.json',
    data: JSON.stringify(posts)
  };
};