const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://atheerium.github.io/rss.xml');
  const items = feed.items.slice(0, 5);
  let markdown = '';
  for (const item of items) {
    const date = new Date(item.isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    markdown += `- [${item.title}](${item.link}) - ${date}\n`;
  }
  const fs = require('fs');
  fs.writeFileSync('blog-posts.md', markdown.trim());
})();