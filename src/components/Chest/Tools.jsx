import styled from 'styled-components';
import { useState } from 'react';
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
import SlippagePopOver from '../SlippagePopOver.jsx';
import numeral from 'numeral';
import TeamViewer from './TeamViewer.jsx';
import TeamAirdrop from './TeamAirdrop.jsx';
import DirectAirdrop from './DirectAirdrop.jsx';
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const Section = styled.div`
  background-color: #78938a;
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
const Tools = ({
  data,
  waitForApprovalModal,
  waitForConfirmedTransactionModal,
  closeModal,
  updateApprovedSplash,
  errorNotification,
  successNotification,
  refreshAllData,
}) => {
  return (
    <Section>
      <Container>
        <MyTitle className="gradient-text2">Team Management</MyTitle>
        <div className="card-container">
          <Tabs defaultActiveKey="1" type="card" animated>
            <TabPane tab="Team Viewer" key="1">
              <TeamViewer errorNotification={errorNotification} />
            </TabPane>
            <TabPane tab="Team Airdrop" key="2">
              <TeamAirdrop
                data={data}
                updateApprovedSplash={updateApprovedSplash}
                waitForApprovalModal={waitForApprovalModal}
                waitForConfirmedTransactionModal={
                  waitForConfirmedTransactionModal
                }
                closeModal={closeModal}
                errorNotification={errorNotification}
                successNotification={successNotification}
                refreshAllData={refreshAllData}
              />
            </TabPane>
            <TabPane tab="Direct Airdrop" key="3">
              <DirectAirdrop
                data={data}
                updateApprovedSplash={updateApprovedSplash}
                waitForApprovalModal={waitForApprovalModal}
                waitForConfirmedTransactionModal={
                  waitForConfirmedTransactionModal
                }
                closeModal={closeModal}
                errorNotification={errorNotification}
                successNotification={successNotification}
                refreshAllData={refreshAllData}
              />
            </TabPane>
          </Tabs>
        </div>
      </Container>
    </Section>
  );
};

export default Tools;
