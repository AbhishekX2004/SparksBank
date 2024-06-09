import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetch5Transactions } from "../actions";
import formatDateTime from "../utils/formatDateTime";
import Loader from "./Loader";
import "./Landing.css";  // Ensure you import the CSS file

function Landing() {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                let transaction = await fetch5Transactions();
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
                        <strong>Timestamp:</strong> {formatDateTime(txn.timestamp)} <br />
                        <strong>From:</strong> {txn.frid} ---- <strong>To:</strong> {txn.toid}
                    </p>
                </div>
            );
        });
    };

    return (
        <div className="landing-container">
            <div className="left-column">
                <h2>Navigation</h2>
                <Link to='/accounts/all' className="button-89">View all Accounts</Link>
                <Link to='/transactions/all' className="button-89">View all Transactions</Link>
            </div>
            <div className="right-column">
                <h2>Recent Transactions</h2>
                <div className="transaction-list">
                    {loading ? <Loader text="Loading recent Transactions" /> :
                        error ? <p>Error loading transactions: {error.message}</p> :
                            transaction.length > 0 ? renderTransactions() : <p>No recent transactions found.</p>}
                </div>
            </div>
        </div>
    );
}

export default Landing;
