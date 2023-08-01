import React, { useEffect, useState } from "react";
import DateSelector from "./components/DateSelector";
import TimezoneSelector from "./components/TimezoneSelector";
import WeeklyWorkingDays from "./components/WeeklyWorkingDays";

import data from "../data.json";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState("UTC-0");
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    setJsonData(data);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
  };
  return (
    <div className="px-3">
      <DateSelector
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      <TimezoneSelector
        selectedTimezone={selectedTimezone}
        onTimezoneChange={handleTimezoneChange}
      />
      <WeeklyWorkingDays
        selectedDate={selectedDate}
        selectedTimezone={selectedTimezone}
        jsonData={jsonData}
      />
    </div>
  );
}
