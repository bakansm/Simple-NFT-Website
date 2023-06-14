import { contractAddress } from './address';
import { contractAbi } from './abi';
import { ethers } from 'ethers';
import axios from 'axios';

const provider = new ethers.providers.InfuraProvider(
	'sepolia',
	'8b50032c9a4f4ff2823c2200a47e6471'
);

const signer = new ethers.Wallet(
	'cd22b04497743e707b619886385e5cac122407ac27e7e9a8ba215cf4c13a907d',
	provider
);

export const contract = new ethers.Contract(
	contractAddress,
	contractAbi,
	signer
);

export const getContractName = async () => {
	const name: string = await contract.name();
	return name;
};

export const getNFTBalance = async (address: string) => {
	const balance: number = await contract.balanceOf(address);
	return balance;
};

export const getSymbol = async () => {
	const symbol: string = await contract.symbol();
	return symbol;
};

export const getOwner = async () => {
	const owner: string = await contract.owner();
	return owner;
};

export const getOwnerOf = async (tokenId: number) => {
	const ownerOf: string = await contract.ownerOf(tokenId);
	return ownerOf;
};

export const getBaseURIExtended = async () => {
	const uri: string = await contract._baseURIextended();
	return uri;
};

export const getTokenURI = async (tokenId: number) => {
	const uri: string = await contract.tokenURI(tokenId);
	return uri;
};

export const getAllNFTIds = async () => {
	const amountOfId: number = await contract.getAllTokenId();
	const NFTIdsArr: number[] = [];
	for (let i = 1; i < amountOfId; i++) {
		NFTIdsArr.push(i);
	}
	return NFTIdsArr;
};

export const getNFTImageUrlMetadata = async (tokenId: number) => {
	const config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: `https://www.galverse.art/api/metadata/${tokenId.toString()}`,
		headers: {},
	};

	return await axios
		.request(config)
		.then((response) => response.data.image.slice(7))
		.catch((error) => console.log(error));
};

export const mintNFT = async (address: string) => {
	try {
		const mintNft = await contract.safeMint(address);
		const receipt = await provider.waitForTransaction(mintNft.hash);
		return receipt;
	} catch (err) {
		alert('This account cannot mint, pls change the account!');
	}
};