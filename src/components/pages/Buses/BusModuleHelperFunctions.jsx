  //formatType(1) 2023-06-15T23:00:00 ----> Thu, Jun 15, 2023 at 23:00
  //formatType() 2023-06-15T23:00:00 ----> 15:00, 16 JUN
export function convertDateFormat(dateString, formatType) {
    const date = new Date(dateString);

    // const options = {
    //   weekday: "short",
    //   year: "numeric",
    //   month: "short",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   hour12: false, // Set to false for 24-hour format
    // };
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
      hour12: false, // Set to false for 24-hour format
    };

    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate.toUpperCase();
  }

//   --------------------------------------------------------------------------------------
export function getTimeDifferenceBtTwoDates(startDateString, endDateString) {
  let trimmedStartDateString ,trimmedEndDateString
  if(startDateString.includes('Z')&&endDateString.includes('Z')){//2023-07-13T01:10:00.000Z
    trimmedStartDateString  =startDateString.slice(0,-5)
    trimmedEndDateString  =endDateString.slice(0,-5)

  }else{//2023-07-07T01:02:00
    trimmedStartDateString  =startDateString
    trimmedEndDateString  =endDateString
  }
    const startDate = new Date(trimmedStartDateString);
    const endDate = new Date(trimmedEndDateString);

    const timeDifferenceInMs = Math.abs(endDate - startDate);
    const hours = Math.floor(timeDifferenceInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceInMs / (1000 * 60)) % 60);

    return `${hours} hrs ${minutes} min`;
  }
//**  ChargeType Amount = 1 ₹ , Percentage = 2 % ,Nights = 3   */
  export function convertArrayToTable(array) {
    if(array&&array.length>0){

    
    let table = '<table className="tablesClass">';
    
    // Create table header
    table += '<thead><tr><th>FromDate</th><th>ToDate</th><th>PolicyString</th><th>CancellationCharge</th></tr></thead>';
    
    array.forEach(obj => {
      const fromDate = convertDateFormat(obj.FromDate);
      const toDate = convertDateFormat(obj.ToDate);
      const policyString = obj.PolicyString;
      const CancellationCharge = `${obj?.CancellationCharge??""} ${obj?.CancellationChargeType===1?"₹":"%"}`
      
      // Create a new row in the table
      table += `<tbody><tr><td>${fromDate}</td><td>${toDate}</td><td>${policyString}</td> <td>${CancellationCharge}</td></tr></tbody>`;
    });
    
    table += '</table>';
    
    return table;
  }
  }
  // handleCharSpace for first letter
export const handleCharSpace = (e) => {
  const inputValue = e.target.value;
  let onlyAlphaRegix =  /^[a-zA-Z]+$/
  if (e.target.value?.length === 0 && e.which === 32) {
    e.preventDefault();
  }
  // else if(!onlyAlphaRegix.test(inputValue)){
  //   e.preventDefault();
  // }
}
// handleChange input only numbers
export const handleNumInput = (e) => {
  const isNumberKey = /^[0-9]$/.test(e.key);
  const isBackspaceKey = e.key === 'Backspace';
  const isTabKey = e.key === 'Tab';

  if (!isNumberKey && !isBackspaceKey && !isTabKey) {
    e.preventDefault();
  }
  // if (/\D/g.test(e.target.value)) {
  //   e.target.value = e.target.value.replace(/[^0-9]/g, '');//(/\D/g, '');
  // }
  // if (/[\D][^0-9\.\,]/g.test(e.target.value)) {
  //   e.target.value = e.target.value.replace(/[\D][^0-9\.\,]/g, '');
  // }
}
// /-----------------FORMAT YYYY-MM-DD    ,,1999-06-26
export const calculateAge = (birthDate) => {
  const regex = /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT\+\d{4} \(.+\)$/;

  // if (!regex.test(birthDate)) {
  //   alert(
  //     'Invalid date format. Please use "(India Standard Time)".'
  //   );
  //   return;
  // }
  const today = new Date();
  const birthDateObj = new Date(birthDate);

  let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();

  // Check if the birth date hasn't occurred yet this year
  if (
    today.getMonth() < birthDateObj.getMonth() ||
    (today.getMonth() === birthDateObj.getMonth() &&
      today.getDate() < birthDateObj.getDate())
  ) {
    calculatedAge--;
  }
  return calculatedAge;
};






