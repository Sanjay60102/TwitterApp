// Allows users to edit their profile details.
import { useState } from "react";
import axios from "axios";

const EditProfile = () => {
    const [user, setUser] = useState({
        userId: "",
        userName: "",
        email: "",
        password: "",
        mobileNumber: 0,
    });
    const [error, setError] = useState("");

    const search = (e) => {
        e.preventDefault();
        let userId = user.userId;
        console.log(userId);
        axios
        .get("http://localhost:5199/api/User/GetUserById/"+userId)
        .then((res)=>{
            console.log(res);
            if(res.statusText !== "No Content") setUser(res.data);
            else{
                setError("Invalid User Id");
            }
        })
        .catch((err)=>{
            console.error(err);
            setError("Error fetching User");
        });
    };

    const save = (e) => {
        e.preventDefault();
        axios
        .put("http://localhost:5199/api/User/EditProfile",user)
        .then((res)=>{
            console.log(res.data);
            setError("");
        })
        .catch((err)=>{
            console.error(err);
            setError("Error updating profile");
        });
    };

    const remove = () =>{
        let userId = user.userId;
        axios
        .delete("http://localhost:5199/api/User/DeleteProfile/"+userId)
        .then((res)=>{})
        .catch((err)=>console.log(err));
    };
    return (
        
        <div className="container">
            <h1>Edit Profile</h1>
            <form onSubmit={save}>
                <table className="table">
                    <tr>
                        <td>User ID</td>
                        <td>
                            <input 
                                type="text"
                                value={user.userId}
                                onChange={(e) =>
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
                                onChange={(e) =>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        userName:e.target.value,
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
                                onChange={(e) =>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        email:e.target.value,
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
                                onChange={(e) =>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        password:e.target.value,
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
                                onChange={(e) =>
                                    setUser((prevObj)=>({
                                        ...prevObj,
                                        mobileNumber:e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type="submit">Edit</button>
                            <button onClick={search}>Search</button>
                            <button onClick={remove}>Delete</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}
export default EditProfile;