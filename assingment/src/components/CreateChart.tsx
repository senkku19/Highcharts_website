import React, { useState } from 'react';
import Highcharts from 'highcharts';
import './css/CreateChart.css'




interface ChartData{
    toggle: () => void;
    onAddChart: (options: Highcharts.Options) => void;
}


const CreateChart: React.FC<ChartData> = ({onAddChart, toggle}) => {
  const [chartTitle, setChartTitle] = useState<string>('');
  type ChaertType = ('line' | 'spline' | 'column'|'area');
  const [chartType, setChartType] = useState<ChaertType> ('line');
  const [chartSerieName, setChartSerieName] = useState('');
  const [colorType, setColorType] = useState<('Pink' | 'Blue' | 'Black' | 'Yellow' | 'Green' | 'Purple')>('Pink');
  const [colorChart, setcolorChart] = useState<{ color: string, hex: string }[]>([
    { color: 'Pink', hex: '#FFC0CB' },
    { color: 'Blue', hex: '#0000FF' },
    { color: 'Black', hex: '#000000' },
    { color: 'Yellow', hex: '#FFFF00' },
    { color: 'Purple', hex: '#A020F0' },
    { color: 'Green', hex: '#008000' }
  ]);
  const [formData, setFormData] = useState<{
    category: string, 
    values: number, 
    id:number}[]> ([{category: '', values: 0, id:1}])

const handleChangeCategory = (id:number, event:React.ChangeEvent<HTMLInputElement>) =>{   
    const index=formData.findIndex(n=>n.id===id);
    let helpFormData = [...formData] as any
    helpFormData[index][event.target.name]=event.target.name === 'values' ? parseFloat(event.target.value) : event.target.value;
    setFormData(helpFormData);
};
    

    
 const addInputField = () => {
        let helpFormData = [...formData];
        var idHelper = helpFormData.length + 1;
        helpFormData.push({
            category:'',
            values: 0,
            id: idHelper
        })
        setFormData(helpFormData);
};

const removeInputField = (id:number) => {
        let helpFormData = [...formData];
        helpFormData=helpFormData.filter(member=> member.id!==id)
        setFormData(helpFormData);
};


  const addChart = () => {
    const selectedColor = colorChart.filter(value => value.color === colorType)[0]?.hex || '';

    if (chartTitle && formData.length !== 0 && chartType !== null){
        const help: Highcharts.Options = ({
            title: {
                text: chartTitle
              },
              xAxis: {
                categories: formData.map(data => data.category)
              },
              series: [{
                type: chartType,
                name: chartSerieName,
                data: formData.map(data => data.values),
                color: selectedColor

              }],
              accessibility: {
                enabled:false
              }
        })

        onAddChart(help);
        toggle();
    }
  }

  return(
    <div>
        <h2>Create a New Chart</h2>
        <div className='inputfields'>
        <label htmlFor='chartTitle'>Title of the chart:</label>
        <input 
            type="text"
            name = "title"
            id="chartTitle"
            onChange={(e) => setChartTitle(e.target.value)}
        />
        </div>
         <div className='inputfields'>
        <label htmlFor='chartSeriesName'>Name of the series:</label>
        <input 
            type="text"
            name = "title"
            id='chartSeriesName'
            onChange={(e) => setChartSerieName(e.target.value)}
        />
        </div> 
        <div>
        <div className='selectfields'>
        <label htmlFor= 'chartType' style = {{marginTop: '5px', marginBottom: '10px'}} >Select charts type: </label>
        <select id = 'chartType' defaultValue={chartType}  onChange={(e) => setChartType(e.target.value as ChaertType)}>
            <option value = 'line'>Line</option>
             <option value="spline">Spline</option>
             <option value="area">Area</option>
             <option value="column">Column</option>
  
        </select>
        </div>
        <div className='selectfields'>
        <label htmlFor = 'chartColor' style = {{marginTop: '5px', marginBottom: '10px'}} >Select charts color: </label>
        <select id="chartColor" value={colorType} onChange={(e) => setColorType(e.target.value as 'Pink' | 'Blue' | 'Black' | 'Yellow' | 'Green' | 'Purple')}>
            {colorChart.map((color) => (
                <option key= {color.hex} value={color.color}>{color.color}</option>
            ))}
        </select>
        </div>
        </div>
        <div className='fillingcharts'>
        {formData.map( data => (
            <div className='form' key= {data.id}>
                <div className='inputfields'>
                    <label htmlFor={`category-${data.id}`} >Date:</label>
                    <input 
                        name='category' 
                        type='date'
                        id={`category-${data.id}`}
                        onChange={(e) => handleChangeCategory(data.id, e)}
                    />
                </div> 
                <div className='inputfields'>
                    <label htmlFor={`value-${data.id}`}>Value:</label>
                    <input 
                        name='values' 
                        type='number'
                        id={`value-${data.id}`}
                        onChange={(e) => handleChangeCategory(data.id, e)}
                    />
                </div> 
                {
                    formData.length > 1 &&
                    <button onClick={() => removeInputField(data.id)}>-</button>
                }
                <button onClick={addInputField}>+</button>
            </div>
        ))}
        </div> 
        <div>
            <button className = '.form button' onClick={addChart}>Add Chart</button>
        </div>
    
    </div>
  )

}

export default CreateChart;