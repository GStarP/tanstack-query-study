import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../api"

export default function RequestState() {
  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["request"],
    queryFn: fetchUser,
    retry: false,
  })

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div>{JSON.stringify(data)}</div>
      <button
        onClick={() => {
          refetch()
        }}
      >
        Refetch
      </button>
    </div>
  )
}
