import styled from 'styled-components';
import LegendCell from '../LegendCell/LegendCell';
import { useContext } from 'react';
import { CurrShipContext } from '../../CurrShipContext/CurrShipContext';

const ShipContainer = styled.div`
  display: flex;
  background: #d99;
  margin-bottom: 10px;
  padding: 2px;
  cursor: pointer;
`;

function setLegendShip(shipBluePrint) {
  const ship = [];
  for (let i = 0; i < shipBluePrint.size; i++) {
    ship.push(<LegendCell key={i} />);
  }

  return ship;
}

function LegendShip({ shipBluePrint, index }) {
  const ship = setLegendShip(shipBluePrint);
  const currShipContext = useContext(CurrShipContext);
  const { currShipIndex, setCurrShipIndex, isEditModeOn } = currShipContext;

  function handleClickShip() {
    console.log(`click on ship: ${index} with size: ${shipBluePrint.size}`);
    console.log(currShipContext);
    if (isEditModeOn) {
      setCurrShipIndex(index);
    }
  }

  return (
    <>
      <ShipContainer onClick={handleClickShip}>
        {ship.map((cell, index) => {
          return cell;
        })}
      </ShipContainer>
    </>
  );
}

export default LegendShip;
