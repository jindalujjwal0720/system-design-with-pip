import { BrowserRouter as Router } from "react-router-dom";
import ResourceLayout from "./pages/resource-layout";
import SearchBoxProvider from "./providers/search-box";
import SidebarNavProvider from "./providers/sidebar-nav";
import MarkdownContent from "./components/markdown-content";
import CommentsArea from "./components/comments-area";
import { Toaster } from "./components/ui/sonner";
import NextPreviousButtons from "./components/next-previous-buttons";

function App() {
  return (
    <Router basename={import.meta.env.PROD ? "/system-design-with-pip" : "/"}>
      <SidebarNavProvider>
        <SearchBoxProvider>
          <ResourceLayout>
            <MarkdownContent className="w-full flex-1 max-w-4xl mx-auto px-6 md:px-12 py-8 space-y-4" />
            <NextPreviousButtons className="w-full max-w-4xl mx-auto px-6 my-8" />
            <CommentsArea className="w-full max-w-4xl mx-auto px-6 mb-12" />
          </ResourceLayout>
          <Toaster />
        </SearchBoxProvider>
      </SidebarNavProvider>
    </Router>
  );
}

export default App;
