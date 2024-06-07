// Function to format the timestamp
export default function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options) ;
};