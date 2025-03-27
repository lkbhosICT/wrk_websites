"use client"
import { usePathname , notFound } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import { useState, useEffect } from "react";
import Pdfjs from "./Pdfjs";
interface subtitle{
    _id: string;
    nums: number;
    title: string;
    path: string;
    pdfurl:string;
    make_by:string;
    fc_year:string;
    count_download:number;
    count_view:number;
}

interface childrens{
    _id: string;
    nums: number;
    title: string;
    path: string;
    pdfurl:string;
    make_by:string;
    fc_year:string;
    count_download:number;
    count_view:number;
    subtitle: subtitle
}

interface moit{
    nums: number;
    fc_year:number;
    childrens: childrens
}

interface moitProps{
    moitIdData: moit[]
    
}
const MoitId: React.FC<moitProps> = ({ moitIdData }) => {
    if(!moitIdData) {
        return <div>Failed to load Moit data.</div>;
    }
    const pathname = usePathname() || "/"; 
    const pathSegments = pathname.split("/").filter(Boolean); 
  
    
  const [breadcrumbLabels, setBreadcrumbLabels] = useState<Record<string, string>>({
    moit: "MITAS", 
  });
  useEffect(() => {
    
    if (!moitIdData || !Array.isArray(moitIdData) || moitIdData.length === 0) return;
    if (!pathSegments || !Array.isArray(pathSegments) || pathSegments.length === 0) return;
  
    const newLabels: Record<string, string> = { ...breadcrumbLabels };
  
    pathSegments.forEach((segment, index) => {
    
      if (!segment || typeof segment !== "string") return;
      if (typeof index !== "number" || index < 1) return;
  
      if (index === 1) {
        const yearData = moitIdData.find((item) => item?.fc_year?.toString() === segment);
        if (yearData) {
          newLabels[segment] = `ปีงบ ${yearData.fc_year}`;
        }
      }
      if (index === 2) {
        let childData: {  _id: string; title: string; nums?: number; parentNums?: number } | undefined;
      
        
        const foundChildrens = moitIdData
            .flatMap((item) => 
                item?.childrens ? [{ parentNums: item.nums, ...item.childrens }] : []
            )
            .find((child) => child?._id === segment);

            if (foundChildrens) {
                const maxLength = 30;  
                const truncatedTitle = foundChildrens.title.length > maxLength 
                  ? foundChildrens.title.slice(0, maxLength) + "..."  
                  : foundChildrens.title;  
            
            childData = { 
                _id: foundChildrens._id, 
                title: `(MOIT ${foundChildrens.parentNums}) ข้อ ${foundChildrens.nums}. ${truncatedTitle}`, 
                nums: foundChildrens.nums,
                parentNums: foundChildrens.parentNums
            };
        }
      
        
        if (!childData) {
            const foundSubtitleEntry = moitIdData
              .flatMap((item) => 
                item?.childrens ? [{ parentNums: item.nums, ...item.childrens }] : []
              )
              .find((child) => child?.subtitle?._id === segment);
          
            if (foundSubtitleEntry && foundSubtitleEntry.subtitle) {
                const maxLength = 30; 
                const truncatedTitle = foundSubtitleEntry.subtitle.title.length > maxLength 
                  ? foundSubtitleEntry.subtitle.title.slice(0, maxLength) + "..."  
                  : foundSubtitleEntry.subtitle.title;   
              childData = { 
                _id: foundSubtitleEntry.subtitle._id, 
                title: `(MOIT ${foundSubtitleEntry.parentNums}) ข้อ ${foundSubtitleEntry.subtitle.nums}. ${truncatedTitle}`, 
                nums: foundSubtitleEntry.subtitle.nums,
                parentNums: foundSubtitleEntry.parentNums 
              };
            }
          }
      
        if (childData) {
          newLabels[segment] = childData.title;
        }
      }
    });
  
    setBreadcrumbLabels(newLabels);
  }, [pathname, moitIdData]);

  const getLabel = (segment: string) => {
    return breadcrumbLabels[segment] || decodeURIComponent(segment);
  };
   const nums = moitIdData?.[0]?.nums || "ไม่พบข้อมูล"
   const id =moitIdData?.[0]?.childrens?.subtitle?._id  ||  moitIdData?.[0]?.childrens?._id || "ไม่พบข้อมูล"
   const nums_parent =moitIdData?.[0]?.childrens?.subtitle?.nums  ||  moitIdData?.[0]?.childrens?.nums || "ไม่พบข้อมูล"
   const title = moitIdData?.[0]?.childrens?.title || moitIdData?.[0]?.childrens?.subtitle?.title || "ไม่พบข้อมูล"
   const year = moitIdData?.[0]?.childrens?.fc_year || moitIdData?.[0]?.childrens?.subtitle?.fc_year || "ไม่พบข้อมูล"
   const make = moitIdData?.[0]?.childrens?.make_by || moitIdData?.[0]?.childrens?.subtitle?.make_by || "ไม่พบข้อมูล"
   const count_view = moitIdData?.[0]?.childrens?.count_view || moitIdData?.[0]?.childrens?.subtitle?.count_view || "ไม่พบข้อมูล"
   const count_download = moitIdData?.[0]?.childrens?.count_download || moitIdData?.[0]?.childrens?.subtitle?.count_download || "ไม่พบข้อมูล"
   const pdfname = moitIdData?.[0]?.childrens?.pdfurl || moitIdData?.[0]?.childrens?.subtitle?.pdfurl || "ไม่พบข้อมูล"
   const pdflink = process.env.NEXT_PUBLIC_API_URL+'files/'+pdfname
   const watermarkUrl = process.env.NEXT_PUBLIC_API_URL+'files/logo-lkb.webp'
    try{
        return(
        <div className="lg:container mx-auto p-2 overflow-hidden mb-10">
            <Breadcrumbs pathname={pathname} breadcrumbLabels={breadcrumbLabels} />
            <div className="relative lg:w-[95%] mx-auto max-h-[60vh]  bg-[url(http://10.10.5.1:8081/api/files/bg_head.jpg)] bg-cover bg-center box-shadows-5 mb-6">
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
                                <div className="lg:hidden max-lg:text-center  font-semibold text-moit head-topic">MOIT {nums}</div>
                                <div className="font-bold text-msg max-lg:text-center text-moit">ข้อที่ {nums_parent}</div>
                                <div className="head-topic-sm border-t-2 pt-1 ">{title}</div>
                            </div>
                       </div>
                </div>
            </div>
              <Pdfjs pdfUrl={pdflink} logoUrl={watermarkUrl} view={String(count_view)} makeBy={String(make)} id={id} download={String(count_download)} year={year}/>
        </div>
        )
    }catch(err){
        notFound()
    }
}
export default MoitId