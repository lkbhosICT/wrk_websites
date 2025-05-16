import DownloadForm from "@/components/DownloadForm"
import { Metadata } from "next";

export async function generateMetadata():Promise<Metadata>{
  const baseUrl = `${process.env.URL_API_NEXT}geturl/lkbhos-ita.jpg` ;
    const apiKey = process.env.API_FIRST_KEY ?? "";

    const urlImg = await fetch(`${baseUrl}`, {
      method: "GET",
      cache: "no-store",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
      },
    })

    if (!urlImg.ok) throw new Error("Failed to fetch data");

    const dataImg = await urlImg.json()

    const urlRaw = dataImg?.url ?? "ไม่มีข้อมูล"
  return {
    title: `ดาวน์โหลดแบบฟอร์ม | โรงพยาบาลลานกระบือ`,
    description: ` โรงพยาบาลลานกระบือ | ดาวน์โหลดแบบฟอร์มต่างๆที่ใช้ในโรงพยาบาลลานกระบือ`,
    openGraph: {
      title: `ดาวน์โหลดแบบฟอร์ม | โรงพยาบาลลานกระบือ`,
      description: `โรงพยาบาลลานกระบือ | ดาวน์โหลดแบบฟอร์มต่างๆที่ใช้ในโรงพยาบาลลานกระบือ`,
      type: "website",
      url: `https://lkbhos.moph.go.th/download-form`,
      images: [
        {
          url: urlRaw,
          width: 1200,
          height: 630,
          alt: `ภาพประกอบข้อมูลดาวน์โหลดแบบฟอร์ม`,
        },
      ],
      siteName: "โรงพยาบาลลานกระบือ",
      locale: "th_TH", 
    },
  };
}



const downloadForm = async () => {
  const Apikey =process.env.API_FIRST_KEY
  const UrlApi = process.env.URL_API_NEXT

  try{
     const downloadRes = await fetch(`${UrlApi}download-form`,{
      method: "GET",
      cache: "no-store",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Apikey}`,
      }
     })
    if(!downloadRes.ok){
      throw new Error("Failed to fetch data");
    }

    const downloadData = await downloadRes.json()

    return <DownloadForm datadownload={downloadData}/>
  }catch(err){
    console.error("Error fetching data:", err);
    return <div>Failed to load navigation data.</div>;
  }
}
export default downloadForm