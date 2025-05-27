import { Metadata } from "next";
import MoitIdComponent from "@/components/MoitId";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

// เช็ค ObjectId ที่ใช้ใน MongoDB
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// 🧠 สร้าง Metadata จาก API
export async function generateMetadata(
  { params }: { params: { year: string; id: string } }
): Promise<Metadata> {
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

  const apiKey = process.env.API_FIRST_KEY ?? "";
  const urlApi = process.env.URL_API_NEXT ?? "";
  const urlfull = process.env.URL_FULL_LINK ?? "";
  const baseUrl = `${urlApi}geturl/lkbhos-ita.jpg`;

  if (!apiKey || !urlApi) {
    return {
      title: "เกิดข้อผิดพลาด",
      description: "การตั้งค่าระบบเซิร์ฟเวอร์ไม่ถูกต้อง",
    };
  }

  try {
    const [response01, url01] = await Promise.all([
      fetch(`${urlApi}moit/${year}/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }),
      fetch(baseUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }),
    ]);

    if (!response01.ok || !url01.ok) throw new Error("Failed to fetch data");

    const [data, dataurl] = await Promise.all([
      response01.json(),
      url01.json(),
    ]);

    const firstItem = Array.isArray(data) && data.length > 0 ? data[0] : null;
    const urlRaw = dataurl?.url ?? "ไม่มีข้อมูล";
    const numsValue = firstItem?.doc_nums ?? "ไม่มีข้อมูล";

    let title = "";
    let numsFromTitle = "";

    if ("children_title" in firstItem) {
      title = firstItem.children_title;
    } else if ("subtitle_title" in firstItem) {
      title = firstItem.subtitle_title;
    }

    if ("subtitle_nums" in firstItem) {
      numsFromTitle = firstItem.subtitle_nums;
    } else if ("children_nums" in firstItem) {
      numsFromTitle = firstItem.children_nums;
    }

    const cutTitle30 = title.length > 30 ? title.slice(0, 30) + "..." : title;
    const cutTitle140 = title.length > 140 ? title.slice(0, 140) + "..." : title;

    return {
      title: `(MOIT${numsValue}) ข้อ${numsFromTitle} ${cutTitle30}`,
      description: `โรงพยาบาลลานกระบือ MITAS ปีงบประมาณ${year} (MOIT${numsValue}) ข้อ${numsFromTitle} ${cutTitle140}`,
      openGraph: {
        title: `(MOIT${numsValue})ข้อ${numsFromTitle}${cutTitle30}`,
        description: `โรงพยาบาลลานกระบือ MITAS ปีงบประมาณ${year} (MOIT${numsValue}) ข้อ${numsFromTitle} ${cutTitle140}`,
        url: `${urlfull}moit/${year}/${id}`,
        images: [
          {
            url: urlRaw,
            alt: `ภาพประกอบข้อมูลปี ${year}`,
          },
        ],
        siteName: "โรงพยาบาลลานกระบือ",
        locale: "th_TH",
      },
    };
  } catch (err) {
    console.error("Error fetching metadata:", err);
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

// 🧩 Page Component
const MoitId = async ({
  params,
}: {
  params: { year: string; id: string };
}) => {
  const { year, id } = await params;

  if (!year || !/^\d+$/.test(year) || !isValidObjectId(id)) {
    notFound();
  }

  const apiKey = process.env.API_FIRST_KEY ?? "";
  const urlApi = process.env.URL_API_NEXT ?? "";

  if (!apiKey || !urlApi) {
    console.error("Missing API key or URL in environment variables.");
    return <div>Server configuration error.</div>;
  }

  const apiUrl = `${urlApi}moit/${year}/${id}`;
  const urlImg1 = `${urlApi}geturl/bg_head.jpg`;
  const getview = `${urlApi}view-count/moit/${id}`;
  try {
    const [response, imgurl1, rawview] = await Promise.all([
      fetch(apiUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }),
      fetch(urlImg1, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }),
      fetch(getview, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }),
      
    ]);

    if (!response.ok || !imgurl1.ok || !rawview.ok) {
      throw new Error("Failed to fetch data");
    }

    const [data, urlData1, dataview] = await Promise.all([
      response.json(),
      imgurl1.json(),
      rawview.json(),
    ]);

    return (
      <MoitIdComponent
        items={data}
        imgurl={urlData1}
        viewdata={dataview}
      />
    );
  } catch (err) {
    console.error("Error fetching page data:", err);
    return <div>Failed to load data for MOIT.</div>;
  }
};

export default MoitId;
