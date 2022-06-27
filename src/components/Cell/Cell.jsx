import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { CurrShipContext } from '../CurrShipContext/CurrShipContext';
import CellsDataContext from '../Board/CellsDataContext';

import { ACTIONS } from '../Board/Board';

const CELL_SIZE = 30;

const StyledCell = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border: solid black;
  background-color: ${(props) => props.bg};
`;

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

function getStyles(cellState) {
  switch (cellState) {
    case STATES.EMPTY: {
      return {
        backgroundColor: '#dedede',
      };
    }
    case STATES.HOVER: {
      return {
        backgroundColor: 'green',
      };
    }
    case STATES.FULL_HIT: {
      return {
        backgroundColor: 'salmon',
      };
    }
    case STATES.DISABLE: {
      return {
        backgroundColor: 'grey',
      };
    }
    case STATES.HAS_SHIP: {
      return {
        backgroundColor: 'blue',
      };
    }
    case STATES.POS_SHIP: {
      return {
        backgroundColor: '#88f',
      };
    }
    case STATES.MISS_HIT: {
      return {
        backgroundColor: 'black',
      };
    }
    case STATES.HIT: {
      return {
        backgroundColor: 'red',
      };
    }
  }
}

function Cell({ coord, boardState, dispatch, isEditModeOn, currShipIndex }) {
  const [currState, setCurrState] = useState(STATES.EMPTY);
  const { row, col } = coord;

  useEffect(() => {
    setCurrState(boardState[row][col].currState);
  }, [boardState]);

  function handleClick() {
    dispatch({ type: ACTIONS.CLICK, payload: { row, col, isEditModeOn, currShipIndex } });
  }

  function handleMouseEnter() {
    dispatch({ type: ACTIONS.MOUSE_ENTER, payload: { row, col, isEditModeOn, currShipIndex } });
  }

  function handleMouseLeave() {
    dispatch({ type: ACTIONS.MOUSE_LEAVE, payload: { row, col, isEditModeOn, currShipIndex } });
  }

  return (
    <StyledCell
      bg={getStyles(currState).backgroundColor}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export default Cell;
