import logo from './logo.svg';
import './App.css';
import EditTweet from './Components/Tweet/EditTweet';
import Login from './Components/Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetTweets from './Components/Dashboard/GetTweets';
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
import Layout from './Components/User/Layout';
import Home from './Components/Dashboard/Home';
import Profile from './Components/Dashboard/UserProfile';
import AdminDashboard from './Components/Dashboard/AdminDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}/>
          <Route path='Login' element={<Login/>}/>
          <Route path='Register' element={<Register/>}/>
          <Route path='AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='Home' element={<Home/>}>
            <Route index element={<GetTweets/>}/>
            <Route path='Profile' element={<Profile/>}/>
          </Route>
          <Route path='AddTweet' element={<AddTweet/>}/>
          <Route path='GetTweets' element={<GetTweets/>}/>
          <Route path='EditTweet' element={<EditTweet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
