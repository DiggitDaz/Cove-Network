import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  Tabs,
  InputNumber,
  Button,
  Space,
  Popover,
  Switch,
  Typography,
  Input,
  Row,
  Col,
  Spin,
  Modal,
  Image,
} from 'antd';

import {
  FaCog,
  FaShoppingCart,
  FaStar,
  FaHandshake,
  FaRegMinusSquare,
  FaRegPlusSquare,
} from 'react-icons/fa';
import { GiReceiveMoney, GiTwoCoins, GiChart } from 'react-icons/gi';
import { HiRefresh } from 'react-icons/hi';
import { RiArrowLeftRightFill } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { AwesomeButton } from 'react-awesome-button';
import SlippagePopOver from '../SlippagePopOver.jsx';
import { CloseOutlined, CheckOutlined, BellOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import {
  approveSplashTheTap,
  updateWaveStarter,
  getDepositsAvailableAndPlayerTeam,
  hydrate,
  claim,
  deposit,
  getDepositsAvailableAndPlayerTeamFromAddress,
} from '../../utils/AvalancheHelper.jsx';
import axios from 'axios';
import Countdown from './Countdown.jsx';
import dayjs from 'dayjs';
//import AndroidBadge from '../../assets/google-play-badge.png'; //
//import AppleBadge from '../../assets/apple-badge.png'; //
//import DefiOrgLogo from '../../assets/defiorglogo.png'; //
import { QRCodeSVG } from 'qrcode.react';
const { Title } = Typography;
const { TabPane } = Tabs;
const Section = styled.div`
  background-color: #D7F9F8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyTitle = styled.div`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  @media screen and (max-width: 850px) {
    font-size: 9vw;
  }
`;
const TopInput = styled.div`
  display: flex;
  color: #dacc79;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: baseline;
`;
const BottomInput = styled.div`
  display: flex;
  color: #dacc79;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 10px;
`;
/*const SVGWrapper = styled.div`
  font-size: ${(props) => (props.splash ? '22px' : '18px')};
  height: ${(props) => (props.splash ? '22px' : '18px')};
  width: ${(props) => (props.splash ? '22px' : '18px')};
  margin: 0px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`; */
const ValueBox = styled.div`
  background-color: #dacc79;
  color: #4e2e4b;
  font-weight: bold;
  padding: 0px 5px;
  border-radius: 2px;
  text-align: right;
`;
const DataContainer = styled.div`
  width: 100%;
  overflow-wrap: anywhere;
`;
const Subtitle = styled.div`
  font-size: 18px;
  color: #dacc79;
  font-weight: bold;
  word-wrap: normal;
`;
const DataText = styled.div`
  color: black;
`;
let formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 3,
});
const StatElement = styled.div`
  border-radius: 2px;
  background-color: #4e2e4b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 4px 0px 0px #7c625a;
  box-shadow: 0px 4px 0px 0px #7c625a;
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
  color: #dacc79;
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
  color: #dacc79;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 4vw;
    text-align: center;
  }
`;
const StatValue = styled.div`
  width: 100%;
  border-radius: 2px;
  background-color: #dacc79;
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

const StyledAwesomeButton = styled(AwesomeButton)`
  width: 200px;
  background-color: #78938a;
  padding: 30px 30px 30px 30px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.85);
  border: 3px solid #92BA92;
`;



