const UserReg = require("../../models/userReg");;

//Get admin's profile
const getAdminProfileFn = async (req, res) => {
  try {
    const userId = req.session.userId;

    const user = await UserReg.findById(userId, '-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update admin's profile
const updateAdminProfileFn = async (req, res) => {
  try {
    const userId = req.session.userId;

    const updatedUser = await UserReg.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete admin's profile
const deleteAdminProfileFn = async (req, res) => {
  try {
    const userId = req.session.userId;

    const deletedUser = await UserReg.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Admin gets a user's profile
const getAProfileFn = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserReg.findById(userId, '-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Admin gets all user profiles
const getUserProfilesFn = async (req, res) => {
  try {
    const users = await UserReg.find({ role: { $ne: 'admin' } }, '-password');

    res.status(200).json({ users });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
};

// Admin deletes a user's profile
const deleteAProfileFn = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await UserReg.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
  getAdminProfileFn,
  getAProfileFn,
  updateAdminProfileFn,
  deleteAdminProfileFn,
  getUserProfilesFn,
  deleteAProfileFn,
};
