import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginHandle } from "../store/auth";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Logo from "../images/logo_2.svg"

const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    dispatch(loginHandle(user));
    navigate('/', {
      replace: true,
    });
  };

  return (
    <div className="flex justify-center items-center flex-col gap-y-5 antialiased">
      <Header title="Sign In" logo={Logo} />
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-5 mb-8">
          <div className="flex flex-col justify-between">
            <label
              htmlFor="email"
              className=" mb-2 text-md font-bold text-[#ffffff]"
            >
              E-mail
            </label>
            <input
              type="email"
              placeholder="Example@email.com"
              value={email}
              name="email"
              className=" w-96 text-md placeholder:text-[#ffffff] placeholder:opacity-50 bg-[#240E38] pb-2 border-b border-white outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between">
            <label
              htmlFor="password"
              className=" mb-2 text-md font-bold text-[#ffffff]"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="*************"
              value={password}
              name="password"
              className=" w-96 text-md placeholder:text-[#ffffff] placeholder:opacity-50 bg-[#240E38] pb-2 border-b border-white outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex text-md">
            <p className="text-[#A5A5A5]">Don`t have an account ?</p>
            <Link
              to="/signup"
              className="ml-2 underline hover:opacity-50 transition-opacity"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-6">
          <button
            type="submit"
            className="flex justify-center items-center w-40 h-14 bg-white text-lg text-[#240E38] font-bold rounded-[50px] hover:opacity-50 transition-opacity hover:cursor-pointer"
            disabled={!email || !password}
          >
            Sign In
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default SignIn;
