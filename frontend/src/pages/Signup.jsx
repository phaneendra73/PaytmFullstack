import { Heading } from '../components/Heading';
import SubHeading from '../components/SubHeading';
function Signup() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='rounded-lg bg-slate-900 w-80 text-center p-2 h-max px-4'>
        <Heading label={'Sign up'} />
        <SubHeading subhead={'please sign up '} />
      </div>
    </div>
  );
}
export { Signup };
