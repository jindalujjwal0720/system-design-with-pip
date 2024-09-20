import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/layout";
import SearchBoxProvider from "./providers/search-box";
import SidebarNavProvider from "./providers/sidebar-nav";

function App() {
  return (
    <Router basename={import.meta.env.PROD ? "/system-design-with-pip" : "/"}>
      <SidebarNavProvider>
        <SearchBoxProvider>
          <Layout />
        </SearchBoxProvider>
      </SidebarNavProvider>
    </Router>
  );
}

export default App;
