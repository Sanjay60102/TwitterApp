import { useState } from "react";
import axios from "axios";

const RemoveFollowing = () => {
    const [userId, setUserId] = useState("");
    const [followingId, setFollowingId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const removeFollowing = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:5199/api/Follow/RemoveFollowing/${userId}/${followingId}`);
            setSuccess("Follow relationship removed successfully.");
            setError("");
        } catch (err) {
            console.error(err);
            setError("Error removing follow relationship");
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <h2>Remove Following</h2>
            <form onSubmit={removeFollowing}>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Your UserId:</td>
                            <td>
                                <input 
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
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
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit" className="btn btn-danger">Remove Follow</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
            </form>
        </div>
    );
};

export default RemoveFollowing;
