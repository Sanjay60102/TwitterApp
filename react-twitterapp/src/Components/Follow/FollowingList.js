// Displays a list of users the current user is following.
import { useState } from "react";
import axios from "axios";

const GetFollowings = () => {
    const [userId, setUserId] = useState("");
    const [followings, setFollowings] = useState([]);
    const [error, setError] = useState("");

    const fetchFollowings = (e) => {
        e.preventDefault();
        axios
            .get(`http://localhost:5199/api/Follow/GetFollowings/${userId}`)
            .then((response) => {
                setFollowings(response.data);
                setError("");
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching followings");
            });
    };

    return (
        <div className="container">
            <h2>Followings</h2>
            <form onSubmit={fetchFollowings}>
                <table className="table">
                    <tr>
                        <td>Your UserId:</td>
                        <td>
                            <input 
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type="submit">Get Followings</button>
                        </td>
                    </tr>
                </table>
            </form>
            {error && <p>{error}</p>}
            {followings.length > 0 && (
                <ul>
                    {followings.map((following) => (
                        <li key={following.userId}>{following.userId}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GetFollowings;
