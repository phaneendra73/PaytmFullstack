import React from 'react';
import { Link } from 'react-router-dom';

function ButtonWarning({ text, route, routename }) {
  return (
    <div className='flex justify-center items-center mt-3 space-x-2'>
      <p>{text}</p>
      <Link
        to={route}
        className=' underline transition duration-300 ease-in-out hover:text-lime-400'
      >
        {routename}
      </Link>
    </div>
  );
}

export default ButtonWarning;
