hexo.config.calendar = Object.assign({
  single: true,
  root: 'calendar/'
}, hexo.config.calendar);

hexo.extend.generator.register('calendar', require('./lib/generator'));

const version = '0.0.3';

hexo.extend.injector.register('head_end', `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/contribution-calendar@${version}/dist/embed.css /></link>`, 'default');

hexo.extend.injector.register('body_end', `<script src="https://cdn.jsdelivr.net/npm/contribution-calendar@${version}/dist/embed.js"></script>`, 'default');
