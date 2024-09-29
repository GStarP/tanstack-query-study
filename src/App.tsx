import { QueryClientProvider } from "@tanstack/react-query"
import RequestState from "./pages/RequestState"
import { queryClient } from "./query"
import PageData from "./pages/PageData"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <RequestState />
        <PageData />
      </div>
    </QueryClientProvider>
  )
}

export default App
