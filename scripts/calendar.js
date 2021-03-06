hexo.extend.filter.register('after_generate', function () {
  if (!hexo.theme.config.contribution || !hexo.theme.config.contribution.enable) return;

  hexo.extend.injector.register('head_end', `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/contribution-calendar@0.0.7/dist/embed.css"></link>`, 'default');

  var posts = this.locals.get('posts').sort('date')
    .filter(function (post) {
      return post.published;
    }).map(function (post) {
      return {
        date: post.date.format('YYYY-MM-DD'),
      };
    }).reduce(function (prev, cur) {
      var key = cur.date;
      if (!prev.hasOwnProperty(key)) {
        prev[key] = 0;
      }
      prev[key]++;
      return prev;
    }, {});

  hexo.extend.injector.register('body_end', `<script>
    window.__CONTRIBUTION_CALENDAR__ = {
      target: document.querySelector("#contribution"),
      props: {
        data: ${JSON.stringify(posts)},
        getDesc: function(params) {
          const heat = params.heat;
          const date = params.date;
          return heat + ' posts on ' + date.replace(/-/g, '/');
        }
      }
    };
  </script>`, 'default');

  hexo.extend.injector.register('body_end', `<script src="https://cdn.jsdelivr.net/npm/contribution-calendar@0.0.7/dist/embed.js"></script>`, 'default');
});
