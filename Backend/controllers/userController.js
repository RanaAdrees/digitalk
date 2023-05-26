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
    const email = req.params.email;
    console.log("Inside Find single-----");
    // Checking if user exists already
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      // User does not exist
      throw new Error("User with this email does not exist!");
    } else {
      return foundUser;
    }
  } catch (err) {
    console.log(err);
    throw new Error("An error occurred while retrieving the user.");
  }
};
