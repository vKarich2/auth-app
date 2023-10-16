import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebase";

const SignOut = () => {
  return (
    <div>
      <p>Вы уверены, что хотите выйти из системы?</p>
      <button>Выйти</button>
      <Link to="/home">Отмена</Link>
    </div>
  );
};

export default SignOut;
