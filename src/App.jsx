import { useReducer } from 'react'
import {conditionIcon} from "./assets/data"
import './App.css'
import Place from './components/Place';
import Icon from './components/Icon';
import Today from './components/Today';
import { useEffect } from 'react';
import Forecast from './components/Forecast';

const ACTIONS = {
  getWeather: 'getWeather',
  showForecast: 'showForecast'
};

const getIcon = (condition) =>{
  let icon = conditionIcon['other'];
    if (condition in conditionIcon) {
      icon = conditionIcon[condition]
    } 
    else {
       for (let cond in conditionIcon) {
        if (condition.includes(cond)) {
          icon = conditionIcon[cond];
        }
      };
    }
  return icon
}

function reducer(state, action) {
  if (action.type == ACTIONS.getWeather) {
    let data = action.payload;
    const condition = data.current.condition.text;
    ///console.log(data, condition);
    let icon = getIcon(condition);
    
    return {...state, 
      place: data.location.name, 
      weather: data,
      icon: icon
    }
  }
  if (action.type == ACTIONS.showForecast) {
    return {...state, 
    showForecast: !state.showForecast
    }
  }
}



function App() {

  const initialState = {
    place: "New Work",
    icon: conditionIcon["Partly cloudy"],
    weather: null,
    showForecast: false
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const getWeather = async (city)=>{
    const url = `http://api.weatherapi.com/v1/forecast.json?key=d3fc824005734fb29d3134514232305&q=${city}&days=3&aqi=yes&alerts=no`
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ 
      type: ACTIONS.getWeather,
      payload: data
    })
  }

  useEffect(()=>{getWeather('Belgrade')}, []);

  const toggleForecast = ()=>{
    dispatch({type: ACTIONS.showForecast});
    //console.log('show forecast', state.showForecast)
  }

  if (state.showForecast) {
    return <div className="main">
      <Forecast state={state} toggleForecast={toggleForecast} getIcon={getIcon}/>
    </div>
     
  }

  return (
    <div className="main">
      <Place state={state} getWeather={getWeather}/>
      <Icon state={state}/>
      <Today state={state}/>
      <button onClick={toggleForecast} className='but-forecast'>See forecast</button>
    </div>
  )
}

export default App
