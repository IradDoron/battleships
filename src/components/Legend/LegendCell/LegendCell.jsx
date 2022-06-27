import { useState } from 'react';
import styled from 'styled-components';

const CELL_SIZE = 10;

const StyledLegendCell = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  background-color: ${(props) => (props.isHit ? 'red' : 'blue')};
  margin: 2px;
`;

function LegendCell() {
  const [isHit, setIsHit] = useState(false);

  function handleClickOnCell() {
    //setIsHit(!isHit);
  }

  return <StyledLegendCell isHit={isHit} onClick={handleClickOnCell} />;
}

export default LegendCell;
