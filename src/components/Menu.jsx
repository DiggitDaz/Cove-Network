import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Space, Image, Button, Drawer, Menu, Dropdown, Avatar } from 'antd';
import WalletButton from './WalletButton.jsx';
import { Link } from 'react-router-dom';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';


const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 60px;
  z-index: 10;
  transition: all 0.5s ease 0s;
  background-color: ${(props) =>
    props.small
      ? props.pathname === '/trading'
        ? '#78938a'
        : '#78938a'
      : 'transparent'};
  color: ${(props) =>
    props.small
      ? props.pathname === '/trading'
        ? 'black'
        : 'black'
      : 'inherit'};
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 5px 20px; */
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  padding: 0px 20px;
`;
const NavLink = styled.div`
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.1em;
  display: inline-block;
  position: relative;
  padding: 10px 10px;
  font-weight: bold;
  font-size: 16px;
  color: ${(props) =>
    props.disabled
      ? '#00000025'
      : props.small
      ? props.pathname === '/trading'
        ? 'black'
        : 'black'
      : props.pathname === '/trading'
      ? 'black'
      : 'black'};

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${(props) =>
      props.disabled
        ? 'transparent'
        : props.small
        ? props.pathname === '/trading'
          ? '#78938a'
          : '#78938a'
        : props.pathname === '/trading'
        ? '#78938a'
        : '#78938a'};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
`;
const NavLinkSecondary = styled.div`
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  font-size: 16px;
  padding: 10px 10px;
  transition: filter 0.5s ease 0s;
  color: ${(props) =>
    props.disabled
      ? '#00000025'
      : props.pathname === '/trading'
      ? '#a8a8a8'
      : '#black'};
  &:hover {
    filter: brightness(1.5);
  }
`;
const Logo = styled.div`
  cursor: pointer;
  transition: filter 0.5s ease;
  &:hover {
    filter: brightness(1.5);
  }
