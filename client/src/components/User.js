import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUser, fetchTransactionsOf } from "../actions";
import { arrayBufferToBase64 } from "../utils/bytesToImage";
import "./User.css";

function User() {
    const {accountNumber} = useParams();
    const [user, setUser] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async() => {
            try{
                let data = await fetchUser(accountNumber);
                setUser(data);
                let transaction = await fetchTransactionsOf(accountNumber);
                setTransaction(transaction);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    },[accountNumber]);

    const renderTransactions = () => {
        return transaction.map((txn) => {
            const isDebit = txn.frid === parseInt(accountNumber, 10);
            return (
                <div key={txn.tid} className="transaction">
                    <p>
                        <strong>Transaction ID:</strong> {txn.tid} <br />
                        <strong>Amount:</strong> ${txn.amount} <br />
                        <strong>Type:</strong> {isDebit ? "Debited" : "Credited"} <br />
                        <strong>{isDebit ? "To" : "From"} Account:</strong> {isDebit ? txn.toid : txn.frid}
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

    const {name, gender, phone, email, picture, balance } = user[0];
    const imageSrc = `data:image/png;base64,${arrayBufferToBase64(picture.data)}`;

    return (
        <div className="userContainer">
            <h1 className="userHeader">Details of {name}</h1>
            <img src={imageSrc} alt={name} className="profileImage" />
            <div className="userDetails">
                <p><strong>Account Number:</strong> {accountNumber}</p>
                <p><strong>Gender:</strong> {gender === 'M' ? 'Male' : 'Female'}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Balance:</strong> ${balance}</p>
            </div>
            <div className="transactionContainer">
                {transaction.length > 0 ? renderTransactions() : <p>No recent transactions found.</p>}
            </div>
            <div className="buttonsContainer">
                <Link to="/accounts/all" className="backButton">Back to Users</Link>
                <Link to={`/accounts/${accountNumber}`} className="transfer">Transfer Money</Link>
            </div>
        </div>
    );
}

export default User;