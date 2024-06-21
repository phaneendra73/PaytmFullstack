import Button from './Button';
import InputBox from './InputBox';

export const SendMoney = () => {
  return (
    <div className='flex justify-center h-screen '>
      <div className='h-full flex flex-col justify-center'>
        <div className='border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-slate-900 shadow-lg rounded-lg'>
          <div className='flex flex-col space-y-1.5 p-6'>
            <h2 className='text-3xl font-bold text-center text-lime-300 font-my-font'>
              Send Money
            </h2>
          </div>
          <div className='p-6'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-black flex items-center justify-center'>
                <span className='text-2xl text-White font-my-font'>A</span>
              </div>
              <h3 className='text-2xl font-semibold text-lime-300 font-my-font'>
                Friend's Name
              </h3>
            </div>
            <div className='flex flex-col space-y-4 mt-4'>
              <InputBox label={'Amount (₹)'} placeholder={'Enter amount'} />
              <div className='flex justify-center'>
                <Button label={'Transfer'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
