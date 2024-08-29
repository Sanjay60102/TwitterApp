import logo from './logo.svg';
import './App.css';
import EditTweet from './Components/Tweet/EditTweet';
import Login from './Components/Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDashboard from './Components/Dashboard/UserDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import GetTweets from './Components/Tweet/GetTweets';
import AddTweet from './Components/Tweet/AddTweet';
import Register from './Components/Auth/Register';
import EditProfile from './Components/User/EditProfile';
import GetUsers from './Components/User/UserList';
import EditComment from './Components/Comment/EditComment';
import AddComment from './Components/Comment/AddComment';
import AddFollowing from './Components/Follow/FollowButton';
import GetFollowers from './Components/Follow/FollowersList';
import GetFollowings from './Components/Follow/FollowingList';
import RemoveFollowing from './Components/Follow/RemoveFollow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='GetTweets' element={<GetTweets/> }/>
          <Route path='AddTweet' element={<AddTweet />}/>
          <Route path='Edittweet' element={<EditTweet />}/>
          <Route path='login' element={<Login />}/>
          <Route path='UserDashboard' element={<UserDashboard />}/>
          <Route path='AdminDashboard' element={<AdminDashboard />}/>
          <Route path='Register' element={<Register />}/>
          <Route path='editprofile' element={<EditProfile />}/>
          <Route path='getusers' element={<GetUsers />}/>
          <Route path='editcomment' element={<EditComment />}/>
          <Route path='addcomment' element={<AddComment/>} />
          <Route path='addfollow' element={<AddFollowing/>}/>
          <Route path='getfollowers' element={<GetFollowers/>}/>
          <Route path='getfollowings' element={<GetFollowings/>}/>
          <Route path='removefollowing' element={<RemoveFollowing/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
