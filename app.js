const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")

app.use(express.static("public"))

app.use(router)


router.get("/", (req, res)=> {
    console.log(req.session)
    res.sendFile(path.join(__dirname, "index.html"))
})


const server = app.listen(3000, ()=> {
    console.log("server created successfully on port 3000")
})

// socket connection
const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log("connected", "socket connection successfully")
    socket.on("message", (info) => {
        // console.log(info, 'info')
        socket.broadcast.emit("message", info)
    })
})
