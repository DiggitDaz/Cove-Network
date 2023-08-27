import Stats from '../components/Trade/Stats.jsx';
import Charts from '../components/Charts.jsx';
import Footer from '../components/Footer.jsx';
import { useState, useEffect, useContext } from 'react';
import { refreshTheWellData } from '../utils/AvalancheHelper.jsx';
import { WalletContext } from '../utils/WalletContext.jsx';
import TxModal from '../components/TxModal.jsx';
import { notification } from 'antd';
import Swap from '../components/Trade/Swap.jsx';


const Trade = () => {
    const context = useContext(WalletContext);
    const initialeStatsData = {
      avaxbalance: 0,
      splassivebalance: 0,
      avaxinusd: 0,
    };
    const initialeUserData = {
      userAvaxBalance: 0,
      userSplashBalance: 0,
      splashAllowance: 0,
    };
    const [statsData, setStatsData] = useState(initialeStatsData);
    const [userData, setUserData] = useState(initialeUserData);
    const [statsLoading, setStatsLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [modalText, setModalText] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalClosable, setModalClosable] = useState(false);
    // useEffect(async () => {
    //   if (context.address) {
    //     setUserLoading(true);
    //     setUserData((data) => {
    //       return { ...data, address: context.address };
    //     });
    //     await Promise.all([
    //       updateUserAvaxBalance(),
    //       updateUserSplashBalance(),
    //       getSplashAllowance(),
    //     ]);
    //     setUserLoading(false);
    //   } else {
    //     setUserData(initialeUserData);
    //   }
    // }, [context.address]);
    const refreshStatsData = async () => {
      setStatsLoading(true);
      const data = await refreshTheWellData();
      setStatsData(data);
      setStatsLoading(false);
    };
    const refreshStatsDataWithoutLoading = async () => {
      const data = await refreshTheWellData();
      setStatsData(data);
    };
    // const updateUserAvaxBalance = async () => {
    //   const userAvaxBalance = await getUserAvaxBalance(context.signer);
    //   setUserData((data) => {
    //     return { ...data, userAvaxBalance };
    //   });
    // };
    // const updateUserSplashBalance = async () => {
    //   const userSplashBalance = await getSplashBalance(context.address);
    //   setUserData((data) => {
    //     return { ...data, userSplashBalance };
    //   });
    // };
    // const getSplashAllowance = async () => {
    //   const splashAllowance = await getSplashAllowanceTheWell(context.address);
    //   setUserData((data) => {
    //     return { ...data, splashAllowance };
    //   });
    // };
    // const waitForApprovalModal = () => {
    //   setModalText('Confirm the transaction with your wallet');
    //   setModalVisible(true);
    // };
    // const waitForConfirmedTransactionModal = () => {
    //   setModalText('Wait for the transaction to be confirmed...');
    //   setModalVisible(true);
    // };
    // const closeModal = () => {
    //   setModalVisible(false);
    // };
    // const successNotification = (text) => {
    //   notification['success']({
    //     message: text,
    //     style: { backgroundColor: '#4e2e4b' },
    //   });
    // };
    // const errorNotification = (text) => {
    //   notification['error']({
    //     message: text,
    //     style: { backgroundColor: '#4e2e4b' },
    //   });
    // };
    useEffect(() => {
      refreshStatsData();
      let interval = setInterval(() => refreshStatsDataWithoutLoading(), 15000);
      return () => clearTimeout(interval);
    }, []);
    // useEffect(() => {
    //   console.log('statsData', statsData);
    // }, [statsData]);
    return (
      <>
      <div className="outer">
        <Stats statsData={statsData} loading={statsLoading} />
        {/* <BuySell
          statsData={statsData}
          userData={userData}
          loading={userLoading}
          signer={context.signer}
          waitForApprovalModal={waitForApprovalModal}
          waitForConfirmedTransactionModal={waitForConfirmedTransactionModal}
          closeModal={closeModal}
          updateUserSplashBalance={updateUserSplashBalance}
          updateUserAvaxBalance={updateUserAvaxBalance}
          errorNotification={errorNotification}
          successNotification={successNotification}
          getSplashAllowance={getSplashAllowance}
        /> */}
        <Swap />
        <Charts />
        <Footer />
        <TxModal
          visible={modalVisible}
          text={modalText}
          modalClosable={modalClosable}
    
        />
        </div>
      </>
    );
  };
  
  export default Trade;
  