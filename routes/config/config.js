const emailConfig = {
    service: 'smtp.163.com',
    host: "smtp.163.com",
    secureConnection: true,
    port: 465,
    auth: {
        // your email address
        user: 'm835343134@163.com',
        // your email login password
        pass: 'frank83739969',
    }
};

/**
 * web site hostname, set the hostname:port if you want
 * to deploy this system to the remote server
 */
const baseName = 'http://127.0.0.1:3000';

/**
 * the root path of uploading file
 */
const rootUploadedPath = "uploads/";

/**
 * default photo image name
 */
const DEFAULT_PHOTO = "default.jpg";

/**
 * pagination information
 */
const pageInfo = {
    offset: 0,
    size: 10
};

module.exports = { emailConfig, baseName, rootUploadedPath, DEFAULT_PHOTO, pageInfo }
