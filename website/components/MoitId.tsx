"use client";
import { usePathname } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import { useState, useEffect } from "react";
import ShowPic from "./showpic";

interface ChildrenItem {
  children_count_download: number;
  children_count_view: number;
  children_fc_year: string;
  children_id: string;
  children_make_by: string;
  children_nums: number;
  children_path: string;
  children_pdfurl: string;
  children_title: string;
  doc_fc_year: number;
  doc_nums: number;
}

interface SubtitleItem {
  children_nums: number;
  doc_fc_year: number;
  doc_nums: number;
  subtitle_count_download: number;
  subtitle_count_view: number;
  subtitle_fc_year: string;
  subtitle_id: string;
  subtitle_make_by: string;
  subtitle_nums: number;
  subtitle_path: string;
  subtitle_pdfurl: string;
  subtitle_title: string;
}

interface Url1 {
  url: string;
}

interface ViewCount {
  view_count: number;
}

type RawItem = SubtitleItem | ChildrenItem;

interface Props {
  items: RawItem[];
  imgurl: Url1;
  viewdata: ViewCount;
}

const MoitId: React.FC<Props> = ({ items, imgurl, viewdata }) => {
  const pathname = usePathname() || "/";
  const pathSegments = pathname.split("/").filter(Boolean);
  const [breadcrumbLabels, setBreadcrumbLabels] = useState<Record<string, string>>({
    moit: "MOIT",
  });

  const firstItem = items[0];
  const nums = firstItem?.doc_nums || 0;
  let title = "ไม่พบชื่อเรื่อง";
  let id = "ไม่พบชื่อเรื่อง";
  let make_by = "ไม่พบข้อมูล";
  const view = viewdata.view_count;
  let pdf = "nodata.pdf";
  let nums_parent = 0;

  if ("subtitle_id" in firstItem) {
    id = firstItem.subtitle_id;
    pdf = firstItem.subtitle_pdfurl;
    make_by = firstItem.subtitle_make_by;
    title = firstItem.subtitle_title;
    nums_parent = firstItem.subtitle_nums;
  } else if ("children_id" in firstItem) {
    id = firstItem.children_id;
    pdf = firstItem.children_pdfurl;
    make_by = firstItem.children_make_by;
    title = firstItem.children_title;
    nums_parent = firstItem.children_nums;
  }

  useEffect(() => {
    if (!items || items.length === 0 || pathSegments.length === 0) return;
  
    setBreadcrumbLabels((prev) => {
      const newLabels: Record<string, string> = { ...prev };
  
      pathSegments.forEach((segment, index) => {
        if (index === 1) {
          const yearData = items.find((itm) => itm?.doc_fc_year?.toString() === segment);
          if (yearData) {
            newLabels[segment] = `ปีงบ ${yearData.doc_fc_year}`;
          }
        }
  
        if (index === 2) {
          const maxLength = 30;
          const truncated = title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
          newLabels[segment] = `(MOIT ${nums}) ข้อ ${nums_parent}. ${truncated}`;
        }
      });
  
      return newLabels;
    });
  }, []);

  if (!items || items.length === 0) {
    return <div>ไม่มีข้อมูล</div>;
  }

  return (
    <div className="lg:container mx-auto p-2 overflow-hidden mb-10">
      <Breadcrumbs pathname={pathname} breadcrumbLabels={breadcrumbLabels} />
      <div
        className="relative lg:w-[95%] mx-auto max-h-[60vh] bg-cover bg-center box-shadows-5 mb-6"
        style={{ backgroundImage: `url('${imgurl.url}')` }}
      >
        <div className="flex justify-center items-center p-[1.5rem]">
          <div className="flex lg:w-[75%] items-center">
            <div className="flex items-center text-[4rem] font-extrabold text-moit ps-4 max-lg:hidden">
              <div className="">M</div>
              <div className="w-[3rem] h-[3rem] bg-moit text-white flex items-center justify-center rounded-full text-xl font-bold">
                <span className="w-[2rem] h-[2rem] flex items-center justify-center rounded-full bg-white text-moit">
                  {nums}
                </span>
              </div>
              <div className="">IT</div>
            </div>
            <div className="ms-3">
              <div className="lg:hidden max-lg:text-center font-semibold text-moit head-topic">
                MOIT {nums}
              </div>
              <div className="font-bold text-msg max-lg:text-center text-moit">ข้อที่ {nums_parent}</div>
              <div className="head-topic-sm border-t-2 pt-1 ">{title}</div>
            </div>
          </div>
        </div>
      </div>
      <ShowPic makeBy={make_by} view={view} id={id} pdfname={pdf} />
    </div>
  );
};

export default MoitId;
