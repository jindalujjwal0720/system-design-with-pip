import useLocationHash from "@/hooks/useLocationHash";
import { useResource } from "@/providers/resource";
import { Slugger } from "@/utils/slug";
import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";
import { Helmet } from "react-helmet";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/xcode.min.css";
import { Link } from "react-router-dom";
import CopyIcon from "./copy-icon";

interface MarkdownContentProps {
  className?: string;
}

const baseUrl =
  "https://raw.githubusercontent.com/jindalujjwal0720/system-design-with-pip/main";

const getImageSrc = (src: string) => {
  return src.startsWith("http") || src.startsWith("/")
    ? src
    : `${baseUrl}/${src}`;
};

const H2 = ({
  children,
  slug,
  observer,
}: PropsWithChildren<{ slug: string; observer: IntersectionObserver }>) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [observer]);

  return (
    <h2 ref={ref} id={slug} className="text-2xl font-semibold mt-6">
      {children}
    </h2>
  );
};

const MarkdownContent = ({ className }: MarkdownContentProps) => {
  const { data, isLoading } = useResource();
  const slugger = new Slugger();
  const [, setActiveHash] = useLocationHash("");
  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries) => {
        // Sort entries by their `top` position, so the first entry is the closest to the top of the viewport
        const sortedEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (sortedEntries.length > 0) {
          const topMostEntry = sortedEntries[0];
          const newHash = `#${topMostEntry.target.id}`;

          setActiveHash(newHash);
        }
      },
      {
        threshold: 1,
      }
    );
  }, [setActiveHash]);

  if (isLoading) {
    return <MarkdownContentLoading className={className} />;
  }

  return (
    <Markdown
      className={className}
      skipHtml={true}
      components={{
        h1: ({ children }) => (
          <>
            <Helmet>
              <title>{children}</title>
            </Helmet>
            <h1 className="text-4xl font-bold">{children}</h1>
          </>
        ),
        h2: ({ children }) => {
          const slug = slugger.fromPath(children as string);
          return (
            <H2 slug={slug} observer={observer}>
              {children}
            </H2>
          );
        },
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mt-4">{children}</h3>
        ),
        p: ({ children }) => <p className="mt-4 text-base">{children}</p>,
        ul: ({ children }) => (
          <ul className="mt-6 space-y-2 list-outside ml-8 list-disc marker:text-muted-foreground">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-6 space-y-2 list-outside ml-8 list-decimal marker:text-muted-foreground">
            {children}
          </ol>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        li: ({ children }) => <li className="text-base pl-1.5">{children}</li>,
        img: ({ src, alt }) => (
          <div className="flex flex-col items-center">
            <img
              src={getImageSrc(src as string)}
              alt={alt as string}
              className="w-full rounded-md mt-6"
            />
            <p className="text-sm text-muted-foreground mt-2">{alt}</p>
          </div>
        ),
        a: ({ children, href }) => (
          <Link
            to={href as string}
            className="text-blue-700 hover:underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </Link>
        ),
        pre: ({ children }) => (
          <pre className="rounded-md overflow-hidden relative ring-1 ring-muted bg-muted/50 p-4">
            <CopyIcon
              value={children?.toString() || ""}
              className="absolute top-2 right-2 cursor-pointer bg-muted/50 text-muted-foreground hover:text-primary"
            />
            {children}
          </pre>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          return isInline ? (
            <code className="text-sm bg-muted/30 p-1 rounded-sm">
              {children}
            </code>
          ) : (
            <code className={`text-sm ${className}`}>{children}</code>
          );
        },
      }}
      rehypePlugins={[rehypeHighlight]}
    >
      {typeof data === "string" ? data : "Something went wrong"}
    </Markdown>
  );
};

interface MarkdownContentLoadingProps {
  className?: string;
}

const MarkdownContentLoading = ({ className }: MarkdownContentLoadingProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-12 w-full h-full">
        <div className="h-12 animate-pulse bg-muted w-2/3 rounded-md" />
        <div className="flex flex-col gap-4">
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-1/2 rounded-md" />
        </div>
        <div className="h-8 animate-pulse bg-muted w-2/3 rounded-md" />
        <div className="aspect-video animate-pulse bg-muted w-full rounded-md" />
        <div className="flex flex-col gap-4">
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-full rounded-md" />
          <div className="h-5 animate-pulse bg-muted w-1/2 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default MarkdownContent;
