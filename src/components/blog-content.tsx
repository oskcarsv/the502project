import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function BlogContent({ children }: { children: string }) {
  return (
    <div className="text-foreground/85">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-16 mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-14 mb-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 mb-4 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-8 mb-3 font-display text-xl font-bold leading-tight tracking-tight text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-6 text-base leading-[1.75] sm:text-lg">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-brand-dark underline decoration-brand-green decoration-2 underline-offset-4 transition-colors hover:text-brand-green"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-4 border-brand-green bg-brand-green/5 px-6 py-5 text-lg leading-relaxed text-foreground sm:my-10 sm:text-xl [&_p]:mb-0">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="mb-6 space-y-3 pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 list-decimal space-y-3 pl-6">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex gap-3 text-base leading-[1.75] sm:text-lg">
              <span
                aria-hidden
                className="mt-3 size-1.5 shrink-0 rounded-full bg-brand-green"
              />
              <span className="flex-1">{children}</span>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          hr: () => <hr className="my-12 border-foreground/10" />,
          code: ({ children }) => (
            <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-sm">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-2xl bg-brand-dark p-5 text-sm text-white">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              className="my-8 w-full rounded-2xl"
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
