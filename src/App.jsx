import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/home/home";
import { ROUTES } from "./router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClientProvider, QueryClient, QueryCache } from "@tanstack/react-query"

import { toast } from "@/components/ui/use-toast"
import { Toaster } from "./components/ui/toaster";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {

      toast({ title: "Error", description: error?.response?.data?.message || error.message, variant: "destructive" })
    },
  }),
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
