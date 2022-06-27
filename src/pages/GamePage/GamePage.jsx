import Board from '../../components/Board/Board';

import styled from 'styled-components';

const Flex_Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 30px;
`;

function GamePage() {
  return (
    <>
      <Flex_Container>
        <Board />
        <Board />
      </Flex_Container>
    </>
  );
}

export default GamePage;
