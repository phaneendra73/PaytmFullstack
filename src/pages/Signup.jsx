import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Heading } from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';

function Signup() {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://paytmfullstack.onrender.com/api/v1/user/signup',
        {
          username,
          password,
          firstname,
          lastname,
        }
      );
      console.log(response);
      if (response.data.token) {
        localStorage.setItem('moneysend', response.data.token);
        toast.success('Signup successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.msg;
        console.log(error.response);

        if (status === 409) {
          toast.error('User already exists with the same username');
        } else if (status === 400) {
          toast.error(message);
        } else {
          toast.error(message || 'An error occurred. Please try again.');
        }
      } else if (error.request) {
        toast.error('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('Error in setting up the request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='rounded-lg bg-slate-900  text-center p-2 h-max px-4'>
        <Heading label={'Sign up'} />
        <SubHeading subhead={'Enter your credentials to create an account'} />
        <InputBox
          label='First Name'
          placeholder='Ramesh'
          onchange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <InputBox
          label='Last Name'
          placeholder='Suresh'
          onchange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <InputBox
          label='Email'
          placeholder='Ramesh123@gmail.com'
          onchange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputBox
          label='Password'
          placeholder='Ramesh@123'
          onchange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button label='Submit' click={handleSignup} loading={isLoading} />
        <ButtonWarning
          text={'Already have an account ?'}
          route={'/signin'}
          routename={'Sign In'}
        />
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition:Bounce
      />
    </div>
  );
}
export { Signup };
