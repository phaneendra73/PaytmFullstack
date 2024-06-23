import Button from './Button';
import InputBox from './InputBox';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userid = searchParams.get('userid');
  const username = searchParams.get('username');
  const [amount, setamount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const transfer = () => {
    setLoading(true);
    let data = JSON.stringify({
      to: userid,
      amount: amount,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://paytmfullstack.onrender.com/api/v1/bank/transfer',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('moneysend'),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate('/Dashboard');
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.msg;
          console.log(error.response);

          if (status === 409) {
            toast.error('User already exists with the same username');
          } else if (status == 400) {
            toast.error(message);
          } else if (status == 401) {
            toast.error(message);
            setTimeout(() => {
              navigate('/signin');
            }, 2000);
          } else {
            toast.error(message || 'An error occurred. Please try again.');
          }
        } else if (error.request) {
          toast.error('No response from the server. Please try again later.');
        } else {
          toast.error('Error in setting up the request. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
                <span className='text-2xl text-White font-my-font'>
                  {username[0]}
                </span>
              </div>
              <h3 className='text-2xl font-semibold text-lime-300 font-my-font'>
                {username}
              </h3>
            </div>
            <div className='flex flex-col space-y-4 mt-4'>
              <InputBox
                label={'Amount (₹)'}
                placeholder={'Enter amount'}
                onchange={(e) => {
                  setamount(e.target.value);
                }}
              />
              <div className='flex justify-center'>
                <Button
                  label={'Transfer'}
                  click={transfer}
                  loading={isLoading}
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
          </div>
        </div>
      </div>
    </div>
  );
};
