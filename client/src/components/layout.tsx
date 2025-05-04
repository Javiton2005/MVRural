import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ backgroundColor: "#f8fafc" ,display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
};

export default Layout;
