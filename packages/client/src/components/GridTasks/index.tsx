import React from 'react';
import styled from 'styled-components';

const GridT: React.FC = ({ children }) => <GridTask>{children}</GridTask>;

const GridTask = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  @media (max-width: 955px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default GridT;
