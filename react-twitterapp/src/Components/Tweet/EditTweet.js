// Allows editing of an existing tweet.
import { useState } from "react";
import axios from "axios";

const EditTweet = () => {
  const [tweet, setTweet] = useState({
    tweetId: 0, // Tweet ID will be used for searching, not editing
    userId: "",
    message: "",
  });
  const [error, setError] = useState("");

  // Function to search for a tweet by its ID
  const search = (e) => {
    e.preventDefault();
    let tweetId = tweet.tweetId;
    console.log(tweetId);

    axios
      .get("http://localhost:5199/api/Tweet/GetById/" + tweetId)
      .then((res) => {
        console.log(res);
        if (res.statusText !== "No Content") setTweet(res.data);
        else {
          setError("Invalid Tweet ID");
        }
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching tweet");
        });
    };

  // Function to save the updated tweet
  const save = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:5199/api/Tweet/EditTweet", tweet)
      .then((res) => {
        console.log(res.data);
        setError(""); // Clear any errors on successful save
      })
      .catch((err) => {
        console.error(err);
        setError("Error updating tweet");
      });
  };
  const remove = () => {
    let tweetId = tweet.tweetId;
    axios
    .delete("http://localhost:5199/api/Tweet/DeleteTweet/"+ tweetId)
    .then((res) => {})
    .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <h1>Edit Tweet</h1>
      <form onSubmit={save}>
        <table className="table">
          <tbody>
            <tr>
              <td>Tweet ID</td>
              <td>
                <input
                  type="number"
                  value={tweet.tweetId}
                  onChange={(e) =>
                    setTweet((prevTweet) => ({
                      ...prevTweet,
                      tweetId: e.target.value,
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>User ID</td>
              <td>
                <input
                  type="text"
                  value={tweet.userId}
                  onChange={(e) =>
                    setTweet((prevTweet) => ({
                      ...prevTweet,
                      userId: e.target.value,
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Message</td>
              <td>
                <input
                  type="text"
                  value={tweet.message}
                  onChange={(e) =>
                    setTweet((prevTweet) => ({
                      ...prevTweet,
                      message: e.target.value,
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit">Edit</button>
                <button onClick={search}>Search</button>
                <button onClick={remove}>Delete</button>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>{error}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default EditTweet;
