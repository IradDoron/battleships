import { useState } from 'react';
import styled from 'styled-components';

const CELL_SIZE = 10;

const StyledLegendCell = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  background-color: ${(props) => (props.isHit ? 'red' : 'blue')};
  margin: 5px;
`;

function LegendCell() {
  const [isHit, setIsHit] = useState(false);

  return <StyledLegendCell onClick={() => setIsHit(!isHit)} isHit={isHit} />;
}

export default LegendCell;
