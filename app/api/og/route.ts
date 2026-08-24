import { NextResponse, type NextRequest } from "next/server";

type OpenGraphData = {
  title: string;
  description: string;
  thumbnail: string;
};

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (!isFetchableUrl(targetUrl)) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OneBiteLinkBot/1.0)",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "failed to fetch url" },
        { status: 502 }
      );
    }

    const html = await response.text();
    const data = extractOpenGraphData(html, targetUrl);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "failed to fetch url" },
      { status: 502 }
    );
  }
}

function isFetchableUrl(url: URL): boolean {
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;

  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost")) return false;

  const ipv4 = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 127 || a === 10 || a === 0) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
  }

  if (hostname === "::1" || hostname === "[::1]") return false;

  return true;
}

function extractOpenGraphData(html: string, baseUrl: URL): OpenGraphData {
  const title =
    getMetaContent(html, "og:title") ??
    getTagContent(html, "title") ??
    baseUrl.hostname;

  const description =
    getMetaContent(html, "og:description") ??
    getMetaContent(html, "description") ??
    "";

  const rawThumbnail = getMetaContent(html, "og:image") ?? "";
  const thumbnail = rawThumbnail ? resolveUrl(rawThumbnail, baseUrl) : "";

  return {
    title: decodeHtmlEntities(title).trim(),
    description: decodeHtmlEntities(description).trim(),
    thumbnail,
  };
}

function getMetaContent(html: string, key: string): string | null {
  const escapedKey = key.replace(/:/g, "\\:");
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escapedKey}["'][^>]+content=["']([^"']*)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${escapedKey}["']`,
      "i"
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getTagContent(html: string, tag: string): string | null {
  const match = html.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return match ? match[1].trim() : null;
}

function resolveUrl(maybeRelative: string, base: URL): string {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return "";
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}
