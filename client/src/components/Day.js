import React from 'react';
import { Tooltip } from 'react-tooltip';

const Day = ({ active, date, setTooltipContent, clearTooltipContent }) => {
  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const submissionText = `0 submissions on ${dateString}`;
  const baseStyle = 'w-2 h-2 m-0.5 rounded-sm';
  const activeStyle = active > 0 ? 'bg-green-500' : 'bg-gray-500';

  return (
    <div
      className={`${baseStyle} ${activeStyle}`}
      onMouseEnter={() => setTooltipContent(submissionText)}
      onMouseLeave={clearTooltipContent}
    />
  );
};

export default Day;
