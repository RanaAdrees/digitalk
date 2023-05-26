// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DigiTalk {
    string public name;
    uint postCount;

    constructor() {
        name = "DigiTalk";
        postCount = 0;
    }

    event Post(
        uint id,
        uint tipAmount,
        string description,
        string hash,
        string fileName,
        address payable auther
    );

    struct PostStruct {
        uint id;
        uint tipAmount;
        string description;
        string hash;
        string fileName;
        address payable auther;
    }

    // posts array

    PostStruct[] posts;

    // Create post method

    function createPost(
        string memory _description,
        string memory hash,
        string memory file_name
    ) public {
        postCount++;

        // add item in post array

        posts.push(
            PostStruct(
                postCount,
                0,
                _description,
                hash,
                file_name,
                payable(msg.sender)
            )
        );

        // emit function

        emit Post(
            postCount,
            0,
            _description,
            hash,
            file_name,
            payable(msg.sender)
        );
    }

    // get all posts

    function getAllPosts() public view returns (PostStruct[] memory) {
        return posts;
    }

    // get post count

    function getPostsCount() public view returns (uint) {
        return postCount;
    }

    function tipOwner(uint _id) public payable {
        // require(msg.value>0.0001 ether);
        PostStruct memory _post = posts[_id];

        address payable _auther = _post.auther;

        payable(address(_auther)).transfer(msg.value);

        _post.tipAmount = _post.tipAmount + msg.value;

        posts[_id] = _post;
    }
}
