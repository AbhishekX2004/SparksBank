import axios from 'axios';

export const fetchAllTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/fetch/transaction/all');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error in fetching transactions", error);
    }
  }

fetchAllTransactions();