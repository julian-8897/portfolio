import { Switch, Route, useLocation, Link } from "wouter";
import { useEffect } from "react";
import Home from "@/pages/home";
import DesignConcepts from "@/pages/design-concepts";
import IndexCandidate from "@/candidates/Index";
import ReportCandidate from "@/candidates/Report";

function ScrollToTop() {
  const [loc] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [loc]);
  return null;
}

// Draft-only switcher between redesign candidates; removed once one is chosen.
function CandidateSwitch() {
  const [loc] = useLocation();
  if (!loc.startsWith("/candidates")) return null;
  const style: React.CSSProperties = { position: "fixed", right: 12, bottom: 12, zIndex: 50, display: "flex", gap: 8, font: "12px system-ui", background: "#111", color: "#fff", padding: "6px 10px", borderRadius: 6 };
  return (
    <nav style={style} aria-label="Design candidates">
      <Link href="/candidates/a" style={{ color: loc.endsWith("/a") ? "#fff" : "#999" }}>A Index</Link>
      <Link href="/candidates/b" style={{ color: loc.endsWith("/b") ? "#fff" : "#999" }}>B Report</Link>
    </nav>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/candidates/a" component={IndexCandidate} />
          <Route path="/candidates/b" component={ReportCandidate} />
          <Route path="/concepts" component={DesignConcepts} />
          <Route path="/concepts/:concept" component={DesignConcepts} />
          <Route component={Home} />
        </Switch>
      </main>
      <CandidateSwitch />
    </>
  );
}

export default App;
