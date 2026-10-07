import appConfig from "@/packages/configs/app.config";
import { getAllDocs } from "@/packages/utils/loader";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const GET = () => {
  const items = getAllDocs()
    .slice(0, 50)
    .map(
      (doc) => `    <item>
      <title>${escapeXml(doc.title)}</title>
      <link>${appConfig.site.url}${doc.href}</link>
      <guid isPermaLink="true">${appConfig.site.url}${doc.href}</guid>
      <pubDate>${new Date(doc.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(doc.description)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(appConfig.site.name)}</title>
    <link>${appConfig.site.url}</link>
    <description>${escapeXml(appConfig.site.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