const Manage = ({
  data,
  loading,
  signer,
  waitForApprovalModal,
  waitForConfirmedTransactionModal,
  closeModal,
  updateApprovedSplash,
  errorNotification,
  successNotification,
  updateWaveStarterAndLastCheckin,
  refreshAllData,
}) => {
  const onDepositAmountChange = (value) => {
    setDepositAmount(value);
  };
  const [depositAmount, setDepositAmount] = useState(null);
  const [splashApproved, setSplashApproved] = useState(false);
  const [waveStarterInput, setWaveStarterInput] = useState('');
  const [mobile, setMobile] = useState(false);
  const [vw, setVw] = useState(window.visualViewport.width);

  const {
    teamSize,
    directPlayers,
    rewarded,
    splashPrice,
    splashBalance,
    splashAllowanceTheTap,
    waveStarter,
    lastCheckin,
    claimsAvailable,
    address,
    currentPayoutRate,
    lastClaimOrRoll,
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
  useEffect(() => {
    if (splashAllowanceTheTap >= splashBalance && splashAllowanceTheTap > 0) {
      setSplashApproved(true);
    }
  }, [splashAllowanceTheTap, splashBalance]);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const showInfoModal = () => {
    setIsInfoModalVisible(true);
  };

  const handleInfoOk = () => {
    setIsInfoModalVisible(false);
  };

  const handleInfoCancel = () => {
    setIsInfoModalVisible(false);
  };
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    useState(false);
  const showNotificationModal = () => {
    setIsNotificationModalVisible(true);
  };

  const handleNotificationOk = () => {
    setIsNotificationModalVisible(false);
  };

  const handleNotificationCancel = () => {
    setIsNotificationModalVisible(false);
  };
  return (
    <Section>
      <Container>
        <MyTitle className="gradient-text3">CHEST MANAGEMENT</MyTitle>
        {vw > 700 ? (
          <ins
            className="63289345377094c6f1d042a6"
            style={{
              display: 'inline-block',
              width: '728px',
              height: '90px',
              marginBottom: 10,
            }}></ins>
        ) : (
          <ins
            className="632c7234377094c6f1d4f675"
            style={{
              display: 'inline-block',
              width: '250px',
              height: '250px',
              marginBottom: 10,
            }}></ins>
        )}
        <div style={{ marginBottom: 10 }}>
          <Space direction="vertical" size={0} align="center">
            {currentPayoutRate < 100 ? (
              <Countdown
                date={lastClaimOrRoll * 1000 + 86400 * 1000}
                waitMessage="You are able to use the Chest in"
                endMessage="Feel free to Claim or Compound !"
              />
            ) : (
              <Countdown
                date={lastClaimOrRoll * 1000 + 86400 * 1000}
                waitMessage="You will be able to claim in"
                endMessage="You can compound or claim !"
              />
            )}
            <Countdown
              date={lastCheckin * 1000 + 86400 * 1000 * 2}
              waitMessage="Maximum Reward will be reached in"
              endMessage="Maximum reward reached. Interact to reset earnings"
            />
            
          </Space>
          <Modal
            centered
            bodyStyle={{
              paddingTop: 50,
              backgroundColor: '#4e2e4b',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#dacc79',
            }}
            visible={isInfoModalVisible}
            footer={null}
            onOk={handleInfoCancel}
            onCancel={handleInfoCancel}>
            <div
              style={{
                marginBottom: 20,
                fontSize: 18,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
              What is new in V3 ?
            </div>
            <p>
              To better sustain the project, we have decided to change few
              things about the Tap.
            </p>
            <p>
              We don't think that abusive taxes on sells is the way to go. This
              is why we decided to work on the rewards.
            </p>
            <p>
              We want to give good players more rewards than bad players. People
              can still get the 2% by claiming one day and compounding the other
              day. Here are the changes we are adding to the Tap :
            </p>
            <ul>
              <li>
                When you claim it decreases the reward rate by 0.25% (min 0.5%)
              </li>
              <li>
                When you roll, it increases the rate by 0.25% (max 2%) - When
                you deposit, it doesn't change anything to the current rate. The
                24/48 hour timer restart (see bellow)
              </li>
              <li>You can claim or roll only once every 24h</li>
              <li>
                You can only have max 48h of rewards. After 48h, your reward
                doesn’t add up. You need to claim or compound it. You won’t get
                any reward until you do one of those actions
              </li>
              <li>
                When you hit max wallet ({'>'}27 777.78 Splash), the rate will
                be fixed at 2%
              </li>
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" onClick={handleInfoOk}>
                OK
              </Button>
            </div>
          </Modal>
          <Modal
            centered
            bodyStyle={{
              paddingTop: 50,
              backgroundColor: '#4e2e4b',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#dacc79',
            }}
            visible={isNotificationModalVisible}
            footer={null}
            onOk={handleNotificationCancel}
            onCancel={handleNotificationCancel}>
            <div
              style={{
                marginBottom: 20,
                fontSize: 18,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Get push notification on your iOS and Android devices
            </div>
            <p>
              <i>
                You can now get notifications on your mobile device whenever you
                reach the maximum rewards.
              </i>
            </p>
            <p
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
              STEP 1
            </p>
            <p>Download the mobile app "DeFi Notifications"</p>
         {/*   <p>
             <Space direction="vertical" size={0} align="center">
                <Image src={DefiOrgLogo} width={100} preview={false} /> 
                <a
                  href="https://play.google.com/store/apps/details?id=com.orbs.openDefiNotificationsApp"
                  target="_blank">
                  <Image
                    src={AndroidBadge}
                    width={200}
                    preview={false}
                    style={{ cursor: 'pointer' }}
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/defi-notifications/id1588243632"
                  target="_blank">
                  <Image
                    src={AppleBadge}
                    width={200}
                    preview={false}
                    style={{ cursor: 'pointer' }}
                  />
                </a> 
              </Space>
            </p> */}
            <p
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
              STEP 2
            </p>
            <p>
              Open the mobile app and scan this QR code to connect your wallet
            </p>
            <p>
              {address ? (
                <Space direction="vertical" size={0} align="center">
                  <QRCodeSVG
                    value={`http://onelink.to/9cqqbe?opendefiqr=${address}project:splassive;`}
                    bgColor="transparent"
                    fgColor="#dacc79"
                  />
                  {address.slice(0, 6) +
                    '...' +
                    address.slice(address.length - 4, address.length)}
                </Space>
              ) : (
                'Connect your wallet'
              )}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" onClick={handleNotificationOk}>
                OK
              </Button>
            </div>
          </Modal>
        </div>
        <Space style={{ marginBottom: 15 }}>
          <Space direction="vertical" align="center" size={0}>
            <StyledAwesomeButton
              style={{ '--button-primary-color': '#86ad74' }}
              disabled={
                claimsAvailable <= 0 ||
                (dayjs(lastClaimOrRoll * 1000 + 86400 * 1000).diff(dayjs()) >
                  0 &&
                  currentPayoutRate < 200)
              }
              onPress={async () => {
                waitForApprovalModal();
                try {
                  const tx = await hydrate(signer);
                  waitForConfirmedTransactionModal();
                  await tx.wait();
                  refreshAllData();
                  closeModal();
                  successNotification('Fill up completed !');
                } catch (err) {
                  console.log(err);
                  closeModal();
                  errorNotification(
                    err.message + (' ' + err.data.message || '')
                  );
                }
              }}>
              <HiRefresh style={{ fontSize: 23 }} />
              Compound
            </StyledAwesomeButton>
            <span style={{ fontSize: 11, color: 'black' }}>
            </span>
          </Space>
          <Space direction="vertical" align="center" size={0}>
            <StyledAwesomeButton
              style={{ '--button-primary-color': '#4e2e4b' }}
              disabled={
                claimsAvailable <= 0 ||
                dayjs(lastClaimOrRoll * 1000 + 86400 * 1000).diff(dayjs()) > 0
              }
              onPress={async () => {
                waitForApprovalModal();
                try {
                  const tx = await claim(claimsAvailable, address, signer);
                  waitForConfirmedTransactionModal();
                  await tx.wait();
                  refreshAllData();
                  closeModal();
                  successNotification('Funds claimed !');
                } catch (err) {
                  console.log(err);
                  closeModal();
                  errorNotification(
                    err.message + (' ' + err.data.message || '')
                  );
                }
              }}>
              <GiReceiveMoney style={{ fontSize: 23 }} />
              Claim
            </StyledAwesomeButton>
            <span style={{ fontSize: 11, color: 'black' }}>
            </span>
          </Space>
        </Space>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="card-container" style={{backgroundColor: "#92BA92", color: "black" }}>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="DEPOSIT COVE" key="1">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      maxWidth: 600,
                      flex: 1,
                    }}>
                    <TopInput>
                      <Space>
                        <Spin spinning={loading} className="yellowSpin">
                          Current COVE Price :{' '}
                          {numeral(splashPrice).format('$0,0.000')}
                        </Spin>
                      </Space>
                      <Space
                        onClick={() => {
                          setDepositAmount(splashBalance);
                        }}
                        style={{ cursor: 'pointer' }}>
                        <span>Balance :</span>
                        <ValueBox>
                          <Spin spinning={loading}>
                            <span style={{ minWidth: 150 }}>
                              {numeral(splashBalance).format('0,0.000')} Cove
                            </span>
                          </Spin>
                        </ValueBox>
                      </Space>
                    </TopInput>
                    <InputNumber
                      style={{
                        width: '100%',
                      }}
                      max={splashBalance}
                      min={0}
                      value={depositAmount}
                      onChange={onDepositAmountChange}
                      placeholder="Enter amount"
                 /*     addonBefore={
                        <SVGWrapper splash>
                          <SplashLogo width={23} height={22} />
                        </SVGWrapper>
                      }
                      controls={false} */
                    /> 
                    <BottomInput>
                      <Space direction="vertical">
                        <span>Must deposit at least 1 COVE token</span>
                      </Space>
                      <div>
                        <Spin spinning={loading} className="yellowSpin">
                          <Space>
                            <Switch
                              disabled={!(splashBalance > 0) || splashApproved}
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                              checked={splashApproved}
                              onChange={async () => {
                                waitForApprovalModal();
                                try {
                                  const tx = await approveSplashTheTap(
                                    splashBalance,
                                    signer
                                  );
                                  waitForConfirmedTransactionModal();
                                  await tx.wait();
                                  updateApprovedSplash();
                                  setDepositAmount(null);
                                  closeModal();
                                  successNotification('Cove Approved !');
                                } catch (err) {
                                  closeModal();
                                  errorNotification(
                                    err.message + (' ' + err.data.message || '')
                                  );
                                }
                              }}
                            />
                            <span>Approve Cove</span>
                          </Space>
                        </Spin>
                      </div>
                    </BottomInput>
                    <AwesomeButton
                      onPress={async () => {
                        if (
                          waveStarter ===
                          '0x0000000000000000000000000000000000000000'
                        ) {
                          errorNotification(
                            'You need a Referrer. Please input a referral addrress below. Or you can support our marketing efforts by clicking the button!'
                          );
                          return;
                        }
                        if (depositAmount < 1) {
                          errorNotification(
                            '1 COVE is required for deposits'
                          );
                          return;
                        }
                        waitForApprovalModal();
                        try {
                          const tx = await deposit(
                            waveStarter,
                            depositAmount,
                            address,
                            signer
                          );
                          waitForConfirmedTransactionModal();
                          await tx.wait();
                          refreshAllData();
                          closeModal();
                          setDepositAmount(null);
                          successNotification('Funds deposited !');
                        } catch (err) {
                          closeModal();
                          console.log(err);
                          errorNotification(
                            err.message + (' ' + err.data.message || '')
                          );
                        }
                      }}
                      disabled={!(splashApproved && depositAmount > 0)}
                      style={{ width: '100%' }}>
                      <FaShoppingCart style={{ fontSize: 23 }} />
                      Deposit
                    </AwesomeButton>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div className="card-container"style={{backgroundColor: "#92BA92"}} >
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Referral Address" key="1">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      maxWidth: 600,
                      flex: 1,
                    }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <DataContainer>
                        <Subtitle>Current Referrer</Subtitle>
                        <DataText>
                          <Spin className="yellowSpin" spinning={loading}>
                            <span
                              style={{
                                wordBreak: 'break-all',
                              }}>
                              {waveStarter}
                            </span>
                          </Spin>
                        </DataText>
                      </DataContainer>
                      <DataContainer>
                        <Subtitle>Last Login</Subtitle>
                        <DataText>
                          <Spin className="yellowSpin" spinning={loading}>
                            {lastCheckin}
                          </Spin>
                        </DataText>
                      </DataContainer>
                      <DataContainer>
                        <Subtitle>Change you Referrer</Subtitle>
                        <Input
                          style={{
                            width: '100%',
                            marginBottom: 10,
                          }}
                          value={waveStarterInput}
                          onChange={(e) => {
                            setWaveStarterInput(e.target.value);
                          }}
                          placeholder="Enter Referral Address"
                        />
                        <AwesomeButton
                          className="UpdateWaveStarterButton"
                          disabled={waveStarterInput.length === 0}
                          onPress={async () => {
                            if (waveStarterInput === waveStarter) {
                              errorNotification('Choose a different address');
                              return;
                            }
                            try {
                              const { deposits } =
                                await getDepositsAvailableAndPlayerTeamFromAddress(
                                  waveStarterInput
                                );
                              if (deposits <= 0) throw 'No deposits';
                            } catch (err) {
                              console.log(err);
                              errorNotification(
                                "Invalid Address"
                              );
                              return;
                            }

                            waitForApprovalModal();
                            try {
                              const tx = await updateWaveStarter(
                                waveStarterInput,
                                address,
                                signer
                              );
                              waitForConfirmedTransactionModal();
                              await tx.wait();
                              await axios.post(
                                'https://splassiveserver.herokuapp.com/api/users/postNewPlayer',
                                { address: address, sponsor: waveStarterInput }
                              );
                              updateWaveStarterAndLastCheckin();
                              closeModal();
                              setWaveStarterInput('');
                              successNotification(
                                'Referral Address updated !'
                              );
                            } catch (err) {
                              closeModal();
                              errorNotification(
                                err.message + (' ' + err.data.message || '')
                              );
                            }
                          }}
                          style={{
                            width: '100%',
                            marginBottom: 10,
                            '--button-primary-color': '#86ad74',
                          }}>
                          Update
                        </AwesomeButton>
                        <AwesomeButton
                          onPress={() => {
                            setWaveStarterInput(
                              '0xcdf126a79B9Cb7a28ba67D323013939b7d43CA11'
                            );
                          }}
                          style={{ width: '100%' }}>
                          Support marketing and development
                        </AwesomeButton>
                      </DataContainer>
                    </Space>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Space>
        {mobile && (
          <Row
            justify="space-around"
            style={{ width: '100%', marginTop: 15 }}
            gutter={[10, 4]}>
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
                    <div>Players (Direct / Total)</div>
                  </Spin>
                </StatValue>
              </StatElement>
            </Col>
          </Row>
        )}
      </Container>
    </Section>
  );
};

export default Manage;
