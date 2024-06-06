import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchAllTransactions } from "../actions";

function Landing() {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                let transaction = await fetchAllTransactions();
                setTransaction(transaction);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const renderTransactions = () => {
        return transaction.map((txn) => {
            return (
                <div key={txn.tid} className="transaction">
                    <p>
                        <strong>Amount:</strong> ${txn.amount} <br />
                        <strong>From:</strong> {txn.frid} ---- <strong>To:</strong> {txn.toid}
                    </p>
                </div>
            );
        });
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error loading users: {error.message}</p>;
    }

    return (
        <div>
            LANDING <br />
            <Link to='/accounts/all'>View all Accounts</Link>
            <div className="allTransactionContainer">
                {transaction.length > 0 ? renderTransactions() : <p>No recent transactions found.</p>}
            </div>
        </div>
    )
}

export default Landing;