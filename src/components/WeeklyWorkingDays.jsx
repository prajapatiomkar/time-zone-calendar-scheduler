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
          // console.log(date);
          const dataItem = checkedDetails.find(
            (item) => item.Date === date.format("YYYY-MM-DD")
          );

          const today = moment();
          const _day = today.clone().day(index + 1);
          // const isCurrentDay = today.isSame(_day, "day");
          // const isPastDay = today.isAfter(_day, "day");

          return (
            <div key={index} className="flex gap-2 my-2">
              {/* left section */}
              <div className=" w-24 ">
                <div className="">{day}</div>
                <div className="">{date.format("MM/DD")}</div>
              </div>
              {/* right section */}
              <div className=" w-4/5 ">
                {workingHours &&
                  workingHours.map((hour, index) => (
                    <div className=" inline-block mx-2 ">
                      <input
                        key={index}
                        type="checkbox"
                        id={index}
                        name={hour.time}
                        value={hour.time}
                      />
                      <label htmlFor="">{hour.time}</label>
                    </div>
                  ))}
                {/* {isCurrentDay ? (
                  <>
                    <input type="checkbox" value="11:40 Am"></input>
                  </>
                ) : isPastDay ? (
                  <span>Past</span>
                ) : (
                  <input type="checkbox" value="11:40 Am"></input>
                )} */}
              </div>
            </div>
          );
        })}
    </div>
  );
}
