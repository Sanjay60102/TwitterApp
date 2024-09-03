import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddTweet.css';

const AddTweet = () => {
    const [tweet, SetTweet] = useState({
        tweetId: 0,
        userId: '',  // userId will be populated from sessionStorage
        message: '',
        createdOn: new Date().toISOString(),
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Get the userId from sessionStorage
        const userId = sessionStorage.getItem("userId");
        if (userId) {
            SetTweet((prevTweet) => ({
                ...prevTweet,
                userId: userId,
            }));
        } else {
            console.error("No user ID found in sessionStorage");
        }
    }, []);  // Runs only once on component mount

    const save = (e) => {
        e.preventDefault();  // Prevent form submission
        console.log(tweet);
        axios
            .post('http://localhost:5199/api/Tweet/AddTweet', tweet,{
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem("tekoen")}`
                }
            })
            .then((response) => {
                console.log(response.data);
                navigate("/Home");
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
                            disabled  // Disable the input field
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
