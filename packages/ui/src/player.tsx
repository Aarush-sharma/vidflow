"use client";

import { useState } from "react";

export const Player = () => {
  
  const [data, setdata] = useState("");
  const [src, setsrc] = useState("");
  const [isloaded, setisloaded] = useState(false);
  const handleSubmit = () => {
    const newsrc = data.split("/")[3]?.split("?")[0] as string;
    setsrc(newsrc);
    console.log(src);
    setisloaded(true);
  };

  return (
    <div>
      <div>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <input
            className="text-black"
            type="text"
            onChange={(e) => setdata(e.target.value)}
          />
          <button onClick={handleSubmit}>go</button>
        </div>
        {isloaded && (
          <div>
            <iframe
              width="681"
              height="383"
              src={`https://www.youtube.com/embed/${src}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

