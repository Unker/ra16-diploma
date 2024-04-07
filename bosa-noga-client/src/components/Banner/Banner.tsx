import { Image } from 'react-bootstrap';
import s from './Banner.module.css';

const Banner = (): JSX.Element => (
  <div className={s.banner}>
    <Image src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!"/>
    <h2 className={s.bannerHeader}>К весне готовы!</h2>
  </div>
);

export default Banner;
