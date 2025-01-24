import styled from 'styled-components';

export const WillPayContainer = styled.div`
  border: 1px solid #000;
  padding: 10px;

  ul {
    display: flex;
    padding: 0;
    gap: 10px;

    li {
      border: 1px solid #000;
      padding: 10px;
      list-style: none;
    }

    img {
      width: 100px;
      height: 75px;
      object-fit: contain;
    }
  }
`;
