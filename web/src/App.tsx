import Layout from "./pages/layout";
import SearchBoxProvider from "./providers/search-box";
import SidebarNavProvider from "./providers/sidebar-nav";

function App() {
  return (
    <SidebarNavProvider>
      <SearchBoxProvider>
        <Layout />
      </SearchBoxProvider>
    </SidebarNavProvider>
  );
}

export default App;
