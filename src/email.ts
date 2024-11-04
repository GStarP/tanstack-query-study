import { useMutation } from "@tanstack/react-query"
import { doStarEmail, fetchEmails } from "./api"
import { queryClient } from "./query"

// Query Key
export const queryEmails = (pageNum: number, pageSize: number) => [
  "emails",
  pageNum,
  pageSize,
]

export const useMutationStarEmail = (pageNum: number, pageSize: number) => {
  const queryKey = queryEmails(pageNum, pageSize)
  return useMutation({
    // ! can only recv one param
    mutationFn: doStarEmail,
    onMutate: async (payload) => {
      // cancel existing query
      await queryClient.cancelQueries({ queryKey: ["emails"] })
      // save previous state
      const previousEmails =
        queryClient.getQueryData<Awaited<ReturnType<typeof fetchEmails>>>(
          queryKey
        )
      // optimistic update
      if (previousEmails) {
        const newEmails = { ...previousEmails }
        const email = newEmails.emails.find((e) => e.id === payload.id)
        if (email) {
          email.isStar = payload.isStar
        }
        queryClient.setQueryData(queryKey, newEmails)
      }
    },
    // when mutate error, fetch state to overwrite optimistic update
    onError: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
