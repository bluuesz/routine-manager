import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

export const ContainerFormTask = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  div {
    h2 {
      margin-top: 12px;
      text-align: center;
      span {
        color: #ff5260;
      }
    }
    h4 {
      margin-top: 8px;
      text-align: center;
    }
  }
  @media (max-width: 955px) {
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    div {
      h2 {
        margin-top: 25px;
      }
    }
  }
  @media (max-width: 629px) {
    margin-top: 20px;
    div {
      h2 {
        font-size: 16px;
      }
      h4 {
        font-size: 14px;
      }
    }
  }
`;

export const FormTask = styled.form`
  max-width: 570px;
  width: 100%;
  div {
    input {
      margin-top: 0px;
      width: 100%;
    }
  }
  input {
    border: 0;
    border-radius: 4px;
    padding: 0 18px;
    color: #222;
    height: 42px;
    width: 240px;
    margin-top: 15px;
    border: 1px solid #ebebeb;
    &:focus {
      border-color: #ff5260;
    }
    @media (max-width: 629px) {
      width: 100%;
      height: 40px;
    }
    &::placeholder {
      color: #555;
    }
    & + input {
      margin-left: 15px;
      @media (max-width: 629px) {
        margin-left: 0px;
      }
    }
  }
  input[type='date'] {
    width: 200px;
    text-align: center;
    color: #555;
    @media (max-width: 629px) {
      width: 100%;
    }
  }
  input[type='date']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }
  button {
    border-radius: 4px;
    margin-left: 15px;
    height: 42px;
    width: 100px;
    border: 0;
    background: #ff5260;
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    @media (max-width: 629px) {
      margin-top: 10px;
      margin-left: 0;
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #8d8d8d;
  align-items: center;
  background: #212429;
  div {
    h3 {
      display: flex;
      align-items: center;
      p {
        margin-top: 2px;
        font-size: 14px;
        margin-left: 5px;
        text-decoration: underline;
        text-decoration-color: #ff5260;
      }
    }
    h3,
    h5 {
      margin-left: 15px;
    }
  }
  svg {
    color: #ff5260;
    margin-left: auto;
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
      transition: all 0.2s;
    }
  }
`;

export const FinishTask = styled.div`
  display: flex;
  background: transparent;
  border: 1px solid #52ffac;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background: #1aba6d;
    border: 1px solid #1aba6d;
    svg {
      color: #fff;
      transform: translateY(0px);
    }
  }
  svg {
    margin: 0;
    color: #52ffac;
    align-items: center;
    justify-content: center;
  }
`;
