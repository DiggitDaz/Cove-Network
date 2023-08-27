import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import {
  Tabs,
  Form,
  InputNumber,
  Button,
  Space,
  Popover,
  Switch,
  Typography,
  Input,
  Row,
  Col,
  Select,
  Descriptions,
} from 'antd';

import { FaCog, FaShoppingCart } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { HiRefresh } from 'react-icons/hi';
import { FiRefreshCw, FiArrowDown } from 'react-icons/fi';
import { AwesomeButton } from 'react-awesome-button';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import {
  sendDirectAirdrop,
  approveSplashTheTap,
} from '../../utils/AvalancheHelper.jsx';
import { WalletContext } from '../../utils/WalletContext.jsx';
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const Section = styled.div`
  background-color: #86ad74;
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
`;*/
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
  color: #dacc79;
`;
let formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 3,
});
const Console = styled.div`
  min-height: 200px;
  width: 100%;
  background-color: #dacc79;
  border-radius: 2px;
  color: #4e2e4b;
  padding: 10px;
`;
const DirectAirdrop = ({
  data,
  waitForApprovalModal,
  waitForConfirmedTransactionModal,
  closeModal,
  updateApprovedSplash,
  errorNotification,
  successNotification,
  refreshAllData,
}) => {
  const context = useContext(WalletContext);
  const { address, signer } = context;
  const [recipientAddress, setRecipientAddress] = useState(null);
  const { splashBalance, splashAllowanceTheTap } = data;
  const [directAirdropAmount, setDirectAirdropAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [splashApproved, setSplashApproved] = useState(false);
  useEffect(() => {
    if (splashAllowanceTheTap >= splashBalance && splashAllowanceTheTap > 0) {
      setSplashApproved(true);
    }
  }, [splashAllowanceTheTap]);
  return (
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
        <DataContainer>
          <Subtitle>User</Subtitle>
          <Input
            style={{
              flex: 1,
              marginBottom: 10,
            }}
            value={recipientAddress}
            onChange={(text) => setRecipientAddress(text.target.value)}
            placeholder="Enter Address"
          />
          <TopInput>
            <Subtitle>Amount</Subtitle>
            <Space
              style={{ cursor: 'pointer' }}
              onClick={() => setDirectAirdropAmount(splashBalance)}>
              <span>Balance : </span>
              <ValueBox>
                <span style={{ minWidth: 150 }}>
                  {numeral(splashBalance).format('0,0.000')} Cove
                </span>
              </ValueBox>
            </Space>
          </TopInput>
          <InputNumber
            style={{
              width: '100%',
              marginBottom: 10,
            }}
            value={directAirdropAmount}
            min={0}
            max={splashBalance}
            onChange={(value) => setDirectAirdropAmount(value)}
            placeholder="Enter COVE amount"
           /* addonBefore={
              <SVGWrapper splash>
                <SplashLogo width={23} height={22} />
              </SVGWrapper> 
            }
            controls={false}*/
          />
          <Space>
            <Switch
              disabled={!(splashBalance > 0) || splashApproved}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={splashApproved}
              onChange={async () => {
                waitForApprovalModal();
                try {
                  const tx = await approveSplashTheTap(splashBalance, signer);
                  waitForConfirmedTransactionModal();
                  await tx.wait();
                  updateApprovedSplash();
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
            <span>Approve Cove</span>
          </Space>
          <Button
            type="primary"
            disabled={
              !splashApproved || !recipientAddress || !directAirdropAmount
            }
            style={{
              backgroundColor: '#92BA92',
              borderColor: '#92BA92',
              color: 'black',
              width: '100%',
              marginTop: 10,
            }}
            onClick={async () => {
              setLoading(true);
              waitForApprovalModal();
              try {
                const tx = await sendDirectAirdrop(
                  recipientAddress,
                  directAirdropAmount,
                  signer
                );
                waitForConfirmedTransactionModal();
                await tx.wait();
                closeModal();
                successNotification('Direct airdrop sent !');
                setDirectAirdropAmount(null);
                setRecipientAddress(null);
                refreshAllData();
              } catch (err) {
                console.log(err);
                closeModal();
                errorNotification(err.message + (' ' + err.data.message || ''));
              }
              setLoading(false);
            }}>
            SEND AIRDROP
          </Button>
        </DataContainer>
      </div>
    </div>
  );
};

export default DirectAirdrop;
