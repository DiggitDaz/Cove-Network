import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
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
  Table,
  Descriptions,
} from 'antd';
import axios from 'axios';

import { FaCog, FaShoppingCart } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { HiRefresh } from 'react-icons/hi';
import { FiRefreshCw, FiArrowDown } from 'react-icons/fi';
import { AwesomeButton } from 'react-awesome-button';
import {
  CloseOutlined,
  CheckOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import SlippagePopOver from '../SlippagePopOver.jsx';
import numeral from 'numeral';
import { WalletContext } from '../../utils/WalletContext.jsx';

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

const columns = [
  {
    title: 'Address',
    key: 'address',
    render: (text, record, index) => (
      <Space>
        <strong>{index + 1}.</strong>
        <span style={{ wordBreak: 'break-all' }}>{text}</span>
      </Space>
    ),
  },
];
const TeamViewer = ({ errorNotification }) => {
  const context = useContext(WalletContext);
  const { address } = context;
  const [playerAddress, setPlayerAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [directs, setDirects] = useState([]);

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
          <Subtitle>Player</Subtitle>
          <div style={{ display: 'flex' }}>
            <Input
              style={{
                flex: 1,
                marginBottom: 10,
              }}
              value={playerAddress}
              onChange={(text) => setPlayerAddress(text.target.value)}
              placeholder="Enter Address"
            />
            <Button
              type="primary"
              loading={loading}
              style={{ color: '#4e2e4b' }}
              icon={<SearchOutlined />}
              onClick={async () => {
                setLoading(true);
                let playerData = (
                  await axios.post(
                    'https://splassiveserver.herokuapp.com/api/users/getPlayer',
                    { address: playerAddress }
                  )
                ).data;
                if (playerData.success) {
                  setDirects(playerData.player.team[0]);
                  // console.log(playerData);
                } else {
                  errorNotification('Could not get player data!');
                }

                setLoading(false);
              }}
            />
          </div>
          <Space wrap={true} style={{ marginBottom: 10 }}>
            <Button
              type="primary"
              style={{
                backgroundColor: '#86ad74',
                borderColor: '#86ad74',
              }}
              onClick={() => setPlayerAddress(address)}>
              Use my address
            </Button>
            {/* <Button
              type="primary"
              style={{
                backgroundColor: '#7c625a',
                borderColor: '#7c625a',
              }}>
              View all
            </Button>
            <Button type="primary">Show</Button> */}
          </Space>
          <Subtitle>Results :</Subtitle>
          <Table
            dataSource={directs}
            columns={columns}
            pagination={false}
            rowKey={(record) => record}
          />
        </DataContainer>
      </div>
    </div>
  );
};

export default TeamViewer;
