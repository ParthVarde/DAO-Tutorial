const { ethers } = require("hardhat");
const { CRYTODEVS_NFT_COTNRACT_ADDRESS } = require("../constants");

async function main() {
  const FakeNFTMarketPlaceFactory = await ethers.getContractFactory("FakeNFTMarketPlace");
  const fakeNFTMarketPlace = await FakeNFTMarketPlaceFactory.deploy();
  await fakeNFTMarketPlace.deployed();
  console.log("Fake market deployed to - ", fakeNFTMarketPlace.address);

  const CryptoDevsDAOFactory = await ethers.getContractFactory("CryptoDevsDAO");
  const cryptoDevsDAO = await CryptoDevsDAOFactory.deploy(fakeNFTMarketPlace.address, CRYTODEVS_NFT_COTNRACT_ADDRESS);
  await cryptoDevsDAO.deployed();
  console.log("DAO deployed to - ", cryptoDevsDAO.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});