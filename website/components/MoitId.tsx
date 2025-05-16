"use client";
import { usePathname , notFound } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import { useState, useEffect } from "react";
import Pdfjs from "./Pdfjs";
import Image from "next/image";
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
interface url1{
  url: string
}

interface viewcount{
  view_count:number
}

interface downloadcount{
  download_count:number
}


type RawItem = SubtitleItem | ChildrenItem;

interface Props {
  items: RawItem[];
  imgurl: url1
  viewdata: viewcount
  downloaddata: downloadcount
}


const MoitId: React.FC<Props> = ({ items, imgurl, viewdata, downloaddata }) => {
  if (!items || items.length === 0) {
    return <div>ไม่มีข้อมูล</div>;
  }
  const firstItem = items[0];
  let nums = firstItem.doc_nums
  let title = "ไม่พบชื่อเรื่อง";
  let id = "ไม่พบชื่อเรื่อง";
  let make_by = "ไม่พบข้อมูล";
  let view = viewdata.view_count
  let download = downloaddata.download_count
  let pdf = "nodata.pdf"

  if("subtitle_id" in firstItem){
    id = firstItem.subtitle_id
  }else if ("children_id" in firstItem){
    id = firstItem.children_id
  }
  if("subtitle_pdfurl" in firstItem){
    pdf = firstItem.subtitle_pdfurl
  }else if ("children_pdfurl" in firstItem){
    pdf = firstItem.children_pdfurl
  }

  if("subtitle_make_by" in firstItem){
     make_by = firstItem.subtitle_make_by
  }else if ("children_make_by" in firstItem){
    make_by = firstItem.children_make_by
  }
  if ("subtitle_id" in firstItem){
    id = firstItem.subtitle_id
  }else if ("children_id" in firstItem){
    id = firstItem.children_id
  }
    
  if ("children_title" in firstItem) {
    title = firstItem.children_title;
  } else if ("subtitle_title" in firstItem) {
    title = firstItem.subtitle_title;
  }

  let nums_parent = 0
  if("subtitle_nums" in firstItem){
    nums_parent = firstItem.subtitle_nums
  } else if ("children_nums" in firstItem){
    nums_parent = firstItem.children_nums
  }
  

  const pathname = usePathname() || "/"; 
  const pathSegments = pathname.split("/").filter(Boolean); 
  const [breadcrumbLabels, setBreadcrumbLabels] = useState<Record<string, string>>({
  moit: "MOIT", 
});

useEffect(() => {
  if (!items || !Array.isArray(items) || items.length === 0) return;
  if (!pathSegments || !Array.isArray(pathSegments) || pathSegments.length === 0) return;

  const newLabels: Record<string, string> = { ...breadcrumbLabels };

  pathSegments.forEach((segment, index) => {
    if (!segment || typeof segment !== "string") return;
    if (typeof index !== "number" || index < 1) return;

    if (index === 1) {
      const yearData = items.find((item) => item?.doc_fc_year?.toString() === segment);
      if (yearData) {
        newLabels[segment] = `ปีงบ ${yearData.doc_fc_year}`;
      }
    }

    if (index === 2) {
      let label: string | undefined;

      const foundSubtitle = items.find((item) => id === segment);
      if (foundSubtitle) {
        const maxLength = 30;
        const truncated = title.length > maxLength
          ? title.slice(0, maxLength) + "..."
          : title;

        label = `(MOIT ${nums}) ข้อ ${nums_parent}. ${truncated}`;
      }
      if (label) {
        newLabels[segment] = label;
      }
    }
  });

  setBreadcrumbLabels(newLabels);
}, [pathname, items]);

const getLabel = (segment: string) => {
  return breadcrumbLabels[segment] || decodeURIComponent(segment);
};
 
  return (
    <div className="lg:container mx-auto p-2 overflow-hidden mb-10">
        <Breadcrumbs pathname={pathname} breadcrumbLabels={breadcrumbLabels} />
        <div className="relative lg:w-[95%] mx-auto max-h-[60vh] bg-cover bg-center box-shadows-5 mb-6" style={{ backgroundImage: `url('${imgurl.url}')` }}>
                <div className="flex justify-center items-cente p-[1.5rem]">
                       <div className="flex lg:w-[75%] items-center ">
                            <div className="flex items-center text-[4rem] font-extrabold text-moit ps-4 max-lg:hidden">
                                <div className="">M</div> 
                                <div className="w-[3rem] h-[3rem] bg-moit text-white flex items-center justify-center rounded-full text-xl font-bold ">
                                    <span className="w-[2rem] h-[2rem] flex items-center justify-center rounded-full bg-white text-moit">{nums}</span>
                                </div>
                                <div className="">IT</div>
                            </div>
                            <div className="ms-3">
                                <div className="lg:hidden max-lg:text-center  font-semibold text-moit head-topic">MOIT {nums} </div>
                                <div className="font-bold text-msg max-lg:text-center text-moit">ข้อที่ {nums_parent}</div>
                                <div className="head-topic-sm border-t-2 pt-1 ">{title}</div>
                            </div>
                       </div>
                </div>
        </div>
        <ShowPic makeBy={make_by} view={view} download={download} id={id} pdfname={pdf}/>
    </div>
  
  );
};


export default MoitId;
