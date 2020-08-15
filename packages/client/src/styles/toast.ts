import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const ToastContainerCustom = styled(ToastContainer)`
  .Toastify__toast--error {
    background: #ff5260;
    color: #fff;
    font-weight: bold;
  }
  .Toastify__toast--success {
    background: #1aba6d;
    color: #fff;
    font-weight: bold;
  }
`;
