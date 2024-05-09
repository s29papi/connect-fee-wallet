import { useState } from "react";

import "./Landing.css";
import {
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
 import { IoClose } from "react-icons/io5";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import * as web3 from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const Landing = () => {
  const [isSendingModalOpen, setIsSendingModalOpen] = useState(false);
  const [sendingAmount, setSendingAmount] = useState("");
  const [userCount, setUserCount] = useState(101); // interchange the value between [0-100] && > 100
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();




  const handleUserCount = () => {
    // change to storage in the db
    // fetch fetch user count and update
    const newUserCount = userCount + 1;
    setUserCount(newUserCount)
    console.log("new user count: ", userCount)
  }



  const closeSendingModal = () => {
    setIsSendingModalOpen(false);
  };

  const handleSendSolana = () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const sendingAmountFloat = parseFloat(sendingAmount);
    if (isNaN(sendingAmountFloat)) {
      console.error("Invalid input for sending amount");
      return;
    }
    
    const userPubkeyStr = publicKey.toString();
    const web3PubkeyUserAddress = new web3.PublicKey(userPubkeyStr);
    const platformAddress = "6Q66xtF8A45QmqtCHNEZwgWdLeFFwf3UeeKamyucNYBF";
    let web3PubkeyPlatformAddress = new web3.PublicKey(platformAddress);
    let fee = userCount > 100 ? parseFloat("0.005") : 0;
    const amountandfee = sendingAmountFloat + fee
    const lamports = Math.round(web3.LAMPORTS_PER_SOL * amountandfee);
   
    const tx = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: web3PubkeyUserAddress,
        toPubkey: web3PubkeyPlatformAddress,
        // 1 solana == 1 Billion Lamport
        // 1 billion * amount = amount sol.
        lamports: lamports,
      })
    );

    (async () => {
      await connection.getLatestBlockhashAndContext();
      const signature = await sendTransaction(tx, connection);
    console.log(signature);
    })()

    handleUserCount()
    // Close the modal
    closeSendingModal();
  };





  return (
    <>
      <div className={`hidden md:flex h-screen bg-gray-200 font-montserrat`}>
        <div className={`flex-1 flex flex-col relative `}>
            <div className="flex-1 flex items-center justify-center bg-white space-x-[500px]">
              <div>
                <p className="text-2xl text-gray-500">
                  Connect Wallet
                </p>
                <div className={`flex justify-center`}>
                  <div className={`space-y-[20px]`}>
                    <div className={`my-[20px]`}>
                      <WalletMultiButton
                        className={`w-full bg-[#4082BC] transition-transform ease-in-out duration-200 
                        transform hover:translate-y-[-5px]`}
                        style={{
                          backgroundColor: "#4082BC",
                          color: "#fff",
                          width: "100%",
                          fontFamily: "Montserrat",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-2xl text-gray-500">
                  Pay Sol
                </p>
                <div className={`flex justify-center`}>
                  <div className={`space-y-[20px]`}>
                    <div className={`my-[20px]`}>
                    <button
                        className={`bg-yellow text-[#fff] px-8 py-3 rounded-md font-[600]`}
                        onClick={() => {
                          setIsSendingModalOpen(true);
                        }}
                      >
                        Pay
                  </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        
        </div>

        {isSendingModalOpen &&( 
            <div className={`absolute top-0 left-0 w-[100vw] h-[100vh] font-montserrat`}>
                <div className={`w-full h-full bg-[#0000007b] flex justify-center items-center`}>
                    <div className={`bg-[#fff] rounded-[8px] p-[20px] w-[500px] relative`}>
                        <div className={`flex justify-end`}>
                          <IoClose
                            size={25}
                            className={`cursor-pointer`}
                            onClick={() => setIsSendingModalOpen(false)}
                          />
                        </div>

                        <p className={`text-center font-[600] text-[22px] mt-[20px]`}>
                          Send Solana to 
                        </p>

                        <input
                          type="text"
                          className={`w-full border-2 rounded-md p-2 my-[20px] outline-none`}
                          placeholder="Enter SOL amount..."
                          value={sendingAmount}
                          onChange={(e) =>
                            setSendingAmount(e.target.value)
                          }
                        />


                        <div className={`flex justify-center`}>
                          <button
                            className={`bg-yellow text-[#000] px-4 py-2 rounded-md font-[600]`}
                            onClick={() => {
                              handleSendSolana();
                              setSendingAmount("");
                            }}
                          >
                            Pay SOL
                          </button>
                        </div>
              </div>
            </div>
          </div>
        )} 
      </div>
    </>
  );
};

export default Landing;
