export default function firebaseIdToShortNumber(id) {
    let hash = 5381;
    for (let i = 0; i < id?.length; i++) {
        hash = (hash * 33) ^ id?.charCodeAt(i);
    }
    return Math.abs(hash);
}


// Example usage
// const firebaseId = "y2RO5xT9XaSwzBtQcTmiNObm5t52";
// const numericId = firebaseIdToNumber(firebaseId);

// console.log(numericId); // Output the numeric ID