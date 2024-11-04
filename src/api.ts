import axios from "axios"

export type EmailBrief = {
  id: string
  title: string
  isStar: boolean
}

export const fetchEmails = async (pageNum: number, pageSize: number) => {
  console.log(`[req] fetchEmails: pageNum=${pageNum}, pageSize=${pageSize}`)
  const { data } = await axios.get<{
    emails: EmailBrief[]
    totalCount: number
  }>(`http://127.0.0.1:3000/emails?pageNum=${pageNum}&pageSize=${pageSize}`)
  console.log(`[res] fetchEmails: pageNum=${pageNum}, pageSize=${pageSize}`)

  return data
}

export type StarEmailForm = {
  id: string
  isStar: boolean
}
export const doStarEmail = async (payload: StarEmailForm) => {
  console.log(`[req] doStarEmail: id=${payload.id}, isStar=${payload.isStar}`)
  await axios.post("http://127.0.0.1:3000/star", payload)
  console.log(`[res] doStarEmail: id=${payload.id}, isStar=${payload.isStar}`)
}
