import { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Toast, toast } from './Toast';

export const Balance = ({ amount }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signout = () => {
    setLoading(true);
    localStorage.removeItem('moneysend');
    toast.success('Log Out successful! Redirecting to dashboard...');
    setTimeout(() => {
      navigate('/signin');
    }, 1000);
  };
  return (
    <>
      <div className='flex justify-between'>
        <div className='font-bold text-lg font-my-font'>
          Your balance ₹ {Math.floor(amount)}
        </div>
        <Button
          label={'Log Out'}
          click={signout}
          isLoading={isLoading}
        ></Button>
        <Toast></Toast>
      </div>
    </>
  );
};
