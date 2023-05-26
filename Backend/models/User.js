import mongoose from "mongoose";
const Schema = mongoose.Schema;
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  verified: Boolean,
  token: String,
});

// generating Token
UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.token = token;
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

export default mongoose.model("User", UserSchema);
