//  For new user registration.
import { useState } from "react";
import axios from "axios";
const Register = () => {
    const [user, setUser] = useState({
        userId: "",
        userName: "",
        email: "",
        password: "",
        mobileNumber: 0,
        // joinedAt: new Date().toISOString(),
        role: ""
    });
    const save = (e) => {
        console.log(user)
        axios
        .post('http://localhost:5199/api/User/Register',user)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((error)=>console.log(error));
        e.preventDefault();
    };
    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={save}>
                <table className="table">
                    <tr>
                        <td>UserId</td>
                        <td>
                            <input 
                                type="text"
                                value={user.userId}
                                onChange={(e)=>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        userId:e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td>
                            <input 
                                type="text"
                                value={user.userName}
                                onChange={(e)=>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        userName:e.target.value
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input 
                                type="email"
                                value={user.email}
                                onChange={(e)=>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        email:e.target.value
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input 
                                type="password"
                                value={user.password}
                                onChange={(e)=>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        password:e.target.value
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Mobile Number</td>
                        <td>
                            <input 
                                type="number"
                                value={user.mobileNumber}
                                onChange={(e)=>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        mobileNumber:e.target.value
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
  <td>Role</td>
  <td>
    <label>
      <input
        type="radio"
        name="role"
        value="Admin"
        checked={user.role === "Admin"}
        onChange={(e) =>
          setUser((prevObj) => ({
            ...prevObj,
            role: e.target.value,
          }))
        }
      />
      Admin
    </label>
    <label style={{ marginLeft: '10px' }}>
      <input
        type="radio"
        name="role"
        value="User"
        checked={user.role === "User"}
        onChange={(e) =>
          setUser((prevObj) => ({
            ...prevObj,
            role: e.target.value,
          }))
        }
      />
      User
    </label>
  </td>
</tr>

                    <tr>
                        <td colSpan={3}>
                            <button type="submit">Register</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}
export default Register;