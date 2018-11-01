# [Kings Of London]

## Terminal Commands

1. Run in terminal: ```npm install```
2. Then: ```truffle compile``` (add a copy of KOLogic.json to /src/json)
3. Then: ```truffle migrate``` (if running tests on ganache use the '--reset --network ganache' flags)
4. Update the contract address at /src/variables/Variables.jsx
5. Then: ```npm start```
6. Navigate to `http://localhost:3000/`



King’s of London is a decentralized application (dApp) created by KCL Blockchain. The dApp was built using Solidity, to be ran on the Ethereum blockchain, and explores the concept of digital scarcity. Making use of Non-Fungible Tokens (NFTs), the dApp allows users to buy digital blocks, giving them the right to select a picture to be displayed on their block publicly. This block can then be resold on the secondary market, and anyone willing to pay the price set by the user can become the owner of that block. 

The dApp is a Proof of Concept of a game, and aims to define who the kings of the city of London are. Blocks can be bought from one of four domains, which represent London’s four best universities: King’s College London, University College London, London School of Economics and Imperial College London. By buying a block under the domain of your university of choice, you express your support for that university, and the university with the most bought blocks at any given moment is the current King of London.

The reasons for using blockchain for this application are:

Decentralization: The creators of the dApp have no control over how it is used. Information is registered directly on the blockchain and cannot be altered by the creators.
Digital scarcity: Using blockchain allows for the implementation of digital scarcity, which was previously not possible. Once a block is bought, it cannot be bought again, and as the number of purchases increase, the number of available blocks will decrease. This cannot be changed by anyone, and hence there is a competition to acquire blocks.
Immutability: While the front-end of the application is under centralized control, the information which defines the owner of a block and the picture it represents is stored on an immutable ledger, and can be verified by anyone, as well as used by anyone to build a separate application in case the original one fails.

The application uses smart contracts written in Solidity and web3js for the integration between the contracts and the front-end. 
