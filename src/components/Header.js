import React from 'react';

const Header = ({ title, logo }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-y-5 antialiased">
      <img src={`${logo}`} alt="Logo" className=" mb-2 w-25" />
      <h1 className=" text-5xl font-bold uppercase mb-1">{title}</h1>
    </div>
  );
};

export default Header;