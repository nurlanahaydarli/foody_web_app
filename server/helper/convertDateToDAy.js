export default function formatDate(timestamp) {
    // Create a new Date object using the timestamp
    const date = new Date(timestamp);
    
    // Define an array with month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Extract the day, month, and year from the date
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    // Format the date as "DD MMM YYYY"
    return `${day} ${month} ${year}`;
}

