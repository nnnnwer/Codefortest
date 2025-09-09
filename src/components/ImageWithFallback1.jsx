import React, {useState} from 'react'


const fallbackImage = (
  <div style={{
    width: "180px",
    height: "180px",
    backgroundColor: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "#555",
    borderRadius: "4px",
  }}>
    No Image
  </div>
);


const ImageWithFallback1 = ({ src, alt }) => {
  const [status, setStatus] = useState("loading");

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setStatus("success");
    img.onerror = () => setStatus("error");
  }, [src]);

  if (status === "error") return fallbackImage;
  if (status === "loading")
    return <div style={{ width: "180px", height: "180px", backgroundColor: "#eee" }} />;
  return <img src={src} alt={alt} style={{ width: "190px", height: "180px", borderRadius: "4px", objectFit: "cover" }} />;
};

export default ImageWithFallback1
