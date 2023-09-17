const hre = require("hardhat");

async function main() {
  const feeInWei = BigInt(1000000000000000000); // 0.001 ether = (0.001 x 1e18) wei = 1000000000000000000 wei

  const Contract = await hre.ethers.getContractFactory("StableArt");
  const contractDeploy = await Contract.deploy(feeInWei);

  await contractDeploy.waitForDeployment();

  console.log(`Contract deployed! Adress: ${(await contractDeploy.getAddress()).toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
