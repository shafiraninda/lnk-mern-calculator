const express = require("express");
const ROUTER = express.Router();
const verifyToken = require("../middleware/authentication");
const userController = require('../controller/userController');
const authController = require('../controller/authController');

ROUTER.post("/user/create", userController.createUser);
ROUTER.post("/login", authController.login);
ROUTER.post("/logout", verifyToken, authController.logout)

ROUTER.all("*", (req, res, next) => {
    res.status(404).json({
        error: 404,
        message: `Request URL ${req.path} Not Found`
    });
});

ROUTER.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		error: statusCode,
		message: err.message,
	});
});

module.exports = ROUTER;