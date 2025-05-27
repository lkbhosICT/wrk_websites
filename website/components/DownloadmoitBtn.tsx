"use client";
import { useEffect, useState } from "react";

interface btnmoitProps {
  id: string;
  filename: string;
  location: string;
}

const DownloadmoitBtn: React.FC<btnmoitProps> = ({ id, filename, location }) => {


  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const time = Math.floor(Date.now() / 1000);

  useEffect(() => {
    const fetchInitialDownloadCount = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_FIRST_KEY ?? "";
      const urlApi = process.env.NEXT_PUBLIC_URL_API_NEXT ?? "";
  
      if (!apiKey || !urlApi) return;
      const apiUrl = `${urlApi}download-count/${location}/${id}`;
      console.log(apiUrl)
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          const count = Number(data.download_count) || 0;
          setDownloadCount(count);
        } else {
          console.warn("Failed to fetch initial download count.");
        }
      } catch (error) {
        console.error("Error fetching initial count:", error);
      }
    };
  
    fetchInitialDownloadCount();
  }, [id,location]);
  
  const handleDownload = async () => {
    setIsLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_API_FIRST_KEY ?? "";
    const urlApi = process.env.NEXT_PUBLIC_URL_API_NEXT ?? "";

    if (!apiKey || !urlApi) {
      console.error("Missing API key or URL in environment variables.");
      setIsLoading(false);
      return;
    }

    const apiUrl = `${urlApi}download-count/${location}/${id}`;
    const urldownloadApi = `${urlApi}download-files`;

    try {
      const response = await fetch(urldownloadApi, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          source: filename,
          id: id,
        }),
      });

     if(response.ok){
      const result = await response.json(); 
      if(result.link){
        
        
        const response2 = await fetch(apiUrl, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
        });

        if(response2.ok){
          const result2 = await response2.json(); 
          const downloadnumb = result2?.download_count || "ไม่มีข้อมูล"
          setDownloadCount(downloadnumb)
          const link = result.link || "ไม่มีข้อมูล"
          const res = await fetch(link);
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = "11234__"+downloadnumb+time
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          window.URL.revokeObjectURL(url); // cleanup
        }else{
          console.log("response2 not response")
        }
      }
     }else{
      console.log("dddd")
     }

    } catch (err) {
      console.error("❌ Error fetching:", err);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="flex items-center justify-center flex-col lg:max-w-[300px] max-w-[100px]">
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="relative overflow-hidden lg:px-1 w-full max-lg:max-w-max max-lg:px-5 bg-moph text-white rounded-xl border-[2px] border-white txt-btn hover:box-shadows-5 hover:text-moph hover:bg-white hover:border-moph transition-all duration-700"
      >
        <span className="inline-block transition-opacity duration-1000" key={isLoading ? 1 : 0}>
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            <span>
              <i className="ri-download-line me-1"></i>ดาวน์โหลด
            </span>
          )}
        </span>
      </button>
      <div className="font-thin txt-count-view text-gray-600">
        <i className="ri-download-cloud-line"></i> ดาวน์โหลด {downloadCount} ครั้ง
      </div>
    </div>
  );
};

export default DownloadmoitBtn;
