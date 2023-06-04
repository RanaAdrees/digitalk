import User from "../models/User.js";
import hashData from "../utils/hashData.js";

export const createNewUser = async (data) => {
  try {
    const { username, email, password, dob } = data;
    // Checking if user exists already
    const existingUser = await User.find({ email });
    if (existingUser.length) {
      // User exists already
      throw Error("User with this Email Exists Already!");
    } else {
      //hash Password
      const hashedPassword = await hashData(password);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        dateOfBirth,
        verified: false,
      });

      // TRY TO CREATE A NEW USER
      const saltRounds = 10;
      bcrypt
        .hash(password, saltRounds)
        .then((hashedPassword) => {
          newUser
            .save()
            .then((result) => {
              // Handle Account Verification
              //sendVerificationEmail(result,res);
              sendOTPVerificationEmail(result, res);
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "FAILED",
                message: "An error occurred while saving user account!",
              });
            });
        })
        .catch((err) => {
          res.json({
            status: "FAILED",
            message: "An error occurred while hashing password!",
          });
        });
    }
  } catch (err) {}
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Inside Find single-----");
    // Checking if user exists already
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      const foundUser = await User.findById(id);

      if (!foundUser) {
        // User does not exist
        throw new Error("User with this email does not exist!");
      } else {
        console.log("Response------------------->");
        console.log(foundUser);
        res.status(200).json(foundUser);
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("An error occurred while retrieving the user.");
  }

  // User.findById(id)
  //   .then((user) => {
  //     if (user) {
  //       console.log("Response------------------->");
  //       console.log(user);
  //       res.json(user);
  //     } else {
  //       res.status(404).json({ message: "Person not found" });
  //     }
  //   })
  //   .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllUsers = (req, res) => {
  User.find()
    .then((Users) => res.json(Users))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Route for searching Users by name or publicKey
export const searchUsers = async (req, res) => {
  console.log(
    "Inside Search user---------------------------------------------------"
  );
  const { username, publicKey } = req.query;
  console.log(req.query);

  try {
    let results = [];
    username = username.toString();
    publicKey = publicKey.toString();
    if (username || publicKey) {
      results = await Person.find({
        $or: [
          { username: { $regex: `^${username}`, $options: "i" } },
          { publicKey },
        ],
      });
    } else {
      return res.status(400).json({ message: "Invalid search parameters" });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new User to the db
// export const addUser = (req, res) => {
//   const { name, nickName, age, publicKey } = req.body;

//   const newUser = new User({
//     name,
//     nickName,
//     age: Number(age),
//     publicKey,
//   });

//   newUser
//     .save()
//     .then(() => res.json("User added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// };

// Update user by email

export const updateUser = async (req, res) => {
  console.log("Inside update user api");
  try {
    const { id } = req.params;
    const userRes = await User.updateOne({ _id: id }, { $set: req.body });
    if (userRes) {
      res.status(200).json({ message: "Updated successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Update Failed" });
  }
};

// Get all friends of a User by publicKey
export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const userRes = await User.findById(userId);

    if (userRes) {
      const friends = userRes.friends;
      const friendsList = await User.find({ _id: { $in: friends } });

      if (friendsList) {
        res.json(friendsList);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a User by publicKey
// export const getUserById = (req, res) => {
//   const { userId } = req.params;

//   User.findById(userId)
//     .then((User) => {
//       if (User) {
//         res.json(User);
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// };

export const sendFriendRequest = async (req, res) => {
  try {
    const { _id, UserId } = req.body;

    const userRes = await User.findById(UserId);

    if (
      !userRes.friendRequests.includes(_id) &&
      !userRes.friends.includes(_id)
    ) {
      userRes.friendRequests.push(_id);
      await userRes.save();
      res.json(userRes);
    } else {
      res.status(400).json({
        message: "Friend request already sent or User is already a friend",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const cancelFriendRequest = async (req, res) => {
  try {
    const { _id, UserId } = req.body;

    const User = await User.findById(_id);

    if (User.friendRequests.includes(UserId)) {
      User.friendRequests = User.friendRequests.filter((p) => {
        return p.toString() !== UserId.toString();
      });
      await User.save();
      res.json(User);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Accept a friend request from friendId to userId

export const acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const currentUser = await User.findById(userId);
    const friendUser = await User.findById(friendId);

    if (currentUser && friendUser) {
      currentUser.friendRequests = currentUser.friendRequests.filter(
        (id) => id.toString() !== friendId.toString()
      );
      currentUser.friends.push(friendId);
      await currentUser.save();

      friendUser.friendRequests = friendUser.friendRequests.filter(
        (id) => id.toString() !== userId.toString()
      );
      friendUser.friends.push(userId);
      await friendUser.save();

      res.json({ status: 200 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Deny a friend request from friendId to currentPublicKey
export const denyFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const User = await User.findById(userId);

    if (User.friendRequests.includes(friendId)) {
      User.friendRequests = User.friendRequests.filter((p) => {
        return p.toString() !== friendId;
      });
      await User.save();
      res.json(User);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get friend requests for a specific user
export const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const User = await User.findById(userId);

    if (User) {
      const friendRequests = User.friendRequests;
      const friends = await User.find({
        _id: {
          $in: friendRequests,
        },
      });
      res.json(friends);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get the count of friends for a specific user
export const getFriendCount = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User Id:" + userId);
    const userRes = await User.findById(userId);

    console.log("Get friend api----->");

    if (userRes.friends.length > 0) {
      const friendCount = userRes.friends.length;
      res.json({ count: friendCount });
    } else {
      res.status(404).json({ message: "no friend" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
