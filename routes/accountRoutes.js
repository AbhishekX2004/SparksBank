import { runQuery, runQueryValue } from "../service/postgres.js";

const accountRoutes = (app) => {
    // route to fetch all accounts
    app.get('/fetch/account/all', async (req, res) => {
        try {
            const response = await runQuery("SELECT accountno, name, picture FROM users ORDER BY accountno;");    
            if (!response) {
                return res.status(500).send("Unable to fetch Accounts.");
            }    
            // console.log(response);
            res.status(200).send(response);  // Send a 200 status code with the response
        } catch (error) {
            console.error("Error executing query:", error);
            res.status(500).send("An error occurred while fetching accounts.");
        }
    });
    
    // route to fetch all accounts except given account
    app.get('/fetch/account/except/:account', async (req, res) => {
        const account = req.params.account;  // Extract the account parameter from the path    
        try {
            const response = await runQueryValue(
                "SELECT accountno, name, picture FROM users WHERE accountno != $1 ORDER BY accountno;",
                [account]
            );    
            if (!response) {
                return res.status(500).send("Unable to fetch Accounts.");
            }    
            // console.log(response);
            res.status(200).send(response);
        } catch (error) {
            console.error("Error executing query:", error);
            res.status(500).send("An error occurred while fetching accounts.");
        }
    });

    // route to fetch account of given account
    app.get('/fetch/account/:account/all', async (req, res) => {
        const account = req.params.account;  // Extract the account parameter from the path    
        try {
            const response = await runQueryValue(
                "SELECT * FROM users WHERE accountno = $1;",
                [account]
            );    
            if (!response) {
                return res.status(500).send("Unable to fetch Accounts.");
            }    
            // console.log(response);
            res.status(200).send(response);
        } catch (error) {
            console.error("Error executing query:", error);
            res.status(500).send("An error occurred while fetching accounts.");
        }
    });    
}

export default accountRoutes;