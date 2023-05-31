import { useReducer } from 'react'
import {conditionIcon} from "./assets/data"
import './App.css'
import Place from './components/Place';
import Icon from './components/Icon';
import Today from './components/Today';
import { useEffect } from 'react';

const ACTIONS = {
  getWeather: 'getWeather'
};

function reducer(state, action) {
  if (action.type == ACTIONS.getWeather) {
    let data = action.payload;
    const condition = data.current.condition.text;
    ///console.log(data, condition);
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
    
    return {...state, 
      place: data.location.name, 
      weather: data,
      icon: icon
    }
  }
}



function App() {

  const initialState = {
    place: "New Work",
    icon: conditionIcon["Partly cloudy"],
    weather: null
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

  useEffect(()=>{getWeather('Belgrade')}, [])

  return (
    <div className="main">
      <Place state={state} getWeather={getWeather}/>
      <Icon state={state}/>
      <Today state={state}/>
      <button className='but-forecast'>See forecast</button>
    </div>
  )
}

export default App
