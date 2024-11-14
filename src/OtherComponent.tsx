import { useQuery } from "@tanstack/react-query"
import { queryEmails, queryKeyEmails } from "./email"
import { queryClient } from "./query"

export default function OtherComponent() {
  const { data, isFetching } = useQuery(queryEmails(8, 10))
  // const { data, isFetching } = useQuery({
  //   ...queryEmails(8, 10),
  //   enabled: false,
  // })

  return (
    <div>
      <h1>Other Component</h1>
      <button onClick={updateCurPage}>update cur page</button>
      <button onClick={destroyPage1}>destroy page 1</button>
      <button onClick={seePage6}>see page 6</button>
      <div>{isFetching ? "fetching..." : ""}</div>
      <div>we have {data?.totalCount || -1} emails</div>
    </div>
  )
}

const updateCurPage = () => {
  // match
  queryClient.invalidateQueries({ queryKey: ["emails"] })
}

const destroyPage1 = () => {
  queryClient.setQueryData(queryKeyEmails(1, 10), () => ({
    emails: [],
    totalCount: 1,
  }))
}

const seePage6 = () => {
  // console.log(queryClient.getQueryData(queryKeyEmails(6, 10)))
  console.log(queryClient.getQueryData(queryKeyEmails(6, 10)))
}
