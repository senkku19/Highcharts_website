import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import './css/CreateChart.css'



interface ChartData{
    onUpdateCharts: (options: Highcharts.Options[]) => void;
    options: Highcharts.Options[];
    isOpenEdit: boolean;
    toggleEdit: (index:number) => void;
    index: number;
}


const EditChart: React.FC<ChartData> = ({onUpdateCharts, isOpenEdit, toggleEdit, index, options}) => {
  const [chartTitle, setChartTitle] = useState<any>(null);
  type ChaertType = ('line' | 'spline' | 'column'|'area');
  const [chartType, setChartType] = useState<ChaertType> ('line');
  const [chartSerieName, setChartSerieName] = useState<string | undefined>('');
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
    category: string, values: number, id:number}[]> ([{category: '', values: 0, id:1}])


useEffect(() => {
   
    const title = options[index].title?.text;
    setChartTitle(title);
    let data: any[] = [];
    options[index].series?.map((value) => {
        if (value.type === 'spline' || value.type === 'line' || value.type === 'area' || value.type === 'column' ) {
            
            const type = value.type as ChaertType;
            setChartType(type);
    
           if ( value.data !== undefined){
            data = value.data
        }

        const seriesColor = value.color;
        const selectedColor = (colorChart.find(color => color.hex === seriesColor)?.color) as 'Pink' | 'Blue' | 'Black' | 'Yellow' | 'Green' | 'Purple';
        setColorType(selectedColor);
        setChartSerieName(value.name)
     }       

    })

    let categoryList: string[]  = []
    if (options[index].xAxis && !Array.isArray(options[index].xAxis) && options[index].xAxis !== undefined) {
        const xAxis: Highcharts.XAxisOptions = options[index].xAxis as  Highcharts.XAxisOptions;
        if (xAxis.categories !== undefined){
            xAxis.categories.map((category) => categoryList.push(category));
        }
    }
    let helpFormData: {
        category: string, values: number, id:number}[] = [];
    var idHelper = 0;
    data.map((value) => {
        helpFormData.push({
            category: categoryList[idHelper],
            values: value,
            id: idHelper
        })
        idHelper += 1;
    })
    setFormData(helpFormData);
}, [index])



const handleChangeCategory = ( id:number, event:React.ChangeEvent<HTMLInputElement> ) => {
    const index = formData.findIndex(n => n.id === id);
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
    if (chartTitle && formData.length !== 0 && chartType !== null){
        const selectedColor = colorChart.filter(value => value.color === colorType)[0]?.hex || '';

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

        options[index] = help;
        onUpdateCharts(options);
        toggleEdit(index);
    }
  }

  return(
    <div>
        <h2>Edit Chart!</h2>
        <div className='inputfields'>
        <label htmlFor="chartTitle">Title of the chart:</label>
        <input 
            type="text"
            name = "title"
            id="chartTitle"
            defaultValue={chartTitle}
            onChange={(e) => setChartTitle(e.target.value)}
        />
        </div>
        <div className='inputfields'>
        <label htmlFor="chartSerieName">Name of the series:</label>
        <input 
            type="text"
            name = "title"
            id="chartSerieName"
            defaultValue={chartSerieName}
            onChange={(e) => setChartSerieName(e.target.value)}
        />
        </div>
        <div>
        <div className='selectfields'>
        <label htmlFor="chartType">Select charts type: </label>
        <select id= "chartType" value={chartType} onChange={(e) => setChartType(e.target.value as ChaertType)}>
            <option value = 'line'>Line</option>
             <option value="spline">Spline</option>
             <option value="area">Area</option>
             <option value="column">Column</option>
  
        </select>
        </div>
        <div className='selectfields'>
        <label htmlFor="colorType">Select charts color: </label>
        <select id="colorType" value={colorType} onChange={(e) => setColorType(e.target.value as 'Pink' | 'Blue' | 'Black' | 'Yellow' | 'Green' | 'Purple')}>
            {colorChart.map((color) => (
                <option key= {color.hex} value={color.color}>{color.color}</option>
            ))}
        </select>
        </div>
        </div>
        <div className='fillingcharts'>
        {formData.map( (data) => (
            <div className='form' key= {data.id}>
                <div className='inputfields'>
                    <label htmlFor={`category-${data.id}`}>Date:</label>
                    <input 
                        name='category' 
                        type='date'
                        id={`category-${data.id}`}
                        value={data.category}
                        onChange={(e) => handleChangeCategory(data.id, e)}
                    />
                </div> 
                <div className='inputfields'>
                    <label htmlFor={`value-${data.id}`}>Value:</label>
                    <input 
                        name='values' 
                        type='number'
                        id={`value-${data.id}`}
                        value={data.values !== null && !isNaN(data.values) ? data.values.toString() : ''}
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
             <button className = '.form button' onClick={addChart}>Update Chart</button> 
        </div>
      
    </div>
  )

}

export default EditChart;