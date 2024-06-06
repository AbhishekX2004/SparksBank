import express from "express";
import { connectToDatabase } from "./service/postgres.js";
import accountRoutes from "./routes/accountRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;

// parsing JSON bodies
app.use(bodyParser.json());

// connecting to posgreSQL database
connectToDatabase();

// accounts Routes
accountRoutes(app);

// transaction Routes
transactionRoutes(app);

// To run while in production
// telling express to redirect unknown routes to react router
if (process.env.NODE_ENV === 'production') {
    // express serves production assets main.js or main.css
    app.use(express.static('client/build'));

    // express serves index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`App is listening on port:${PORT}`);
});
