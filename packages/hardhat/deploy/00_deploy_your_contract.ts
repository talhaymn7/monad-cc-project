import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMultiplayerPayment: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("MultiplayerPayment", { // Solidity dosyasındaki 'contract MultiplayerPayment' ismiyle aynı olmalı
    from: deployer,
    args: [], // Senin kontratında constructor parametresi olmadığı için boş bırakıyoruz
    log: true,
    autoMine: true,
  });

  console.log("🚀 MultiplayerPayment kontratı başarıyla deploy edildi!");
};

export default deployMultiplayerPayment;

deployMultiplayerPayment.tags = ["MultiplayerPayment"];