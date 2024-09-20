import { useResource } from "@/providers/resource";
import Giscus from "@giscus/react";

interface CommentsAreaProps {
  className?: string;
}

const h1Regex = /^#\s+(.*)/;

const getHeading = (content: string) => {
  const match = content.match(h1Regex);

  return match ? match[1] : "System Design with Pip";
};

const CommentsArea = ({ className }: CommentsAreaProps) => {
  const { data, isLoading } = useResource();

  if (isLoading) {
    return null;
  }

  return (
    <div className={className}>
      <Giscus
        repo="jindalujjwal0720/system-design-with-pip"
        repoId="R_kgDOMx9kqg"
        category="General"
        categoryId="DIC_kwDOMx9kqs4Cikt8"
        mapping="specific"
        term={getHeading(data as string)}
        reactionsEnabled="1"
        emitMetadata="0"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default CommentsArea;
