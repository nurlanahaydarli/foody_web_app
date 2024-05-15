export const shortText = (text, limit) => {
    return text?.length >= limit ? `${text.slice(0, limit)}...` : text
}