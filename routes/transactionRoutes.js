import { runQuery, runQueryValue } from "../service/postgres.js";

const transactionRoutes = (app) => {
    // route to GET all transactions
    app.get("/fetch/transaction/all", async (req, res) => {
        const response = await runQuery("SELECT * FROM transfers ORDER BY tid DESC;");
        if (!response) {
            return res.status(500).send("Unable to fetch Accounts.");
        }    
        // console.log(response);
        res.status(200).send(response);
    });

    // route to GET recent 5 transactions
    app.get("/fetch/transaction/recents", async (req, res) => {
        const response = await runQuery("SELECT * FROM transfers ORDER BY tid DESC LIMIT 5;");
        if (!response) {
            return res.status(500).send("Unable to fetch Accounts.");
        }    
        // console.log(response);
        res.status(200).send(response);
    });

    // route to GET transactions involving a particural account.
    app.get("/fetch/transaction/:account", async (req, res) => {
        const account = req.params.account;
        const response = await runQueryValue("SELECT * FROM transfers WHERE frid = $1 OR toid = $2 ORDER BY tid DESC;",[account, account]);
        if (!response) {
            return res.status(500).send("Unable to fetch Accounts.");
        }    
        // console.log(response);
        res.status(200).send(response);
    });

    // route to POST a transaction
    app.post("/save/transaction", async (req, res) => {
        const { frid, toid, amount } = req.body;

        if (!frid || !toid || !amount) {
            return res.status(400).send("Missing required fields: frid, toid, and amount.");
        }

        if (isNaN(amount)) {
            return res.status(400).send("Amount must be a number.");
        }

        // save transfer
        const insertQuery = `
            INSERT INTO transfers (frid, toid, amount)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const insertValues = [frid, toid, amount];
        const response = await runQueryValue(insertQuery, insertValues);

        // Update the sender's balance
        const updateSenderQuery = `
            UPDATE users
            SET balance = balance - $1
            WHERE accountno = $2;
        `;
        const updateSenderValues = [amount, frid];
        await runQueryValue(updateSenderQuery, updateSenderValues);

        // Update the receiver's balance
        const updateReceiverQuery = `
            UPDATE users
            SET balance = balance + $1
            WHERE accountno = $2;
        `;
        const updateReceiverValues = [amount, toid];
        await runQueryValue(updateReceiverQuery, updateReceiverValues);


        if (!response) {
            return res.status(500).send("Unable to save transaction.");
        }

        // console.log(response);
        res.status(201).send(response);
    });

}

export default transactionRoutes;