import { AwesomeButton } from 'react-awesome-button';
import { useState, useEffect, useContext } from 'react';
import { WalletContext } from '../utils/WalletContext.jsx';
import { Popconfirm, Button } from 'antd';



const WalletButton = () => {
  const [innerWidth, setInnerWidth] = useState(null);
  const {
    wallet,
    wrongChain,
    address,
    askForAvaxChain,
    connectWallet,
    disconnectWallet,
  } = useContext(WalletContext);
  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    connectWallet(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ padding: '0px 5px' }}>
      {!wallet && !wrongChain && (
        <AwesomeButton
          type="primary"
          style={{ backgroundColor: '#c56a39', fontSize: innerWidth < 1000 ? 10 : 14, '--button-primary-color': '#c56a39', }}
          onPress={() => {
            connectWallet();
          }}>
          Connect Wallet
        </AwesomeButton>
      )}
      {address && (
        <Popconfirm
          placement="bottom"
          title="Do you want to disconnect your wallet ?"
          onConfirm={() => {
            disconnectWallet();
          }}>
          <div>
            <AwesomeButton
              type="primary"
              style={{ fontSize: innerWidth < 1000 ? 10 : 14, '--button-primary-color': '#c56a39'}}
              // onPress={() => {
              // }}
            >
              {address.slice(0, 6) +
                '...' +
                address.slice(address.length - 4, address.length)}
            </AwesomeButton>
          </div>
        </Popconfirm>
      )}
      {wrongChain && (
        <AwesomeButton
          className="WrongChainButton"
          type="primary"
          style={{
            fontSize: innerWidth < 1000 ? 10 : 14,
            '--button-primary-color': '#c56a39',
          }}
          onPress={() => {
            askForAvaxChain(wallet);
          }}>
          Wrong Network
        </AwesomeButton>
      )}
    </div>
  );
};

export default WalletButton;
