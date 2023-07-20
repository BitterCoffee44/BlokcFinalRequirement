import './App.css';
import grave from './picture/graves.png'
import { useState} from 'react'
import {Buffer} from 'buffer';
import idl from './idl.json'
import { Connection, PublicKey, clusterApiUrl  } from '@solana/web3.js';
import { Program, AnchorProvider, web3, } from '@project-serum/anchor';
import * as Web3 from '@solana/web3.js';
const {SystemProgram,Keypair} = web3;
window.Buffer = Buffer
const programID = new PublicKey('9pLJrZrXoHjtRainTT9QxQ9PLrZ6jQXvD6PsCiDEkZUB');


const opts = {
  preflightCommitment:"processed",
}


//const network = "http://127.0.0.1:8899";  // for localnet
//const network = clusterApiUrl("devnet") // for devnet
const network = clusterApiUrl("testnet") // for testnet


const new_account = Keypair.generate();
console.log(new_account)

function Homepage() {
  
  const [userInput, setUserInput] = useState("");
  const [walletaddress, setWalletAddress] = useState("");
  const [Tx, setTx] = useState("");
  const [txSig, setTxSig] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [txDone, setTxDone] = useState(false);



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
  const dataAcc = new_account;
  console.log(dataAcc);
  const provider = getProvider();
  const program = new Program(idl, programID, provider);

  try {

    const txSignature = await program.rpc.initialize("test", {
      accounts: {
        newAccount: new_account.publicKey,
        signer: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [new_account],
    });

    console.log('Account', new_account.publicKey);
    console.log('Sige', provider.wallet.publicKey);


    
    const confirmation = await provider.connection.confirmTransaction(txSignature, 'confirmed');
    console.log('Transaction Confirmation:', confirmation);


    console.log('Transaction Signature:', txSignature);

    setTx(txSignature);
     setTxDone(true)
    const account = await program.account.newAccount.fetch(new_account.publicKey);
    console.log('Output:', account);
  } catch (err) {
    console.error("Transaction Error:", err);
  }
}



  
const findTxRes = async () => {
  try {
    const conn = new Web3.Connection('https://api.testnet.solana.com');
    const fetchedTransaction = await conn.getConfirmedTransaction(txSig);

    console.log('Tx: ', fetchedTransaction);

    if (fetchedTransaction) {
      setTransactionDetails(fetchedTransaction);
    } else {
      console.log('Transaction not found.');
    }
  } catch (error) {
    console.error('Error fetching transaction:', error);
  }
};






return (
  <div className="Website">
    <header className="Website-header">
      <p style={{ fontSize: '48px', color: 'black' }}>Confessional Burial</p>
      <p style={{ fontSize: '32px', color: 'red' }}>"Decentralized Application where you could burrow your secrets."</p>
      <p style={{ fontSize: '32px', color: 'green' }}>Secrets are meant to be hidden forever</p>
      <p style={{ fontSize: '16px', color: 'green' }}>They are meant to be hidden in a place where only you could read them.</p>
      <img src={grave} className="App-logo" alt="logo" />
      <button style={{ fontSize: '16px', color: 'green' }} onClick={connectWallet}>Connect Wallet</button>
      <input value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button onClick={input}>Submit Confession</button>
      <p style={{ fontSize: '16px', color: 'green' }}>Address: {walletaddress}</p>
      <p style={{ fontSize: '16px', color: 'white' }}>=============================</p>
      <p style={{ fontSize: '16px', color: 'green' }}>Confession Signature: {Tx}</p>
      {txDone && (
        <p style={{ fontSize: 'smaller' }}>
          Confession Buried!{' '}
          <a
            href={`https://explorer.solana.com/tx/${Tx}?cluster=testnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Solana Explorer
          </a>
        </p>
      )}
      <input
        type="text"
        value={txSig}
        onChange={(event) => setTxSig(event.target.value)}
        placeholder="Enter Confession Signature"
      />
      <button onClick={findTxRes}>Dig Confession</button>

      {transactionDetails ? (
        <div>
          <h4>Confession Details</h4>
          {transactionDetails.transaction.instructions.length >= 2 ? (
            <div>
              {transactionDetails ? (
                <p>Your secret remains hidden and stored.</p> 
              ) : (
                <p>There is no confession data available for the given transaction.</p>
              )}
            </div>
          ) : (
            <p>No transaction data available.</p>
          )}
        </div>
      ) : null}
    </header>
  </div>
);
};

export default Homepage;
