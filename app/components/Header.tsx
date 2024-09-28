import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-[1000]">
      <nav className="container bg-black/20 backdrop-blur mx-auto px-16 py-4">
        <div className="flex items-center justify-between">
          <div className="gradient-custom">
            <Link href="/" className="font-mont text-2xl font-light">
              CRA
            </Link>
            <Link href="/" className="font-mont text-2xl font-bold">
              XRAY
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link href="/" className="nav-item">
              Home
            </Link>
            <Link href="/how-it-works" className="nav-item">
              How it works
            </Link>
            <Button asChild>
              <Link href="/detect">Detect</Link>
            </Button>
          </div>
        </div>
      </nav>
      <div className="w-screen border-b-2 border-white/30"></div>
    </header>
  );
}
