import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { fetchPage } from "../api"
import { queryClient } from "../query"

export default function PageData() {
  const [curPage, setCurPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(10)

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["page", curPage, pageSize],
    queryFn: async () => {
      console.log("fetch: " + curPage)
      const data = await fetchPage(curPage, pageSize)
      // 不能通过直接通过 useQuery 取总页数，否则如果第一次失败就没数据了
      const totalPages = Math.ceil(data.totalCount / pageSize)
      setTotalPages(totalPages)
      // 预加载下一页
      if (curPage < totalPages) {
        queryClient.prefetchQuery({
          queryKey: ["page", curPage + 1, pageSize],
          queryFn: () => {
            console.log("prefetch: " + (curPage + 1))
            return fetchPage(curPage + 1, pageSize)
          },
        })
      }
      return data
    },
    retry: false,
    placeholderData: (prev) => prev,
    // staleTime 配置在取值时才有用，而不是配置在请求时
    staleTime: 30 * 1000,
  })

  return (
    <div>
      <div>
        {isFetching && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data &&
          data.dataList.map((item) => (
            <div key={item.id}>
              {item.name} {item.ts}
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        {new Array(totalPages).fill(null).map((_, i) => (
          <a key={`pagination-${i}`} onClick={() => setCurPage(i + 1)}>
            {i + 1}
          </a>
        ))}
      </div>
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

const autoRefetchPage = () => {
  const curPage = 1
  const pageSize = 10

  const timer = setInterval(() => {
    queryClient.prefetchQuery({
      queryKey: ["page", curPage, pageSize],
      queryFn: () => {
        console.log("auto fetch: " + curPage)
        return fetchPage(curPage, pageSize)
      },
    })
  }, 5 * 1000)

  return () => {
    clearInterval(timer)
  }
}
autoRefetchPage()