`;
const LeftMenu = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  @media screen and (max-width: 1000px) {
    justify-content: flex-start;
  }
`;
const RightMenu = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
const BigMenu = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const SmallMenu = styled.div`
  @media screen and (min-width: 1000px) {
    display: none;
  }
`;
const NetworkWrapper = styled.div`
  background-color: ${(props) =>
    props.pathname === '/trading' ? '#1c1f40' : '#4e2e4b'};
  color: ${(props) => (props.pathname === '/trading' ? '#a8a8a8' : '#dacc79')};
  font-weight: bold;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: filter 0.5s ease;
  &:hover {
    filter: brightness(1.5);
  }
  @media screen and (max-width: 1000px) {
    font-size: 10px;
  }
`;
/*const Network = ({ network }) => {
  switch (network) {
    case 'AVAX':
      return (
        <Space align="baseline">
          <Avatar size={25} />
          AVAX
        </Space>
      );
  }
}; */
const MyMenu = () => {
  const [small, setSmall] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
 /* const [network, setNetwork] = useState('AVAX'); */
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setSmall(window.pageYOffset > 10)
      );
    }
  }, []);
  const toggleDrawer = () => {
    setDrawerVisible((visible) => !visible);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  const more = (
    <Menu>
      <Menu.Item key="whitepaper">
        <a
          href="https://drive.google.com/file/d/1dMUOi3aY6OmUkIHhYGUad3QIR7TWfzhZ/view?usp=drive_link"
          target="_blank">
          Whitepaper
        </a>
      </Menu.Item>
      <Menu.Item key="Cove">
        <a
          href=""
          target="_blank">
          Buy COVE
        </a>
        </Menu.Item>
        <Menu.Item key="grog">
            <a
            href=""
            target="_blank">
            Buy GROG
            </a>
       </Menu.Item>
    </Menu>
  );
/*  const networks = (
    <Menu>
      <Menu.Item key="avalanche">
        <Network network={'AVAX'} />
      </Menu.Item>
    </Menu>
  ); */
  const swap = (
    <Menu>
      <Menu.Item key="Trade">
        <Link to="/Trade">Trade Tokens</Link>
      </Menu.Item>
    </Menu>
  );
  const earn = (
    <Menu>
      <Menu.Item key="Chest">
        <Link to="/Chest">Deposit Cove</Link>
      </Menu.Item>
    </Menu>
  );
  const play = (
    <Menu>
      <Menu.Item key="rockpaperscissors">
        <Link to="/rockpaperscissors">Rock Paper Scissors</Link>
      </Menu.Item>
      <a href="https://splashjackpot.com" target="_blank">
        <Menu.Item key="splashjackpot">Splash Jackpot</Menu.Item>
      </a>
      <Menu.Item key="superbowl">
        <Link to="/superbowl">Super Bowl</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Container small={small} pathname={pathname}>
      <Content>
        <LeftMenu>
          <BigMenu>
            <Space>
              <Link to="/">
                <NavLink small={small} pathname={pathname}>
                  Home
                </NavLink>
              </Link>
              <Dropdown overlay={swap}>
                <NavLink small={small} pathname={pathname}>
                  Trade
                </NavLink>
              </Dropdown>
              <Dropdown overlay={earn}>
                <NavLink small={small} pathname={pathname}>
                  Chest
                </NavLink>
              </Dropdown>
            </Space>
          </BigMenu>
          <SmallMenu>
            <Space>
              <Button
                type="link"
                icon={
                  <MenuOutlined
                    style={{
                      fontSize: 22,
                      color: small
                        ? 'inherit'
                        : pathname === '/trading'
                        ? '#1c1f40'
                        : '#4e2e4b',
                    }}
                  />
                }
                onClick={() => toggleDrawer()}
              />
              <Drawer
                placement="left"
                width={250}
                onClose={toggleDrawer}
                visible={drawerVisible}
                bodyStyle={{
                  backgroundColor:
                    pathname === '/trading' ? '#1c1f40' : '#4e2e4b',
                }}
                closable={false}>
                <Space direction="vertical">
                  <Link to="/">
                    <NavLink small onClick={closeDrawer} pathname={pathname}>
                      Home
                    </NavLink>
                  </Link>
                  <Link to="Trade">
                    <NavLink small onClick={closeDrawer} pathname={pathname}>
                      Trade Cove
                    </NavLink>
                  </Link>
                  <Link to="Chest">
                    <NavLink small onClick={closeDrawer} pathname={pathname}>
                      Treasure Chest
                    </NavLink>
                  </Link>
                  <a
                    href="https://splassive.com/splassive_whitepaper.pdf"
                    target="_blank">
                    <NavLinkSecondary
                      small={small}
                      onClick={closeDrawer}
                      pathname={pathname}>
                      Cove Whitepaper
                    </NavLinkSecondary>
                  </a>
                  <a
                    href="https://app.pangolin.exchange/#/swap?outputCurrency=0xbc6f589171d6d66eb44ebcc92dffb570db4208da"
                    target="_blank">
                    <NavLinkSecondary
                      small={small}
                      onClick={closeDrawer}
                      pathname={pathname}>
                      Buy GROG
                    </NavLinkSecondary>
                  </a>
                </Space>
              </Drawer>
            {/*<Dropdown overlay={networks}>
                <NetworkWrapper pathname={pathname}>
                  <Network network={network} />
                </NetworkWrapper>
              </Dropdown> */}
            </Space>
          </SmallMenu>
        </LeftMenu>
        <RightMenu>
          <BigMenu>
            <div
              style={{
                display: 'flex',
              }}>
             {/*} <Link to="/chart">
                <NavLinkSecondary small={small} pathname={pathname}>
                  Chart
                </NavLinkSecondary>
            </Link> */}
              <Dropdown overlay={more}>
                <NavLinkSecondary small={small} pathname={pathname}>
                  More <DownOutlined />
                </NavLinkSecondary>
              </Dropdown>
           {/*}   <Dropdown overlay={networks}>
                <NetworkWrapper pathname={pathname}>
                  <Network network={network} />
                </NetworkWrapper>
            </Dropdown> */}
            </div>
          </BigMenu>
          <WalletButton />
        </RightMenu>
      </Content>
    </Container>
  );
};

export default MyMenu;
