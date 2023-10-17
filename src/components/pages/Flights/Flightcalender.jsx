import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../assets/styles/Calenderstyles.css";
import MySnackbar from "../../modals/Signupmodals/Snackbar"
const priceData = {
  "01-03-2023": " $1000000",
  "02-03-2023": " $800",
  "03-03-2023": " $120",
  // more price data for other dates
};
const dates = ["01-03-2023", "02-03-2023", "03-03-2023"];

function CalendarWithPrices(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [cal, setCal] = useState(false);
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const getPriceForDate = (date) => {
    const dateString = date.toISOString().substring(0, 10);
    return priceData[dateString] || "";
  };

  const handleDateChange = (date) => {
    // alert(props.trip)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected_date = date;
    selected_date.setHours(0, 0, 0, 0);
    // console.log(date,"datejksfd")
    // console.log(new Date(),"ajjkdfsla")
    if (selected_date < today) {
      setSnackopen(true);
      setSnackmessage("you didn't allow to select the previous date");
      // alert("you didn't allow to select the previous date");
      return;
    } else {
      setSelectedDate(date);
      props.selectdate(date, props.trip);
    }

    // console.log(date)
  };
  const tile = ({ date, view }) => {
    const d = new Date(date);

    if (date < new Date()) {
      // return { disabled: true, label: date.getDate().toString() };
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}-${month}-${year}`;
    for (let key in priceData) {
      if (key === formattedDate) {
        console.log(priceData[key]);

        return (
          <>
            <br />
            <span style={{ color: "green" }}>{priceData[key]}</span>
          </>
        );
      }
    }
  };

  //disable date
  const disablePastDates = (date) => {
    let comingDate = new Date(date)
    comingDate.setHours(0, 0, 0, 0);
    let todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0);
    return comingDate < todayDate;
  };

  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      {/* {cal&& */}
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={(date, view) => tile(date, view)}
        // sx={{zindex:'1'}}
        tileClassName={({ date }) =>
          disablePastDates(date) ? 'disabled-date' : ''
        }
      />
      {/* } */}
      {/* <button onClick={()=>setCal(prev=>!prev)}>calender</button>
      {selectedDate && (
        <div>
          <p>
            Price for {selectedDate.toLocaleDateString()}:{' '}
            {getPriceForDate(selectedDate)}
          </p>
        </div>
      )} */}
    </div>
  );
}

export default CalendarWithPrices;
