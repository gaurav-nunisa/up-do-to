import {DayCard} from "./DayCard"
const WeekView = () => {
    // Array of days
    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    return (
        <div className="text-black ">
      <div className="CURRENT DATE ">12-03-24</div>
      <div className="flex flex-wrap gap-10">
      {daysOfWeek.map((day, index) => (
                <DayCard 
                    key={index} 
                    day={day} 
                    index={index} 
                />
            ))}
      </div>

    </div>
    )
      
}
export default WeekView;