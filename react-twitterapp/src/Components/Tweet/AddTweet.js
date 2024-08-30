import { useState } from "react";
import axios from "axios";
import './AddTweet.css';

const AddTweet = () => {
    const [tweet, SetTweet] = useState({
        tweetId: 0,
        userId: '',
        message: '',
        createdOn: new Date().toISOString(),
    });

    const save = (e) => {
        e.preventDefault(); // Prevent form submission
        console.log(tweet);
        axios
            .post('http://localhost:5199/api/Tweet/AddTweet', tweet)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container tweet-container">
            <h2 className="text-center mb-4">Add a Tweet</h2>
            <form onSubmit={save} className="tweet-form">
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">User ID:</label>
                    <div className="col-sm-8">
                        <input 
                            type="text"
                            className="form-control"
                            value={tweet.userId}
                            onChange={(e) =>
                                SetTweet((prevObj) => ({
                                    ...prevObj,
                                    userId: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label text-end">Message:</label>
                    <div className="col-sm-8">
                    <textarea 
                            className="form-control"
                            rows="4"
                            value={tweet.message}
                            onChange={(e) =>
                                SetTweet((prevObj) => ({
                                    ...prevObj,
                                    message: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Tweet</button>
            </form>
        </div>
    );
};

export default AddTweet;
