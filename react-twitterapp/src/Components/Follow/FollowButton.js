// Handles following and unfollowing functionality.
import { useState } from "react";
import axios from "axios";

const AddFollowing = () => {
    const [follow, setFollow] = useState({
        userId: "",
        followingId: ""
    });
    const [error, setError] = useState("");

    const addFollowing = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5199/api/Follow/AddFollowing", follow)
            .then((response) => {
                console.log(response.data);
                setError("");
            })
            .catch((err) => {
                console.error(err);
                setError("Error adding follow relationship");
            });
    };

    return (
        <div className="container">
            <h2>Add Following</h2>
            <form onSubmit={addFollowing}>
                <table className="table">
                    <tr>
                        <td>Your UserId:</td>
                        <td>
                            <input 
                                type="text"
                                value={follow.userId}
                                onChange={(e) =>
                                    setFollow((prevObj) => ({
                                        ...prevObj,
                                        userId: e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Following UserId:</td>
                        <td>
                            <input 
                                type="text"
                                value={follow.followingId}
                                onChange={(e) =>
                                    setFollow((prevObj) => ({
                                        ...prevObj,
                                        followingId: e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type="submit">Add Follow</button>
                        </td>
                    </tr>
                </table>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default AddFollowing;
