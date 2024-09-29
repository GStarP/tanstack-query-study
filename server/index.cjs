const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())

app.get("/user", (req, res) => {
  const ts = Date.now()
  if (ts % 2 === 0) {
    setTimeout(() => {
      res.send({
        name: "Jack",
        admin: true,
        ts,
      })
    }, 2000)
  }
})

app.get("/page", (req, res) => {
  const pageNum = parseInt(req.query.pageNum)
  const pageSize = parseInt(req.query.pageSize)

  const now = Date.now()
  // if (Date.now() % 2 === 0) {
  setTimeout(() => {
    res.send({
      dataList: Array(pageSize)
        .fill(null)
        .map((_, i) => ({
          id: `${pageNum}-${i}`,
          name: `${pageNum}-${i}`,
          ts: now,
        })),
      totalCount: pageSize * 10,
    })
  }, 2000)
  // } else {
  //   setTimeout(() => {
  //     res.sendStatus(500)
  //   }, 1000)
  // }
})

app.listen(3000, () => {
  console.log("server listening http://127.0.0.1:3000")
})
