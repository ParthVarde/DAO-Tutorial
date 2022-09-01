const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { CRYTODEVS_NFT_COTNRACT_ADDRESS } = require("../constants");

describe("CryptoDevsDAO", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCryptoDevsDAO() {
    const [owner, otherAccount] = await ethers.getSigners();
    const FakeNFTMarketPlaceFactory = await ethers.getContractFactory("FakeNFTMarketPlace");
    const fakeNFTMarketPlace = await FakeNFTMarketPlaceFactory.deploy();
    const CryptoDevsDAOFactory = await ethers.getContractFactory("CryptoDevsDAO");
    const cryptoDevsDAO = await CryptoDevsDAOFactory.deploy(fakeNFTMarketPlace.address, CRYTODEVS_NFT_COTNRACT_ADDRESS, { value: ethers.utils.parseEther("0.1") });
    return { cryptoDevsDAO, fakeNFTMarketPlace, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { cryptoDevsDAO, owner } = await loadFixture(deployCryptoDevsDAO);

      expect(await cryptoDevsDAO.owner()).to.equal(owner.address);
    });
  });

  describe("Withdrawals", function () {
    it("Should revert with the right error if called from another account", async function () {
      const { cryptoDevsDAO, otherAccount } = await loadFixture(deployCryptoDevsDAO);

      await expect(cryptoDevsDAO.connect(otherAccount).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
