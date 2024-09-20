import useLocationHash from "@/hooks/useLocationHash";
import { cn } from "@/lib/utils";
import { useResource } from "@/providers/resource";
import { Slugger } from "@/utils/slug";
import { useMemo } from "react";

interface SummaryNavProps {
  className?: string;
}

const h2Regex = /^##\s(.*)/gm;

const extractHeadings = (data: string, slug: (str: string) => string) => {
  const headings = data?.match(h2Regex);
  if (!headings) return [];
  return headings?.map((heading) => {
    return {
      title: heading.replace("## ", ""),
      slug: slug(heading.replace("## ", "")),
    };
  });
};

const SummaryNav = ({ className }: SummaryNavProps) => {
  const { data } = useResource();
  const slugger = new Slugger();
  const headings = useMemo(
    () => extractHeadings(data as string, slugger.fromPath),
    [data, slugger.fromPath]
  );
  const [activeHash, setActiveHash] = useLocationHash(headings[0]?.slug);

  const handleScroll = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveHash(`#${slug}`);
    }
  };

  return (
    <div className={className}>
      <nav className="flex flex-col text-sm mt-6">
        {headings.map((heading) => {
          return (
            <p
              key={heading.slug}
              onClick={() => handleScroll(heading.slug)}
              className={cn(
                "text-sm pr-2 hover:bg-muted p-2 border-l border-l-muted cursor-pointer",
                activeHash === `#${heading.slug}` &&
                  "border-l-primary text-primary"
              )}
            >
              {heading.title}
            </p>
          );
        })}
      </nav>
    </div>
  );
};

export default SummaryNav;
