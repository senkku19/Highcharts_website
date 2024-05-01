import React, {useEffect, useState} from "react";
import Charts from "../components/Charts";
import './css/ViewMode.css'
import DateSelector from "../components/DateSelector";

interface ViewModeProps {
    charts: Highcharts.Options[] |null;
    onFilter: (start:Date, end:Date) => void;
    getAllCharts: () => void;
  }

const ViewMode: React.FC<ViewModeProps> = ({charts, onFilter, getAllCharts}) =>{
    const [rangeStart, setRangeStart] = useState<Date>(new Date());
    const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

    //When coming back to view this resets the date range
    useEffect(()=>{
        getAllCharts();
    }, [])

    const handelDatePick = (start: Date, end:Date) => {
        onFilter(start, end);
      }

      const selectStartDate = (d: Date) => {
         setRangeStart(d);
      }
    
      const selectEndDate = (d:Date) => {
        setRangeEnd(d);
      }
    
    if (charts === null || charts.length === 0){
        return (
        <div className="viewContainer"> 
            <h1 style = {{marginTop: 20}}>No charts yet...</h1> 
        </div>
        )
    } else {
     return(
        <div className="viewContainer">
            <div className="middlepain">
                <DateSelector start={rangeStart} end={rangeEnd} onDateRangeEvent={handelDatePick} selectStartDate={selectStartDate} selectEndDate={selectEndDate} getAllCharts={getAllCharts}></DateSelector>
                <Charts options={charts}></Charts>
            </div>
        </div>
    )
    }
   
}

export default ViewMode;