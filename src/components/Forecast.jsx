const Forecast = ({state, toggleForecast, getIcon})=>{

    const daysForecast = state.weather.forecast.forecastday;
    const hourlyForecast = daysForecast[0].hour;
    //console.log(state.weather, hourlyForecast)
    return <div className="forecast">
        <div>
            <h1>Forecast</h1>
            <h2>{state.place}</h2>
        </div>
        
        <h3>Today</h3>
        <div className="horly-forecast">
            {hourlyForecast.map((hf, ind)=>{
                return <div key={ind} className="forecast-hour">
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
        <h3>Next 3 days</h3>
        <div className="days-forecast">
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