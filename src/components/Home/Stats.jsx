import styled from 'styled-components';
import { Row, Col } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { GiReceiveMoney, GiTwoCoins } from 'react-icons/gi';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import numeral from 'numeral';

const Section = styled.div`
  background-color: #92BA92;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: arial black;
`;
const Title = styled.div`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const StatElement = styled.div`
  border-radius: 10px;
  background-color: #78938a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 4px 0px 0px #7c625a;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.85);
  padding: 10px;
  margin: 10px 5px;
  min-width: 170px;
  max-width: 190px;
  @media screen and (max-width: 768px) {
    min-width: 0px;
    max-width: 190px;
    width: 100%;
  }
`;
const StatIcon = styled.div`
  font-size: 70px;
  color: #05014a;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StatName = styled.div`
  font-size: 22px;
  color: #4e2e4b;
  font-weight: bold;
  text-align: center;
`;
const StatValue = styled.div`
  width: 100%;
  border-radius: 2px;
  background-color: #D7F9F8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  color: black;
  font-weight: bold;
`;
const Stats = ({ data }) => {
  return (
    <Section>
      <Container>
        <Title className="gradient-text">Cove Stats</Title>
        <Row justify="space-around" style={{ width: '100%' }} gutter={4}>
          <Col
            xs={12}
            md={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <FiUsers />
              </StatIcon>
              <StatName>Users</StatName>
              <StatValue>
                {numeral(data.splashTokenPlayersCount).format('0,0')}
              </StatValue>
            </StatElement>
          </Col>
          <Col
            xs={12}
            md={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <GiReceiveMoney />
              </StatIcon>
              <StatName>Returns</StatName>
              <StatValue>1 %</StatValue>
            </StatElement>
          </Col>
          <Col
            xs={12}
            md={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <GiTwoCoins />
              </StatIcon>
              <StatName>Max Supply</StatName>
              <StatValue>
                {numeral(data.splashTokenTotalSupply).format('0,0')}
              </StatValue>
            </StatElement>
          </Col>
          <Col
            xs={12}
            md={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <RiArrowLeftRightFill />
              </StatIcon>
              <StatName>Total TX's</StatName>
              <StatValue>
                {numeral(data.splashTransactionsCount).format('0,0')}
              </StatValue>
            </StatElement>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Stats;
