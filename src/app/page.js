'use client'

import axios from "axios";
import { useState } from "react";

export default function Home() {
  
  const[videoLink, setVideoLink]= useState("");
  const[ finalLink, setFinalLink]= useState();
  const[ title, setTitle]= useState();
  const[ showDownload, setShowDownload]= useState(false);  

console.log(finalLink);
  async function handleDownload (){
      try {
        const res = await axios.get(`/api/downloader?url=${videoLink}`) ;
        console.log(res.data);
        setFinalLink(res.data.format.url)
        setTitle(res.data.fileName)
        setShowDownload(true)
      
        
      } catch (error) {
        console.log(error)
      }
  }


  return (
    
      <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center gap-10">
        <div className="font-semibold text-2xl">YouTube videos / shorts Downloader</div>
        <div className=" flex items-center justify-center gap-4 mt-5">
            <input id="vd-inp" value={videoLink} onChange={(e)=>setVideoLink(e.target.value)} type="url" className="border p-2 rounded-lg text-gray-600 " placeholder="add url..."  /> 
            <button id="dwn-btn" onClick={handleDownload} className=" p-2 bg-purple-500 rounded-lg border border-gray-600 border-1 hover:bg-purple-300 transition duration-300 hover:text-gray-600 text-white ">Convert </button>
        </div>
        {showDownload && <><div className=" md:w-[40rem] w-96 text-center  "><h1 className="h-full w-full">{title}</h1></div>
        <div className="h-44 min-w-60 ">
          <video className="h-full w-full"  controls  >
          <source src={finalLink} type="video/mp4" />

          </video> 
          </div>
          <a className="" href={finalLink}>
            <div className="h-20 w-40 bg-green-500">  </div>
          </a>
          </>}

    </div>

  );
}
