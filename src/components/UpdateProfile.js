import React, { useState } from 'react';
import { update, auth, resetPassword } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';

const UpdateProfile = () => {

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [displayName, setDisplayName] = useState(user.displayName || '');
	const [avatar, setAvatar] = useState(user.photoURL || '');
  const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		await update({
			displayName,
			photoURL: avatar
		});
		dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
	};

  const handleResetSubmit = async e => {
    e.preventDefault();
    const result = await resetPassword(password);
    if(result){
      setPassword('');
    }
  };

	return (
    <div className='flex flex-col justify-center items-center gap-y-10'>
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">User's Profile</h1>
        <div className="flex flex-col justify-between">
          <label className=" mb-2 text-md font-bold text-[#ffffff]">
            First name | Last name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={displayName}
            className=" w-96 text-md placeholder:text-[#ffffff] placeholder:opacity-50 bg-[#240E38] pb-2 border-b border-white outline-none"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-between">
          <label className=" mb-2 text-md font-bold text-[#ffffff]">Photo</label>
          <input
            type="text"
            placeholder="Link"
            value={avatar}
            className=" w-96 text-md placeholder:text-[#ffffff] placeholder:opacity-50 bg-[#240E38] pb-2 border-b border-white outline-none"
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-y-6">
          <button
            type="submit"
            className="flex justify-center items-center w-40 h-14 bg-white text-lg text-[#240E38] font-bold rounded-[50px] hover:opacity-50 transition-opacity hover:cursor-pointer"
          >
            Update
          </button>
        </div>
      </form>

      <form className="flex flex-col gap-y-5" onSubmit={handleResetSubmit}>
        <h1 className="text-2xl font-bold capitalize">Reset Password</h1>
        <div className="flex flex-col justify-between">
          <label className=" mb-2 text-md font-bold text-[#ffffff]">
            Password
          </label>
          <input
            type="password"
            placeholder="*************"
            value={password}
            className=" w-96 text-md placeholder:text-[#ffffff] placeholder:opacity-50 bg-[#240E38] pb-2 border-b border-white outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-y-6">
          <button
            type="submit"
            disabled={!password}
            className="flex justify-center items-center w-40 h-14 bg-white text-lg text-[#240E38] font-bold rounded-[50px] hover:opacity-50 transition-opacity hover:cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;