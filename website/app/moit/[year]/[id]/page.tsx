import { Metadata } from "next";
import MoitIdComponent from "@/components/MoitId";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
interface PageProps {
  params: { year?: string, id?: string};
}
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, id } = await params;

  if (!year || !/^\d+$/.test(year) || !id || !isValidObjectId(id)) {
    return {
      title: "ไม่พบข้อมูล",
      description: "ไม่พบข้อมูลที่คุณค้นหา",
      openGraph: {
        title: "ไม่พบข้อมูล",
        description: "ไม่พบข้อมูลที่คุณค้นหา",
        url: "",
        images: [
          {
            url: "",
            alt: "ไม่พบข้อมูล",
          },
        ],
      },
    };
  }
  const baseUrl = `${process.env.URL_API_LINK}/files/lkbhos-ita.jpg` ;
  const apiKey = process.env.API_FIRST_KEY ?? "";
  const urlApi = process.env.URL_API_NEXT ?? "";

  if (!apiKey || !urlApi) {
    return {
      title: "เกิดข้อผิดพลาด",
      description: "การตั้งค่าระบบเซิร์ฟเวอร์ไม่ถูกต้อง",
    };
  }

  const apiUrl = `${urlApi}moit/${year}/${id}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    
    const firstItem = Array.isArray(data) && data.length > 0 ? data[0] : null;

    const numsValue = firstItem?.nums ?? "ไม่มีข้อมูล";  

    let title = null;
    let numsFromTitle = null;
    
    if (firstItem?.childrens?.title) {
        title = firstItem.childrens.title;
        numsFromTitle = firstItem.childrens.nums;
    } else if (firstItem?.childrens?.subtitle?.title) {
        title = firstItem.childrens.subtitle.title;
        numsFromTitle = firstItem.childrens.subtitle.nums;
    }
     

    const maxLength30 = 30;  
    const maxLength140 = 140; 
    const cutTitle30 = title.length > maxLength30 ? title.slice(0, maxLength30) + "..." : title
    const cutTitle140 = title.length > maxLength140 ? title.slice(0, maxLength140) + "..." : title


    return {
      title: `(MOIT${numsValue}) ข้อ${numsFromTitle} ${cutTitle30}`,
      description:`โรงพยาบาลลานกระบือ MITAS ปีงบประมาณ${year} (MOIT${numsValue}) ข้อ${numsFromTitle} ${cutTitle140} `,
      openGraph: {
        title: `(MOIT${numsValue})ข้อ${numsFromTitle}${cutTitle30}`,
        description: `โรงพยาบาลลานกระบือ MITAS ปีงบประมาณ${year} (MOIT${numsValue}) ข้อ${numsFromTitle} ${cutTitle140}`,
        url: `http://10.10.5.1/moit/${year}/${id}`,
        images: [
          {
            url: baseUrl,
            alt: `ภาพประกอบข้อมูลปี ${year}`,
          },
        ],
        siteName: "โรงพยาบาลลานกระบือ",
        locale: "th_TH", 
      },
    };
  } catch (error) {
    return {
      title: `ข้อมูลปี ${year}`,
      description: "ไม่สามารถโหลดข้อมูลได้",
      openGraph: {
        title: `ข้อมูลปี ${year}`,
        description: "ไม่สามารถโหลดข้อมูลได้",
        url: `https://yourwebsite.com/moit/${year}/${id}`,
        images: [
          {
            url: "https://yourwebsite.com/images/error.jpg",
            alt: "เกิดข้อผิดพลาด",
          },
        ],
      },
    };
  }
}



const MoitId = async ({ params }: PageProps) => {
  const { year, id } = await params;
  if (!year || !/^\d+$/.test(year)) {
    notFound()
  }

  if (!id || !isValidObjectId(id)) {
    notFound()
  }

  const apiKey = process.env.API_FIRST_KEY ?? "";
  const urlApi = process.env.URL_API_NEXT ?? "";

  if (!apiKey || !urlApi) {
      console.error("Missing API key or URL in environment variables.");
      return <div>Server configuration error.</div>;
  }

  const apiUrl = `${urlApi}moit/${year}/${id}`;
  try {
    const response = await fetch(apiUrl, {
        method: "GET",
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
   return <MoitIdComponent moitIdData = {data}/>
} catch (err) {
    return <div>Failed to load data for year {year}.</div>;
}
};

 
export default MoitId