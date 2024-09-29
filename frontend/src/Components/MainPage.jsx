import { useState, React } from "react";
import { Footer } from "./footer";


export function MainPage() {
  // State to keep track of the list of wallet
  const [wallet, setWallet] = useState([""]);

  // Function to handle adding new input fields
  const addInput = () => {
    setWallet([...wallet, ""]); // Add a new empty input
  };

  // Function to handle changes in input fields
  const handleInputChange = (index, value) => {
    const newInputs = [...wallet];
    newInputs[index] = value;
    setWallet(newInputs);
  };

  const sendRequest = async () => {
    const firstWallet = wallet[0]; // Get the first wallet address
    if (!firstWallet) {
      console.error("No wallet address provided");
      return; // Exit if the first wallet is empty
    }

    try {
      const response = await fetch("http://localhost:3000/user/wallet", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: firstWallet }), // Send only the first wallet address
      });
      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors gracefully
    }
  };
  return (
    <div>
      <p className="text-5xl font-semibold text-gray-700 text-center mt-40">
        Enter the sender's wallet address
      </p>
      <div className="flex flex-col items-center gap-3 px-3 py-4 mt-[5%]">
        {wallet.map((input, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              required
              className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4"
              type="text"
              placeholder="0xcB1C1FdE09f811B294172696404e88E658659905"
            />
          </div>
        ))}
        <button
          onClick={addInput}
          className="btn h-[6%] outline-dashed py-3 hover:text-white rounded-lg p-5 mt-[0.3%] hover:bg-slate-500"
        >
          Add more
        </button>
      </div>
      <button onClick={sendRequest}
        className="btn h-[6%] ml-[64%] bg-blue-500 text-white py-3 hover:text-white rounded-lg p-5 mt-[0.3%] hover:bg-slate-500"
      >
        Send request
      </button>
      <Footer />
    </div>
  );
}
