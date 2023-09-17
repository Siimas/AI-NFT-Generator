// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StableArt is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable internal owner;
    uint public fee;

    constructor(uint _fee) ERC721("StableArt", "ART") {
        owner = payable(msg.sender);
        fee = _fee;
    }

    function changeFee(uint _fee) public onlyOwner {
        fee = _fee;
    }

    function mintArt(address minter, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        // Handle fee payment to owner 
        require(msg.value == fee);
        owner.transfer(msg.value);

        uint256 newArtId = _tokenIds.current();
        _mint(minter, newArtId);
        _setTokenURI(newArtId, tokenURI);

        _tokenIds.increment();
        return newArtId;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}