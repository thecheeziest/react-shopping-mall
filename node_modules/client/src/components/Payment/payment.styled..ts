import styled from 'styled-components';

export const ModalContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: ${({ $show }) => ($show ? 'flex' : 'none')};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    background: #fff;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    height: 600px;
    transform: translate(-50%, -50%);
  }
`;
