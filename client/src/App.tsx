import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Work from "@/pages/work";
import ProjectPage from "@/pages/project";
import About from "@/pages/about";
import Contact from "@/pages/contact";

function ScrollToTop() {
  const [loc] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [loc]);
  return null;
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/work/:slug" component={ProjectPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Nav />
      <main className="min-h-screen">
        <AppRouter />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
