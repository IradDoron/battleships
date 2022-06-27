import shipsBluePrint from '../../data/shipsBluePrint';
import LegendCell from './LegendCell/LegendCell';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import LegendShip from './LegendShip/LegendShip';

const LagendContainer = styled.section`
  background-color: #999;
`;

function Legend() {
  return (
    <LagendContainer>
      {shipsBluePrint?.map((shipBluePrint, index) => {
        return <LegendShip key={index} shipBluePrint={shipBluePrint} index={index} />;
      })}
    </LagendContainer>
  );
}

export default Legend;

// const shipsBluePrint = [
//     { size: 4 },
//     { size: 3 },
//     { size: 3 },
//     { size: 2 },
//     { size: 2 },
//     { size: 2 },
//     { size: 1 },
//     { size: 1 },
//     { size: 1 },
//     { size: 1 },
//   ];
