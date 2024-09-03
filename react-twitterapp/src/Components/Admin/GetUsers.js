// Displays a list of users (e.g., for following suggestions).
import { useState, useEffect } from "react";
import axios from "axios";
const GetUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        axios
        .get('http://localhost:5199/api/User/GetAllUsers',{
           headers:{
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
           }
        })
        .then((res)=>{
            console.log(res.data);
            setUsers(res.data);
        })
        .catch((error)=>console.log(error));
    }, [])
    return (
        <div className="container">
            <h1>Users</h1>
            <form>
                <table className="table" border={1}>
                    <thead className="table table-dark">
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            {/* <th>Password</th> */}
                            <th>Mobile Number</th>
                            <th>JoinedAt</th>
                            {/* <th>Role</th> */}
                        </tr>
                    </thead>
                    <tbody className="table table-secondary">
                        {users.map((i)=>(
                            <tr>
                                <td>{i.userId}</td>
                                <td>{i.userName}</td>
                                <td>{i.email}</td>
                                {/* <td>{i.password}</td> */}
                                <td>{i.mobileNumber}</td>
                                <td>{i.joinedAt}</td>
                                {/* <td>{i.role}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default GetUsers;