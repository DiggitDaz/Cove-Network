import Home from './pages/Home.jsx';
import Trade from './pages/Trade.jsx';
import Chest from './pages/Chest.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import WalletContextProvider from './utils/WalletContext.jsx';
import MyMenu from './components/Menu.jsx';

function App() {
  return (
    <WalletContextProvider>
    <div className="full-landing-image">
      <BrowserRouter>
      <MyMenu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Trade" element={<Trade />} />
          <Route exact path="/Chest" element={<Chest />} />
          </Routes>
      </BrowserRouter>
    </div>
    </WalletContextProvider>
  );
}

export default App;
