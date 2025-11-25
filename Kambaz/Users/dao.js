import model from "./model.js";

export default function UsersDao(db) {

  const createUser = (user) => {
    delete user._id; // Remove _id if present, let MongoDB generate it
    return model.create(user); // Use Mongoose to create user in database
  };

  const findAllUsers = () => model.find();
  
  const findUserById = (userId) => model.findById(userId);
  
  const findUserByUsername = (username) => 
    model.findOne({ username: username });
  
  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
  
  const updateUser = (userId, user) => 
    model.updateOne({ _id: userId }, { $set: user });
  
  const deleteUser = (userId) => 
    model.deleteOne({ _id: userId });

  const findUsersByRole = (role) => model.find({ role: role }); 

  const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};


  
  return {
    createUser, 
    findAllUsers, 
    findUserById, 
    findUserByUsername, 
    findUserByCredentials, 
    updateUser, 
    deleteUser,
    findUsersByRole,
    findUsersByPartialName
  };
}