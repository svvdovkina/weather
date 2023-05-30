import wind from "../assets/icons/wind.png"
import humid from "../assets/icons/humid.png"

const Today = ({state})=>{
    //console.log('today', state)
    if (!state.weather) {
        return <div className="today">
        Not available
    </div>
    }
    let current = state.weather.current
    return <div className="today">
        <div className="date">
        Todays date
        </div>
        <div className="temp">
            {current.temp_c}&deg;
        </div>
        <div className="condition">
        {current.condition.text}
        </div>
        <div className="today-additional">
            <div className="today-item">
                <div className="key">
                    <img src={wind} alt="wind img" />
                    Wind
                </div>
                <div className="value">
                    {current.wind_dir} {current.wind_kph} km/h
                </div>
                
            </div>
            <div className="today-item">
                <div className="key">
                    <img src={humid} alt="" />
                    Humidity
                </div>
                <div className="value">
                    {current.humidity} %
                </div>
                
            </div>
        </div>
        
    </div>
}

export default Today