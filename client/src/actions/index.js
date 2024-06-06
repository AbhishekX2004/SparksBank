import axios from 'axios';


const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchAllTransactions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/fetch/transaction/all`);
        console.log(`\nFETCH transaction status :: SUCCESSFUL\n${response.data}\n`);
        return response.data;
    } catch (error) {
        console.error(`\nFETCH transaction status :: FAILED\n${error}\n`);
    }
};

export const fetchTransactionsOf = async (account) => {
    try{
        const response = await axios.get(`${BASE_URL}/fetch/transaction/${account}`);
        console.log(`FETCH transaction status :: SUCCESSFUL\n${response.data}`);
        return response.data;
    } catch (error) { 
        console.error(`\nFETCH transaction status :: FAILED\n${error}\n`);
    }
};

export const saveTransaction = async (from,to,amount) => {
    try{
        const response = await axios.post(`${BASE_URL}/save/transaction`,{
            frid: from,
            toid: to,
            amount: amount
        });
        console.log(`SAVE transaction status :: SUCCESSFUL\n${response.data}`);
        return response.data;
    } catch (error) { 
        console.error(`\nSAVE transaction status :: FAILED\n${error}\n`);
    }
};

export const fetchAllUsers = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/fetch/account/all`);
        console.log(`FETCH account status :: SUCCESSFUL\n${response.data}`);
        return response.data;
    } catch (error) { 
        console.error(`\nFETCH account status :: FAILED\n${error}\n`);
    }
};

export const fetchAllUsersExcept = async (account) => {
    try{
        const response = await axios.get(`${BASE_URL}/fetch/account/except/${account}`);
        console.log(`FETCH account status :: SUCCESSFUL\n${response.data}`);
        return response.data;
    } catch (error) { 
        console.error(`\nFETCH account status :: FAILED\n${error}\n`);
    }
};

export const fetchUser = async (account) => {
    try{
        const response = await axios.get(`${BASE_URL}/fetch/account/${account}/all`);
        console.log(`FETCH account status :: SUCCESSFUL\n${response.data}`);
        return response.data;
    } catch (error) { 
        console.error(`\nFETCH account status :: FAILED\n${error}\n`);
    }
};