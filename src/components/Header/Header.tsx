import Signout from '../FirebaseAuth/SignOut';
import Style from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={Style.header}>
      <Signout />
    </header>
  );
}

export default Header;