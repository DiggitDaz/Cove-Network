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
  background-color: #4e2e4b;
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
  align-items: flex-start;
  color: #dacc79;
  font-size: 16px;
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
          Splassive’s The Tap is a low-risk, high reward contract that operates
          similarly to a high yield certificate of deposit by paying out 2%
          daily return on investment up to 360%.
        </div>
        <div>
          Players can compound and extend their earnings through deposits,
          hydrating (compounding) rewards as well as through team based
          referrals.
        </div>
      </Container>
    </Section>
  );
};

export default Description;
