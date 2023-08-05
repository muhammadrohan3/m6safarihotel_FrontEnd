export const numberWithCommas = (number) => {
    console.log("This is number",number)
    if(number){
        const sanitizedValue = number.toString().replace(/,/g, "");
        return sanitizedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return
    
};
export function isNumber(input) {
    return typeof input === "string" && /^[A-Za-z]+$/.test(input);
}
export function isNumber1(value) {
    // Remove commas from the input string
    const numericString = value.replace(/,/g, '');
    
    // Use regex to check if the numericString only contains digits or a valid numeric format
    return /^-?\d+(\.\d+)?$/.test(numericString);
  }