import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

// Public API endpoint
app.get("/api/public/brain/query", async (req, res) => {
  const query = req.query.q

  // Example response
  res.json({
    query: query,
    answer: "Example response from your Second Brain",
    sources: ["Artificial Intelligence note"]
  })
})

app.listen(5000, () => {
  console.log("API running on http://localhost:5000")
})