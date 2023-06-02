import { useEffect } from "react";

const Forecast = ({state, toggleForecast, getIcon})=>{

    const daysForecast = state.weather.forecast.forecastday;
    let hourlyForecast = daysForecast[0].hour;
    const nowHour = new Date(Date.now()).getHours();
    hourlyForecast = hourlyForecast.filter((hf)=>{
        const time = hf.time.slice(-5, -3);
        return time >= nowHour - 1 
    });
    hourlyForecast = [...hourlyForecast, ...daysForecast[1].hour];
    hourlyForecast = hourlyForecast.slice(0, 24);

    //console.log(hourlyForecast)
    return <div className="main">
        <div>
            <h1>Forecast</h1>
            <h2>{state.place}</h2>
        </div>
        <div>
        <h3>Today</h3>
        <div className="horly-forecast">
            {hourlyForecast.map((hf, ind)=>{
                const time = hf.time.slice(-5, -3);
                let className = "forecast-hour" ;
                if (nowHour == time) {
                    className += " now-hour";
                }
                //console.log(time, className)
                return <div key={ind} className={className}>
                    <div className="forecast-hour-date">
                        {hf.time.slice(-5)}
                    </div> 
                    <div className="forecast-day-icon">
                        <img src={getIcon(hf.condition.text)} alt="condition icon" /> 
                    </div>
                    <div className="forecast-day_day-temp">
                        {Math.round(hf.temp_c)}&deg;
                    </div>
                </div>
            })}
        </div>
        </div>
        
        
        <div className="days-forecast">
            <h3>Next 3 days</h3>
            {daysForecast.map((df, ind)=>{
                let date = new Date(df.date).toDateString().split(' ').slice(1,3);
                date = `${date[0]}, ${Number(date[1])}`;

                return <div key={ind} className="forecast-day">
                    <div className="forecast-day-date">
                        {date}
                    </div> 
                    <div className="forecast-day-icon">
                        <img src={getIcon(df.day.condition.text)} alt="condition icon" /> 
                    </div>
                    <div className="forecast-day_day-temp">
                        {Math.round(df.day.maxtemp_c)}&deg;
                    </div>
                    <div className="forecast-day_night-temp">
                        {Math.round(df.day.mintemp_c)}&deg;
                    </div>
                </div>
               
            })}
        </div>
        <button onClick={toggleForecast} className="but-forecast">Back</button>
    </div>
}

export default Forecast