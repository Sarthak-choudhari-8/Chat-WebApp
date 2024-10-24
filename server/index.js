// = = + ++

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket  = require("socket.io");
 

require("dotenv").config();
const app  = express();

///

app.use(cors());
app.use(express.json()); 
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute)

const MongUrl = "mongodb://127.0.0.1:27017/chat";

async function main (){
    await mongoose.connect(MongUrl);
}

main()
.then(()=>{
    console.log("DB connected successfully");
}).catch((e)=>{
    console.log(e.message);
})

app.get("/" , (req,res) =>{
    res.send("root directory ... ");
})
const server = app.listen(process.env.PORT , () =>{
    console.log("server listening to port 5000");

})


// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

const io  = socket(server,{
    cors:{
        origin:"*",
        credential:true,
        
    }
});

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });


global.onlineUsers = new Map();
io.on("connection" , (socket)=>{
    global.chatSocket =socket ;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg",(data)=>{
    
                const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
            
        }

    })

    
})
