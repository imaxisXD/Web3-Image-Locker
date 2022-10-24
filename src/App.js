import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import ToastAlert from "./components/ToastAlert";
// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { ethereum, solana } = window;
  const [hasMetamaskWallet, setHasMetamaskWallet] = useState(
    ethereum?.isMetaMask
  );
  const [hasPhantomWallet, setHasPhantomWallet] = useState(solana?.isPhantom);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [alertObject, setAlertObject] = useState({});

  async function checkWalletAlreadyConnected() {
    try {
      if (hasMetamaskWallet) {
        const accounts = await ethereum.request({
          method: "eth_accounts",
        });
        setWalletConnected(true);
        setUserAddress(accounts[0].toString());
      } else {
        setHasMetamaskWallet(false);
        console.log("Please install Metamask Wallet");
        console.log("Please install Metamask Wallet");
      }
      if (hasPhantomWallet) {
        const accounts = await window.solana.connect();
        setWalletConnected(true);
        setUserAddress(accounts.publicKey.toString());
      } else {
        setHasPhantomWallet(false);
        console.log("Please install Phantom Wallet");
        console.log("Please install Phantom Wallet");
      }
    } catch (error) {
      setAlertObject((prev) => ({
        type: "error",
        message: "Wallet is not connected already",
        showAleart: true,
      }));
    }
  }
  async function connectWallet() {
    try {
      if (hasMetamaskWallet) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletConnected(true);
        setUserAddress(accounts[0].toString());
      } else {
        setHasMetamaskWallet(false);
        console.log("Please install Metamask Wallet");
        console.log("Please install Metamask Wallet");
      }
    } catch (error) {
      setAlertObject((prev) => ({
        type: "error",
        message: error.message,
        showAleart: true,
      }));

      // console.log(error);
      // console.log("error");
    }
  }
  async function connectSolana() {
    try {
      if (hasPhantomWallet) {
        const accounts = await window.solana.connect();
        setWalletConnected(true);
        setUserAddress(accounts.publicKey.toString());
      } else {
        setHasPhantomWallet(false);
        console.log("Please install Phantom Wallet");
        console.log("Please install Phantom Wallet");
      }
    } catch (error) {
      console.log(error);
      return <ToastAlert />;
    }
  }

  useEffect(() => {
    checkWalletAlreadyConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
        </div>
        <div className="connect-btn">
          {(!userAddress || walletConnected) && (
            <>
              {hasMetamaskWallet && (
                <button
                  className="cta-button connect-wallet-button"
                  onClick={connectWallet}
                >
                  Connect Ethereum Wallet
                </button>
              )}
              {hasPhantomWallet && (
                <button
                  className="cta-button connect-wallet-button"
                  onClick={connectSolana}
                >
                  Connect Solana Wallet
                </button>
              )}
            </>
          )}
        </div>
        {userAddress}
        <ToastAlert
          type={alertObject.type}
          message={alertObject.message}
          showAleart={alertObject.showAleart}
        />
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
