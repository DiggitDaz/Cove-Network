import { useState, useEffect } from 'react';
import Header from '../components/Home/Header.jsx';
import { refreshHomeData } from '../utils/AvalancheHelper.jsx';
import Stats from '../components/Home/Stats.jsx';
import Description from '../components/Home/Description.jsx';
import Charts from '../components/Charts.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
    const [data, setData] = useState({});
    const refreshData = async () => {
      const _data = await refreshHomeData();
      setData(_data);
    };
    useEffect(() => {
      refreshData();
      let interval = setInterval(() => refreshData(), 15000);
      return () => clearTimeout(interval);
    }, []);

return (
    <>
    <Header/>
    <Description />
    <Stats data={data} />
    <Charts />
    <Footer />
    </>

);

};

export default Home;