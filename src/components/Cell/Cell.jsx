import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CELL_SIZE = 60;

const StyledCell = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  background-color: #bebebe;
  border: solid black;
`;

const STATES = {
  EMPTY: 'empty',
  HOVER: 'hover',
  HIT: 'hit',
  FULL_HIT: 'fullHit',
  MISS_HIT: 'missHit',
  HAS_SHIP: 'hasShip',
  DISABLE: 'disable',
};

function getStyles(cellState) {
  switch (cellState) {
    case STATES.EMPTY: {
      return {
        backgroundColor: 'white',
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

function Cell() {
  const [currState, setCurrState] = useState(STATES.EMPTY);
  const [currStyles, setCurrStyles] = useState({});

  useEffect(() => {
    setCurrStyles(getStyles(currState));
  }, [currState]);

  function handleMouseEnter() {
    if (currState === STATES.EMPTY) {
      setCurrState(STATES.HOVER);
    }
  }

  function handleMouseLeave() {
    if (currState === STATES.HOVER) {
      setCurrState(STATES.EMPTY);
    }
  }

  return (
    <StyledCell
      onClick={() => setCurrState(STATES.HIT)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={currStyles}
    ></StyledCell>
  );
}

export default Cell;
