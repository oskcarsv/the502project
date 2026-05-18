import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Hosts Notion uses to serve user-uploaded files and the cover image
    // returned by the API. The S3 host applies to images pasted directly into
    // a page; the others are for external assets and Notion-hosted media.
    remotePatterns: [
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "file.notion.so" },
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "img.notionusercontent.com" },
      { protocol: "https", hostname: "*.notion.site" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
