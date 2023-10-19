import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, auth, emailVerification } from '../firebase';
import { logout as logoutHandle } from '../store/auth';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import UpdateProfile from '../components/UpdateProfile';

import Logo from '../images/logo_1.svg';


const Home = () => {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async() => {
    await logout();
    dispatch(logoutHandle());
    navigate('/signin', {
      replace: true
    });
  };

  const handleVerification = async() => {
    await emailVerification();
  }

  if(user){
    return (
      <div className="flex flex-col items-center justify-center text-lg gap-y-5">
        <h1 className="flex justify-center items-center bg-indigo-700 w-32 h-10 font-bold rounded-full">
          Welcome !
        </h1>
        {user.photoURL && <img src={user.photoURL} alt="Avatar" className=' w-[200px] h-[200px] rounded-full bg-white' />}
        <h1>E-Mail: ({user.email})</h1>
        <UpdateProfile />
        <button
          onClick={handleLogout}
          className="flex justify-center items-center w-40 h-14 bg-red-500 text-white font-bold rounded-[50px] hover:opacity-50 transition-opacity hover:cursor-pointer"
        >
          Log Out
        </button>
        {!user.emailVerified && (
          <button
            onClick={handleVerification}
            className="flex justify-center items-center w-46 h-14 bg-white text-[#240E38] font-bold rounded-[50px] hover:opacity-50 transition-opacity hover:cursor-pointer"
          >Verify Your E-Mail</button>
        )}
      </div>
    );
  }

	return (
    <div className="flex flex-col items-center gap-y-10">
      <Header title="Home" logo={Logo} />
      <div className='flex flex-col items-center gap-y-5 text-lg underline'>
        <Link to="/signup" className=' hover:opacity-50 transition-opacity'>Sign Up</Link>
        <Link to="/signin" className=' hover:opacity-50 transition-opacity'>Sign In</Link>
      </div>
    </div>
  );
};

export default Home;