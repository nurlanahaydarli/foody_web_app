export const isNewFunction = (productTimestampMs: number): boolean => {
    const currentDate = new Date();
    const productDate = new Date(productTimestampMs);
    const differenceInMs = currentDate.getTime() - productDate.getTime();
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    return differenceInDays < 5;
};