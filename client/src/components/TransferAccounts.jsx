import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { arrayBufferToBase64 } from "../utils/bytesToImage";
import { fetchAllUsersExcept, saveTransaction } from "../actions";
import { motion } from "framer-motion";
import Loader from "./Loader";
import './Accounts.css';
import Popup from './Popup';

function TransferAccounts() {
    const { accountNumber, amount } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupLoading, setIsPopupLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchAllUsersExcept(accountNumber);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [accountNumber]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [fetchUsers]);

    const handleUserClick = useCallback((user) => {
        setSelectedUser(user);
        setShowModal(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setShowModal(false);
        setSelectedUser(null);
    }, []);

    const handleConfirmTransfer = useCallback(async () => {
        if (isPopupLoading) {
            return;
        }

        setIsPopupLoading(true);

        try {
            const { accountno } = selectedUser;
            await saveTransaction(accountNumber, accountno, amount);
            setPopupMessage('Transaction successful!');
            setShowPopup(true);
        } catch (error) {
            console.error(`\nSAVE transaction status :: FAILED\n${error}\n`);
            setPopupMessage('Transaction failed!');
            setShowPopup(true);
        } finally {
            setShowModal(false);
            setIsPopupLoading(false);
            setTimeout(() => {
                setShowPopup(false);
                navigate(`/accounts/all`);
            }, 3000);
        }
    }, [accountNumber, amount, selectedUser, isPopupLoading, navigate]);

    const renderUsers = useCallback(() => {
        if (loading || error) {
            return null; // Early return to prevent rendering
        }

        return users.map((user, index) => {
            const base64Image = arrayBufferToBase64(user.picture.data);
            const imageSrc = `data:image/png;base64,${base64Image}`;

            return (
                <motion.div
                    key={user.accountno}
                    whileHover={{ y: -10 }}
                >
                    <motion.div
                        
                        className="card"
                        onClick={() => handleUserClick(user)}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <img src={imageSrc} alt={user.name} className="cardImage" />
                        <p><b>Account No:</b> {user.accountno}</p>
                        <p><b>Name</b>: {user.name}</p>
                    </motion.div>
                </motion.div>
            );
        });
    }, [users, handleUserClick, loading, error]);

    if (loading) {
        return <Loader text="Loading Users" />;
    }

    if (error) {
        return <p>Error loading users: {error.message}</p>;
    }

    return (
        <>
            <h2 className="user-header">
                Please select the Receivers Account
            </h2>
            <div className="cardContainer">
                {users.length > 0 ? renderUsers() : <p>No users available.</p>}
                {showModal && selectedUser && (
                    <div className="user-modal" style={{ display: 'flex' }}>
                        <div className="user-modalContent">
                            <button className="user-cancelButtonTopRight" onClick={handleModalClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </button>
                            <h2>Confirm Transfer to {selectedUser.name} ({selectedUser.accountno})</h2>
                            <p>Are you sure you want to transfer <b>₹{amount}</b> to account number {selectedUser.accountno}?</p>
                            <button className="user-submitButton" onClick={handleConfirmTransfer}>Confirm</button>
                        </div>
                    </div>
                )}
                {showPopup && (
                    <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
                )}
            </div>
        </>
    );
}

export default TransferAccounts;