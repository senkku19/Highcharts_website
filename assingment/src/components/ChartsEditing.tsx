import { useState } from "react";
import Highcharts from 'highcharts';
import Chart from "./Chart";
import './css/Chart.css'
import useEditModal from "../views/useEditModal";
import EditModal from "../views/EditModal";

interface ChartsDateRange {
    options: Highcharts.Options[] | null;    
    onRemoveChart: (inded: number) => void;
    onAddChart: (options: Highcharts.Options) => void;
    onUpdateCharts: (options: Highcharts.Options[]) => void;
}


const ChartsEditing: React.FC<ChartsDateRange> = ({ options, onRemoveChart, onAddChart, onUpdateCharts}) => {
    const {isOpenEdit, toggleEdit} = useEditModal();
    const [position, setPosition] = useState<number>(0);

const openModal = (index: number) => {
    setPosition(index);
    toggleEdit(index);

}

    if (!options) {
        return <h1>No charts yet...</h1>;
    }

    return (
        <div>
             <div className="toppane">
            </div>
            {options.map((option, index) => (
                <div key = {index} className="chartsContainer">
                <Chart options = {option}/>
                <button style = {{backgroundColor: 'burlywood',borderColor:'Black'}} onClick={() => openModal(index)}>Edit</button>
                <button style = {{backgroundColor: 'beige',borderColor:'Black'}} onClick={() => onRemoveChart(index)}>Remove</button>
                </div>
                
            ))}
                 <EditModal onAddChart= {onAddChart} onUpdateCharts={onUpdateCharts} isOpenEdit={isOpenEdit} toggleEdit={toggleEdit} index={position} options={options}></EditModal>
         </div>
    );
} 



export default ChartsEditing;
