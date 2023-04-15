import React, { useState, useEffect } from "react";

const Countdown = ({ datetime ,style}) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const difference = +new Date(datetime) - +new Date();
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      });
    
      useEffect(() => {
        let timer = null;
    
        const tick = () => {
          const difference = +new Date(datetime) - +new Date();
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
        };
    
        if (timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
          clearInterval(timer);
          return;
        }
    
        timer = setInterval(() => tick(), 1000);
    
        return () => clearInterval(timer);
      }, [datetime, timeLeft]);
    
      const leadingZero = num => {
        return num < 10 ? "00"  : num;
      };

  return (
    <>
    <style>
        {style}
    </style>
    
    <div class="countdown styled">
            <div>
            {leadingZero(timeLeft.days)}
            <span>days</span>
            </div>
            <div>
            {leadingZero(timeLeft.hours)}
            <span>hours</span>
            </div>
            <div>
            {leadingZero(timeLeft.minutes)}
            <span>minutes</span>
            </div>
            <div>
             {leadingZero(timeLeft.seconds)}
            <span>secondes</span>
            </div>
        
    </div>
    </>
  );
};

export default Countdown;
