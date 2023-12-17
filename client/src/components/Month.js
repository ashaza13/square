import React from 'react';
import Day from './Day';

const Month = ({ days, name }) => {
  // Calculate the fixed height for the days container.
  // For example, if you expect at most 6 rows of days, and each day is 4 units high with a margin of 0.5 units:
  const dayHeight = 'h-4'; // Height of each day
  const dayMargin = 'm-0.5'; // Margin around each day
  const maxRows = 6;
  const daysContainerHeight = `h-[calc(${maxRows}*(${dayHeight}+${dayMargin}*2))]`; // Calculate height for 6 rows

  return (
    <div className="flex flex-col items-center w-12 md:w-20">
      {/* Fixed height container for days to maintain consistent gap between days */}
      <div className={`flex flex-wrap justify-center mb-2 ${daysContainerHeight} overflow-hidden`}>
        {days.map((day, index) => (
          <Day key={index} active={day.active} />
        ))}
      </div>
      {/* Month name at the bottom */}
      <div className="text-center text-white text-xs font-medium uppercase mt-auto">
        {name}
      </div>
    </div>
  );
};

export default Month;
