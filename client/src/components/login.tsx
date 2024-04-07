import { Link } from "react-router-dom";
import Navbar from "./navbar";

function Login() {
  return (
    <div style={{
      height:"100vh",
      width:"100vw",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      flexDirection: "row"}}>
      
      <Navbar />
      
      <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
        <Link to="http://localhost:5000/login"> 
          <button style={{
            backgroundColor:"#1DB954",
            color:"white",
            width:"20em",
            height:"5em",
            border:"none",
            borderRadius: "2rem"
          }}> Login </button> 
        </Link>  
      </div>
    </div>
  );
}

export default Login;
