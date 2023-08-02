import React from "react";
import moment from "moment";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function DateSelector({ selectedDate, onDateChange }) {
  const handlePreviousWeek = () => {
    const newDate = moment(selectedDate).subtract(1, "week").toDate(); // subtract 1 week
    onDateChange(newDate);
  };

  const handleNextWeek = () => {
    const newDate = moment(selectedDate).add(1, "week").toDate(); // add 1 week
    onDateChange(newDate);
  };

  return (
    <div className="flex justify-between h-12 items-center">
      <button onClick={handlePreviousWeek} className="flex items-center gap-1">
        <AiOutlineArrowLeft />
        Previous Week
      </button>
      <p className=" text-lg ">{moment(selectedDate).format("ll")}</p>

      <button onClick={handleNextWeek} className="flex items-center gap-1">
        Next Week
        <AiOutlineArrowRight />
      </button>
    </div>
  );
}
