import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Some event covers in Notion are stored as external URLs pointing back
      // at our own site (`/img/gallery/...`). Next.js treats any absolute URL
      // as remote, so the production hostnames need to be whitelisted here
      // even though the asset is technically local.
      { protocol: "https", hostname: "the502project.com" },
      { protocol: "https", hostname: "www.the502project.com" },

      // Hosts Notion uses to serve user-uploaded files (page covers + images
      // pasted into a page body). S3 is the primary one in the current API;
      // the notion-static.com / file.notion.so / img.notionusercontent.com
      // variants cover legacy and future URL shapes Notion returns.
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3-us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "prod-files-secure.notion-static.com" },
      { protocol: "https", hostname: "secure.notion-static.com" },
      { protocol: "https", hostname: "file.notion.so" },
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "attachments.notion.so" },
      { protocol: "https", hostname: "img.notionusercontent.com" },
      { protocol: "https", hostname: "*.notion.site" },

      // Notion's gallery covers and stock-image options are served via
      // Unsplash.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
