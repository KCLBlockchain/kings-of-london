pragma solidity ^0.4.24; 

/** 
  * @title Kings Of London DApp
  * @author Frederico Lacs
 **/
 
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/payment/PullPayment.sol";

contract KOLogic is Ownable, PullPayment {
    constructor (uint256 _blockCreationPrice, address _storageAddress) public {
        blockCreationPrice = _blockCreationPrice;
        emit UpdatedBlockCreationValue(_blockCreationPrice);
        s = StorageInterface(_storageAddress);
        emit UpdatedStorageAddress(_storageAddress);
    }

    StorageInterface internal s;
    uint256 internal blockCreationPrice;
    mapping(string => bool) internal isValidUniversity;

    struct Block{
        string imageURL;
        string description;
        address blockOwner;
        bool forSale;
        uint256 price;
        // hash of information of block without blockOwner, for fast comparisons
        bytes32 infoHash;
        bool isEntity;
    } 

    event NewValidUniversity (string _name);
    event UpdatedBlockCreationValue (uint256 value);
    event UpdatedStorageAddress (address newStorageAddress);
    event BlockBought (
        uint64 x, 
        uint64 y, 
        string indexed universityName, 
        address indexed oldOwner, 
        address indexed newOwner, 
        uint256 price
    );
    event BlockInformationUpdated (
        uint64 x, 
        uint64 y, 
        string indexed universityName, 
        string _imageURL, 
        string _description, 
        address indexed _blockOwner, 
        bool indexed _forSale, 
        uint256 _price
    );

    function setBlockCreationPrice(uint256 _blockCreationPrice) public onlyOwner {
        blockCreationPrice = _blockCreationPrice;
        emit UpdatedBlockCreationValue(_blockCreationPrice);
    }

    function setStorageAddress(address _storageAddress) public onlyOwner {
        s.transferOwnership(msg.sender);
        s = StorageInterface(_storageAddress);
        emit UpdatedStorageAddress(_storageAddress);
    }

    function addValidUniversity(string _name) public onlyOwner {
        isValidUniversity[_name] = true;
        emit NewValidUniversity(_name);
    }

    /*
     *   Could have made this a pure function and added the uni verification somewhere else.
     *   Maybe verify for valid universities in the frontend input?
     */
    function getBlockID(uint64 _x, uint64 _y, string _uniName) internal view returns (bytes32 id) {
        require(isValidUniversity[_uniName], "Invalid University");

        id = keccak256(abi.encodePacked(_x, ":", _y, "@", _uniName));
    }

    function getInfoHash(string imageURL, string description, bool forSale, uint price) internal pure returns ( bytes32 infoHash) {
        infoHash = keccak256(abi.encodePacked(imageURL, description, forSale, price));
    }

    function getBlock(bytes32 _id) internal view returns (Block b) {
        string memory imageURL;
        string memory description;
        address blockOwner;
        bool forSale;
        uint256 price;
        bool isEntity;
    
        (imageURL, description, blockOwner, forSale, price, isEntity) = s.getBlock(_id);
        bytes32 infoHash = getInfoHash(imageURL, description, forSale, price);

        b = Block(imageURL, description, blockOwner, forSale, price, infoHash, isEntity);
    }

    function buyBlock (
        uint64 _x, 
        uint64 _y, 
        string _uniName,
        string _imageURL,
        string _description,
        bool _forSale
    )
        public 
        payable 
        returns (bool success)
    {
        // blockID = getBlockID(_x, _y, _uniName);
        Block memory currentBlock = getBlock(getBlockID(_x, _y, _uniName));


        // check if block is already created
        if(currentBlock.isEntity) {
            require(currentBlock.forSale, "Block is not for sale.");
            require(msg.value >= currentBlock.price, "Not enough ether to buy block.");
            
            address oldOwner = currentBlock.blockOwner;
            
            // currentBlock variable is read only, so we call the update function
            //require(s.updateBlock(blockID, _imageURL, _description, msg.sender, _forSale, msg.value), "Failed to update block.");

            // pull payment from OpenZeppelin
            asyncTransfer(oldOwner, msg.value);

            emit BlockBought(_x, _y, _uniName, oldOwner, msg.sender, msg.value);
        }
        else {
            // created new variable to have it in scope and not read from storage twice
            uint256 _blockCreationPrice = blockCreationPrice;
            require(msg.value >= _blockCreationPrice, "Not enough ether to create block.");

            //require(s.newBlock(blockID, _imageURL, _description, msg.sender, _forSale, _blockCreationPrice), "Failed to create new block.");
            // when new block is created, block is being bought from this contract.
            emit BlockBought(_x, _y, _uniName, this, msg.sender, msg.value);
        }
        // bool blockUpdated = oldInfoHash != newInfoHash; 
        // if(blockUpdated);
        if(currentBlock.infoHash != getInfoHash(_imageURL, _description, _forSale, msg.value)){
            emit BlockInformationUpdated(_x, _y, _uniName, _imageURL, _description, msg.sender, _forSale, msg.value);
        }
        success = true;
    }

    function updateBlock (
        uint64 _x, 
        uint64 _y, 
        string _uniName,
        string _imageURL, 
        string _description, 
        bool _forSale, 
        uint256 _price
    )
        public
        returns (bool success)
    {
        bytes32 blockID = getBlockID(_x, _y, _uniName);
        address blockOwner = s.getBlockOwner(blockID);
        // Added admin access in case we need to change inappropriate content
        require(msg.sender == blockOwner || msg.sender == owner, "Not block owner.");
        require(_price > 0, "Can't put selling price lower than zero.");
        
        s.updateBlock(blockID, _imageURL, _description, blockOwner, _forSale, _price);
        emit BlockInformationUpdated(_x, _y, _uniName, _imageURL, _description, blockOwner, _forSale, _price);
        success = true;
    }
}

