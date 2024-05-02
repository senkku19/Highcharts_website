import React from "react";
import './css/DatePicker.css'
import "react-datepicker/dist/react-datepicker.css";

interface DateSelectorProps {
    start: Date,
    end: Date | null,
    onDateRangeEvent: (start: Date, end: Date) => void,
    selectStartDate: (start: Date) => void,
    selectEndDate: (start: Date) => void;
    getAllCharts: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({start, end, onDateRangeEvent, selectStartDate, selectEndDate, getAllCharts}) => {
    const minDate = start.toISOString().split('T')[0];


    return(
     <div className="dateContainer">
        <span className="text">Date range:</span>
        <span className="oneDate">
            <input
            type="date"
            placeholder="yyyy-MM-dd" 
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={(e) => selectStartDate(new Date(e.target.value))}
            />
        </span>
        <label> - </label>
        <span className="secondDate" >
            <input
            type="date"
            onChange={(e) => selectEndDate(new Date(e.target.value))} 
            placeholder="yyyy-MM-dd" 
            pattern="\d{4}-\d{2}-\d{2}"
            min={minDate}    
        />
        </span>
        <span className="secondDate">
            <button 
            className="button"
            style={{backgroundColor:'lightblue'}} 
            onClick={() =>{ 
                if (start && end){
                     onDateRangeEvent(start, end);
                 }
            }}>Apply</button>
            <button
                className="button" 
                style={{backgroundColor:'bisque'}} 
                onClick={() => getAllCharts()}
                >Reset</button>
        </span>
        
     </div>
    );
}

export default DateSelector;