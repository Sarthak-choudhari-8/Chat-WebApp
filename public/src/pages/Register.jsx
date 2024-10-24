import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo2.png"
import {useEffect , useState } from "react"

import {ToastContainer, toast} from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";



export default function Register() {

  const navigate = useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

   const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
   })


   useEffect(() =>{

    if(localStorage.getItem('chat-app-user')){
      navigate("/"); 
    }
  
  },[] )
  
  

  const handleSubmit = async(event) =>{
    event.preventDefault();   
    if(handleValidation()){
      ///
        let {username ,  email , password} = values;
        const {data} = await axios.post(registerRoute,{
            username,
            email,
            password,
        });

if(data.status == false ){
    toast.error(data.msg, toastOptions)
}
if (data.status === true) {
  localStorage.setItem(
    'chat-app-user',
    JSON.stringify(data.user)
  );
  navigate("/");
}
 
//////

////////
    }
    
   
  }
  

  const handleChange = (event) =>{   
    setValues({...values, [event.target.name]:event.target.value})
  }
  
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };
  
  
    return (

        <>
{/* <h4>Register</h4> */}

<FormContainer>
    <form onSubmit={(event) => handleSubmit(event)}>

<div className="brand"> 
    <img src={Logo} alt="logo image" />
    <h1>Chatter !</h1>

</div>
<input type="text" placeholder="enter Username" name="username" onChange={(e) =>handleChange(e)}/>

<input type="email" placeholder="enter Email " name="email" onChange={(e) =>handleChange(e)}/>

<input type="password" placeholder="Enter Password" name="password" onChange={(e) =>handleChange(e)}/>

<input type="password" placeholder="confirm password" name="confirmPassword" onChange={(e) =>handleChange(e)}/>
<button type="submit">Create User</button>
<span>
    already have an account ? <Link to="/login">Login</Link>
 </span>
    </form>
</FormContainer>

<ToastContainer />
        </>

    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #bb35f0;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #bb35f0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;