import styled, { keyframes } from 'styled-components';
import { Row, Col, Spin, Image } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { FaDollarSign, FaHandshake, FaMoneyBillAlt } from 'react-icons/fa';
import { GiReceiveMoney, GiTwoCoins, GiChart } from 'react-icons/gi';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import numeral from 'numeral';
import { useEffect, useState } from 'react';



const Section = styled.div`
  background-color: #92BA92;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`;
const Container = styled.div`
  max-width: 1200px;
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
  @media screen and (max-width: 850px) {
    font-size: 12vw;
  }
`;
const StatElement = styled.div`
  border-radius: 10px;
  background-color: #78938A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 4px 0px 0px #7c625a;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.85);
  padding: 10px;
  min-width: 250px;
  max-width: 300px;
  margin: 5px 0px;
  @media screen and (max-width: 850px) {
    min-width: 0px;
    max-width: 300px;
    width: 28vw;
  }
  @media screen and (max-width: 576px) {
    min-width: 0px;
    max-width: 300px;
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
  /* @media screen and (max-width: 768px) {
    font-size: 3vw;
    text-align: center;
  } */
`;

const Stats = ({ data, loading }) => {
  const [mobile, setMobile] = useState(false);
  const {
    claimed,
    claimsAvailable,
    deposits,
    teamSize,
    maxPayout,
    directPlayers,
    rewarded,
    splashPrice,
  } = data;
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 576) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    window.addEventListener('resize', handleResize);
    if (window.innerWidth < 576) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Section>
      <Container>
        <Title className="gradient-text2">The Treasure Chest</Title>
        <Row justify="space-around" style={{ width: '100%' }} gutter={[10, 4]}>
          <Col
            xs={12}
            sm={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <GiTwoCoins />
              </StatIcon>
              <StatName>Available</StatName>
              <StatValue>
                <Spin
                  spinning={loading}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{numeral(claimsAvailable).format('0,0.000')} Cove</div>
                  <div>
                    {numeral(claimsAvailable * splashPrice).format('$0,0.000')}
                  </div>
                </Spin>
              </StatValue>
            </StatElement>
          </Col>
          <Col
            xs={12}
            sm={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <FaMoneyBillAlt />
          </StatIcon> 
              <StatName>Deposit</StatName>
              <StatValue>
                <Spin
                  spinning={loading}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{numeral(deposits).format('0,0.000')} Cove</div>
                  <div>
                    {numeral(deposits * splashPrice).format('$0,0.000')}
                  </div>
                </Spin>
              </StatValue>
            </StatElement>
          </Col>
          <Col
            xs={12}
            sm={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <GiReceiveMoney />
              </StatIcon>
              <StatName>Claimed</StatName>
              <StatValue>
                <Spin
                  spinning={loading}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{numeral(claimed).format('0,0.000')} Cove</div>
                  <div>{numeral(claimed * splashPrice).format('$0,0.000')}</div>
                </Spin>
              </StatValue>
            </StatElement>
          </Col>
          {!mobile && (
            <Col
              xs={12}
              sm={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <StatElement>
                <StatIcon>
                  <FaHandshake />
                </StatIcon>
                <StatName>Rewarded</StatName>
                <StatValue>
                  <Spin
                    spinning={loading}
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                      {numeral(rewarded?.directRewarded).format('0,0.000')} /{' '}
                      {numeral(rewarded?.indirectRewarded).format('0,0.000')}
                    </div>
                    <div>
                      {numeral(rewarded?.directRewarded * splashPrice).format(
                        '$0,0.000'
                      )}{' '}
                      /{' '}
                      {numeral(rewarded?.indirectRewarded * splashPrice).format(
                        '$0,0.000'
                      )}
                    </div>
                    <div>Direct / Indirect</div>
                  </Spin>
                </StatValue>
              </StatElement>
            </Col>
          )}
          <Col
            xs={12}
            sm={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <StatElement>
              <StatIcon>
                <GiChart />
              </StatIcon>
              <StatName>Max Payout</StatName>
              <StatValue>
                <Spin
                  spinning={loading}
                  style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{numeral(maxPayout).format('0,0.000')} Cove</div>
                  <div>
                    {numeral(maxPayout * splashPrice).format('$0,0.000')}
                  </div>
                </Spin>
              </StatValue>
            </StatElement>
          </Col>
          {!mobile && (
            <Col
              xs={12}
              sm={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <StatElement>
                <StatIcon>
                  <FiUsers />
                </StatIcon>
                <StatName>Team</StatName>
                <StatValue>
                  <Spin
                    spinning={loading}
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                      {numeral(directPlayers).format('0,0')} /{' '}
                      {numeral(teamSize).format('0,0')}
                    </div>
                    <div>Users (Direct / Total)</div>
                  </Spin>
                </StatValue>
              </StatElement>
            </Col>
          )}
        </Row>
        <Row justify="space-around" style={{ width: '100%' }} gutter={4}></Row>
      </Container>
    </Section>
  );
};

export default Stats;
