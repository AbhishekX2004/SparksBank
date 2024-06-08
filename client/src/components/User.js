import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchUser, fetchTransactionsOf } from "../actions";
import { arrayBufferToBase64 } from "../utils/bytesToImage";
import formatDateTime from "../utils/formatDateTime";
import Loader from "./Loader";
import "./User.css";

function User() {
    const { accountNumber } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
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
    }, [accountNumber]);

    const renderTransactions = () => {
        return transaction.map((txn) => {
            const isDebit = txn.frid === parseInt(accountNumber, 10);
            return (
                <div key={txn.tid} className="transaction">
                    <p>
                        <strong>Transaction ID:</strong> {txn.tid} <br />
                        <strong>Amount:</strong> ${txn.amount} <br />                        
                        <strong>Timestamp:</strong> {formatDateTime(txn.timestamp)} <br />
                        <strong>Type:</strong> {isDebit ? "Debited" : "Credited"} <br />
                        <strong>{isDebit ? "To" : "From"} Account:</strong> {isDebit ? txn.toid : txn.frid}
                    </p>
                </div>
            );
        });
    };

    if (loading) {
        return <Loader text="Loading User data" />;
    }

    if (error) {
        return <p>Error loading users: {error.message}</p>;
    }

    const { name, gender, phone, email, picture, balance } = user[0];
    const imageSrc = `data:image/png;base64,${arrayBufferToBase64(picture.data)}`;

    const handleTransferClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setAmount("");
        setErrorMessage("");
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleTransferSubmit = () => {
        const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            setErrorMessage("Please enter a valid amount.");
        } else if (transferAmount > balance) {
            setErrorMessage("Insufficient balance.");
        } else {
            navigate(`/accounts/${accountNumber}/${transferAmount}`);
        }
    };

    return (
        <div className="userContainer">
            <h1 className="userHeader">Details of {name}</h1>
            <img src={imageSrc} alt={name} className="profileImage" />
            <div className="userDetails">
                <p><strong>Account Number:</strong> {accountNumber}</p>
                <p><strong>Gender:</strong> {gender === 'M' ? 'Male' : 'Female'}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Balance:</strong> ₹{balance}</p>
            </div>
            <div className="transactionContainer">
                {transaction.length > 0 ? renderTransactions() : <p>No recent transactions found.</p>}
            </div>
            <div className="buttonsContainer">
                <Link to="/accounts/all" className="backButton">Back to Users</Link>
                <button onClick={handleTransferClick} className="transfer">Transfer Money</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modalContent">
                        <h2>Transfer Money</h2>
                        <label>
                            Amount:
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                min="0"
                                step="0.01"
                            />
                        </label>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button onClick={handleTransferSubmit}>Submit</button>
                        <button onClick={handleModalClose}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
