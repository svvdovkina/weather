import { useState } from "react";


const Place = ({state, getWeather})=>{
    const [showInput, setShowInput] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = async (e)=>{
        console.log(e.target.value);
        const city = e.target.value;
        const key = 'd3fc824005734fb29d3134514232305';
        const url = `http://api.weatherapi.com/v1/search.json?key=${key}&q=${city}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        if (data){
            const newSugg = data.map(it=>`${it.name} (${it.country})`);
        setSuggestions(newSugg);
        console.log(newSugg)
        }
        
    }

    const setWeather = (e)=>{
        setSuggestions([]);
        setShowInput(false);
        const place  = e.target.innerText;
        const city = place.split('(')[0].trim();
        getWeather(city)
    }

    return <div className="place">
         <button onClick={()=>setShowInput(!showInput)}>{state.place} &#8964;</button>
         {showInput && 
        <div className="search">
            <input type="text" onChange={getSuggestions} placeholder="Search..."></input>
            {suggestions.map(((s, ind)=>{
                return <button onClick={setWeather} key={ind} className="suggestion">{s}</button>
            }))}
        </div>
        }
    </div>
    
    
}

export default Place