import { getSearchIndex } from "@/packages/utils/loader";
import { SearchProvider } from "../features/search/SearchProvider";
import NavigationProvider from "../providers/NavigationProvider";
import { StyleProvider } from "../providers/StyleProvider";
import ThemeProvider from "../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}
const AppClientLayout = ({ children }: AppClientLayoutProps) => {
  return (
    <ThemeProvider>
      <StyleProvider>
        <NavigationProvider>
          <SearchProvider index={getSearchIndex()}>
            <Header />
            <main className="main screen-height" id="main">
              {children}
            </main>
            <Footer />
          </SearchProvider>
        </NavigationProvider>
      </StyleProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
