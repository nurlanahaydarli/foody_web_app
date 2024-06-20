export function convertTimestamp(timestamp: number): string {
    // Convert milliseconds to seconds
    let date = new Date(timestamp);

    // Extract components
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let day = date.getUTCDate().toString().padStart(2, '0');
    let month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    let year = date.getUTCFullYear();

    // Format the date and time
    return `${hours}:${minutes} ${day}-${month}-${year}`;
}
