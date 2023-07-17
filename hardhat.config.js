require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-etherscan");
const {
    BigNumber
} = require("@ethersproject/bignumber");
require('dotenv').config()


const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const VERIFICATION_API_KEY = process.env.VERIFICATION_API_KEY;


task('deploy', 'Deploy Torum XTM Token Contract')
    .setAction(async () => {
        const [deployer] = await ethers.getSigners();

        console.log(
            `Deploying Torum XTM Contract with the account: ${deployer.address}`
        );
        console.log(`Deployer balance: ${ethers.utils.formatEther(await deployer.getBalance())} BNB`);

        const Token = await ethers.getContractFactory('Torum');
        const tokenContract = await Token.deploy();

        console.log('Token Contract address:', tokenContract.address);

        console.log('Mining...');
        await tokenContract.deployed();
        console.log(`Deployer balance: ${ethers.utils.formatEther(await deployer.getBalance())} BNB`);
    });

module.exports = {
    networks: {
        target: {
            url: RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        fork: {
            url: 'http://localhost:8545',
        },
        hardhat: {
            forking: {
                url: RPC_URL,
            }
        },
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: VERIFICATION_API_KEY
    },
    solidity: {
        version: '0.8.20',
        settings: {
            optimizer: {
                enabled: true,
                runs: 999999,
            },
        },
    },
};
