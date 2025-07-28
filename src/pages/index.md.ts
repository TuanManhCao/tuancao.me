import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const markdownContent = `# Tuan Cao (@tuancm)

AI-powered development

## Navigation

- [About](/about.md)
- [Recent Posts](/posts.md)
- [Archives](/archives.md)
- [RSS Feed](/rss.xml)

## Links

- Twitter: [@tuancm](https://twitter.com/tuancm)
- GitHub: [@tuanmanhcao](https://github.com/tuanmanhcao)
- Email: steipete@gmail.com

---

*This is the markdown-only version of tuancao.me. Visit [tuancao.me](https://tuancao.me) for the full experience.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};