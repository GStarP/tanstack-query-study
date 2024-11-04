import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { EmailBrief, fetchEmails, StarEmailForm } from "./api"
import { queryEmails, useMutationStarEmail } from "./email"
import { memo, useEffect, useState } from "react"
import { queryClient } from "./query"

export default function EmailList() {
  const [pageNum, setPageNum] = useState(1)
  const pageSize = 10

  const { data, isPending, isFetching, isError, error, refetch } = useQuery({
    queryKey: queryEmails(pageNum, pageSize),
    queryFn: async () => {
      const res = await fetchEmails(pageNum, pageSize)
      return res
    },
    // refetchOnWindowFocus: false,
    // refetchInterval: 5000,
    // staleTime: 5000,
    // retry: false,
    // placeholderData: keepPreviousData,
  })

  const { mutate: starEmail } = useMutationStarEmail(pageNum, pageSize)

  const renderContent = () => {
    if (isPending) return <div>loading...</div>
    if (isError)
      return <div style={{ color: "red" }}>Error: {error.message}</div>
    if (data === undefined) return <div>no data</div>

    return (
      <div>
        {data.emails.map((email) => (
          <MemoEmailItem
            key={email.id}
            {...email}
            starEmail={starEmail}
          ></MemoEmailItem>
        ))}
      </div>
    )
  }

  const totalCount = data?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / pageSize)

  // useEffect(() => {
  //   if (pageNum < totalPages) {
  //     queryClient.prefetchQuery({
  //       queryKey: queryEmails(pageNum + 1, pageSize),
  //       queryFn: async () => {
  //         const res = await fetchEmails(pageNum + 1, pageSize)
  //         return res
  //       },
  //       staleTime: 5000,
  //     })
  //   }
  // }, [pageNum, pageSize, totalPages])

  return (
    <div>
      <h1>EmailList</h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <button onClick={() => refetch()}>Refresh</button>
        {isFetching && <div>fetching...</div>}
        <div>Total: {totalCount}</div>
      </div>

      {renderContent()}

      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        {new Array(totalPages).fill(null).map((_, i) => (
          <button
            key={`page-${i}`}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

function EmailItem(
  props: EmailBrief & { starEmail: (form: StarEmailForm) => void }
) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <div>{props.title}</div>
      <button
        onClick={() =>
          props.starEmail({
            id: props.id,
            isStar: !props.isStar,
          })
        }
      >
        {props.isStar ? "★" : "☆"}
      </button>
    </div>
  )
}
const MemoEmailItem = memo(EmailItem)
