import React, { useState, useEffect } from "react";
import { Month } from "./index";
import { Tooltip } from "react-tooltip";

const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const YearGrid = ({ yearData }) => {
    const [tooltipContent, setTooltipContent] = React.useState('');
    const [showTooltip, setShowTooltip] = React.useState(false);
  
    const handleSetTooltipContent = (content) => {
      setTooltipContent(content);
      setShowTooltip(true);
    };
  
    const handleClearTooltipContent = () => {
      setShowTooltip(false);
    };

    useEffect(() => {
        console.log(tooltipContent);
    } , [tooltipContent]);

    return (
        <div className="rounded-md flex flex-col bg-zinc-700 shadow-md px-2 py-2 md:px-4 md:py-4 justify-center">
            <div className="grid grid-cols-3 gap-4 md:grid md:grid-cols-6 md:gap-1">
                {yearData.map((month, index) => (
                    <Month
                        key={index}
                        days={month.days}
                        name={monthAbbreviations[index]}
                        setTooltipContent={handleSetTooltipContent}
                        clearTooltipContent={handleClearTooltipContent}
                    />
                ))}
                {showTooltip && (
                    <Tooltip place="top" type="dark" effect="solid" getContent={() => tooltipContent} />
                )}
            </div>
        </div>
    );
};

export default YearGrid;