contract StorageInterface {
    function newBlock (
        bytes32 _blockID, 
        string _imageURL, 
        string _description, 
        address _blockOwner, 
        bool _forSale,
        uint256 _price
    ) public returns (bool success);

    function updateBlock (
        bytes32 _blockID, 
        string _imageURL, 
        string _description, 
        address _blockOwner, 
        bool _forSale, 
        uint256 _price
    ) public returns (bool success);

    function deleteBlock (bytes32 _blockID) public returns (bool success);

    function getBlock(bytes32 _blockID) public view returns (
        string imageURL,
        string description,
        address blockOwner,
        bool forSale,
        uint256 price,
        bool isEntity
    );

    function getBlockOwner(bytes32 _blockID) public view returns (address blockOwner);
    function transferOwnership(address _newOwner) public;
}

contract KolStorageV1 is Ownable {
    struct Block{
        string imageURL;
        string description;
        address blockOwner;
        bool forSale;
        uint256 price;
        // If block is available, means it is not an entity
        bool isEntity;
    }

    // design decision to make this internal with getters.
    // if visibility public, solc would auto-generate getters.
    mapping(bytes32 => Block) internal blocks;
    
    function newBlock (
        bytes32 _blockID, 
        string _imageURL, 
        string _description, 
        address _blockOwner, 
        bool _forSale,
        uint256 _price
    ) 
        public 
        onlyOwner 
        returns (bool success) 
    {
        require(blocks[_blockID].isEntity == false, "Block was already created.");
        blocks[_blockID] = Block(_imageURL, _description, _blockOwner, _forSale, _price, true);
        success = true;
    }

    function updateBlock (
        bytes32 _blockID, 
        string _imageURL, 
        string _description, 
        address _blockOwner, 
        bool _forSale, 
        uint256 _price
    ) 
        public 
        onlyOwner 
        returns (bool success) 
    {
        require(blocks[_blockID].isEntity == true, "Block was not created, can't be updated.");
        blocks[_blockID] = Block(_imageURL, _description, _blockOwner, _forSale, _price, true);
        success = true;
    }

    function deleteBlock(bytes32 _blockID) public onlyOwner returns (bool success) {
        blocks[_blockID].isEntity = false;
        success = true;
    }

    function getBlock(bytes32 _blockID) 
        public
        view
        onlyOwner
        returns (
            string imageURL,
            string description,
            address blockOwner,
            bool forSale,
            uint256 price,
            bool isEntity
        )
    {
        Block memory b = blocks[_blockID];

        imageURL = b.imageURL;
        description = b.description;
        blockOwner = b.blockOwner;
        forSale = b.forSale;
        price = b.price;
        isEntity = b.isEntity;
    }

    function getBlockOwner(bytes32 _blockID) public view returns (address blockOwner) {
        blockOwner = blocks[_blockID].blockOwner;
    }
}