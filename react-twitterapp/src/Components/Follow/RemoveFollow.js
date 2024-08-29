import { useState } from "react";
import axios from "axios";

const RemoveFollowing = () => {
    const [userId, setUserId] = useState("");
    const [followingId, setFollowingId] = useState("");
    const [error, setError] = useState("");

    const removeFollowing = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:5199/api/Follow/RemoveFollowing/${userId}/${followingId}`)
            .then((response) => {
                console.log(response.data);
                setError("");
            })
            .catch((err) => {
                console.error(err);
                setError("Error removing follow relationship");
            });
    };

    return (
        <div className="container">
            <h2>Remove Following</h2>
            <form onSubmit={removeFollowing}>
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
                        <td>Following UserId:</td>
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
                            <button type="submit">Remove Follow</button>
                        </td>
                    </tr>
                </table>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default RemoveFollowing;
