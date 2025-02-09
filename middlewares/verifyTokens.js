const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.WhatIsYourName; // Ensure this is set correctly

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const token = authHeader.split(" ")[1]; // Extract token

        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        // Verify the token
        const decoded = jwt.verify(token, secretKey);

        // Find the vendor
        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // Attach vendor ID to request
        req.vendorId = vendor._id;
        next();
        
    } catch (error) {
        console.error("JWT Verification Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired, please log in again" });
        }

        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;
