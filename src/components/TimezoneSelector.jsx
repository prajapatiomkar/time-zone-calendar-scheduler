import React from "react";

export default function TimezoneSelector({
  selectedTimezone,
  onTimezoneChange,
}) {
  const handleTimezoneChange = (event) => {
    const newTimezone = event.target.value;
    console.log(newTimezone);
    onTimezoneChange(newTimezone);
  };
  return (
    <div className="flex flex-col justify-center mt-4 gap-2">
      <label htmlFor="timezone">Timezone</label>
      <select
        id="timezone"
        value={selectedTimezone}
        className=" w-full p-2 border"
        onChange={handleTimezoneChange}
      >
        <option className="p-6" value="UTC+00:00">
          [UTC+05:30] Indian Standard Time
        </option>
        <option className="p-6" value="UTC-05:00">
          [UTC-05:00] Eastern Standard Time
        </option>
        <option className="p-6" value="UTC-04:00">
          [UTC-04:00] Atlantic Standard Time
        </option>
      </select>
    </div>
  );
}
