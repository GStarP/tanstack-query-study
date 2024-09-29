import axios from "axios"

export const fetchUser = async () => {
  const { data } = await axios.get<{
    name: string
    admin: boolean
    ts: number
  }>("http://127.0.0.1:3000/user", {
    timeout: 5 * 1000,
  })
  return data
}

export const fetchPage = async (pageNum: number, pageSize: number) => {
  const { data } = await axios.get<{
    dataList: {
      id: string
      name: string
      ts: number
    }[]
    totalCount: number
  }>(`http://127.0.0.1:3000/page?pageNum=${pageNum}&pageSize=${pageSize}`)

  return data
}
