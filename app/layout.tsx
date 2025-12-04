import { PlanProvider } from "../context/PlanContext";
import "../app/globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}
