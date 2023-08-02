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