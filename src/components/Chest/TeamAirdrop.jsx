import styled from 'styled-components';
import { useState, useContext, useEffect, useRef } from 'react';
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
  Spin,
  List,
  Radio,
} from 'antd';
import axios from 'axios';

import { FaCog, FaShoppingCart, FaDice, FaDiceSix } from 'react-icons/fa';
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
import {
  getEligibleParticipants,
  approveSplashTheTap,
  sendMultipleAirdrop,
} from '../../utils/AvalancheHelper.jsx';
import Participant from './Participant.jsx';
const { Option } = Select;
const DataContainer = styled.div`
  width: 100%;
  overflow-wrap: anywhere;
`;
const Subtitle = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
  word-wrap: normal;
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
const AddressValue = styled.div`
  margin: 5px 0px;
  word-break: break-all;
`;
const TopResults = styled.div`
  display: flex;
  justify-content: space-between;
`;
const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text, record, index) => (
      <Space>
        <strong>{index + 1}.</strong>
        <span style={{ wordBreak: 'break-all' }}>{text}</span>
      </Space>
    ),
  },
  {
    title: 'Deposits',
    dataIndex: 'deposits',
    key: 'deposits',
    render: (text) => <div>{numeral(text).format('0,0.000')}</div>,
  },
  { title: 'Directs', dataIndex: 'referrals' },
];
const TeamAirdrop = ({
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
  const [playerAddress, setPlayerAddress] = useState(null);
  const [minimumDirects, setMinimumDirects] = useState(0);
  const [minimumDeposits, setMinimumDeposits] = useState(1);
  const [randomAddressesAmount, setRandomAddressesAmount] = useState(null);
  const [recipientsAmount, setRecipientsAmount] = useState(0);
  const [maxParticipantsCount, setMaxParticipantsCount] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState(null);
  const [splashApproved, setSplashApproved] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [sortedParticipants, setSortedParticipants] = useState([]);
  const [selection, setSelection] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const { splashBalance, splashAllowanceTheTap, splashPrice } = data;
  useEffect(() => {
    if (participantsCount > 0) {
      setRecipientsAmount(
        Math.trunc((budget * 1000) / participantsCount) / 1000
      );
    }
  }, [budget, participantsCount]);
  useEffect(() => {
    if (splashAllowanceTheTap >= splashBalance && splashAllowanceTheTap > 0) {
      setSplashApproved(true);
    }
  }, [splashAllowanceTheTap]);
  useEffect(() => {
    switch (sortBy) {
      case 'date':
        setSortedParticipants([...participants]);
        break;
      case 'deposits':
        setSortedParticipants(
          [...participants].sort((a, b) =>
            a.deposits < b.deposits ? 1 : b.deposits < a.deposits ? -1 : 0
          )
        );
        break;
      case 'directs':
        setSortedParticipants(
          [...participants].sort((a, b) =>
            a.referrals < b.referrals ? 1 : b.referrals < a.referrals ? -1 : 0
          )
        );
        break;
    }
  }, [participants, sortBy]);
  const onSelectionChange = (index) => {
    setSelection((_selection) => {
      if (_selection.includes(index)) {
        setParticipantsCount(
          _selection.filter((indexValue) => index !== indexValue).length
        );
        return _selection.filter((indexValue) => index !== indexValue).sort();
      } else {
        setParticipantsCount([..._selection, index].length);
        return [..._selection, index].sort();
      }
    });
  };
  const getRandomAddresses = (count) => {
    let randomedAddresses = [];
    let indexes = [...Array(maxParticipantsCount).keys()];
    for (let i = 0; i < count; i++) {
      const pick = indexes[Math.round(Math.random() * (indexes.length - 1))];
      randomedAddresses.push(pick);
      indexes = indexes.filter((value) => value !== pick);
    }
    setSelection(randomedAddresses.sort());
    setParticipantsCount(randomedAddresses.length);
  };
  const sendSplitAirdrop = async () => {
    setLoading(true);
    let addresses = sortedParticipants
      .filter((_, index) => selection.includes(index))
      .map((participant) => participant.address);

    let transactionsCount =
      Math.trunc(participantsCount / 150) +
      (participantsCount % 150 > 0 ? 1 : 0);
    for (let i = 0; i < transactionsCount; i++) {
      let slicedAddresses = addresses.slice(i * 150, i * 150 + 150);
      waitForApprovalModal();
      try {
        const tx = await sendMultipleAirdrop(
          slicedAddresses,
          recipientsAmount,
          signer
        );
        waitForConfirmedTransactionModal();
        await tx.wait();
        refreshAllData();
        closeModal();
        successNotification('Airdrop sent !');
      } catch (err) {
        console.log(err);
        setLoading(false);
        closeModal();
        errorNotification(err.message + (' ' + err.data.message || ''));
      }
    }
    setLoading(false);

    setParticipants([]);
    setParticipantsCount(0);
    setRecipientsAmount(0);
    setMaxParticipantsCount(0);
    setBudget(null);
    setSelection([]);
    setLoading(false);
  };
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
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Subtitle>User </Subtitle>
        {/* <AddressValue>{address}</AddressValue> */}
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
          style={{
            backgroundColor: '#92BA92',
            borderColor: '#92BA92',
            marginBottom: 10,
            color: 'black'
          }}
          onClick={() => setPlayerAddress(address)}>
          Use my address
        </Button>
        <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
          <Col xs={24} sm={12}>
            <Space style={{ marginBottom: 10 }}>
              <div>
                <span>Minimum Directs</span>
                <Select
                  style={{ width: '100%' }}
                  value={minimumDirects}
                  onChange={(value) => setMinimumDirects(value)}>
                  <Option value={0}>None</Option>
                  <Option value={1}>1</Option>
                  <Option value={5}>5</Option>
                  <Option value={15}>15</Option>
                </Select>
              </div>
              <div>
                <span>Minimum Net Deposit</span>
                <Select
                  style={{ width: '100%' }}
                  value={minimumDeposits}
                  onChange={(value) => setMinimumDeposits(value)}>
                  <Option value={1}>1+ Cove</Option>
                  <Option value={5}>5+ Cove</Option>
                  <Option value={10}>10+ Cove</Option>
                  <Option value={25}>25+ Cove</Option>
                  <Option value={50}>50+ Cove</Option>
                  <Option value={100}>100+ Cove</Option>
                  <Option value={250}>250+ Cove</Option>
                  <Option value={500}>500+ Cove</Option>
                  <Option value={1000}>1000+ Cove</Option>
                </Select>
              </div>
            </Space>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Subtitle>Budget</Subtitle>
              <Space
                onClick={() => {
                  setBudget(splashBalance);
                }}
                style={{ cursor: 'pointer' }}>
                <span>Balance :</span>
                <ValueBox>
                  <span style={{ minWidth: 150 }}>
                    {numeral(splashBalance).format('0,0.000')} Cove
                  </span>
                </ValueBox>
              </Space>
            </div>
            <InputNumber
              style={{
                width: '100%',
              }}
              value={budget}
              min={0}
              max={splashBalance}
              onChange={(text) => {
                setBudget(text);
              }}
              placeholder="Enter Cove amount"
           /*   addonBefore={
                <SVGWrapper splash>
                  <SplashLogo width={23} height={22} />
                </SVGWrapper>
              }
              controls={false} */
            />
            <Button
              type="primary"
              loading={loading}
              style={{ width: '100%', marginTop: 10 }}
              onClick={async () => {
                if (!playerAddress) {
                  errorNotification('You need to enter a player address!');
                  return;
                }
                setLoading(true);
                try {
                  setParticipants([]);
                  setParticipantsCount(0);
                  setRecipientsAmount(0);
                  let playerData = (
                    await axios.post(
                      'https://splassiveserver.herokuapp.com/api/users/getPlayer',
                      {
                        address: playerAddress,
                      }
                    )
                  ).data;
                  if (!playerData.success) {
                    errorNotification('Could not get player data!');
                    setLoading(false);
                    return;
                  }
                  if (!playerData.player.team[0].length) {
                    errorNotification('The player has no team');
                    setLoading(false);
                    return;
                  }
                  let eligibleParticipants = await getEligibleParticipants(
                    playerData.player,
                    minimumDirects,
                    minimumDeposits
                  );
                  // console.log(eligibleParticipants);
                  setParticipants(eligibleParticipants);
                  setParticipantsCount(eligibleParticipants.length);
                  setMaxParticipantsCount(eligibleParticipants.length);
                  setSelection([...Array(eligibleParticipants.length).keys()]);
                } catch (err) {
                  closeModal();
                  setLoading(false);
                  console.log(err);
                  errorNotification(
                    err.message + (' ' + err.data.message || '')
                  );
                }
                setLoading(false);
              }}>
              Get participants
            </Button>
          </Col>
          <Col xs={24} sm={12}>
            <Spin spinning={loading} className="yellowSpin">
              <Descriptions
                bordered
                column={1}
                labelStyle={{ color: '#92BA92' }}>
                <Descriptions.Item label="Budget">
                  {numeral(budget).format('0,0.000')} Cove
                </Descriptions.Item>
                <Descriptions.Item label="Number of recipients">
                  {participantsCount}/{maxParticipantsCount}
                </Descriptions.Item>
                <Descriptions.Item label="Estimated Cove per person">
                  <div>
                    {numeral(recipientsAmount).format('0,0.000')} Cove
                  </div>
                  <div>
                    {numeral(recipientsAmount * splashPrice).format('$0,0.000')}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Spin>
          </Col>
        </Row>
        <Subtitle style={{ marginTop: 10 }}>
          Select random addresses
        </Subtitle>
        <div style={{ display: 'flex' }}>
          <InputNumber
            style={{
              width: '100%',
              marginBottom: 10,
            }}
            min={0}
            max={maxParticipantsCount}
            value={randomAddressesAmount}
            onChange={(text) => setRandomAddressesAmount(text)}
            placeholder={'1 - ' + maxParticipantsCount}
            controls={false}
          />
          <Button
            icon={<FaDice />}
            type="primary"
            onClick={() => {
              getRandomAddresses(randomAddressesAmount);
            }}
          />
        </div>
        <Space style={{ marginBottom: 10 }}>
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
                successNotification('Cove Approved !');
              } catch (err) {
                closeModal();
                errorNotification(err.message + (' ' + err.data.message || ''));
              }
            }}
          />
          <span>Approve Cove</span>
        </Space>
        <Button
          type="primary"
          disabled={!splashApproved || !budget || !sortedParticipants.length}
          style={{
            backgroundColor: '#92BA92',
            borderColor: '#92BA92',
            marginBottom: 10,
          }}
          onClick={async () => {
            sendSplitAirdrop();
          }}>
          SEND ({' '}
          {`${
            Math.trunc(participantsCount / 150) +
            (participantsCount % 150 > 0 ? 1 : 0)
          } transaction${participantsCount > 150 ? 's' : ''}`}{' '}
          )
        </Button>
        <TopResults>
          <Subtitle>Results :</Subtitle>
          <Space>
            <span>Sorted By: </span>
            <Radio.Group
              buttonStyle="solid"
              optionType="button"
              defaultValue="date"
              onChange={(e) => setSortBy(e.target.value)}>
              <Radio.Button value="date">Date</Radio.Button>
              <Radio.Button value="deposits">Deposits</Radio.Button>
              <Radio.Button value="directs">Directs</Radio.Button>
            </Radio.Group>
          </Space>
        </TopResults>
        <div
          style={{
            marginTop: 10,
            textAlign: 'right',
          }}>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setSelection([...Array(maxParticipantsCount).keys()]);
                setParticipantsCount(maxParticipantsCount);
                setRandomAddressesAmount(null);
              }}>
              Select All
            </Button>
            <Button
              type="danger"
              onClick={() => {
                setSelection([]);
                setParticipantsCount(0);
                setRandomAddressesAmount(null);
              }}>
              Unselect All
            </Button>
          </Space>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <List
            dataSource={sortedParticipants}
            renderItem={(participant, index) => (
              <List.Item>
                <Participant
                  data={participant}
                  index={index}
                  onSelectionChange={onSelectionChange}
                  selection={selection}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamAirdrop;
