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
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 22px 125px 22px 100px;
  background-color: #78938a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const MyTitle = styled.div`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  @media screen and (max-width: 850px) {
    font-size: 9vw;
  }
`;
const Description = () => {
  return (
    <Section>
      <Container>
        <div>
          Earn Consistant 1% Daily Returns With The Cove Network
        </div>
        <div>
          The Cove Network is centered around the Treasure Chest. The Chest mimics a deposit certificate,
          paying 1% daily returns on all tokens held on deposit within the contract.
        </div>
        <div>
          Our native token (COVE) can be traded on our Dapp via bogged finance.
        </div>
      </Container>
    </Section>
  );
};

export default Description;
