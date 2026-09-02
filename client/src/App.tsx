import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Home from "@/pages/home";
import DesignConcepts from "@/pages/design-concepts";

function ScrollToTop() {
  const [loc] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [loc]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/concepts" component={DesignConcepts} />
          <Route path="/concepts/:concept" component={DesignConcepts} />
          <Route component={Home} />
        </Switch>
      </main>
    </>
  );
}

export default App;