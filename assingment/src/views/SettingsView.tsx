import React from "react";
import './css/SettingsView.css'
import Settings from "./Settings";
import useSettings from "./useSettings";
import ChartsEditing from "../components/ChartsEditing";


interface SettingsCharts{
    options: Highcharts.Options[] | null;
    onAddChart: (options: Highcharts.Options) => void;
    onFilter: (start:Date, end:Date) => void;
    onRemoveChart: (index:number) => void;
    onUpdateCharts: (options: Highcharts.Options[]) => void;
}

const SettingsView: React.FC<SettingsCharts> = ({options, onAddChart, onRemoveChart, onUpdateCharts}) => {
    const {isOpen, toggle} = useSettings();


    return(
        <div className="settingsContainer">
            <div className="rectangleContainer">
             <h1 style={{textDecorationLine: 'underline'}}>What would you like to do?</h1>
                <div className="settingsText">Create your own chart: </div>
                <div>Press the button and create your own chart!</div>
                <button className="settingsbutton" onClick={toggle}>Create</button>
                <h2>OR</h2>
                <div className="settingsText">Edit an existing one</div>
                <div style ={{marginTop: '2px', marginBottom:'30px'}}>Scroll down and start editing one!</div>
            </div>
            <div className="middlepaneSettings">
                <ChartsEditing  onUpdateCharts= {onUpdateCharts} options={options}  onAddChart= {onAddChart} onRemoveChart={onRemoveChart}></ChartsEditing>
            </div>
            <Settings isOpen={isOpen} toggle={toggle} onAddChart={onAddChart}></Settings>
        </div>
    )
}

export default SettingsView;