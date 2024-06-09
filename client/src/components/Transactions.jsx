import React, { useEffect, useState } from "react";
import { fetchAllTransactions } from "../actions";
import formatDateTime from "../utils/formatDateTime";
import Loader from "./Loader";
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
        return transaction.map((txn) => {
            return (
                <div key={txn.tid} className="transaction">
                    <strong>Transaction ID:</strong> {txn.tid} <br />
                    Transaction of
                    <strong> Amount:</strong> ₹{txn.amount} on <b>{formatDateTime(txn.timestamp)}</b> <br />
                    <ul>
                        <li>
                            <strong>From:</strong> {txn.frid}
                        </li>
                        <li>
                            <strong>To:</strong> {txn.toid}
                        </li>
                    </ul>
                </div>
            );
        });
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