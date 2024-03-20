import React, { useState, useEffect } from "react";

function ImageViewer({ apiData }) {
   const [imageSrc, setImageSrc] = useState("");

   useEffect(() => {
      if (!apiData || !apiData.imageData) return;
      const arrayBuffer = apiData.imageData.data;
      console.log(arrayBuffer);

      const base64String = btoa(String.fromCharCode(...arrayBuffer));
      setImageSrc(`data:image/png;base64,${base64String}`);
   }, [apiData]);

   return <div>{imageSrc && <img src={imageSrc} alt={apiData.imageTitle} className="mt-2" />}</div>;
}

export default ImageViewer;
