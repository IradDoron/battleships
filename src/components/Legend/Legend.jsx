import shipsBluePrint from '../../data/shipsBluePrint';
import LegendCell from './LegendCell/LegendCell';
import styled from 'styled-components';
import { useState } from 'react';

const LagendContainer = styled.section`
  background-color: #999;
`;

function setLegendShips(shipsBluePrint, cellElement) {
  const allShips = [];
  shipsBluePrint.forEach((shipBluePrint) => {
    const ship = [];
    for (let i = 0; i < shipBluePrint.size; i++) {
      ship.push(cellElement);
    }
    allShips.push(ship);
  });
  return allShips;
}

function Legend() {
  const [ships, setShips] = useState(setLegendShips(shipsBluePrint, <LegendCell />));
  console.log(ships);
  return <LagendContainer>{ships}</LagendContainer>;
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
