import { ethers } from "hardhat"

async function main() {
  console.log("Deploying AccessControl contract...")

  const AccessControl = await ethers.getContractFactory("AccessControl")
  const accessControl = await AccessControl.deploy()

  await accessControl.waitForDeployment()

  const address = await accessControl.getAddress()
  console.log(`AccessControl deployed to: ${address}`)

  // Verify the contract on Etherscan
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await accessControl.deployTransaction.wait(6) // Wait for 6 block confirmations

    console.log("Verifying contract on Etherscan...")
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    })
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  }) 