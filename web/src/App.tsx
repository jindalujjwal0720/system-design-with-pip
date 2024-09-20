import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/layout";
import SearchBoxProvider from "./providers/search-box";
import SidebarNavProvider from "./providers/sidebar-nav";

function App() {
  return (
    <Router>
      <SidebarNavProvider>
        <SearchBoxProvider>
          <Layout />
        </SearchBoxProvider>
      </SidebarNavProvider>
    </Router>
  );
}

export default App;
