import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import AnimatedBackdrop from "../components/ui/AnimatedBackdrop";
import ThemeSettings from "../components/ui/ThemeSettings";
import ScrollToTop from "../components/ui/ScrollToTop";
import Footer from "../components/layout/Footer";
import GlobalLoader from "../components/ui/GlobalLoader";

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <AnimatedBackdrop intensity="high" />
      <GlobalLoader />
      <Navbar />
      <main className="pt-28 lg:pt-[120px]">
        <Outlet />
      </main>
      <Footer />
      <ThemeSettings />
      <ScrollToTop />
      <ScrollRestoration />
    </div>
  );
}
