import Stats from '../components/Chest/Stats.jsx';
import Manage from '../components/Chest/Manage.jsx';
import Description from '../components/Chest/Description.jsx';
import WhoSplashed from '../components/Chest/WhoSplashed.jsx';
import Tools from '../components/Chest/Tools.jsx';
import About from '../components/Chest/About.jsx';
import Footer from '../components/Footer.jsx';
import TxModal from '../components/TxModal.jsx';
import { useContext, useState, useEffect } from 'react';
import { WalletContext } from '../utils/WalletContext.jsx';
import {
  refreshTheTapStats,
  getSplashAllowanceTheTap,
  getWaveStarter,
  getLastCheckin,
} from '../utils/AvalancheHelper.jsx';
import { notification, Modal } from 'antd';

const Chest = () => {
    const context = useContext(WalletContext);
    const initialeData = {
      claimed: 0,
      claimsAvailable: 0,
      deposits: 0,
      indirectPlayers: 0,
      maxPayout: 0,
      directPlayers: 0,
      rewarded: 0,
      splashPrice: 0,
      splashBalance: 0,
      waveStarter: '0x0000000000000000000000000000000000000000',
      lastCheckin: 0,
      currentPayoutRate: 200,
      depositTime: 0,
    };
    const [data, setData] = useState(initialeData);
    const [loading, setLoading] = useState(false);
    const [modalText, setModalText] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalClosable, setModalClosable] = useState(false);
    useEffect(() => {
      let interval;
      if (context.address) {
        refreshAllData();
        interval = setInterval(() => refreshAllDataWithoutLoading(), 5000);
      } else {
        setData(initialeData);
      }
      return () => clearTimeout(interval);
    }, [context.address]);
    const refreshAllData = async () => {
      setLoading(true);
      // let r = await refreshTheTapStats(
      //   '0x46Ce4509a48cc82674B80d68EFA322FF68Fe47cd'
      // );
      let r = await refreshTheTapStats(context.address);
      // console.log(r);
      setData(r);
      setLoading(false);
    };
    const refreshAllDataWithoutLoading = async () => {
      // const r = await refreshTheTapStats(
      //   '0x46Ce4509a48cc82674B80d68EFA322FF68Fe47cd'
      // );
      let r = await refreshTheTapStats(context.address);
      // console.log({ r });
      setData(r);
      setLoading(false);
    };
    const updateApprovedSplash = async () => {
      const splashAllowanceTheTap = await getSplashAllowanceTheTap(
        context.address
      );
      // console.log({ splashAllowanceTheTap });
      setData((data) => {
        return { ...data, splashAllowanceTheTap };
      });
    };
    const updateWaveStarterAndLastCheckin = async () => {
      const waveStarter = await getWaveStarter(context.address);
      const lastCheckin = await getLastCheckin(context.address);
      // console.log({ waveStarter, lastCheckin });
      setData((data) => {
        return { ...data, waveStarter, lastCheckin };
      });
    };
    const waitForApprovalModal = () => {
      setModalText('Confirm the transaction with your wallet');
      setModalVisible(true);
    };
    const waitForConfirmedTransactionModal = () => {
      setModalText('Wait for the transaction to be confirmed...');
      setModalVisible(true);
    };
    const closeModal = () => {
      setModalVisible(false);
    };
    const successNotification = (text) => {
      notification['success']({
        message: text,
        style: { backgroundColor: '#4e2e4b' },
      });
    };
    const errorNotification = (text) => {
      notification['error']({
        message: text,
        style: { backgroundColor: '#4e2e4b' },
      });
    };
  
    return (
      <>
        <Stats data={data} loading={loading} />
        <Manage
          data={data}
          loading={loading}
          signer={context.signer}
          waitForApprovalModal={waitForApprovalModal}
          waitForConfirmedTransactionModal={waitForConfirmedTransactionModal}
          closeModal={closeModal}
          updateApprovedSplash={updateApprovedSplash}
          errorNotification={errorNotification}
          successNotification={successNotification}
          updateWaveStarterAndLastCheckin={updateWaveStarterAndLastCheckin}
          refreshAllData={refreshAllData}
        />
        <Tools
          data={data}
          updateApprovedSplash={updateApprovedSplash}
          waitForApprovalModal={waitForApprovalModal}
          waitForConfirmedTransactionModal={waitForConfirmedTransactionModal}
          closeModal={closeModal}
          errorNotification={errorNotification}
          successNotification={successNotification}
          refreshAllData={refreshAllData}
        />
        <WhoSplashed />
        <Footer />
        <TxModal
          visible={modalVisible}
          text={modalText}
          modalClosable={modalClosable}
        />
      </>
    );
  };
  
  export default Chest;
  