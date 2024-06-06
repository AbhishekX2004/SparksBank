import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { arrayBufferToBase64 } from "../utils/bytesToImage";
import { fetchAllUsersExcept, saveTransaction } from "../actions";
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
            setPopupMessage('Transaction successful');
            setShowPopup(true);
        } catch (error) {
            console.error(`\nSAVE transaction status :: FAILED\n${error}\n`);
            setPopupMessage('Transaction failed');
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

        return users.map((user) => {
            const base64Image = arrayBufferToBase64(user.picture.data);
            const imageSrc = `data:image/png;base64,${base64Image}`;

            return (
                <div key={user.accountno} className="card" onClick={() => handleUserClick(user)}>
                    <img src={imageSrc} alt={user.name} className="cardImage" />
                    <p><b>Account No:</b> {user.accountno}</p>
                    <p><b>Name</b>: {user.name}</p>
                </div>
            );
        });
    }, [users, handleUserClick]);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error loading users: {error.message}</p>;
    }

    return (
        <div className="cardContainer">
            {users.length > 0 ? renderUsers() : <p>No users available.</p>}
            {showModal && selectedUser && (
                <div className="modal">
                    <div className="modalContent">
                        <h2>Confirm Transfer to {selectedUser.accountno}</h2>
                        <p>Are you sure you want to transfer to account number {selectedUser.accountno}?</p>
                        <button onClick={handleConfirmTransfer}>Confirm</button>
                        <button onClick={handleModalClose}>Cancel</button>
                    </div>
                </div>
            )}
            {showPopup && (
                <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
}

export default TransferAccounts;