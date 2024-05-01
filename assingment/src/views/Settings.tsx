import React, {ReactNode} from "react";
import './css/Settings.css'
import CreateChart from "../components/CreateChart";

interface ModalType{
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    onAddChart: (options: Highcharts.Options) => void;
}


export default function Settings(props: ModalType){

    return(
        <>
        {props.isOpen && (
           
            <div className = "settings-overlay">
               
                <div className = "settings"> 
                     <button className="button-close" onClick={props.toggle}>X</button>
                     <CreateChart toggle = {props.toggle} onAddChart={props.onAddChart}></CreateChart>
                 </div>
               
             </div>
           

        )}
        </>
    )
}
