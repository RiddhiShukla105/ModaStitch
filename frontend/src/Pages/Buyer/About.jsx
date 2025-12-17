import React from 'react'
import Header from '../../Components/Header'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const About = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const countDownDate = new Date("1 March 2026 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <Header/>
    <div
      className="w-screen h-screen bg-cover bg-center px-[8%] relative"
      style={{ backgroundImage: "url('/image/blackfriday.jpg')" }}
    >
     
      {/* Content */}
      <div className="absolute top-1/2 -translate-y-1/2 text-white">
        <p className="text-lg mb-2">Page is under - construction</p>

        <h1 className="text-6xl font-semibold">
          We are <span className="text-[#ff3753]">Launching</span> soon
        </h1>

        {/* Timer */}
        <div className="flex mt-6">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="w-[100px]">
              <p className="text-6xl -mb-3.5">{value}</p>
              <span className="capitalize">{label}</span>
            </div>
          ))}
        </div>

        {/* Button */}
       {/**  <button className="mt-8 border-2 border-white px-6 py-3 flex items-center gap-2 hover:bg-white hover:text-black transition">
          <Link to="/">Learn More</Link>
          <img src="/image/triangle.png" alt="arrow" className="w-4" />
        </button>
        */}

      </div>
    </div>
    </>
  );
};

export default About


