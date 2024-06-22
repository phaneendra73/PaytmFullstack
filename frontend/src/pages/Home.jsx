import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-slate-900 space-y-8 font-my-font'>
      <h1 className='text-4xl mb-8'>Welcome to SpendWise</h1>
      <p className='text-lg mb-8 text-center'>
        Discover a seamless experience with our platform. Manage your payments
        and dashboard effortlessly.
        <br />
        Join us today by signing up or sign in to continue!
      </p>

      <div className='flex space-x-8'>
        <div className='relative inline-block'>
          <Link
            to='/signup'
            className='bg-lime-300 text-slate-900 px-4 py-2 rounded-md hover:bg-lime-400 transition duration-300'
          >
            Sign Up
          </Link>
          <span className='absolute bottom-5 right-0 w-3 h-3 bg-orange-400 rounded-full animate-ping'></span>
        </div>

        <div className='relative inline-block'>
          <Link
            to='/signin'
            className='bg-lime-300 text-slate-900 px-4 py-2 rounded-md hover:bg-lime-400 transition duration-300'
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className='flex space-x-4'></div>
    </div>
  );
}

export default Home;
