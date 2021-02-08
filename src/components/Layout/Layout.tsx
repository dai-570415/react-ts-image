import { ChildProps } from '../../setTypes';
import Style from './Layout.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ children }: ChildProps) => {
    return (
        <div className={Style.container}>
            <Header />
            <div className={Style.main}>
                { children }
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
