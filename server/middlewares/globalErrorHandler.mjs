import config from "../config/config.mjs";

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        message : message,
        errorStack : config.nodeENV === "development" ? err.stack : ""
    })
}

export default globalErrorHandler;