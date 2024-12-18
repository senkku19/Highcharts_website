import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ViewMode from './views/ViewMode';
import SettingsView from './views/SettingsView';
import { GPDdata, GDPCountryResponse } from './api/types';
import { getMultipleCountryGDP } from './api';
import Highcharts from "highcharts";



const App: React.FC= () => {
  const [GDPcharts, setGDPCharts] = useState<GDPCountryResponse[]>([]);
  const [options, setOptions] = useState<Highcharts.Options[]>([]);
  type ChaertType = ('line' | 'spline' | 'pie' | 'column' | 'area');
  const [filterOptions, setFilteredOptions] =  useState<Highcharts.Options[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const countryCode = ["DE", "JP", "ES", "MY", "ZA" ];
             getMultipleCountryGDP(countryCode).then((data) =>   setGDPCharts(data)); 
          } catch (error) {
              console.error("Error", error);
          }
      };

      fetchData();
  }, []);


  useEffect(() => {
      if (GDPcharts.length !== 0) {
          var charts: Highcharts.Options[] = [];

          Object.entries(GDPcharts).forEach(([index, values]) =>{
              var datas2: GPDdata[] = [];
  
              Object.entries(values).forEach(([key, value]) => {
                if (key === '1') {
                      datas2 = value;
                  }
          })

          const category: any[] = []; 
          const datas: any[] = [];
          datas2.map( (value) => { 
            category.push(value.date)
            datas.push(value.value)
          })

          charts.push({
                title: {
                  text: datas2[1].indicator.value + " of " + datas2[1].country.value
              },
              xAxis: {
                  categories: category.reverse().map((value) => value + '-01-01')
              },
              subtitle: {
                  text: 'Source: World Bank Data'
              },
              series: [{

                  type: 'spline', 
                  name:  datas2[1].country.value,
                  data: datas.reverse(),
                  color: '#FFC0CB'
          }], 
          accessibility: {
            enabled:false
          }
          })
          
          })
          setOptions(charts);
          setFilteredOptions(charts);
}
}, [GDPcharts]);

const onAddChart = (option:Highcharts.Options) =>{
  const updated = filterOptions
  updated.push(option);
  setOptions(updated);
  setFilteredOptions(updated);
}


const onUpdateCharts = (options:Highcharts.Options[]) =>{
  setOptions(options);
  setFilteredOptions(options);
}
const onRemoveChart = ( index:number) => {
  const itemToDelete: Highcharts.Options = filterOptions[index]
  let updatedOptions = filterOptions.filter((value) => value !== itemToDelete);
  setFilteredOptions(updatedOptions);

  updatedOptions = options.filter((value) => value !== itemToDelete);
  setOptions(updatedOptions);

}

const getAllCharts = () => {
  setOptions(filterOptions);
}

const onFilter = (start: Date, end: Date) => {
  if (options.length !== 0) {
    const updatedOptions: Highcharts.Options[] = [];
    
    filterOptions.map((option) => {
     if (option.xAxis && !Array.isArray(option.xAxis)) {
        const xAxis = option.xAxis;
        if (xAxis.categories && Array.isArray(xAxis.categories)) {
          
          const filteredCategories: string[] = [];
          const newData: number[] = [];
          var index = 0;
            xAxis.categories.filter((category) => {
              const date = new Date(category)
              if (date >= start && date <= end){
                filteredCategories.push(category);
                newData.push(index);
              }
              index += 1;
        })

        let chartType: ChaertType | undefined = undefined;

        const filteredData: any[]=  []
        index = 0;
        option.series?.map((value) => {
          if (value.type === 'spline' || value.type === 'line' || value.type === 'area' || value.type === 'column' ) {
            
            chartType = value.type as ChaertType;
       
              if ( value.data !== undefined){
                value.data.map((i) => {
                  if (newData.includes(index)) {
                    filteredData.push(i);
                  }
                     index += 1;
                })
              }
          
         
        }
      
        })

          updatedOptions.push( {
            ...option,
            xAxis: {
              categories: filteredCategories
            },
            series: chartType ? [{
              type: chartType,
              data: filteredData
            }] : [],
        })
      }
    

      return option;
    }
  });

    
    setOptions(updatedOptions);
  }
};

  return (
    <div className='App'>
    <BrowserRouter>
      <HeaderComponent/>
    <div className='content'>
        <Routes>
            <Route path="/" element= {<ViewMode charts={options} onFilter = {onFilter} getAllCharts={getAllCharts}/>}/>
            <Route path="/SettingsView" element = {<SettingsView options={filterOptions} onAddChart = {onAddChart} onFilter = {onFilter} onRemoveChart={onRemoveChart} onUpdateCharts={onUpdateCharts}/>}/>
          </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
