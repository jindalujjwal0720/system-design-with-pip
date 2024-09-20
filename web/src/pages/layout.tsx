import CommentsArea from "@/components/comments-area";
import Header from "@/components/header";
import MarkdownContent from "@/components/markdown-content";
import SidebarNav from "@/components/sidebar-nav";
import SummaryNav from "@/components/summary-nav";
import ResourceProvider from "@/providers/resource";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="h-14 sticky top-0 z-10 bg-background border-b-2 border-b-muted" />
      <main className="h-full md:h-[calc(100dvh-56px)] overflow-hidden flex flex-1 flex-col md:flex-row relative">
        <SidebarNav className="bg-background" />
        <ResourceProvider>
          <div className="flex-1 md:flex h-full w-full overflow-auto">
            <div className="h-full flex-1 max-w-4xl mx-auto px-8 md:px-12 space-y-4">
              <MarkdownContent className="py-8" />
              <CommentsArea className="pb-10" />
            </div>
            <SummaryNav className="w-64 hidden xl:block bg-background sticky top-0 h-[calc(100dvh-56px)] overflow-auto no-scrollbar" />
          </div>
        </ResourceProvider>
      </main>
    </div>
  );
};

export default Layout;
