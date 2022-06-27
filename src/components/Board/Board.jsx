import Cell from '../Cell/Cell';
import Legend from '../Legend/Legend';

import { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import { CurrShipContext } from '../CurrShipContext/CurrShipContext';
import CellsDataContext from './CellsDataContext';
import shipsBluePrint from '../../data/shipsBluePrint';

export const ACTIONS = {
  MOUSE_ENTER: 'mouse enter',
  MOUSE_LEAVE: 'mouse leave',
  CLICK: 'click',
};

const STATES = {
  EMPTY: 'empty',
  HOVER: 'hover',
  HIT: 'hit',
  FULL_HIT: 'fullHit',
  MISS_HIT: 'missHit',
  HAS_SHIP: 'hasShip',
  POS_SHIP: 'posShip',
  DISABLE: 'disable',
};

function canPositionShip(board, shipSize, currRow, currCol) {
  // check edges
  if (shipSize + currCol > board.length) {
    return false;
  }

  // check horizontal errors
  for (let col = currCol; col < shipSize + currCol; col++) {
    if (board[currRow][col].currState !== (STATES.EMPTY || STATES.POS_SHIP)) {
      return false;
    }
  }

  return true;
}

function reducer(state, action) {
  const { type, payload } = action;
  const { row, col, isEditModeOn, currShipIndex } = payload;
  const newState = [...state];
  const shipSize = shipsBluePrint[currShipIndex]?.size;

  switch (type) {
    case ACTIONS.CLICK: {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if (state[i][j].currState === STATES.POS_SHIP) {
            newState[i][j].currState = STATES.HAS_SHIP;
          }
        }
      }

      return state;
    }
    case ACTIONS.MOUSE_ENTER: {
      // if edit mode is on
      if (isEditModeOn && canPositionShip(state, shipSize, row, col)) {
        for (let i = 0; i < shipSize; i++) {
          newState[row][col + i].currState = STATES.POS_SHIP;
        }
        // if edit mode is off
      } else {
        if (state[row][col].currState === STATES.EMPTY) {
          newState[row][col].currState = STATES.HOVER;
        }
      }

      return newState;
    }
    case ACTIONS.MOUSE_LEAVE: {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if (
            state[i][j].currState === STATES.HOVER ||
            state[i][j].currState === STATES.POS_SHIP ||
            state[i][j].currState === STATES.DISABLE
          ) {
            newState[i][j].currState = STATES.EMPTY;
          }
        }
      }

      return newState;
    }
  }
}

const BOARD_SIZE = 10;

function initBoard() {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const currRow = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      currRow.push({ currState: 'empty' });
    }
    board.push(currRow);
  }
  return board;
}

const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(10, auto);
`;

const ModalContainer = styled.div`
  position: relative;
`;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  display: ${(props) => (props.isEnable ? 'none' : 'block')};
`;

const initialBoardState = initBoard();

function Board() {
  const [isEnable, setIsEnable] = useState(true);
  const [board, setBoard] = useState(initBoard(isEnable));
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [currShipIndex, setCurrShipIndex] = useState(null);
  const [boardState, dispatch] = useReducer(reducer, initialBoardState);

  function handleClick() {
    setIsEnable(!isEnable);
    setBoard(initBoard(isEnable));
  }

  function handleEnableEditModeClick() {
    setIsEditModeOn(!isEditModeOn);
  }
  return (
    <>
      <button onClick={handleClick}>'On/Off'</button>
      <button onClick={handleEnableEditModeClick}>Edit Mode : {isEditModeOn ? 'On' : 'Off'}</button>

      <CurrShipContext.Provider value={{ currShipIndex, setCurrShipIndex, isEditModeOn }}>
        <Legend />
        <ModalContainer>
          <Modal isEnable={isEnable} />
          <Grid isEnable={isEnable}>
            {boardState.map((row, rowIndex) => {
              return row.map((_, colIndex) => {
                return (
                  <Cell
                    coord={{ row: rowIndex, col: colIndex }}
                    dispatch={dispatch}
                    isEditModeOn={isEditModeOn}
                    boardState={boardState}
                    currShipIndex={currShipIndex}
                  />
                );
              });
            })}
          </Grid>
        </ModalContainer>
      </CurrShipContext.Provider>
    </>
  );
}

export default Board;
