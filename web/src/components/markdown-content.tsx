import useLocationHash from "@/hooks/useLocationHash";
import { cn } from "@/lib/utils";
import { useResource } from "@/providers/resource";
import { Slugger } from "@/utils/slug";
import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";
import { Helmet } from "react-helmet";

interface MarkdownContentProps {
  className?: string;
}

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

  return (
    <div className={cn(className)}>
      {isLoading ? (
        <MarkdownContentLoading />
      ) : (
        <Markdown
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
            li: ({ children }) => (
              <li className="text-base pl-1.5">{children}</li>
            ),
          }}
        >
          {typeof data === "string" ? data : "Something went wrong"}
        </Markdown>
      )}
    </div>
  );
};

const MarkdownContentLoading = () => {
  return (
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
  );
};

export default MarkdownContent;
