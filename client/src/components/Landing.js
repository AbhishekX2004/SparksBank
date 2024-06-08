import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetch5Transactions } from "../actions";
import formatDateTime from "../utils/formatDateTime";
import Loader from "./Loader";

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

    if (loading) {
        return <Loader text="Loading recent Transactions" />;;
    }

    if (error) {
        return <p>Error loading transactions: {error.message}</p>;
    }

    return (
        <div>
            LANDING <br />
            <Link to='/accounts/all'>View all Accounts</Link>
            <br/>
            <Link to='/transactions/all'>View all Transactions</Link>
            <div className="allTransactionContainer">
                {transaction.length > 0 ? renderTransactions() : <p>No recent transactions found.</p>}
            </div>
        </div>
    );
}

export default Landing;