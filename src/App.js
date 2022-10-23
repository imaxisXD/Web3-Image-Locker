import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [hasMetamaskWallet, setHasMetamaskWallet] = useState(false);
  const [hasPhantomWallet, setHasPhantomWallet] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const { ethereum, solana } = window;

  async function checkWalletIsConnected() {
    try {
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function connectSolana() {
    try {
      if (hasPhantomWallet) {
        const accounts = await window.solana.connect();
        console.log(
          "Connected with Public Key:",
          accounts.publicKey.toString()
        );
        setWalletConnected(true);
        setUserAddress(accounts.publicKey.toString());
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (ethereum?.isMetaMask) {
      setHasMetamaskWallet(true);
    }
    if (solana?.isPhantom) {
      setHasPhantomWallet(true);
    }
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
          {!userAddress && (
            <>
              <button
                className="cta-button connect-wallet-button"
                onClick={connectWallet}
              >
                Connect Ethereum Wallet
              </button>
              <button
                className="cta-button connect-wallet-button"
                onClick={connectSolana}
              >
                Connect Solana Wallet
              </button>
            </>
          )}
        </div>
        {userAddress}
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
