"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

<<<<<<< HEAD
=======
import { ThemeProvider } from "next-themes";

>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
            {children}
=======
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
                {children}
            </ThemeProvider>
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
        </QueryClientProvider>
    );
}
