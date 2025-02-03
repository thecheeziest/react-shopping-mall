import styled from 'styled-components';

export const UlContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  li {
    border: 1px solid #000;
    padding: 10px;
    list-style: none;

    img {
      width: 100%;
      height: 150px;
      object-fit: contain;
    }
  }
`;
