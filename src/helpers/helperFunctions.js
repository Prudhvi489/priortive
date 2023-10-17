const helperFunctions = {
  findage: async (dob) => {
    var today = new Date();
    var givenDate = new Date(dob);

    var yearsDiff = today.getFullYear() - givenDate.getFullYear();
    var monthsDiff = today.getMonth() - givenDate.getMonth();
    var daysDiff = today.getDate() - givenDate.getDate();
    // Adjust for negative differences
    if (daysDiff < 0) {
      monthsDiff--;
      daysDiff += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    // Calculate the age in decimal format
    var age = yearsDiff + (monthsDiff / 12) + (daysDiff / 365);
    return age;
    // console.log("Age: " + age);

    // return new Date().getFullYear() - parseInt(dob.split('-')[0]);
  },
  // Wednesday 28 Dec, 2022 date formate
  getdate: async (olddate) => {
    const date = new Date(olddate);
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);
    return formattedDate;
  },
  getshortdate: (olddate) => {//2023-07-07T01:02:00
    let trimmedDateStr 
    if(olddate.includes('Z')){//2023-07-13T01:10:00.000Z
      trimmedDateStr = olddate.slice(0,-5)
    }
    const date = new Date(olddate.includes('Z')?trimmedDateStr:olddate);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    // const formattedDate = formatter.format(date);
    const parts = formatter.formatToParts(date);
    const formattedDate = `${parts[0].value}, ${parts[4].value} ${parts[2].value} ${parts[6].value}`;
    return formattedDate;

  },
  getapi_date:(currentDate)=>{
    if(currentDate===""||currentDate===undefined){
      return "";
    }
    else{
      const day = String(new Date(currentDate).getDate()).padStart(2, '0');
      const month = String(new Date(currentDate).getMonth() + 1).padStart(2, '0');
      const year = new Date(currentDate).getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      // console.log(formattedDate);
      return formattedDate;
    }
   
  },
  nights_calc:(checkindate,checkoutdate)=>{
    const checkinDate = new Date(checkindate);
    const checkoutDate = new Date(checkoutdate);
    const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // milliseconds in a day
    const numberOfNights = Math.round(timeDifference / oneDayInMilliseconds);
// console.log(numberOfNights);
return numberOfNights;
  },
  // Date in Fri Dec 2023
  get_short_date:(date)=>{
    const currentDate = new Date(date);
    // console.log(currentDate,"current date")
    const options = { weekday: 'short', month: 'short', day: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);//.split(' ').reverse().join(' ');
    return formattedDate;
    console.log(formattedDate); // Output: "Tue Jun 2023"
  },
  // Date in 31 Dec 2023
  get_numeric_date:(date)=>{
    const currentDate = new Date(date);
    const day = currentDate.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(currentDate);
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  },
  // Getting dayname
  day_name:(date)=>{
    const dateObject = new Date(date);
    const options = { weekday: "long" };
    const dayName = dateObject.toLocaleDateString("en-US", options);
    return dayName; // Output: Tuesday   
  },
  // --------------------function to convert ISO Time str to YYYY-MM-DD format------------------------//
   //type =1 MM-DD-YYYY, 2 - DD-MM-
    // function to convert date string
    // console.log(str, 'str')
  convertDateStr: (str, type = 2) => {
    if (str) {
      if (type === 1) {
        let date = str;
        date = date.split('T');
        date = date[0].split('-');
        date = date[1] + "-" + date[2] + "-" + date[0];
        return date;
      } else {
        let date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day,mnth,date.getFullYear()].join("/");
      }
    }
  },
  // time in 04:45am 12hrs formate
  get_time:(time24h)=>{
    console.log(time24h,"time")
    if(time24h){
      const dateTime = new Date(time24h);

const hours = dateTime.getHours();
const minutes = dateTime.getMinutes();
const seconds = dateTime.getSeconds();
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
// const formattedTime = `${hours}:${minutes}:${seconds}`;
return formattedTime;
// 12hrs formate
    //   let trimmedString
    //   if(time24h.includes('Z')){//2023-07-13T01:10:00.000Z
    //      trimmedString = time24h.slice(0, -5);
    //   }
    //   const date=new Date(time24h.includes('Z')?trimmedString:time24h)//2023-07-07T01:02:00
    //    const hours24=date.getHours()
    //   //  console.log(hours24)
    //   const hours12 = hours24 % 12 || 12;
    //   const minutes = date.getMinutes();
    //   const amPm = hours24 >= 12 ? 'PM' : 'AM';
    //    const time12h = `${hours12.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')} ${amPm}`;
    //   //  console.log(time12h)
    //  return time12h;
    }else{
      return ''
    }
   
  },
  cancelltion_percentage:(pub_fare,cancel_fare)=>{
    if(cancel_fare.includes("INR")){
      let cancel_amount=parseInt(cancel_fare.split(" ")[1]);
      let percent=Math.round((cancel_amount/pub_fare)*100);
      return percent;
    }
    else{
      return cancel_fare
    }
  },
  // Hotel Fixed room calculation
  hotel_fixedroom_price:(indexes,roomsarray)=>{
    let intitial_split=indexes.split("_")
    let splitarrays=intitial_split.map((str)=>str.split("|"));
    const category_ids=splitarrays.map((item)=>item[1])
    let indexarray=splitarrays.map((splitarray)=>parseInt(splitarray[0]))
    let totalprice=0
    for(let i=0;i<=indexarray.length-1;i++){
      const obj=roomsarray.find(item=>item.RoomIndex===indexarray[i]&&item.CategoryId===category_ids[i])
      if(obj&& obj.Price && obj.Price.PublishedPriceRoundedOff){
      totalprice+=obj.Price.PublishedPriceRoundedOff
      }
    }
    return totalprice
  },
  // updated room price
  Updated_room_price:(data)=>{
    const total_price=data.reduce((acc,curr)=>{
      return acc+curr.Price.PublishedPriceRoundedOff
    },0)
    return total_price;
  },
  // cancellation days
  calculateDateDifference: (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const timeDifference = secondDate.getTime() - firstDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  },
  // Hotel room cancellation penalty %
  hotel_cancellation_penalty:(chargetype,amount,data,roomarray)=>{
    if(chargetype===2){
      return amount;
    }
    else{
      let total_price;
      if(typeof data==="string"){
        total_price=helperFunctions.hotel_fixedroom_price(data,roomarray)
      }
      else{

        total_price=helperFunctions.Updated_room_price(data);
      }
      let percentage=Math.ceil((amount/total_price)*100);
      return percentage;
    }
     
  },
  // returns the cancellation amount in rupees
  hotel_cancellation_penalty_rs:(chargetype,amount,data,roomarray)=>{
    if(chargetype!==2){
      return amount
    }
    else{
      let total_price;
      if(typeof data==="string"){
        total_price=helperFunctions.hotel_fixedroom_price(data,roomarray)
      }
      else{
        total_price=helperFunctions.Updated_room_price(data);
      }
      let price=Math.ceil((amount*total_price)/100);
      return price;
    }
  },
  // normalization of the path
 normalizePath :(path)=>
{
  const normalizedPath = path.replace(/\/+$/, '');
  return normalizedPath.startsWith('/') ? normalizedPath : `/{normalizedPath}`;
},
// checkin.checkout date conditional checking
checkoutdatechecking:(checkin,checkout)=>{
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  if ((checkinDate.getDate()>=checkoutDate.getDate()&&checkinDate.getMonth()===checkoutDate.getMonth()&&checkinDate.getFullYear()===checkoutDate.getFullYear())||(checkinDate.getMonth()>checkoutDate.getMonth())||(checkinDate.getFullYear()>checkoutDate.getFullYear())) {
    return true; // Checkout date is greater than check-in date
  } else {
    return false; // Checkout date is less than or equal to check-in date
  }
},
// distance calculation between two locations
Disancecalculator:(lat1, lon1, lat2, lon2)=> {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
},
// TAKES INPUT ISO UTC STRING  -- "2023-08-10T05:24:00.000Z" RETURNS IST STRING WITH FORMAT Promise { 'August 10, 2023 at 10:54 AM' }
convertToIst :  (utcDate) => {
  // Create a new Date object with the UTC date string
  const date = new Date(utcDate);
  
  // Convert the UTC time to IST by adding the offset
  const istOffsetMinutes = 330; // IST offset is 5 hours 30 minutes ahead of UTC
  const istDate = new Date(date.getTime() + (istOffsetMinutes) * 60000);
 const isoIstStr =  new Date(istDate.toISOString());
 const isoString = "2023-08-10T10:54:00.000Z";
 const datee = new Date(isoString);
 
 const options = {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   hour12: true
 };
 
 const formattedDate = datee.toLocaleString('en-US', options);
 
 console.log(formattedDate);
  return istDate.toISOString()
  },

}

export default helperFunctions;