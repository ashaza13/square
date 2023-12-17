// Day.jsx
import React from 'react';

const Day = ({ active }) => {
  const baseStyle = 'w-2 h-2 m-0.5 rounded-sm'; // Adjust the width and height as needed
  const activeStyle = active ? 'bg-green-500' : 'bg-gray-500';
  return <div className={`${baseStyle} ${activeStyle}`}></div>;
};

export default Day;