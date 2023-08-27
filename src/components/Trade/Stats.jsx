import styled, { keyframes } from 'styled-components';
import { Row, Col, Spin, Image } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { FaDollarSign } from 'react-icons/fa';
import { FaBalanceScale } from 'react-icons/fa';
import numeral from 'numeral';


const Section = styled.div`
  display: flex;
  background-color: #D7F9F8;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  width: 104.7%;
`;
const Container = styled.div`
  max-width: 1200px;
  color: black;
  width: 100%;
  padding: 0px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  text-transform: uppercase;
  font-size: 102px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: arial black;
  @media screen and (max-width: 850px) {
    font-size: 12vw;
  }
`;
const StatElement = styled.div`
  border-radius: 2px;
  font-family: arial black;
  background-color: #78938a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 4px 0px 0px #7c625a;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.85);
  padding: 10px;
  min-width: 250px;
  max-width: 300px;
  @media screen and (max-width: 850px) {
    min-width: 0px;
    max-width: 300px;
    width: 28vw;
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
  @media screen and (max-width: 850px) {
    font-size: 10vw;
    height: 10vw;
    width: 10vw;
  }
`;
const StatName = styled.div`
  font-size: 28px;
  color: #4e2e4b;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 4vw;
    text-align: center;
  }
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
  color: #4e2e4b;
  font-weight: bold;
  text-align: center;
  @media screen and (max-width: 576px) {
    font-size: 3vw;
    text-align: center;
  }
`;
const Stats = ({ statsData, loading }) => {
  const {
    usdteBalance,
    splashBalance,
    splashPrice,
    usdtinusd,
    avaxinusd,
    avaxBalance,
  } = statsData;
  return (
    <Section>
      <Container>
        <Title className="gradient-text2">TRADE</Title>
        <Row justify="space-around" style={{ width: '105%' }} gutter={4}>
          <Col
            span={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <FaDollarSign />
              </StatIcon>
              <StatName>COVE Price</StatName>
              <StatValue>
                <Spin
                  spinning={loading}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{numeral(splashPrice).format('$0,0.000')}</div>
                  {/* <div>
                    {numeral(usdteBalance / splashBalance).format('0,0.00000')}{' '}
                    USDT.e/SPLASH
                  </div> */}
                </Spin>
              </StatValue>
            </StatElement>
          </Col>
          <Col
            span={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <FaBalanceScale />
               </StatIcon> 
              <StatName>AVAX Balance</StatName>
              <StatValue>
                <Spin
                  spinning={loading}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* <div>{numeral(usdteBalance).format('0,0.00')}</div> */}
                  <div>{numeral(avaxBalance).format('0,0.00')}</div>
                  {/* <div>
                    {numeral(usdteBalance * usdtinusd).format('$0,0.00')}
                  </div> */}
                  <div>
                    {numeral(avaxBalance * avaxinusd).format('$0,0.00')}
                  </div>
                </Spin>
              </StatValue>
            </StatElement>
          </Col>
          <Col
            span={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
            <StatIcon>
                <FaBalanceScale />
            </StatIcon> 
              <StatName>COVE Balance</StatName>
              <StatValue>
                <Spin
                  spinning={loading}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  {numeral(splashBalance).format('0,0.00')}
                </Spin>
              </StatValue>
            </StatElement>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Stats;
