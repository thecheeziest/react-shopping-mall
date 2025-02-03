import { Link } from 'react-router-dom';
import { GnbContainer } from './gnb.styled.ts';

const GNB = () => {
  return (
    <GnbContainer>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">상품 목록</Link>
        </li>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
      </ul>
    </GnbContainer>
  );
};

export default GNB;
