import { useState, useEffect } from "react";
import axios from "axios";
const GetTweets = () => {
    const [tweets, GetTweets] = useState([])
    useEffect(()=>{
        axios
        .get('http://localhost:5199/api/Tweet/GetTweets')
        .then((response)=>{
            console.log(response.data);
            GetTweets(response.data); //adding response data to tweets
        })
        .catch((error)=>console.log(error));
    }, [])
    return (
        <div className="container">
            <h1>Tweets</h1>
            <form>
                <table className="table" border={1}> 
                    <thead className="table table-dark">
                        <tr>
                            <th>TweetId</th>
                            <th>UserId</th>
                            <th>Message</th>
                            {/* <th>CreatedOn</th> */}
                        </tr>
                    </thead>
                    <tbody className="table table-secondary">
                        {tweets.map((i)=>(
                            <tr>
                                <td>{i.tweetId}</td>
                                <td>{i.userId}</td>
                                <td>{i.message}</td>
                                {/* <td>{i.createdOn}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default GetTweets;