import resultsService from "../services/results.service.js"

export default async (req, res) => {
    const { query } = req.query
    const results = await resultsService(query)
    res.json(results)
}