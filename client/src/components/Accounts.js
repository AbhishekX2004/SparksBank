import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { arrayBufferToBase64 } from "../utils/bytesToImage";
import { fetchAllUsers, fetchAllUsersExcept } from "../actions";
import './Accounts.css';

function Accounts() {
    const { accountNumber } = useParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                let data;
                if (accountNumber === 'all') {
                    data = await fetchAllUsers();
                } else {
                    data = await fetchAllUsersExcept(accountNumber);
                }
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, [accountNumber]);

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
