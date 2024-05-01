import React, {ReactNode} from "react";
import './css/Settings.css'
import EditChart from "../components/EditChart";

interface ModalType{
    children?: ReactNode;
    isOpenEdit: boolean;
    toggleEdit: ( index: number) => void;
    index:number;
    options: Highcharts.Options[];
    onAddChart: (options: Highcharts.Options) => void;
    onUpdateCharts: (options: Highcharts.Options[]) => void;
}


export default function EditModal(props: ModalType){

    return(
        <>
        {props.isOpenEdit && (
            <div className = "settings-overlay">
                <div className = "settings"> 
                     <button className="button-close" onClick={() => props.toggleEdit(0)}>X</button>
                     <EditChart onUpdateCharts={props.onUpdateCharts} isOpenEdit = {props.isOpenEdit} toggleEdit={props.toggleEdit} index={props.index} options={props.options}></EditChart>
                 </div>
             </div>

        )}
        </>
    )
}
