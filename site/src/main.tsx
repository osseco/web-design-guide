import { AppShell } from "@template/components/app-shell";
import { Palette } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { GITHUB_REPO } from "./lib/links";
import { ComponentsPage } from "./pages/components";
import { DocRoute } from "./pages/doc";
import { HomePage } from "./pages/home";
import { TokensPage } from "./pages/tokens";
import "./index.css";

const basename = (() => {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return undefined;
  return base.replace(/\/$/, "");
})();

const BASE = import.meta.env.BASE_URL;

function Layout() {
  return (
    <AppShell
      brand="osseco design"
      icon={<Palette />}
      nav={[
        { href: "/", label: "Overview" },
        { href: "/docs", label: "Guide" },
        { href: "/components", label: "Components" },
        { href: "/tokens", label: "Tokens" },
        { href: GITHUB_REPO, label: "GitHub" },
      ]}
      footer={
        <>
          <a href={GITHUB_REPO}>GitHub</a>
          <a href={`${BASE}llms.txt`}>llms.txt</a>
          <a href={`${BASE}AGENTS.md`}>AGENTS.md</a>
          <span>Design extracted from git-uplink.</span>
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<Navigate to="/docs/principles" />} />
        <Route path="/docs/:slug" element={<DocRoute />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("index.html has no #root element");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
