import React,{useState} from 'react'
import 'react-dates/lib/css/_datepicker.css';
// import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
const Date = () => {
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
};

const handleFocusChange = (focusedInput) => {

    setFocusedInput(focusedInput);
};
  return (
    <div>
        <DateRangePicker
            startDate={startDate}
            startDateId="startdate"
            endDate={endDate}
            endDateId="enddate"
            // startDatePlaceholderText="Start Date"
            // small="true"
            
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={handleFocusChange}
            isOutsideRange={() => false} // Optional: Allows selection of past dates
           
          />
    </div>
  )
}

export default Date