import AppBar from '../components/AppBar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [amount, setamount] = useState(0);
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://paytmfullstack.onrender.com/api/v1/bank/balance`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('moneysend'),
      },
      data: '',
    };

    axios
      .request(config)
      .then((response) => {
        setamount(response.data.userbalance.bankBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <AppBar></AppBar>
      <Balance amount={amount}></Balance>
      <hr className='border-t-2 border-gray-300 my-4' />
      <Users></Users>
    </div>
  );
}
export { Dashboard };
