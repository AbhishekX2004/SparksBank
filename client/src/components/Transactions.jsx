import React, { useEffect, useState } from "react";
import { fetchAllTransactions } from "../actions";
import Loader from "./Loader";
import Transaction from "./Transaction";
import "./Transactions.css";

function Transactions() {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                let data = await fetchAllTransactions();
                setTransaction(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, []);

    const renderTransactions = () => {
        return transaction.map((txn, index) => (
            <Transaction key={txn.tid} txn={txn} index={index} />
        ));
    };

    if (loading) {
        return <Loader text="Loading Transactions" />;
    }

    if (error) {
        return <p>Error loading transactions: {error.message}</p>;
    }

    return (
        <div className="allTransactionContainer">
            {transaction.length > 0 ? renderTransactions() : <p>No recent transactions found.</p>}
        </div>
    );
}

export default Transactions;