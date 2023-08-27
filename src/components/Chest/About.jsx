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
  align-items: flex-start;
  color: #4e2e4b;
  font-size: 16px;
`;

const MyTitle = styled.div`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 850px) {
    font-size: 9vw;
  }
`;
const About = () => {
  return (
    <Section>
      <Container>
        <MyTitle className="gradient-text2">About</MyTitle>
        <div>
          Players can participate by purchasing Splash from the platform's The
          WELL page, joining another user’s Splash team (1 Splash minimum
          requirement) Depositing Splash to the The Tap contract earns a
          consistent 2% daily return of their Splash (360% maximum payout)
          passively. Players can also compound their earnings through regular
          deposits, rolling rewards as well as team based referrals. Unlike many
          other platforms promising a consistent daily % return, The Tap's
          contract cannot drain and will ALWAYS be able to provide the Splash
          that has been rewarded. Splash rewards come from a 10% tax on all
          Splash transactions on buys and sells from The WELL page.
        </div>
        <div style={{ marginTop: 10 }}>
          If there is ever a situation where the tax pool is not enough to pay
          Splash rewards new Splash will be minted to ensure rewards are paid
          out. Given the game theory behind the Splash network, the probability
          that the system will need to mint new Splash to pay rewards is
          extremely low. Splash is the only deflationary daily ROI platform. The
          best strategy for Splash is to focus on real world adoption by
          building out your team through direct referrals, as you will receive
          bonus rewards from referrals on their deposits and downline bonuses
          from players they refer based on the amount of WAVE Token held in your
          wallet: 1-5000, 2-10000, 3-20000, 4-30000, 5-40000, 6-50000, 7-60000,
          8-75000, 9-85000, 10-100000, 11-110000, 12-120000, 13-135000,
          14-190000, 15-200000
        </div>
      </Container>
    </Section>
  );
};

export default About;
