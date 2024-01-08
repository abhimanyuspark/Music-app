import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="flex flex-row items-center gap-1 sm:gap-4">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="text-white hover:text-green-500"
      >
        <FaMinus />
      </button>
      <p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 rounded-lg accent-green-500 cursor-pointer"
      />
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="text-white hover:text-green-500"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Seekbar;
