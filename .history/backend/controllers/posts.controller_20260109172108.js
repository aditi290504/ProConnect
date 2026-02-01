

export const activeCheck = async(req, res) => {
    return res.status(200).json({message: "Active" });
}

export const register = async(req, res) => {
    // Registration logic will go here
    try {
        const {name, email,password, } = req.body;
    } catch (error) {
        return res.status(500).json({message: "Registration failed", error: error.message });
    }
}