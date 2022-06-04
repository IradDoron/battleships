import Cell from '../Cell/Cell';
import Legend from '../Legend/Legend';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const BOARD_SIZE = 10;

function initBoard() {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const currRow = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      currRow.push(<Cell />);
    }
    board.push(currRow);
  }
  return board;
}

const Grid = styled.div.attrs((props) => ({
  type: 'text',
  maring: props.isEnable ? 50 : 0,
}))`
  display: inline-grid;
  grid-template-columns: repeat(10, auto);
`;

const ModalContainer = styled.div`
  position: relative;
  border: solid red 2px;
`;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  display: ${(props) => (props.isEnable ? 'none' : 'block')};
`;

function Board() {
  const [isEnable, setIsEnable] = useState(true);
  const [board, setBoard] = useState(initBoard(isEnable));

  function handleClick() {
    setIsEnable(!isEnable);
    setBoard(initBoard(isEnable));
    console.log(isEnable);
  }
  return (
    <>
      <button onClick={handleClick}>'On/Off'</button>
      <Legend />
      <ModalContainer>
        <Modal isEnable={isEnable} />
        <Grid isEnable={isEnable}>{board}</Grid>
      </ModalContainer>
    </>
  );
}

export default Board;

// const Header = styled.h1`
//   font-family: sans-serif;
//   text-align: center;
//   color: ${(props) => (props.main ? ‘brown’ : ‘beige’)};
// `;

// const Wrapper = styled.div`
//   background-color: burlywood;
//   padding: 10px;
// `;

// function App() {
//   return (
//     <Wrapper>
//       <Header main={true}>Hello React!</Header>
//     </Wrapper>
//   );
// }
