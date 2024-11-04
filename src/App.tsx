import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./query"
import EmailList from "./EmailList"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import { useState } from "react"
import OtherComponent from "./OtherComponent"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Devtool />
      <EmailList />
      <OtherComponent />
    </QueryClientProvider>
  )
}

function Devtool() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Devtool</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default App
