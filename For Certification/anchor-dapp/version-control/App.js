import './App.css';
import viper from './assets/viper.png'

import {useEffect, useState} from 'react'
import * as anchor from "@project-serum/anchor";
import {Buffer} from 'buffer';
import idl from './user_input.json'
import { Connection, PublicKey, clusterApiUrl  } from '@solana/web3.js';
import { Program, AnchorProvider, web3, utils } from '@project-serum/anchor';
const {SystemProgram,Keypair} = web3;
window.Buffer = Buffer
const programID = new PublicKey('9WJTdSQ1F96fJFSGfpQMD6AEPqy14p5KcQuetDCRab91')
const opts = {
  preflightCommitment:"processed",
}


//const network = "http://127.0.0.1:8899";  // for localnet
//const network = clusterApiUrl("devnet") // for devnet
const network = clusterApiUrl("testnet") // for testnet


const new_account = Keypair.generate();
console.log(new_account)

function App() {
  
  const [userInput, setUserInput] = useState("");

  const [walletaddress, setWalletAddress] = useState("");


  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };


  const connectWallet = async () => {
    if (!window.solana) {
      alert("Solana wallet not found. Please install Sollet or Phantom extension.");
      return;
    }

    // Connect the wallet using the provider
    try {
      await window.solana.connect();
      const provider = getProvider();
      const walletAddress = provider.wallet.publicKey.toString();
      setWalletAddress(walletAddress);
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  async function input() {
  const dataAcc = new_account
  console.log(dataAcc)
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
  
    try {
      await program.rpc.initialize(userInput, {
        accounts: {
          newAccount: new_account.publicKey,
          signer: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [new_account],
      });
      const account = await program.account.newAccount.fetch(new_account.publicKey);
      console.log('Output: ', account);
    } catch (err) {
      console.error("Transaction Error:", err);
    }
  }
  







  return (

    
    <div className="App">
      <header className="App-header">
        <img src={viper} className="App-logo" alt="logo" />
        <button onClick={connectWallet}>Connect Wallet</button>

  <p>Address: {walletaddress}</p>
  <input value={userInput} onChange={(e) => setUserInput(e.target.value)} />
<button onClick={input}>Submit</button>
      </header>
    </div>
  );
}

export default App;
