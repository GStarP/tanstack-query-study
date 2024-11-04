import { queryEmails } from "./email"
import { queryClient } from "./query"

export default function OtherComponent() {
  return (
    <div>
      <h1>Other Component</h1>
      <button onClick={updateCurPage}>update cur page</button>
      <button onClick={destroyPage1}>destroy page 1</button>
      <button onClick={seePage6}>see page 6</button>
    </div>
  )
}

const updateCurPage = () => {
  // match
  queryClient.invalidateQueries({ queryKey: ["emails"] })
}

const destroyPage1 = () => {
  queryClient.setQueryData(queryEmails(1, 10), () => ({
    emails: [],
    totalCount: 1,
  }))
}

const seePage6 = () => {
  console.log(queryClient.getQueryData(queryEmails(6, 10)))
}
