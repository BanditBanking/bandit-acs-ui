export const useDecimalSplitter = (value: number) => {
    const integerPart = Math.floor(value);
    const decimalPart = value % 1; // 0.4
    const decimalAsString = decimalPart.toFixed(2).substring(2); // "40"
    const paddedDecimal = decimalAsString.padStart(2, '0'); // "40" -> "40" (padded with one zero)

    return { integerPart, decimalPart: paddedDecimal }
}