import styled from 'styled-components';

interface IFinishTask {
  isCompleted: boolean;
}

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  div {
    h1 {
      text-align: center;
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

export const FinishTask = styled.div<IFinishTask>`
  display: flex;
  background: ${(props) => (props.isCompleted ? '#1aba6d' : 'transparent')};
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
    color: ${(props) => (props.isCompleted ? '#fff' : '#52ffac')};
    align-items: center;
    justify-content: center;
  }
`;
