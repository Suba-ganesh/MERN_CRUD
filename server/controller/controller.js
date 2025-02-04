import User from "../model/model.js"; // ✅ Capitalized model name for consistency

// 🔹 Create User
export const create = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" }); // ✅ Fixed syntax
        }

        // Save new user
        const newUser = new User(req.body);
        const savedUser = await newUser.save(); // ✅ Added 'await'
        
        return res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 🔹 Get All Users
export const getuser = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No user details found" }); // ✅ Fixed error response
        }

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 🔹 Get User by ID
export const getuserbyid = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" }); // ✅ Fixed error response
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 🔹 Update User
export const updateusers = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 🔹 Delete User
export const deleteusers = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(id); // ✅ Deleting user

        return res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
