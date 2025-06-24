import { QueryClient } from "@tanstack/react-query";

// Simplified query client for static PWA - no server needed
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
