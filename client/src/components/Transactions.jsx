import React, { useEffect, useState } from "react";
import { fetchAllTransactions } from "../actions";
import formatDateTime from "../utils/formatDateTime";
import Loader from "./Loader";

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
                    <p>
                        <strong>Amount:</strong> ${txn.amount} <br />
                        <strong>Timestamp:</strong> {formatDateTime(txn.timestamp)} <br />
                        <strong>From:</strong> {txn.frid} ---- <strong>To:</strong> {txn.toid}
                    </p>
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