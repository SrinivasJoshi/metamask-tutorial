import { providers } from 'ethers';
import { useState, useEffect, useRef } from 'react';
import Web3Modal from 'web3modal';
import './App.css';

function App() {
	const [address, setAddress] = useState('');
	const [walletConnected, setWalletConnected] = useState(false);
	const web3ModalRef = useRef();

	const connectWallet = async () => {
		try {
			setWalletConnected(true);
			const signer = await getProviderOrSigner(true);
			const _address = await signer.getAddress();
			setAddress(_address);
		} catch (error) {
			console.log(error);
		}
	};

	const getProviderOrSigner = async (needSigner = false) => {
		const provider = await web3ModalRef.current.connect();
		const web3Provider = new providers.Web3Provider(provider);

		if (needSigner) {
			const signer = web3Provider.getSigner();
			return signer;
		}
		return web3Provider;
	};

	useEffect(() => {
		if (!walletConnected) {
			web3ModalRef.current = new Web3Modal({
				providerOptions: {},
				disableInjectedProvider: false,
			});
			connectWallet();
		}
	}, [walletConnected]);
	return (
		<div className='App'>
			{walletConnected ? <h2>User : {address}</h2> : <h2>Loading...</h2>}
		</div>
	);
}

export default App;
