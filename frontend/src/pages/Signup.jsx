import { Heading } from '../components/Heading';
import InputBox from '../components/InputBox';
import SubHeading from '../components/SubHeading';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import { useState } from 'react';
import axios from 'axios';
function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        <Button
          label='Submit'
          onClick={async () => {
            const response = await axios.post(
              'http://localhost:3000/api/v1/user/signup',
              {
                username,
                password,
                firstname,
                lastname,
              }
            );
            localStorage.setItem('moneysend', response.data.token);
          }}
        />
        <ButtonWarning
          text={'Already have an account ?'}
          route={'/signin'}
          routename={'Sign In'}
        ></ButtonWarning>
      </div>
    </div>
  );
}
export { Signup };
