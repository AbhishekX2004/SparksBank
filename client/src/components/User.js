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
                <div key={txn.tid} className="user-transaction">
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
        console.log("Transfer Money button clicked");
        setShowModal(true);
    };

    const handleModalClose = () => {
        console.log("Modal closed");
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
        <div className="user-userContainer">
            <div className="user-leftColumn">
                <h1 className="user-userHeader">Details of {name}</h1>
                <div className="user-Details">
                    <img src={imageSrc} alt={name} className="user-profileImage" />
                    <div className="user-userDetails">
                        <p><strong>Account Number:</strong> {accountNumber}</p>
                        <p><strong>Gender:</strong> {gender === 'M' ? 'Male' : 'Female'}</p>
                        <p><strong>Phone:</strong> {phone}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Balance:</strong> ₹{balance}</p>
                    </div>
                </div>
                <div className="user-buttonsContainer">
                    <Link to="/accounts/all" className="user-backButton button-66">Back to Users</Link>
                    <button onClick={handleTransferClick} className="user-transfer button-85">Transfer Money</button>
                </div>
            </div>
            <div className="user-rightColumn">
                <h2 className="user-transactionsHeader">Past Transactions</h2>
                <div className="user-transactionContainer">
                    {transaction.length > 0 ? renderTransactions() : <p>No recent transactions found.</p>}
                </div>
            </div>

            {showModal && (
                <div className="user-modal" style={{ display: 'flex'}}>
                    <div className="user-modalContent">
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
                        {errorMessage && <p className="user-error">{errorMessage}</p>}
                        <button onClick={handleTransferSubmit}>Submit</button>
                        <button onClick={handleModalClose}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
