import React from 'react';

const InputBox = ({ label, placeholder, onchange }) => {
  return (
    <div className='flex flex-col mt-3 text-left'>
      <label htmlFor={label} className=' mb-1 font-medium font-my-font'>
        {label}
      </label>
      <input
        id={label}
        onChange={onchange}
        className='rounded-xl bg-slate-900 border-2 border-blue-50 focus:border-lime-300 focus:ring-2 focus:ring-lime-300 w-full p-2 transition duration-300 ease-in-out font-my-font'
        placeholder={placeholder}
        autoComplete='off'
      />
    </div>
  );
};

export default InputBox;
