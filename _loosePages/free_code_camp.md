---
title: "Blockchain Learning"
layout: post
---

# Blockchain Learning 🟦

Date: July 16, 2024 → July 29, 2024

Source: https://www.youtube.com/watch?v=M576WGiDBdQ

Github: https://github.com/smartcontractkit/full-blockchain-solidity-course-py

# General

## Upgrades

Smart contracts are immutable 

This means that after creating it, any upgrades and bug fixes are hard

Tradeoff between immutability and upgradability

3 upgrade methods

1. Parameterize (not really)
    1. Can’t add new storage and new logics
    2. Have a lot of setter functions for most things so that they can be updated in the future by some admin (Need some governance protocol instead of single group/entity so that it doesn’t become a centralized smart contract)
2. Migration (social yeet)
    1. Truly immutable 
    2. Version 1 → Version 2 kind of thing
    3. Tell everyone to move to the new one 
    4. Migrate your own state to the second one
3. Proxies
    1. Keep state, keep contract address, update logic
    2. Use a lot of low level functions (easy to screw up) such as [delegatecall](https://solidity-by-example.org/delegatecall/) → do another contract’s function in my contract
    3. In conjunction with this, use fallback function
    4. To do this we need
        1. `Implementation Contract` which has code to our protocol. Upgrading launches new implementation contract.
        2. `Proxy Contract` which points to the correct implementation contract. Store all the variables here so that upgrading does not clear my data.
        3. `User` which makes calls to proxy
        4. `Admin` which is some users who does the upgrades
    5. Common Mistakes
        1. Storage Clashes
        2. Function Selector Clashes

# Smart Contracts

## Remix

### Create Contract

1. Go to [Remix IDE](https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.26+commit.8a97fa7a.js) to start 
2. Create new file 
    1. See docs [here](https://docs.soliditylang.org/en/v0.8.26/). See comments for slightly more elaborated explanations.
    
    ```solidity
    // SPDX-License-Identifier: GPL-3.0  
    // Need to include the line above to compile in Remix
    
    pragma solidity >=0.8.2 <0.9.0; // This is to specify the version of solidity
    // Solidity is constantly updated so it would be great to switch between versions
    
    /**
     * 
     *  A multi-line comment specifying the purpose of the contract
     * 
     */
    
    contract SimpleStorage { // contract keyword is like specifying object in OOP
    
        uint256 public favouriteNumber = 5; // Make this variable public so can see it
        // In docs, search for visibility of functions and state variables
        bool favourite = true;
        // A variable is actually a function to just return itself
        // Without setting the visibility, default is internal
        string favouriteString = "string";
        int256 favouriteInt = -5;
        address favouriteAddress = 0x838Dd1E0d97631FD1D94734A7Ced0D7A1eb6b803; 
        bytes32 favouriteBytes = "cat";
        // See docs for more data types
        
        // Now create a public function
        function store(uint256 _favouriteNumber) public {
            favouriteNumber = _favouriteNumber;
        }
    }
    ```
    
3. After creating the function, deploy the contract to see the functions
    1. Left sidebar > Deploy and Run transactions > Deploy
    2. Green arrow come out at the terminal indicates successful deployment of contract
    3. Transaction will be recorded and then we can interact with the function
        1. Can see that wallet will have paid a bit of gas to do this interaction
        2. Deployed/Unpinned Contracts > Can click “Store” after writing an uint256
        3. If the variable is public, can also see the value of this variable
4. Explore more functions
    
    ```solidity
    // ...
    
    contract SimpleStorage { 
    		// The above stuff in contract...
        function retrieve() public view returns(uint256){
            return favouriteNumber;
        } // Instead of the button in the IDE, we can define a function to retrieve variable
        
        // struct is basically creating a new type 
        // Allows us to associate a variable with a user
        struct People {
            string name;
            uint256 favouriteNumber;
        }
        People public person = People({name: "Bob", favouriteNumber: 55});
        // Above line to create 1 person
        
        People[] public people; 
        // To create an array, [] for dynamic array, [1] for array of size 1.
        // This takes in an index to retrieve details of the 0th person.
    
        mapping(string => uint256) public nameToFavNumber; // Has to be created with nameToFavNumber in add_person function
    
        function add_person(string memory _name, uint256 _favouriteNumber) public {
            people.push(People({favouriteNumber: _favouriteNumber, name: _name}));
            nameToFavNumber[_name] = _favouriteNumber; // Creates the arrow which points to favouriteNumber for mapping to use
        }
        // Can store data on "memory" or in "storage"
        // memory: only stored in execution and then delete the variable
        // storage: keep it forever
    }
    ```
    
5. We have finished writing the contract. Full code here. 
    
    [Code for Person contract in Blockchain learning](https://www.notion.so/Code-for-Person-contract-in-Blockchain-learning-16612a92aeab4c8496d7134e15a57cf8?pvs=21)
    
6. Now, we want to deploy this contract to the testnet. 
7. Get test ETH from [faucet](https://faucets.chain.link/sepolia) using sepolia network
8. Go to Deploy and Run transactions > environments > change from wtv VM to Injected VM
    1. Authenticate from metamask
    2. Change network in metamask plugin to sepolia network
9. Press Deploy and 
    1. This will pop up and we can confirm if we are happy with the transaction. 
    
    ![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled.png)
    
    ![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled%201.png)
    
10. Can view contract creation transaction On [etherscan](https://sepolia.etherscan.io/address/0x838Dd1E0d97631FD1D94734A7Ced0D7A1eb6b803).
11. Next, can interact with the contract through using the same IDE buttons. When there are state changes (orange buttons), metamask will pop up and ask us to pay gas fees (slightly less than a dollar).
12. Can also verify through etherscan. 
    
    ![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled%202.png)
    

### Storage Factory

1. Copied the code from github
2. This Storage Factory teaches about Factory Pattern, where users can use the contract to generate and deploy their own lists
3. Same as python, the way of interacting with a contract within another contract
4. Create SimpleStorage.sol and StorageFactory.sol in the same folder
5. StorageFactory
    
    ```solidity
    // SPDX-License-Identifier: MIT
    
    pragma solidity ^0.6.0;
    
    import "./SimpleStorage.sol"; // Same as copy pasting the prev contract in here
    // In Remix, can then select which contract we want to deploy
    
    // This line says that StorageFactory is of type SimpleStorage
    // This means that StorageFactory will inherit all the functions of SimpleStorage too
    contract StorageFactory is SimpleStorage { 
        SimpleStorage[] public simpleStorageArray; 
        
        function createSimpleStorageContract() public {
            SimpleStorage simpleStorage = new SimpleStorage();
            simpleStorageArray.push(simpleStorage);
        }
        
        function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
            // Whenever we interact with contract, we need these two:
            // ABI - We get this from the import of SimpleStorage.sol
            // Address - We get this from simpleStorageArray created above
            
            // Creating a SimpleStorage object using the address in simpleStorageArray, then calling the store function from the object.
            // this line has an explicit cast to the address type and initializes a new SimpleStorage object from the address
            SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).store(_simpleStorageNumber); 
    
            //this line simply gets the SimpleStorage object at the index _simpleStorageIndex in the array simpleStorageArray
            //simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
        }
        
        function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
            //this line has an explicit cast to the address type and initializes a new SimpleStorage object from the address 
            return SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).retrieve(); 
    
            //this line simply gets the SimpleStorage object at the index _simpleStorageIndex in the array simpleStorageArray
            //return simpleStorageArray[_simpleStorageIndex].retrieve(); 
        }
    }
    ```
    

### FundMe

1. This is the how to make the contract allow payment
2. Need ETH/USD conversion rate
    1. So need oracles. But deterministic system, so need platforms such as Chainlink
    2. Can Use API as well
    3. See the [docs](https://docs.chain.link/) for more info and faucets for the networks
    4. The numbers look so big because of the wei/gwei/ether units
    5. 
    
    ```solidity
    // SPDX-License-Identifier: MIT
    
    // Smart contract that lets anyone deposit ETH into the contract
    // Only the owner of the contract can withdraw the ETH
    pragma solidity ^0.6.6 <0.9.0;
    
    // Get the latest ETH/USD price from chainlink price feed
    
    // IMPORTANT: This contract has been updated to use the Goerli testnet
    // Please see: https://docs.chain.link/docs/get-the-latest-price/
    // For more information
    
    // These imports can search google for "npm chainlink contracts" for more details
    // Keep the interfaces open in another tab to refer to what the functions will return, thus how we handle them.
    // interface keyword means that they done define the functions but just inform of the functions
    // Interfaces compile down to an ABI
    import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
    import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";
    
    contract FundMe {
        // safe math library check uint256 for integer overflows
        using SafeMathChainlink for uint256;
    
        //mapping to store which address depositeded how much ETH
        mapping(address => uint256) public addressToAmountFunded;
        // array of addresses who deposited
        address[] public funders;
        //address of the owner (who deployed the contract)
        // For use later the withdraw function c
        address public owner;
    
        // the first person to deploy the contract is the owner
        // constructor() is called at the top to construct the smart contract
        // this will be called the moment we deploy the smart contract
        constructor() public {
            owner = msg.sender;
        }
    
        function fund() public payable { // payable keyword says that this function can be used to pay 
    	  // Each transaction has a value of wei, gwei, finney or ether
    	  
            // 18 digit number to be compared with donated amount
            uint256 minimumUSD = 50 * 10**18;
            
            //is the donated amount less than 50USD?
            // Using require statement is much better than using if statement here, just because it is nicely packaged and implemented.
            // If trx does not meet transaction, then will revert and show the optional revert message.
            require(
                getConversionRate(msg.value) >= minimumUSD,
                "You need to spend more ETH!"
            );
             
            //if not, add to mapping and funders array
            addressToAmountFunded[msg.sender] += msg.value;
            funders.push(msg.sender);
        }
    
        //function to get the version of the chainlink pricefeed
        // Contract addresses can be found [here](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1). Take note of the network.
        // For this deployment need to go to injected web3 since its on an actual network.
        function getVersion() public view returns (uint256) {
            AggregatorV3Interface priceFeed = AggregatorV3Interface(
                0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
            );
            return priceFeed.version();
        }
    
        function getPrice() public view returns (uint256) {
            AggregatorV3Interface priceFeed = AggregatorV3Interface(
                0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
            );
            (, int256 answer, , , ) = priceFeed.latestRoundData(); // Since latestRoundData() returns 5 objects
            // The above is defining a tuple. Same as python. This is just another way of writing it, but cleaned up the unused variables.
            
            // ETH/USD rate in 18 digit
            return uint256(answer * 10000000000); // explicit casting of int256 (can see this in tuple above) into uint256
        }
    
        // 1000000000
        // Programmatic way of converting. See [here](https://etherscan.io/unitconverter) to explore.
        function getConversionRate(uint256 ethAmount)
            public
            view
            returns (uint256)
        {
            uint256 ethPrice = getPrice();
            uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000; 
            // Because both ethPrice and ethAmount have the many extra zeroes
            // the actual ETH/USD conversation rate, after adjusting the extra 0s.
            return ethAmountInUsd;
        }
    
        //modifier: https://medium.com/coinmonks/solidity-tutorial-all-about-modifiers-a86cf81c14cb
        // THe keyword Modifier used to change behaviour of function declaratively
        // What this modifier does is that for the function called onlyOwner, 
        // require the msg.sender == owner before running the rest of the code.
        // _ stands for "the rest of the code"
        modifier onlyOwner() {
            //is the message sender owner of the contract?
            require(msg.sender == owner);
    
            _;
        }
    
    		/*
    		This withdraw function allows us to withdraw the eth that people have deposited
    		its also a payable because eth is being transferred
        // onlyOwner modifer will first check the condition inside it
        // and
        // if true, withdraw function will be executed
    		*/
        function withdraw() public payable onlyOwner {
            msg.sender.transfer(address(this).balance); // this keyword refers to this entire contract
    
            //iterate through all the mappings and make them 0
            //since all the deposited amount has been withdrawn
            for (
                uint256 funderIndex = 0;
                funderIndex < funders.length;
                funderIndex++
            ) {
                address funder = funders[funderIndex];
                addressToAmountFunded[funder] = 0;
            }
            //funders array will be initialized to 0
            funders = new address[](0);
        }
    }
    ```
    
3. Math of solidity (For versions before 0.8.0
    1. Will have wrap around behaviour for versions before 0.8.0
    2. Thus can use import math to help. See [docs](https://docs.openzeppelin.com/) for versions before 0.8.
    
    ![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled%203.png)
    

## Web3 using python

1. Setting up 
    1. Download vs code, download vscode extension: solidity, python, download python, pip install black, pip install web3, 
        1. install nodejs, yarn using npm, ganache CLI to use ganache on the CLI
    2. Create a folder for the application
    3. Open the location in VSCode
    4. Can either change the start declaration of solidity version or can change compiler
        1. Code>Preferences>Settings>Extensions>Solidity Config>Solidity: Compile using Remote Version> Change the version that we are using to compile
    5. Change Solidity Formater to “Prettier” and Check “Editor: Format on save”
    6. Python Formatting > Change to black > On save will format python file
    7. Download Ganache (now [hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start))
2. Create another file in same directory called “deploy.py”
    1. Code 
    
    [[deploy.py](http://deploy.py) Code](https://www.notion.so/deploy-py-Code-e96c5d06c07247b098a63788a9e6f51c?pvs=21)
    
3. Use json.dumps to create compiled_code.json to keep the ABI. This is so that we can reference it quicker.
4. Now open Hardhat (which is like simulating a ETH network on local computer)
    1. Connect to hardhat using RPC server in the line: w3 = Web3(Web3.HTTPProvider(”RPC_server”)
    2. chain_id is the network ID
    3. for the address and private key, can use any wallet that is simulated. Remember to add 0x because Python looks for hexadecimal.
5. For each state change, the below needs to happen. See code for more details.
    1. Build transaction
    2. Sign transaction 
    3. Send transaction
6. To work with contracts, create a new contract object.
    1. Making transactions on blockchain can either be a call or transaction.
    - Call have no state change. (Can just use call even on functions that is supposed to make a state change. It simply simulates the change but makes no actual changes.)
    - Transact does have state change.
    2. So, the below behaviour is observed.
    
    ```python
    # Shows a object living somewhere
    print(simple_storage.functions.retrieve()) 
    
    # Gives us what we want
    print(simple_storage.functions.retrieve().call()) 
    ```
    
7. To get more comfortable with the backend of things and to do some programmatic stuff, use the gnache-CLI
    1. Prereq: NodeJS, yarn, ganache-cli
    2. Run the gnache-cli, now we have a bunch of random wallets
    3. If we want to have the same wallets, we have to run it being *deterministic*
    4. Now we need to do these within the .py code.
        1. Update Private Keys
        2. Update Addresses
        3. Update HTTPProvider / RPC URL (”listening on port …”)

### Running Blockchain Node

1. Basically just swap out the “port” to the a URL endpoint that runs a blockchain node
    1. Use apps like [infura.io](http://infura.io) or [alchemy.com](http://alchemy.com) Blockchain AAS platforms to make this whole URL process easier
    2. Go create account and set up project in infura (freemium)
    3. Set up endpoints on the testnet that we want to use
    4. Use the metamask wallet addresses since we are on the wtv testnet now
    5. Deploying and transactions will be slower since they acutally need to mine and stuff. Can check the transaction through the sites above such as etherscan.

## Brownie (now APE framework)

![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled%204.png)

### Simple Storage

1. Because we need to do things like interact with previous contracts, or interact on multiple different nets, we use development apps like brownie. 
2. Will do the whole section above but in Brownie below.
    1. https://github.com/PatrickAlphaC/brownie_simple_storage
3. Create directory, install brownie using pipx to help create Virtual env.
4. Start
    1. Init brownie (creates a bunch of folders)
    2. Paste SimpleStorage.sol into “contracts” folder, save and compile using brownie
    3. Create new file in “scripts” folder —> [deploy.py](http://deploy.py) where we def functions to deploy simplestorage. Use functions in simplestorage and .wait etc from this function
    4. Get wallets and private key using from brownie import accounts
5. Using Testnet
    1. Use brownie accounts new
    2. Then can add your own name and privatekey (This can be our own metamask private keys. Rmb to manually type 0xsome_private_keys)
6. .env file 
    1. Have to create new file called “brownie-config.yaml”
7. Running automated tests
    1. To Arrange, Act and Assert in each test
    2. Then run brownie test
    3. brownie test -pdb 
        1. If test fails, put us in python shell so we can play around with python environment and see whats going on 
    4. brownie test -s
        1. more detailed
    5. the tests are all from the python test package
8. Networks
    1. Deployment networks are those that are for testing but those ethereum ones are persistent.
    2. Make sure to know which network we are working to either use the test accounts or real accounts in our env.
    3. Can check this using get_account() function
9. Interacting with contracts that are already deployed
    1. Use another file called “read_value.py” in scripts
    2. Contract is just an array
10. Brownie console to interactively test with the contracts
    1. Goes into a console with our contracts imported
    2. Can interact with it the same way in our terminal with the script running. Similar to python.

### FundMe

1. New directory for fund me and init new brownie project
2. Third party packages cannot be downloaded through npm using brownie, but it can be downloaded through github, so we need to explicitly say.
    1. Through brownie-config.yaml
    2. dependencies and compiler solc remapping so that the compiler understands where we should download he packages
3. Setting up
    1. .env
    2. helpful_scripts.py
    3. __init**__**.py
4. Deploy and then can see through etherscan
5. But at this stage the contract is a bunch of code that no one can understand
    1. Verify and publish the contract on etherscan then follow the console to verify
    2. Or sign in to etherscan and get API key then programmatically verify through brownie by including the publish_source=True in the .deploy function
6. Edit script
    1. Hardcoded address - 
        1. Forking: Work on a forked similar chain
            1. Test MainNet stuff locally by forking an existing chain into local environment
            2. For example, interacting with Aave stuff in blocks and transaction in another block or contracts in another block
            3. Do this on Alchemy is better apparently
        2. Mocking: Deploy fake on local development chain 
            1. Use Chainlink Mix. Copy and paste code into a file under the “contracts/test” folder
    2. A bunch of other stuff for more development. See code.
    3. Also use pytest in testing such as pytest.skip(”message”) and pytest.raises(exceptions.VirtualMachieneError)

![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled%205.png)

## Smart Contract Lottery

1. Users enter lottery with USD fee → admin choose lottery over (Not truly decentralised) (Also can make it auto open close [Chainlink Keepers]) → Lottery will select a random winner
2. Create contract file (Lottery.sol)
    1. Global Variables
        1. Keep track of players using a public array of payable objects
        2. Entry Fee (Use the aggregatorV3 price feed so we can convert to ETH)  (raise to 10**18)
            
            $$
            10^{18}
            $$
            
            1. import pricefeed 
            2. constructor need take in the price feed [address](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1) before defining ethUsdPriceFeed within constructor
            3. brownie-config.yaml dependencies and compiler solc remapping
        3. Constructor → put the above stuff such as entry fee
    2. Think of what main functions there will be
        1. enter the lottery
            1. Can only enter if the lottery state is open (see below in part 2biii)
            2. Users paying in eth (must be *public* and must be *payable*)
            3. Store in array created in global var → array.push in the message sender
            4. Require a minimum of some value (Which should be set during construction and checked using the getEntranceFee function)
        2. getEntranceFee
            1. Just need see the entrance fee → public view which returns uint256
            2. (, int256 price , , , ) get the [syntax from documentation](https://docs.chain.link/data-feeds/using-data-feeds)
            3. Documentation says ethUsd is in 8 decimals → adjust the price back 
            4. Return this price
        3. startLottery
            1. This can only be called by an admin so we need to use onlyOwner
                1. Since we have an owner, the contract Lottery must be ownable
                2. Or we can use [openzeppelin](https://docs.openzeppelin.com/contracts/4.x/api/access)
            2. Create these states of lottery using [enum](https://docs.soliditylang.org/en/latest/types.html) type (represented by a number)
            3. Need specify an initial state in our constructor as well
            4. require a state to be open before we can enter the lottery
        4. endLottery
            1. To end the lottery (only owner can end)
            2. Need randomness in a deterministic system → random value is more difficult (and never truly random)
            3. Pseudo-randomness: People hash the block difficulty, sender and timestamp and index (global variable). But the hashing function isn’t random. Everything within the hashing function is predictable/can be manupilated.
            4. True randomness: Need to be outside the blockchain. [Chainlink VRF](https://docs.chain.link/vrf/) API.
                1. Needs both Eth and LINK to pay for the oracle gas and transacion gas.
                2. Inherit VRF consumer base. This needs to be defined in our constructor.
            5. Request and Receive data model
                1. 
3. Create scripts to deploy lottery.sol. (deploy_lottery.py)
    1. import everything
    2. Similar to the previously done deploy file
    3. Before starting the lottery need wait for the last transaction (Just something to do)
    4. Brownie can use interfaces to interact as well 
4. Test (Need to test every single line of code)
    1. getEntranceFee 
        1. check current eth price and how much US$50 is in eth ($50 is around 0.019eth when eth is about $2500/eth)
        2. Use alchemy to create mainnet fork as development chain → use CLI to test
    2. Integration Tests(Everything together) vs Unit Tests (independent pieces of code)
    3. Stopped at 7hr 58min for the tests

## Getting Started with Templates

[Chainlink mix](https://github.com/smartcontractkit/chainlink-mix)

Brownie bake mix

# Token

## Create a Fungible Token

See [github for code reference](https://github.com/PatrickAlphaC/erc20-brownie-py)

ERC20 Tokens - On ERC20 standard chains - is a fungible token

Basically make a smart contract that follows the [ERC20 standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)

1. Grab all the functions within the ERC20 standard and paste them into the contract.
    1. Or [openszeppelin](https://docs.openzeppelin.com/contracts/2.x/erc20) for easier way of starting
    2. Check what they use in the [github](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
2. Change name
3. Create deploy scripts
4. Done!

Can add the token to liquidity pools → places where we can sell it and bring it to market

## Defi fungible token

AAVE has a testnet so its good to develop on

Skip since I dont think I will use this

## Create a Non-Fungible Token

> Need download the IPFS CLI
> 

Basically cannot interchange token with another one in the same class. Tokens deployed on a smart contract platform. Can be viewed without pretty UI like OpenSea/Rarible marketplaces.

Standards used : 

1. ERC-72 (NFT)
2. ERC - 115 (Semi Fungible Tokens) 

Main differences is ERC20 has a mapping between address ⇒ uint256 from wallet address to the wallet value VS ERC721 having tokenID that has a unique owner and a tokenURI (name, description, image, attributes json object, basically storing the actual image off-chain in a physical location… which makes it centralized…)

The art part is defined in tokenURI and metadata, then uniqueness is simply the _id. 

Basically,

![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled%206.png)

Or go see a some other article on how to build deploy and sell NFT → can also use brownie nft-mix

Here, we are using [PatrickAlphaC/nft-demo (github.com)](https://github.com/PatrickAlphaC/nft-demo)

Here, we are using [this github](https://github.com/PatrickAlphaC/nft-demo)

![Untitled](Blockchain%20Learning%20%F0%9F%9F%A6%201042417fb8ec434f8b9bc685a54f8060/Untitled%207.png)

Advanced collectible uses true scarcity features (verifiable scarcity + verifiable rarity)

Simple collectible is just a simple erc721 standard 

1. Using a Factory pattern where we have a function to mint more NFT based on the pug.
    1. Basically, create a new token_id and assign it to a wallet address. See [“safeMint”](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol) for more info.
2.  Input all the URI items such that the NFT will be able to render in NFT marketplaces 
    1. https://testnets.opensea.io/ Testnet (Before starting, check which testnets work with opensea. In the video, only Rinkby is supported)
3. Emit event for each mapping for best practice
4. Testing automated
5. Hosting image + metadata on IPFS/filecoin 
    1. Create metadata in create_metadata.py
    2. check if metadata already exists using pathlib
    3. Download ipfs command line
    4. Upload to ipfs using pathlib as well → change filepath → change to binary
    5. Run own ipfs node using ipfs daemon
        1. WebUI is our ipfs_url where we will POST a request using “add” 
        2. Or if we dont want to be running IPFS all the time, we can use `Pinata`
            1. Good practice is to upload to your own IPFS node AND a third-party node such as Pinata using [pin file](https://docs.pinata.cloud/pinning/pinning-files)
            2. Take note to upload both the image and the metadata
            3. In the Code, there is a mapping and also defines image_uri only if image uri is not none because everyone following this tutorial will get the same URI
    6. Start another terminal such that there will be one running bash and one running ipfs node
    7. Now, we finally uploaded both our metadata and image to IPFS, we can finally set our token URI 
    8. In the code, we pull our metadata from ipfs all the time but we should store the metadata in the metadata directory and then call from there. This will remove the need for “dog_metadata_dic”
