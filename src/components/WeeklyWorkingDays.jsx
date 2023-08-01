import React from "react";

import moment from "moment";

export default function WeeklyWorkingDays({
  selectedDate,
  selectedTimezone,
  jsonData,
}) {
  const { checkedDetails, workingHours, workingDays } = jsonData;

  const getTimezoneOffset = () => {
    return moment(selectedTimezone).utcOffset() / 60;
  };

  const convertTime = (time, offset) => {
    const [hours, minutes] = time.split(" ")[0].split(":");
    let isPM = time.includes("PM");

    let convertedHours = parseInt(hours) + offset;
    if (convertedHours >= 12) {
      isPM = !isPM;
    }
    if (convertedHours > 12) {
      convertedHours -= 12;
    }
    if (convertedHours < 1) {
      convertedHours += 12;
    }

    return `${convertedHours.toString().padStart(2, "0")}:${minutes} ${
      isPM ? "PM" : "AM"
    }`;
  };

  return (
    // main container
    <div className="mt-6 border p-1 ">
      {workingDays &&
        workingDays.map((day, index) => {
          const date = moment(selectedDate).day(index + 1);

          const dataItem = checkedDetails.find(
            (item) => item.Date === date.format("YYYY-MM-DD")
          );

          return (
            <div key={index} className="flex gap-2 my-2">
              <div className=" w-24 ">
                <div className="">{day}</div>
                <div className="">{date.format("MM/DD")}</div>
              </div>
              <div className=" w-4/5 ">
                {workingHours &&
                  workingHours.map((hour, index) => {
                    const time = hour.time;

                    const isChecked = dataItem && dataItem.Time === time;

                    return (
                      <div className=" inline-block mx-2 w-[100px]" key={index}>
                        <input
                          checked={isChecked}
                          type="checkbox"
                          id={index}
                          name={hour.time}
                          value={hour.time}
                        />
                        <label htmlFor="" className="pl-1">
                          {hour.time}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
