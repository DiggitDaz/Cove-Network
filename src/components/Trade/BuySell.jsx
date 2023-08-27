import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  Tabs,
  Form,
  InputNumber,
  Button,
  Space,
  Popover,
  Switch,
  Row,
  Col,
  Spin,
} from 'antd';
//import { ReactComponent as AvaxLogo } from '../../assets/avaxlogo.svg';
//import { ReactComponent as SplashLogo } from '../../assets/splashlogo.svg';
import { FaCog, FaShoppingCart } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { AwesomeButton } from 'react-awesome-button';
import SlippagePopOver from '../SlippagePopOver.jsx';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import {
  buySplash,
  approveSplashTheWell,
  sellSplash,
} from '../../utils/AvalancheHelper.jsx';
const { TabPane } = Tabs;
const Section = styled.div`
  background-color: #dacc79;
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
const TopInput = styled.div`
  display: flex;
  color: #dacc79;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  cursor: pointer;
`;
const BottomInput = styled.div`
  display: flex;
  color: #dacc79;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const SVGWrapper = styled.div`
  font-size: ${(props) => (props.splash ? '22px' : '18px')};
  height: ${(props) => (props.splash ? '22px' : '18px')};
  width: ${(props) => (props.splash ? '22px' : '18px')};
  margin: 0px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ValueBox = styled.div`
  background-color: #dacc79;
  color: #4e2e4b;
  font-weight: bold;
  padding: 0px 5px;
  border-radius: 2px;
  text-align: left;
  @media screen and (max-width: 576px) {
    font-size: 3vw;
    text-align: left;
  }
`;
let formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 3,
});
const BuySell = ({
  userData,
  loading,
  statsData,
  signer,
  waitForApprovalModal,
  waitForConfirmedTransactionModal,
  closeModal,
  updateUserAvaxBalance,
  updateUserSplashBalance,
  errorNotification,
  successNotification,
  getSplashAllowance,
}) => {
  const { userAvaxBalance, userSplashBalance, address, splashAllowance } =
    userData;
  const { avaxbalance, splassivebalance, avaxinusd } = statsData;
  const AvaxPerSplash = avaxbalance / splassivebalance;
  const onBuyAmountChange = (value) => {
    setBuyAmount(value);
    if (!value) value = 0;
    setEstimateBuyReceived((value / AvaxPerSplash) * 0.9);
  };
  const onSellAmountChange = (value) => {
    setSellAmount(value);
    if (!value) value = 0;
    setEstimateSellReceived(value * AvaxPerSplash * 0.9);
  };
  const [buySlippage, setBuySlippage] = useState(1);
  const [sellSlippage, setSellSlippage] = useState(1);
  const [buyAmount, setBuyAmount] = useState(null);
  const [sellAmount, setSellAmount] = useState(null);
  const [estimateBuyReceived, setEstimateBuyReceived] = useState(
    (buyAmount / AvaxPerSplash) * 0.9
  );
  const [estimateSellReceived, setEstimateSellReceived] = useState(
    AvaxPerSplash * sellAmount * 0.9
  );
  const [splashApproved, setSplashApproved] = useState(false);
  useEffect(() => {
    if (splashAllowance >= userSplashBalance && splashAllowance > 0) {
      setSplashApproved(true);
    }
  }, [splashAllowance]);
  return (
    <Section>
      <Container>
        <div className="card-container">
          <Tabs defaultActiveKey="1" type="card" animated>
            <TabPane tab="BUY Splash Tokens" key="1">
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
                  <TopInput
                    onClick={() => {
                      setBuyAmount(
                        userAvaxBalance > 0.1 ? userAvaxBalance - 0.1 : null
                      );
                      onBuyAmountChange(
                        userAvaxBalance > 0.1 ? userAvaxBalance - 0.1 : null
                      );
                    }}>
                    <Spin spinning={loading} className="yellowSpin">
                      Splash price :{' '}
                      {numeral(
                        (avaxbalance / splassivebalance) * avaxinusd
                      ).format('$0,0.000')}
                    </Spin>
                    <Spin
                      spinning={loading}
                      className="yellowSpin"
                      style={{ display: 'flex' }}>
                      <Space>
                        <span>Balance :</span>
                        <ValueBox>
                          <span>{formatter.format(userAvaxBalance)} AVAX</span>
                        </ValueBox>
                      </Space>
                    </Spin>
                  </TopInput>
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                    min={0}
                    max={userAvaxBalance - 0.1}
                    value={buyAmount}
                    onChange={onBuyAmountChange}
                    placeholder="Enter AVAX amount"
                 /*   addonBefore={
                      <SVGWrapper>
                        <AvaxLogo width={18} height={18} />
                      </SVGWrapper>
                    } */
                    addonAfter={
                      <SlippagePopOver
                        key="buy"
                        setSlippage={setBuySlippage}
                        slippage={buySlippage}>
                        <Button
                          type="primary"
                          style={{ padding: '2px 5px 0px 5px' }}>
                          <FaCog />
                        </Button>
                      </SlippagePopOver>
                    }
                    controls={false}
                  />
                  <BottomInput>
                    <Row gutter={[10, 10]}>
                      <Col span={16}>
                        <Space>
                          <span>Estimate received :</span>
                          <ValueBox>
                            {numeral(estimateBuyReceived).format('0,0.000')}{' '}
                            SPLASH tokens
                          </ValueBox>
                        </Space>
                      </Col>
                      <Col span={8} style={{ textAlign: 'right' }}>
                        <Space>
                          <div>Slippage tolerance :</div>
                          <ValueBox style={{ whiteSpace: 'nowrap' }}>
                            {buySlippage} %
                          </ValueBox>
                        </Space>
                      </Col>
                      <Col span={16}>
                        <Space>
                          <div>Minimum received :</div>
                          <ValueBox>
                            {numeral(
                              estimateBuyReceived * (1 - buySlippage / 100)
                            ).format('0,0.000')}{' '}
                            SPLASH tokens
                          </ValueBox>
                        </Space>
                      </Col>
                      <Col span={8} style={{ textAlign: 'right' }}>
                        <Space>
                          <div style={{ textAlign: 'right' }}>
                            10% Tax is applied on buys
                          </div>
                        </Space>
                      </Col>
                    </Row>
                  </BottomInput>
                  <AwesomeButton
                    disabled={buyAmount <= 0}
                    onPress={async () => {
                      waitForApprovalModal();
                      try {
                        const tx = await buySplash(
                          buyAmount,
                          address,
                          buySlippage,
                          signer
                        );
                        waitForConfirmedTransactionModal();
                        await tx.wait();
                        updateUserAvaxBalance();
                        updateUserSplashBalance();
                        closeModal();
                        setBuyAmount(null);
                        onBuyAmountChange(null);
                        successNotification('Buy confirmed !');
                      } catch (err) {
                        closeModal();
                        console.log(err);
                        errorNotification(
                          err.message + (' ' + err.data.message || '')
                        );
                      }
                    }}
                    style={{ width: '100%' }}>
                    <FaShoppingCart style={{ fontSize: 23 }} />
                    Buy
                  </AwesomeButton>
                </div>
              </div>
            </TabPane>
            <TabPane tab="SELL Splash Tokens" key="2">
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
                  <TopInput
                    onClick={() => {
                      setSellAmount(userSplashBalance);
                      onSellAmountChange(userSplashBalance);
                    }}>
                    <Spin spinning={loading} className="yellowSpin">
                      Splash price :{' '}
                      {numeral(
                        (avaxbalance / splassivebalance) * avaxinusd
                      ).format('$0,0.000')}
                    </Spin>
                    <Spin
                      spinning={loading}
                      className="yellowSpin"
                      style={{ display: 'flex' }}>
                      <Space>
                        <span>Balance :</span>
                        <ValueBox>
                          <span>
                            {numeral(userSplashBalance).format('0,0.000')}{' '}
                            Splash
                          </span>
                        </ValueBox>
                      </Space>
                    </Spin>
                  </TopInput>
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                    min={0}
                    max={userSplashBalance}
                    value={sellAmount}
                    onChange={onSellAmountChange}
                    placeholder="Enter SPLASH amount"
                 /*   addonBefore={
                      <SVGWrapper splash>
                        <SplashLogo width={23} height={22} />
                      </SVGWrapper>
                    } */
                    addonAfter={
                      <SlippagePopOver
                        key="sell"
                        setSlippage={setSellSlippage}
                        slippage={sellSlippage}>
                        <Button
                          type="primary"
                          style={{ padding: '2px 5px 0px 5px' }}>
                          <FaCog />
                        </Button>
                      </SlippagePopOver>
                    }
                    controls={false}
                  />
                  <BottomInput>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Space>
                          <div>Estimate received :</div>
                          <ValueBox>
                            {numeral(estimateSellReceived).format('0,0.000')}{' '}
                            AVAX
                          </ValueBox>
                        </Space>
                      </Col>
                      <Col span={12} style={{ textAlign: 'right' }}>
                        <Space>
                          <div>Slippage tolerance :</div>
                          <ValueBox style={{ whiteSpace: 'nowrap' }}>
                            {sellSlippage} %
                          </ValueBox>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space>
                          <div>Minimum received :</div>
                          <ValueBox>
                            {numeral(
                              estimateSellReceived * (1 - sellSlippage / 100)
                            ).format('0,0.000')}{' '}
                            AVAX
                          </ValueBox>
                        </Space>
                      </Col>
                      <Col span={12} style={{ textAlign: 'right' }}>
                        <Space>
                          <div>10% Tax is applied on sells</div>
                        </Space>
                      </Col>
                    </Row>
                  </BottomInput>
                  <Spin spinning={loading} className="yellowSpin">
                    <Space style={{ marginBottom: 10 }}>
                      <Switch
                        disabled={!(userSplashBalance > 0) || splashApproved}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={splashApproved}
                        onChange={async () => {
                          waitForApprovalModal();
                          try {
                            const tx = await approveSplashTheWell(
                              userSplashBalance,
                              signer
                            );
                            waitForConfirmedTransactionModal();
                            await tx.wait();
                            getSplashAllowance();
                            closeModal();
                            successNotification('Splash Approved !');
                          } catch (err) {
                            closeModal();
                            errorNotification(
                              err.message + (' ' + err.data.message || '')
                            );
                          }
                        }}
                      />
                      <span>Approve Splash</span>
                    </Space>
                  </Spin>
                  <AwesomeButton
                    disabled={!(splashApproved && sellAmount > 0)}
                    onPress={async () => {
                      waitForApprovalModal();
                      try {
                        const tx = await sellSplash(
                          sellAmount,
                          address,
                          sellSlippage,
                          signer
                        );
                        waitForConfirmedTransactionModal();
                        await tx.wait();
                        updateUserAvaxBalance();
                        updateUserSplashBalance();
                        closeModal();
                        setSellAmount(null);
                        onSellAmountChange(null);
                        successNotification('Sell confirmed !');
                      } catch (err) {
                        closeModal();
                        console.log(err);
                        errorNotification(
                          err.message + (' ' + err.data.message || '')
                        );
                      }
                    }}
                    style={{ width: '100%' }}>
                    <GiReceiveMoney style={{ fontSize: 23 }} />
                    Sell
                  </AwesomeButton>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Container>
    </Section>
  );
};

export default BuySell;
