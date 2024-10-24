import React from "react";
import { useEffect, useState , useRef} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { allUsersRoute , host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import styled from "styled-components";

import Welcome from "../components/welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";


export default function Chat() {

  const socket = useRef();  
  const navigate = useNavigate();

  useEffect(() =>{

    if(!localStorage.getItem('chat-app-user')){

      navigate("/login"); 
    
    }
    else{
    }
   
  },[] )

   let  currUser = JSON.parse( localStorage.getItem('chat-app-user'));
  
 


// console.log(currUser);



const [contacts , setContacts]  = useState([]);
const [currentUser , setCurrentUser] = useState(currUser); 
const [currentChat , setCurrentChat] = useState(undefined);
const [isLoaded , setIsLoaded] = useState(false);

// useEffect(async() =>{
//   if(!localStorage.getItem("chat-app-user")){
//     navigate("/login");
//   }
//   else{
//     setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
//     setIsLoaded(true);
//   }
// },[])


useEffect(()=>{
  if(currUser){
    socket.current = io(host);
socket.current.emit("add-user",currentUser._id);

  }
},[currUser]);



useEffect(() =>{

  let afnc  = async  ()=> {

     if(currentUser){
if(currentUser.isAvatarImageSet){
    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    setContacts(data.data)
}
else{
    navigate("/setAvatar");
}

     } 

  }
  afnc();

}, [currentUser])

const handleChatChange  = (chat ) =>{
setCurrentChat(chat);
}

  return (
    <>
      <Container>
        <div className="container">
<Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
{
   currentChat === undefined ? (<Welcome currentUser={currentUser} /> ):
   ( <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />)
}


        </div>
      </Container>
    </>
  );
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
