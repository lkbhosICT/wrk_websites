"use client"
import { useState, useEffect } from "react";
interface btnmoitProps {
    id: string;
    countDownload: string;
    year:string
  }


const DownloadmoitBtn : React.FC<btnmoitProps> = ({id, countDownload, year }) => {
    const [downloadCount, setDownloadCount] = useState<number>(
        isNaN(Number(countDownload)) ? 0 : Number(countDownload)
    );
    const [isLoading, setIsLoading] = useState(false);
     
    const handleDownload = async () =>{
       setIsLoading(true)
        const apiKey = process.env.NEXT_PUBLIC_API_FIRST_KEY ?? "";
        const urlApi = process.env.NEXT_PUBLIC_URL_API_NEXT ?? "";
        const Getfile = process.env.NEXT_PUBLIC_API_URL ?? "";

        if (!apiKey || !urlApi) {
          console.error("Missing API key or URL in environment variables.");
          return <div>Server configuration error.</div>;
        }
        const apiUrl = `${urlApi}moit/${year}/${id}`;
       try{
        const response = await fetch(apiUrl, {
          method: "PUT",
          cache: "no-store",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
          },
      });
  
      if (!response.ok) {
          throw new Error(`Failed to fetch data, Status: ${response.status}`);
      }
         const data = await response.json();
         const count_download = data?.[0]?.childrens?.count_download || data?.[0]?.childrens?.subtitle?.count_download || "ไม่พบข้อมูล"
         setDownloadCount(count_download)
         const pdfname = data?.[0]?.childrens?.pdfurl || data?.[0]?.childrens?.subtitle?.pdfurl || "ไม่พบข้อมูล"
         const fileName = `11234_${pdfname}`;
         const fileUrl = `${Getfile}files/${pdfname}`;
         if (fileUrl) {
          const fileResponse = await fetch(fileUrl);
          const blob = await fileResponse.blob();
          const url = window.URL.createObjectURL(blob);
  
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
  
          window.URL.revokeObjectURL(url);
        }
       }catch(err){
        return <div>Failed to load data</div>;
       }finally{
        setIsLoading(false)
       }
    }

    
  return (
    <div className="flex items-center justify-center flex-col max-w-[300px]">
       <button onClick={handleDownload} disabled={isLoading}
         className="relative overflow-hidden lg:px-1 w-full max-lg:max-w-max max-lg:px-5 bg-moph text-white rounded-xl border-[2px] border-white txt-credit-moit box-shadows-5 hover:text-moph hover:bg-white hover:border-moph transition-all duration-700">
          <span className="inline-block transition-opacity duration-1000" key={isLoading ? 1 : 0}>
              {isLoading ? <span className="loading loading-dots loading-xs"></span> : <span><i className="ri-download-line me-1"></i>ดาวน์โหลด</span>}
          </span>
        </button>
        <div className="font-thin txt-count-view text-gray-600">
          <i className="ri-download-cloud-line"></i> จำนวนดาวน์โหลด {downloadCount} ครั้ง
        </div>
    </div>
  )
}
export default DownloadmoitBtn