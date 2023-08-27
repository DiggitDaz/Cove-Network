import styled from 'styled-components';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { AwesomeButtonSocial, AwesomeButton } from 'react-awesome-button';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Section = styled.div`
  background-color: #92BA92;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: arial black;
`;
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: black;
`;

const Footer = () => {
  return (
    <Section>
      <Container>
        <Bottom>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}>
            <div>{`${dayjs().format('YYYY')} © Cove Network`}</div>
          </div>
          <Space
            direction={window.innerWidth < 768 ? 'vertical' : 'horizontal'}>
            <AwesomeButtonSocial
              type="twitter"
              href="https://twitter.com/CoveNetworkROI"
              target="_blank"
              style={{ color: 'black', width: window.innerWidth < 768 ? '100%' : 'inherit' }}>
              Twitter
            </AwesomeButtonSocial>
            <AwesomeButton
              type="secondary"
              href="https://t.me/CoveNetChat"
              target="_blank"
              style={{ color: 'black', width: window.innerWidth < 768 ? '100%' : 'inherit' }}>
              <FaTelegramPlane style={{ fontSize: 23 }} />
              Telegram
            </AwesomeButton>
          </Space>
        </Bottom>
      </Container>
    </Section>
  );
};

export default Footer;
