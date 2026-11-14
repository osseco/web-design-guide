import { Boxes } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { AppShell } from "./components/app-shell";
import { HomePage } from "./pages/home";
import "./index.css";

// Replace with the project's name, icon, repository and pages.
const BRAND = "project name";
const REPO = "https://github.com/osseco/project";

const basename = (() => {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return undefined;
  return base.replace(/\/$/, "");
})();

function Layout() {
  return (
    <AppShell
      brand={BRAND}
      icon={<Boxes />}
      nav={[
        { href: "/", label: "Overview" },
        { href: REPO, label: "GitHub" },
      ]}
      footer={<a href={REPO}>GitHub</a>}
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
