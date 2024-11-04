const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const allEmails = new Array(100).fill(null).map((_, i) => ({
  id: `email-${i}`,
  title: `email-${i}`,
  isStar: false,
}))

app.get("/emails", (req, res) => {
  const pageNum = parseInt(req.query.pageNum) - 1
  const pageSize = parseInt(req.query.pageSize)

  setTimeout(() => {
    if (pageNum === 9) {
      res.status(403).send("broken page")
    } else {
      res.send({
        emails: allEmails.slice(pageNum * pageSize, (pageNum + 1) * pageSize),
        totalCount: allEmails.length,
      })
    }
  }, 1000)
})

app.post("/star", (req, res) => {
  const id = req.body.id
  const isStar = req.body.isStar

  setTimeout(() => {
    if (id.endsWith("9")) {
      res.status(403).send("cannot star")
    } else {
      const email = allEmails.find((email) => email.id === id)
      if (email) {
        email.isStar = isStar
      }
      res.send("ok")
    }
  }, 1000)
})

app.listen(3000, () => {
  console.log("server listening http://127.0.0.1:3000")
})
