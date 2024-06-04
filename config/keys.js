let configPromise;

// Using an async function to load the config based on the environment
const loadConfig = async () => {
    if (process.env.NODE_ENV === "production") {
        return await import("./prod.js");
    } else {
        return await import("./dev.js");
    }
};

// Initiate the config loading
configPromise = loadConfig();

// Await the configuration to resolve and export the values directly
const config = await configPromise;

export const USER = config.USER;
export const HOST = config.HOST;
export const DATABASE = config.DATABASE;
export const PASSWORD = config.PASSWORD;
export const PORT = config.PORT;
