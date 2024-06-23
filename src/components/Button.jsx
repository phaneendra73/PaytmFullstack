import React from 'react';

const Button = ({ label, click, loading }) => {
  return (
    <button
      disabled={loading}
      onClick={click}
      className='bg-slate-900 mt-5 border-2 border-lime-300 px-20 py-2 rounded-xl transition duration-300 ease-in-out hover:bg-lime-300  hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-300 font-my-font'
    >
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default Button;
