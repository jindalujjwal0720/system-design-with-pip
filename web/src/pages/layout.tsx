import CommentsArea from "@/components/comments-area";
import Header from "@/components/header";
import MarkdownContent from "@/components/markdown-content";
import SidebarNav from "@/components/sidebar-nav";
import SummaryNav from "@/components/summary-nav";
import { cn } from "@/lib/utils";
import { useSidebarNav } from "@/providers/sidebar-nav";

const Layout = () => {
  const { isOpen } = useSidebarNav();

  return (
    <div className="flex flex-col h-screen">
      <Header className="sticky top-0 z-10 bg-background border-b-2 border-b-muted" />
      <main className="flex flex-1 flex-col md:flex-row">
        <SidebarNav
          className={cn(
            "w-1/4 max-w-72 bg-background border-r-2 border-r-muted",
            isOpen ? "block" : "hidden md:block"
          )}
        />
        <div className="flex-1">
          <MarkdownContent />
          <CommentsArea />
        </div>
        <SummaryNav className="w-64 bg-background hidden lg:block" />
      </main>
    </div>
  );
};

export default Layout;
