import { useState } from 'react';
import Button from './Button';

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([
    {
      firstName: 'Harkirat',
      lastName: 'Singh',
      _id: 1,
    },
  ]);

  return (
    <>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input
          type='text'
          placeholder='Search users...'
          className='rounded-xl bg-slate-900 border-2 border-blue-50 focus:border-lime-300 focus:ring-2 focus:ring-lime-300 w-[80%] p-2 transition duration-300 ease-in-out'
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <div className='rounded-full h-12 w-12 bg-slate-900 flex justify-center mt-1 mr-2'>
          <div className='flex flex-col justify-center h-full text-xl'>
            {user.firstName[0]}
          </div>
        </div>
        <div className='flex flex-col justify-center h-ful'>
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center h-ful'>
        <Button label={'Send Money'} />
      </div>
    </div>
  );
}
