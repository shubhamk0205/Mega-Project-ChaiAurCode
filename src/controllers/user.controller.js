import asyncHandler from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
    const { userId, location } = req.body;
    res.status(200).json({ success: true, message: "Registration successful", data: { userId, location } });
});

export { registerUser }