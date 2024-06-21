export const Balance = ({ amount }) => {
  return (
    <div className='flex'>
      <div className='font-bold text-lg font-my-font'>Your balance</div>
      <div className='font-semibold ml-4 text-lg font-my-font'>₹ {amount}</div>
    </div>
  );
};
