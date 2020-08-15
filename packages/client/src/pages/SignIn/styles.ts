import styled, { keyframes } from 'styled-components';

const animatedFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1a1c21;
  animation: ${animatedFromLeft} 1s;
  img {
    height: 80px;
    margin-bottom: 40px;
  }
  a {
    margin-top: 43px;
    color: #d1d1d1;
    transition: color 0.2s;
    text-decoration: none;
    font-weight: 500;
    font-size: 24px;
    &:hover {
      color: #ffffff;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 375px;
  text-align: start;
  display: flex;
  flex-direction: column;
  button {
    margin-top: 30px;
    color: #ffffff;
    font-weight: medium;
    letter-spacing: 2px;
  }
  span {
    margin-top: 5px;
    color: #ff5260;
  }
  input {
    width: 100%;
    border: 0;
    background: #ebebeb;
    margin-top: 20px;
    color: #222;
    padding: 0 21px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    height: 57px;
    &:focus {
      border-color: #ff5260;
    }
    &::placeholder {
      color: #222;
    }
  }
`;
