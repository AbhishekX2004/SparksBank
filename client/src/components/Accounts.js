import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { arrayBufferToBase64 } from "../utils/bytesToImage";
import { fetchAllUsers } from "../actions";
import Loader from "./Loader";
import './Accounts.css';

function Accounts() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                let data;
                data = await fetchAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    if (loading) {
        return <Loader text="Loading Users" />;
    }

    if (error) {
        return <p>Error loading users: {error.message}</p>;
    }

    const renderUsers = () => {
        return users.map((user, index) => {
            const base64Image = arrayBufferToBase64(user.picture.data);
            const imageSrc = `data:image/png;base64,${base64Image}`;

            return (
                <motion.div
                    whileHover={{ y: -10 }}
                >
                    <motion.div
                        key={user.accountno}
                        className="card"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Link to={`/user/${user.accountno}`}>
                            <img src={imageSrc} alt={user.name} className="cardImage" />
                            <p><b>Account No:</b> {user.accountno}</p>
                            <p><b>Name</b>: {user.name}</p>
                        </Link>
                    </motion.div>
                </motion.div>
            );
        });
    };

    return (
        <>
            <h2 className="user-header">
                Please select an Account
            </h2>
            <div className="cardContainer">
                {users.length > 0 ? renderUsers() : <p>No users available.</p>}
            </div>
        </>
    );
}

export default Accounts;
