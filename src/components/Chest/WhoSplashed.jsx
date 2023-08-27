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
  Typography,
  Input,
  Descriptions,
  Spin,
} from 'antd';
import { getPlayerInfo } from '../../utils/AvalancheHelper.jsx';
import { SearchOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const Section = styled.div`
  background-color: #92BA92;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: black;
`;
const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;
const MyTitle = styled.div`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  @media screen and (max-width: 850px) {
    font-size: 9vw;
  }
`;
const Content = styled.div`
  background-color: #78938A;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 20px;
`;

const TopInput = styled.div`
  display: flex;
  color: #dacc79;
  justify-content: space-between;
  margin-bottom: 10px;
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
  color: black;
  font-weight: bold;
  word-wrap: normal;
`;
const DataText = styled.div`
  color: #dacc79;
`;
let formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 3,
});
const WhoSplashed = () => {
  dayjs.extend(relativeTime);
  const [playerAddress, setPlayerAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [_directs, setDirects] = useState(0);
  const [_teamSize, setTeamSize] = useState(0);
  const [_totalDeposit, setTotalDeposit] = useState(0);
  const [_aidropSent, setAidropSent] = useState(0);
  const [_aidropReceived, setAidropReceived] = useState(0);
  const [_lastAirdrop, setLastAidrop] = useState(0);

  return (
    <Section>
      <Container>
        <MyTitle className="gradient-text4">PLAYER LOOKUP</MyTitle>
        <Content>
          <div
            style={{
              maxWidth: 600,
              flex: 1,
              width: '100%',
            }}>
            <div>
              <Subtitle>Enter User Address</Subtitle>
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
                  style={{ color: 'black' }}
                  icon={<SearchOutlined />}
                  onClick={async () => {
                    setLoading(true);
                    const {
                      directs,
                      teamSize,
                      totalDeposits,
                      airdropReceived,
                      airdropSent,
                      lastAirdrop,
                    } = await getPlayerInfo(playerAddress);
                    setDirects(directs);
                    setTeamSize(teamSize);
                    setTotalDeposit(totalDeposits);
                    setAidropReceived(airdropReceived);
                    setAidropSent(airdropSent);
                    setLastAidrop(lastAirdrop);
                    // console.log(lastAirdrop);
                    setLoading(false);
                  }}
                />
              </div>
              <Spin spinning={loading} className="yellowSpin">
                <Descriptions
                  title={<Subtitle>Player Info</Subtitle>}
                  bordered
                  column={1}
                  labelStyle={{ color: 'black' }}>
                  <Descriptions.Item label="Directs">
                    {_directs}
                  </Descriptions.Item>
                  <Descriptions.Item label="Team">
                    {_teamSize}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Deposits">
                    {numeral(_totalDeposit).format('0,0.000')} Cove
                  </Descriptions.Item>
                  <Descriptions.Item label="Airdrop Received">
                    {numeral(_aidropReceived).format('0,0.000')} Cove
                  </Descriptions.Item>
                  <Descriptions.Item label="Airdrop Sent">
                    {numeral(_aidropSent).format('0,0.000')} Cove
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Airdrop Activity">
                    {_lastAirdrop > 0
                      ? dayjs(_lastAirdrop * 1000).fromNow()
                      : 'Never'}
                  </Descriptions.Item>
                </Descriptions>
              </Spin>
            </div>
          </div>
        </Content>
      </Container>
    </Section>
  );
};

export default WhoSplashed;
