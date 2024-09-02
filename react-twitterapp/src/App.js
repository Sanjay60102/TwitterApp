import './App.css';
import Login from './Components/Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetTweets from './Components/Home/GetTweets';
import AddTweet from './Components/Tweet/AddTweet';
import Register from './Components/Auth/Register';
import Home from './Components/Home/Home';
import Profile from './Components/Home/UserProfile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Layout from './Components/User/Layout';
import GetUsers from './Components/Admin/GetUsers';
import Posts from './Components/Home/Posts';
import Followers from './Components/Home/Followers';
import Following from './Components/Home/Following';
import EditProfile from './Components/Home/EditProfile';
import Notifications from './Components/Home/Notifications';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}/>
          <Route path='Login' element={<Login/>}/>
          <Route path='Register' element={<Register/>}/>
          <Route path='AdminDashboard' element={<AdminDashboard/>}>
            <Route path='GetUsers' element={<GetUsers/>}/>
            <Route path='GetTweets' element={<GetTweets/>}/>
            <Route path='AddTweet' element={<AddTweet/>}/>
          </Route>
          <Route path='Home' element={<Home/>}>
            <Route index element={<GetTweets/>}/>
            <Route path='Notifications' element={<Notifications/>}/>
            <Route path='Profile' element={<Profile/>}>
              <Route path='Posts' element={<Posts/>}/>
              <Route path='Followers' element={<Followers/>}/>
              <Route path='Following' element={<Following/>}/>
            </Route>
            <Route path='AddTweet' element={<AddTweet/>}/>
          </Route>
          <Route path='AddTweet' element={<AddTweet/>}/>
          <Route path='GetTweets' element={<GetTweets/>}/>
          <Route path='EditProfile' element={<EditProfile/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
