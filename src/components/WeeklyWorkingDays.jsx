import React, { useEffect, useState } from "react";
import moment from "moment";

export default function WeeklyWorkingDays({
  selectedDate,
  selectedTimezone,
  jsonData,
}) {
  console.log(selectedDate);
  const { checkedDetails, workingHours, workingDays } = jsonData;

  const getTimezoneOffset = () => {
    const offsetString = selectedTimezone.substring(3); // Extract the offset part (e.g., "05:30", "-5", "-4")
    const [hours, minutes] = offsetString.split(":");
    const offset = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    return offset;
  };

  const convertTime = (time, offset) => {
    const [hours, minutes] = time.split(" ")[0].split(":");
    let isPM = time.includes("PM");

    let convertedHours = parseInt(hours) + offset / 60;
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
            <div key={index} className="flex gap-2 pt-2 pb-1 pl-2 border-b last:border-none items-center ">
              <div className="w-[120px]">
                <div>{day}</div>
                <div>{date.format("MM/DD")}</div>
              </div>
              <div className="w-4/5">
                {workingHours &&
                  workingHours.map((hour, index) => {
                    const time = hour.time;

                    const offset = getTimezoneOffset();
                    const convertedTime = convertTime(time, offset);
                    console.log(`convertedTime= ${convertedTime} time= ${time} offset= ${offset} `);
                    const isChecked = dataItem && dataItem.Time === time;

                    return (
                      <div className="inline-block mx-2 w-[100px]" key={index}>
                        <input
                          checked={isChecked}
                          type="checkbox"
                          id={index}
                          name={hour.time}
                          value={hour.time}
                        />
                        <label htmlFor="" className="pl-1">
                          {convertedTime}
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
