import React, { useMemo } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
// import { clusterApiUrl } from "@solana/web3.js";
import { UnsafeBurnerWalletAdapter, PhantomWalletAdapter, AvanaWalletAdapter, AlphaWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = "https://solana-mainnet.g.alchemy.com/v2/7oIO33FX9H3X3_ngqRkGpKSXw0lI3hbQ"

  const wallets = useMemo(
    () => [
      new UnsafeBurnerWalletAdapter(),
      new PhantomWalletAdapter(),
      new TorusWalletAdapter(),
      new AlphaWalletAdapter(),
      new AvanaWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ToastContainer draggable position="top-right" pauseOnHover />
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
