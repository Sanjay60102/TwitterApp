// For user login functionality.
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState("");

    //return navigate method
    const navigate = useNavigate();

    const Validate = (e) => {
        let user = { email: email, password: pwd};
        axios
        .post("http://localhost:5199/api/User/Validate", user)
        .then((response) => {
            console.log(response);
            if(response.status === 204){
                setErr("Invalid User Credentials");
            }
            else{
                let user = response.data;
                console.log(user.token);
                //store token data
                sessionStorage.setItem("token",user.token);
                console.log(user);
                if(user.role === "Admin"){
                    navigate("/AdminDashboard");
                }
                else {
                    navigate("/UserDashboard");
                }
            }
        });
        e.preventDefault();
    };
    return (
        <>
        <h1>Login</h1>
            <form onSubmit={Validate}>
                <table className="table">
                    <tr>
                        <td>Email</td>
                        <td>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input 
                                type="password"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <button type="submit">Login</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <span>{err}</span>
                        </td>
                    </tr>
                </table>
            </form>
        </>
    )
}
export default Login;