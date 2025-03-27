import { Metadata } from "next";
import Moityear from "@/components/Moityear";
import { notFound } from "next/navigation";
interface PageProps {
    params: { year?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { year } = await params;
  
    const baseUrl = `${process.env.URL_API_LINK}/files/lkbhos-ita.jpg` ;

    if (!year || isNaN(Number(year))) {
        return {
            title: "ไม่พบข้อมูล",
            description: "ไม่พบข้อมูลปีที่คุณต้องการ",
            openGraph: {
              title: "ไม่พบข้อมูล",
              description: "ปีที่คุณค้นหาไม่มีในระบบ",
              type: "website",
              url: `https://yourwebsite.com/moit/unknown`,
              images: [
                {
                  url: "https://yourwebsite.com/images/not-found.jpg",
                  width: 1200,
                  height: 630,
                  alt: "ไม่พบข้อมูล",
                },
              ],
            },
          };
    }
  
    return {
      title: `MITAS ปีงบประมาณ ${year} | โรงพยาบาลลานกระบือ`,
      description: `MITAS (MOPH Integrity and Transparency Assessment System) ปีงบประมาณ ${year}`,
      openGraph: {
        title: `MITAS ปีงบประมาณ ${year} | โรงพยาบาลลานกระบือ`,
        description: `MITAS (MOPH Integrity and Transparency Assessment System) ปีงบประมาณ ${year}`,
        type: "website",
        url: `https://lkbhos.moph.go.th`,
        images: [
          {
            url: baseUrl,
            width: 1200,
            height: 630,
            alt: `ภาพประกอบข้อมูล ita ปี ${year}`,
          },
        ],
        siteName: "โรงพยาบาลลานกระบือ",
        locale: "th_TH", 
      },
    };
  }

const MoitYear = async({ params }: PageProps) => {
    const  { year }  = await params;

    if (!year || isNaN(Number(year))) {
        notFound()
    }

    const apiKey = process.env.API_FIRST_KEY ?? "";
    const urlApi = process.env.URL_API_NEXT ?? "";

    if (!apiKey || !urlApi) {
        console.error("Missing API key or URL in environment variables.");
        return <div>Server configuration error.</div>;
    }

    const apiUrl = `${urlApi}moit/${year}`;
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

        return <Moityear moityearData = {data}/>
    } catch (err) {
        return <div>Failed to load data for year {year}.</div>;
    }
}
export default MoitYear