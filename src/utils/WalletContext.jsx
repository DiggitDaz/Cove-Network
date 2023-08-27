import { useState, createContext, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const WalletContext = createContext();
const web3Modal = new Web3Modal({
  // network: 'avalanche-2', // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
          43114: 'https://rpc.ankr.com/avalanche',
        },
        supportedChainIds: [43114],
      },
    },
  }, // required
});

export default function WalletContextProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [instance, setInstance] = useState(null);
  const [signer, setSigner] = useState(null);
  const [wrongChain, setWrongChain] = useState(false);
  const [address, setAddress] = useState('');
  const partner = 'splassive';
  const askForAvaxChain = (provider) => {
    provider.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0xa86a',
          rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
          chainName: 'Avalanche',
          nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18,
          },
          blockExplorerUrls: ['https://snowtrace.io/'],
        },
      ],
    });
  };
  const connectWallet = async (start) => {
    if (!web3Modal.cachedProvider && start) return;
    setInstance(await web3Modal.connect());
  };
  const disconnectWallet = async () => {
    setWallet(null);
    setSigner(null);
    setAddress(null);
    setWrongChain(false);
    web3Modal.clearCachedProvider();
    window.location.reload(false);
  };
  useEffect(() => {
    const newInstance = async () => {
      if (!instance || !instance.on) return;
      instance.on('accountsChanged', async (accounts) => {
        // console.log('accountsChanged', accounts);
        if (accounts.length === 0) {
          setWallet(null);
          setSigner(null);
          setAddress(null);
          setWrongChain(false);
          web3Modal.clearCachedProvider();
        } else {
          let provider = new ethers.providers.Web3Provider(instance);
          let chainId = (await provider.getNetwork()).chainId;
          if (!(chainId === 43114 || chainId === 43113 || chainId === 31337)) {
            askForAvaxChain(provider);
            setWallet(provider);
            setSigner(provider.getSigner());
            setAddress(null);
            setWrongChain(true);
            return;
          }
          setWallet(provider);
          setSigner(provider.getSigner());
          setAddress((await provider.listAccounts())[0]);
          setWrongChain(false);
        }
      });
      // Subscribe to chainId change
      instance.on('chainChanged', async () => {
        let provider = new ethers.providers.Web3Provider(instance);
        let chainId = (await provider.getNetwork()).chainId;
        // console.log('chainChanged', chainId);
        if (!(chainId === 43114 || chainId === 43113 || chainId === 31337)) {
          askForAvaxChain(provider);
          setWallet(provider);
          setSigner(provider.getSigner());
          setAddress(null);
          setWrongChain(true);
          return;
        } else {
          setWallet(provider);
          setSigner(provider.getSigner());
          setAddress((await provider.listAccounts())[0]);
          setWrongChain(false);
        }
      });

      // Subscribe to provider connection
      instance.on('connect', async (info) => {
        // console.log('connect', info);
        let provider = new ethers.providers.Web3Provider(instance);
        let chainId = (await provider.getNetwork()).chainId;
        // console.log('chainChanged', chainId);
        if (!(chainId === 43114 || chainId === 43113 || chainId === 31337)) {
          askForAvaxChain(provider);
          setWallet(provider);
          setSigner(provider.getSigner());
          setAddress(null);
          setWrongChain(true);
          return;
        } else {
          setWallet(provider);
          setSigner(provider.getSigner());
          setAddress((await provider.listAccounts())[0]);
          setWrongChain(false);
        }
      });
      // Subscribe to provider disconnection
      instance.on('disconnect', (error) => {
        // console.log('disconnect', error);
        setWallet(null);
        setSigner(null);
      });
      let provider = new ethers.providers.Web3Provider(instance);
      let chainId = (await provider.getNetwork()).chainId;
      // console.log(chainId);
      if (!(chainId === 43114 || chainId === 43113 || chainId === 31337)) {
        askForAvaxChain(provider);
        setWallet(provider);
        setSigner(provider.getSigner());
        setAddress(null);
        setWrongChain(true);
        return;
      } else {
        setWallet(provider);
        setSigner(provider.getSigner());
        setAddress((await provider.listAccounts())[0]);
        setWrongChain(false);
      }
    };
    newInstance();
  }, [instance]);
  return (
    <WalletContext.Provider
      value={{
        wallet,
        signer,
        instance,
        setWallet,
        setInstance,
        wrongChain,
        address,
        askForAvaxChain,
        connectWallet,
        disconnectWallet,
        partner,
      }}>
      {children}
    </WalletContext.Provider>
  );
}
