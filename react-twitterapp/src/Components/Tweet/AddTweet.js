// Allows the user to create a new tweet (with optional media upload).
import { useState } from "react";
import axios from "axios";
const AddTweet = () => {
    const [tweet, SetTweet] = useState({
        tweetId:0,
        userId:'',
        message:'',
        createdOn:new Date().toISOString(),
    })
    const save = (e) => {
        console.log(tweet)
        axios
        .post('http://localhost:5199/api/Tweet/AddTweet',tweet)
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>console.log(error));
        e.preventDefault();
    }
    return (
        <div className="container">
            <h2>Add a Tweet</h2>
            <form onSubmit={save}>
                <table className="table">
                    <tr>
                        <td>UserId:</td>
                        <td>
                            <input 
                                type="text"
                                value={tweet.userId}
                                onChange={(e)=>
                                    SetTweet((prevObj)=>({
                                        ...prevObj,
                                        userId:e.target.value,
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Message:</td>
                        <td>
                            <input 
                                type="text"
                                value={tweet.message}
                                onChange={(e)=>
                                    SetTweet((prevObj)=>({
                                        ...prevObj,
                                        message:e.target.value
                                    }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <button type="submit">Add Tweet</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}
export default AddTweet;