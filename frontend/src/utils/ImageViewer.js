import React, { useState, useEffect } from "react";

function ImageViewer({ apiData }) {
   const [imageSrc, setImageSrc] = useState("");

   useEffect(() => {
      if (!apiData || !apiData.imageData) return;
      const arrayBuffer = apiData.imageData;

      setImageSrc(`data:image/png;base64,${arrayBuffer}`);
   }, [apiData]);

   //    return <div>{imageSrc && <img src={imageSrc} alt={apiData.imageTitle} className="mt-2" />}</div>;

   return (
      <div>
         {imageSrc && (
            <img src={imageSrc} alt={apiData.imageTitle} className="w-60 h-60 rounded-xl" />
         )}
      </div>
   );
}

export default ImageViewer;
