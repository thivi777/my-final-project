"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MoveLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-8 max-w-md">
        <h1 className="font-display text-9xl font-bold text-primary opacity-20">404</h1>
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-bold text-foreground">Oops! Page not found</h2>
          <p className="font-body text-muted-foreground text-lg">
            The path <span className="font-mono text-primary font-medium">{pathname}</span> seems to have vanished into thin air.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="rounded-full px-8 h-12">
            <Link href="javascript:history.back()">
              <MoveLeft className="mr-2 h-4 w-4" /> Go Back
            </Link>
          </Button>
          <Button asChild className="rounded-full px-8 h-12 shadow-lg shadow-primary/20">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
