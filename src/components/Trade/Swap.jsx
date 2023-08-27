import styled from 'styled-components';
import { useState, useEffect, useRef, useContext } from 'react';
//import { WalletContext } from '../../utils/WalletContext';
//import { Provider } from 'react-redux';
//import store from '../../utils/store';
//import { PangolinProvider, SwapWidget } from '@pangolindex/components';
import { AwesomeButton } from 'react-awesome-button';
{/*const Container = styled.div`
  width: 100%;
  /* min-height: 100vh;
  min-height: ${(props) => props.vh * 100 + 'px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dacc79;
  /* padding: 80px 20px 20px 20px; 
`; */}
const Content = styled.div`
  width: 100%;
  background-color: #78938a;
  max-width: 1000px;
  display: flex;
  padding: 50px 42px 0px 0px;
  font-color: black;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  @media screen and (max-width: 850px) {
    font-size: 9vw;
  }
`;
const Title2 = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #dacc79;
  text-align: center;
  margin-bottom: 10px;
`;
const ValueBox = styled.div`
  background-color: #dacc79;
  color: black;
  font-weight: bold;
  padding: 0px 5px;
  border-radius: 2px;
  text-align: left;
`;
const Swap = () => {
  const [vh, setVh] = useState(window.visualViewport.height * 0.01);
  {/*const [modalText, setModalText] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalClosable, setModalClosable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldSplashApproved, setOldSplashApproved] = useState(false);
  const context = useContext(WalletContext);
const { address, wallet, signer } = context; */}

  return (
    <>
        <Content>
                <div
                  style={{
                    color: '#4e2e4b',
                    marginBottom: 10,
                    fontSize: 18,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <AwesomeButton
                    style={{ '--button-primary-color': '#4e2e4b' }}
                    href="https://app.bogged.finance/avax/swap?tokenIn=AVAX&tokenOut=0xE16253892F126D068E711C2fdde6DB56969dBCf6"
                    target="_blank">
                    
                  </AwesomeButton>
                  {/* <strong style={{ textAlign: 'center' }}>
                    IMPORTANT : DON'T FORGET TO PUT THE SLIPPAGE BETWEEN 12% AND
                    15%
                  </strong>
                  <strong style={{ textAlign: 'center' }}>
                    A better swap interface will be back soon on the website
                  </strong>{' '} */}
                </div>
                <iframe
                  src="https://app.bogged.finance/avax/swap?&embed=1&tokenIn=AVAX&tokenOut=0xE16253892F126D068E711C2fdde6DB56969dBCf6&theme=dark"
                  frameBorder="0"
                  height="780px"
                  width="100%"></iframe>
                {/* <SwapWidget /> */}
              </Content>
 {/*         </div>
          </Container>
        </PangolinProvider>
                </Provider>*/}
    </>
  );
};

export default Swap;
