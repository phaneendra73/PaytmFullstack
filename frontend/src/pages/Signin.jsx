import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import { Heading } from '../components/Heading';
import SubHeading from '../components/SubHeading';
function Signin() {
  return (
    <>
      <div className='h-screen flex items-center justify-center'>
        <div className='rounded-lg bg-slate-900 w-80 text-center p-2 h-max px-4'>
          <Heading label={'Sign In'} />
          <SubHeading
            subhead={'Enter your credentials to access your account'}
          />
          <InputBox label='Email' placeholder='Ramesh123@gmail.com' />
          <InputBox label='Password' placeholder='Ramesh@123' />
          <Button label='Submit' />
          <ButtonWarning
            text={'Donot have an account ?'}
            route={'/signup'}
            routename={'Sign Up'}
          ></ButtonWarning>
        </div>
      </div>
    </>
  );
}
export { Signin };
