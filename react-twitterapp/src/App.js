import './App.css';
import Login from './Components/Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTweet from './Components/Tweet/AddTweet';
import Register from './Components/Auth/Register';
import Home from './Components/Home/Home';
import Profile from './Components/Home/UserProfile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Layout from './Components/Layout/Layout';
import GetUsers from './Components/Admin/GetUsers';
import Posts from './Components/Home/Posts';
import Followers from './Components/Home/Followers';
import Following from './Components/Home/Following';
import EditProfile from './Components/Home/EditProfile';
import Notifications from './Components/Home/Notifications';
import GetTweets from './Components/Home/GetTweets'
import GetTweetsAdmin from './Components/Admin/GetTweetsAdmin';
import AddComment from './Components/Home/AddComment';
import Search from './Components/Home/Search';
import AddFollowing from './Components/Follow/FollowButton';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}/>
          <Route path='Login' element={<Login/>}/>
          <Route path='Register' element={<Register/>}/>
          {/* Admin Dashboard */}
          <Route path='AdminDashboard' element={<AdminDashboard/>}>
            <Route path='GetUsers' element={<GetUsers/>}/>
            <Route path='AddTweet' element={<AddTweet/>}/>
            <Route path='GetTweetsAdmin' element={<GetTweetsAdmin/>}/>
          </Route>
          {/* User Dashboard */}
          <Route path="Home" element={<Home />}>
            <Route index element={<GetTweets />} />
            <Route path="Notifications" element={<Notifications />} />
            <Route path="AddComment" element={<AddComment />} />
            <Route path="Search" element={<Search />} />
            <Route path='AddTweet' element={<AddTweet/>}/>
            <Route path="Profile" element={<Profile />}>
              <Route path="Posts" element={<Posts />} />
              <Route path="Followers" element={<Followers />} />
              <Route path="Following" element={<Following />} />
              <Route path="EditProfile" element={<EditProfile />} />
            </Route>
          </Route>
          <Route path='FollowButton' element={<AddFollowing/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
