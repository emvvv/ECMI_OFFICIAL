import React, { useState, useEffect } from "react";

function ScheduledButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();

      // Convert to PH time (Asia/Manila)
      const options = { timeZone: "Asia/Manila", hour12: false };
      const phTime = new Date(
        now.toLocaleString("en-US", options) // string in PH time
      );

      const day = phTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = phTime.getHours();
      const minute = phTime.getMinutes();

// Show only between 4:00–4:59 AM, Monday–Friday
      if (day >= 1 && day <= 5 && hour === 4) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

    };

    // Run immediately
    checkSchedule();

    // Re-check every minute
    const interval = setInterval(checkSchedule, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {showButton &&  <button className="hero__button-container--middle">Join 4th Watch Prayer on Zoom</button>}
    </div>
  );
}

export default ScheduledButton;
