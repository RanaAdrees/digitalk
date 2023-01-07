// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DigiTalk{
    string public name;
    uint postCount;

    constructor(){
        name="DigiTalk";
        postCount=0;
    }

    event Post
    (
        uint id,
        string description,
        address payable auther
    );

    struct PostStruct{
        uint id;
        string description;
        address payable auther;
    }

    // posts array

    PostStruct[] posts;

    // Create post method

    function createPost(string memory _description) public
    {
        postCount++;

        // add item in post array

        posts.push(PostStruct(postCount,_description,payable(msg.sender)));

        // emit function

        emit Post(postCount,_description,payable(msg.sender));
    }

    // get all posts

    function getAllPosts() public view returns(PostStruct[] memory){
        return posts;
    }

    // get post count

    function getPostsCount() public view returns(uint){
        return postCount;
    }

}