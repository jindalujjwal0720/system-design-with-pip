import Giscus from "@giscus/react";

interface CommentsAreaProps {
  className?: string;
}

const CommentsArea = ({ className }: CommentsAreaProps) => {
  return (
    <div className={className}>
      <Giscus
        repo="jindalujjwal0720/system-design-with-pip"
        repoId="R_kgDOMx9kqg"
        category="General"
        categoryId="DIC_kwDOMx9kqs4Cikt8"
        mapping="title"
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
