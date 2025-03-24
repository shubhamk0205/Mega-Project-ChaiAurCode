import asyncHandler from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
    try {
        console.log("Register endpoint hit");
        console.log("Request method:", req.method);
        console.log("Request URL:", req.url);
        console.log("Request headers:", req.headers);
        console.log("Request body:", req.body);
        
        // Extract data from form-data
        const userId = req.body.userId;
        const latitude = req.body['location.latitude'];
        const longitude = req.body['location.longitude'];
        
        if (!userId || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                required: {
                    userId: "string",
                    "location.latitude": "number",
                    "location.longitude": "number"
                }
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Registration endpoint working",
            receivedData: {
                userId,
                location: {
                    latitude,
                    longitude
                }
            }
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

export { registerUser }