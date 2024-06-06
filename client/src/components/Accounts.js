import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { arrayBufferToBase64 } from "../utils/bytesToImage";
import { fetchAllUsers } from "../actions";
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
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error loading users: {error.message}</p>;
    }

    const renderUsers = () => {
        return users.map((user) => {
            const base64Image = arrayBufferToBase64(user.picture.data);
            const imageSrc = `data:image/png;base64,${base64Image}`;

            return (
                <div key={user.accountno} className="card">
                    <Link to={`/user/${user.accountno}`}>
                        <img src={imageSrc} alt={user.name} className="cardImage" />
                        <p><b>Account No:</b> {user.accountno}</p>
                        <p><b>Name</b>: {user.name}</p>
                    </Link>
                </div>

            );
        });
    };

    return (
        <div className="cardContainer">
            {users.length > 0 ? renderUsers() : <p>No users available.</p>}
        </div>
    );
}

export default Accounts;
