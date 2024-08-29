// Displays a list of followers for the user.
import { useState } from "react";
import axios from "axios";

const GetFollowers = () => {
    const [followingId, setFollowingId] = useState("");
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState("");

    const fetchFollowers = (e) => {
        e.preventDefault();
        axios
            .get(`http://localhost:5199/api/Follow/GetFollowers/${followingId}`)
            .then((response) => {
                setFollowers(response.data);
                setError("");
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching followers");
            });
    };

    return (
        <div className="container">
            <h2>Followers</h2>
            <form onSubmit={fetchFollowers}>
                <table className="table">
                    <tr>
                        <td>UserId (of the user being followed):</td>
                        <td>
                            <input 
                                type="text"
                                value={followingId}
                                onChange={(e) => setFollowingId(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type="submit">Get Followers</button>
                        </td>
                    </tr>
                </table>
            </form>
            {error && <p>{error}</p>}
            {followers.length > 0 && (
                <ul>
                    {followers.map((follower) => (
                        <li key={follower.userId}>{follower.userId}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GetFollowers;
