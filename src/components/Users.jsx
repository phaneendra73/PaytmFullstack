import { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [input, setinput] = useState('');
  const debouncedInput = useDebounce(input, 730);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://paytmfullstack.onrender.com/api/v1/user/bulk?filter=${input}`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('moneysend'),
      },
      data: '',
    };

    axios
      .request(config)
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [debouncedInput]);

  return (
    <>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input
          type='text'
          placeholder='Search users...'
          onChange={(e) => {
            setinput(e.target.value);
          }}
          className='rounded-xl bg-slate-900 border-2 border-blue-50 focus:border-lime-300 focus:ring-2 focus:ring-lime-300 w-[80%] p-2 transition duration-300 ease-in-out'
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  const redirectto = () => {
    navigate(
      `/Transfer?username=${user.firstName}+ ${user.lastName}&userid=${user._id}`
    );
  };
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

      <div className='flex flex-col justify-center h-ful '>
        <Button label={'Send Money'} click={redirectto} />
      </div>
    </div>
  );
}
