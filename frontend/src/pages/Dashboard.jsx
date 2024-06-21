import AppBar from '../components/AppBar';
import { Balance } from '../components/Balance';
import { SendMoney } from '../components/SendMoney';
import { Users } from '../components/Users';
function Dashboard() {
  return (
    <div>
      <AppBar></AppBar>
      <Balance amount={234567}></Balance>
      <Users></Users>
      <SendMoney></SendMoney>
    </div>
  );
}
export { Dashboard };
