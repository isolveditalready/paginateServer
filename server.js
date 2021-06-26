const express = require('express');
const users = require('./users.js')
const posts = require('./posts.js')
const app = express()
const port = 3333

app.get('/posts', paginatedResults(posts), (req,res) => {
   res.json(res.paginatedResults) 
})
app.get('/users', paginatedResults(users), (req,res) => {
   res.json(res.paginatedResults) 
})

function paginatedResults(model) {
    return (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        // paginate  localhost/users?page=1&limit=5
        const currentModel =  model.getDatas()
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < currentModel.length) {
            results.next = {
                page: page + 1,
                limit:limit
            }
        }

        if (startIndex > 0 ) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.results =   currentModel.slice(startIndex, endIndex)
        res.paginatedResults = results
        next()
    }
}

app.listen(port)