const RateLimiter = require("express-rate-limit");

const rateLimiter = RateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    });

    module.exports = rateLimiter;