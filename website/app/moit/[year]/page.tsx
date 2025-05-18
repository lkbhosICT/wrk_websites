import { Metadata } from "next";
import Moityear from "@/components/Moityear";
import { notFound } from "next/navigation";
interface PageProps {
    params: { year?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { year } = await params;

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
      title: `MOIT ปีงบประมาณ ${year} | โรงพยาบาลลานกระบือ`,
      description: `MOIT (MOPH Integrity and Transparency Assessment System) ปีงบประมาณ ${year}`,
      openGraph: {
        title: `MOIT ปีงบประมาณ ${year} | โรงพยาบาลลานกระบือ`,
        description: `MOIT (MOPH Integrity and Transparency Assessment System) ปีงบประมาณ ${year}`,
        type: "website",
        url: `https://lkbhos.moph.go.th`,
        images: [
          {
            url: urlRaw,
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
    const urlImg1 = `${urlApi}geturl/bg_head_topic.jpg`;
    const urlImg2 = `${urlApi}geturl/moitlogo.png`;
    try {
        const [response, url1, url2]  = await Promise.all([
          fetch(`${apiUrl}`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
          }),
          fetch(`${urlImg1}`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
          }),
          fetch(`${urlImg2}`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
          }),
        ]);

        if (!response.ok || !url1.ok || !url2.ok) {
            throw new Error(`Failed to fetch data, Status: ${response.status} || ${url1.status} || ${url2.status}`);
        }
        const [data, urlData1, urlData2 ] = await Promise.all([
          response.json(),
          url1.json(),
          url2.json(),
        ])

        return <Moityear moityearData = {data} url1= {urlData1} url2= {urlData2}/>
    } catch (err) {
        console.error("Error fetching menu:", err);
        return <div>Failed to load data for year {year}.</div>;
    }
}
export default MoitYear