"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";
import { usePathname , notFound } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";

interface submenu{
    _id: string;
    nums: number;
    title: string;
    path: string;
    pdfurl:string;
    make_by:string;
    fc_year:string;
}

interface childrens{
    _id: string;
    nums: number;
    title: string;
    path: string;
    pdfurl:string;
    make_by:string;
    fc_year:string;
    subtitle: submenu[]
}

interface moit{
    nums: number;
    title:string;
    fc_year:string;
    childrens: childrens[]
}

interface url1{
    url: string
}
interface url2{
    url: string
}

interface moitProps{
    moityearData: moit[]
    url1: url1
    url2: url2
}

const Moityear: React.FC<moitProps> = ({ moityearData , url1 , url2 }) => {
    
    if (!moityearData) {
        return <div>Failed to load Moit data.</div>;
    }
    const pathname = usePathname() || "/"; 
    const pathSegments = pathname.split("/").filter(Boolean); 
  
    
  const [breadcrumbLabels, setBreadcrumbLabels] = useState<Record<string, string>>({
    moit: "MOIT", 
  });

  useEffect(() => {
    // ตรวจสอบ moityearData และ pathSegments ก่อน
    if (!moityearData || !Array.isArray(moityearData) || moityearData.length === 0) return;
    if (!pathSegments || !Array.isArray(pathSegments) || pathSegments.length === 0) return;
  
    const newLabels: Record<string, string> = { ...breadcrumbLabels };
  
    pathSegments.forEach((segment, index) => {
      // ตรวจสอบ segment และ index ให้แน่ใจว่าใช้งานได้
      if (!segment || typeof segment !== "string") return;
      if (typeof index !== "number" || index < 1) return;
  
      if (index === 1) {
        const yearData = moityearData.find((item) => item?.fc_year?.toString() === segment);
        if (yearData) {
          newLabels[segment] = `ปีงบ ${yearData.fc_year}`;
        }
      }
  
      if (index === 2) {
        const parentData = moityearData
          .flatMap((item) => item?.childrens || []) // ป้องกัน childrens เป็น undefined
          .find((child) => child?._id === segment);
        if (parentData) {
          newLabels[segment] = parentData.title;
        }
      }
  
      if (index === 3) {
        const childData = moityearData
          .flatMap((item) => item?.childrens || []) // ป้องกัน childrens เป็น undefined
          .flatMap((child) => child?.subtitle || []) // ป้องกัน subtitle เป็น undefined
          .find((sub) => sub?._id === segment);
        if (childData) {
          newLabels[segment] = childData.title;
        }
      }
    });
  
    setBreadcrumbLabels(newLabels);
  }, [pathname, moityearData]);

  const getLabel = (segment: string) => {
    return breadcrumbLabels[segment] || decodeURIComponent(segment);
  };

   try{
   
      const [clicked, setClicked] = useState<number | null>(null)
      const [clicksubmenu, setClickSubmenu] = useState<number | null>(null)
      const fcYear = moityearData?.[0]?.fc_year || "ไม่พบข้อมูล"; 
    return (
      <div className="lg:container mx-auto p-2 overflow-hidden mb-10">
         <Breadcrumbs pathname={pathname} breadcrumbLabels={breadcrumbLabels} />
          <div className="lg:w-[95%] mx-auto max-h-[50vh]  bg-cover bg-center box-shadows-5 mb-6" style={{ backgroundImage: `url('${url1.url}')` }}>
              <div className="flex justify-center items-center p-[1.5rem] w-[80%]  mx-auto">
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="relative flex items-center gap-4">
                      <div className="relative right-[-20px] max-lg:right-[-10px]">
                        <Image className="lg:w-[16.5vh] 2xl:w-[15vh] max-lg:hidden" src={`${url2.url}`} width={100} height={100} unoptimized alt="logomoit"/>
                      </div>
                    </div>
                    <div className="lg:flex lg:flex-col lg:justify-center text-center lg:relative">
                      <div className="lg:border-t-[5px] lg:border-b-[5px] lg:border-moit lg:mt-[24px] lg:py-[4px] lg:ps-[16px] lg:w-max">
                        <div className="font-extrabold head-topic text-shadow">MOIT (MOPH Integrity and Transparency Assessment System)</div>
                        <div className="lg:text-right font-semibold head-topic-sm text-shadow">ปีงบประมาณ {fcYear}</div>
                        
                        <hr className="lg:hidden mt-2 mx-auto w-[80%]  block border-none h-[3px] bg-gradient-to-r from-white via-moit  to-white"/>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          <div className="lg:w-[95%] h-full mx-auto p-2">
              <ul className="relative  grid grid-cols-1 gap-y-3">
                  {moityearData?.map((item,i)=>{
                      const isClicked = clicked === i
                      return(
                          <li key={i} className=" rounded-xl">
                              <div onClick={() => setClicked(clicked === i ? null : i)}  className={`${isClicked ? "shadow-blue-500/50" : ""} transition-all duration-700 flex justify-between items-center bg-moit shadow-xl  p-3 rounded-xl  text-white cursor-pointer`}>
                                  <div className={`relative flex justify-center font-medium text-msg `}>
                                      <div className="font-bold ">MOIT{item.nums}</div>
                                      <div className="px-3">{item.title}</div>
                                      
                                  </div>
                                  <div className={`px-1 ${isClicked ? "rotate-0" : "rotate-180"}  transition-transform duration-700`}>
                                      <i className="ri-arrow-up-s-line text-shadow text-[18px] font-bold"></i>
                                  </div>
                                 
                              </div>
                              
                              <div className={`${isClicked ? "max-h-[1080px]" : "max-h-0"}  px-3 overflow-hidden transition-all duration-700`}>
                                  <ul className={`bg-white shadow-xl  ${isClicked ? "shadow-blue-500/50" : ""}`}>
                                      {item.childrens.map((child,i)=>{
                                          const issubtitle = clicksubmenu === i
                                          if(child.subtitle.length == 0 && child.make_by != 'sso' && child.pdfurl.length > 0 ){
                                              return(
                                                  <li key={i} className="py-1 px-5 border-b-[1.5px] last:border-none">
                                                      <div className="flex  items-center">
                                                          <Link href={child.path+child.fc_year+'/'+child._id} className="flex justify-center text-msg hover:text-moit">
                                                              <div className="font-bold">{child.nums}.</div>
                                                              <div className="px-3">{child.title}</div>
                                                          </Link>
                                                          <div className={`transition-transform duration-700`}>
                                                              <div className="text-[18px] font-bold transition-transform duration-700"></div>
                                                          </div> 
                                                      </div>
                                                  </li>    
                                              )
                                          }else if(child.subtitle.length == 0 && child.make_by != 'sso' && child.pdfurl.length == 0 ){
                                            return(
                                                <li key={i} className="py-1 px-5 border-b-[1.5px] last:border-none">
                                                    <div className="flex  items-center">
                                                        <Link href=""  className="flex justify-center text-gray-400 pointer-events-none">
                                                            <div className="font-bold">{child.nums}.</div>
                                                            <div className="px-3">{child.title}</div>
                                                        </Link>
                                                        <div className={`transition-transform duration-700`}>
                                                            <div className="text-[18px] font-bold transition-transform duration-700"></div>
                                                        </div> 
                                                    </div>
                                                </li>    
                                            )
                                          }
                                          else if(child.subtitle.length == 0 && child.make_by == 'sso'){
                                              return(
                                                  <li key={i} className="py-1 px-5 border-b-[1.5px] last:border-none flex ">
                                                      <div className="flex  items-center">
                                                          <Link href="" className="flex justify-center text-msg line-through cursor-default">
                                                              <div className="font-bold">{child.nums}</div>
                                                              <div className="px-3">{child.title}</div>
                                                          </Link>
                                                          <div className={`transition-transform duration-700`}>
                                                              <div className=" text-[18px] font-bold transition-transform duration-700"></div>
                                                          </div> 
                                                      </div>
                                                  </li> 
                                              )
                                          }else{
                                              return(
                                                  <li key={i} className="py-1 px-5 border-b-[1.5px] last:border-none">
                                                      <div onClick={() => setClickSubmenu(issubtitle ? null : i)} className="flex justify-between items-center cursor-pointer hover:text-moit ">
                                                          <div className={`${issubtitle ? "text-moit underline" : "text-base"} flex justify-center text-msg transition-all duration-700`}>
                                                              <div className="font-bold">{child.nums}.</div>
                                                              <div className="px-3">{child.title}</div>
                                                          </div>
                                                          <div className={`${issubtitle ? "rotate-0 text-moit" : "rotate-180"} transition-transform duration-700`}>
                                                              <i className="ri-arrow-up-s-line text-shadow text-[18px] font-bold transition-transform duration-700"></i>
                                                          </div> 
                                                      </div>
                                                      <div className={`${issubtitle ? "max-h-[500px]" : "max-h-0"}  px-5 overflow-hidden transition-all duration-700`}>
                                                          <ul className="grid grid-cols-1 gap-y-1 font-light">
                                                              {child.subtitle.map((submenu,i)=>{
                                                                if(submenu.pdfurl.length > 0){
                                                                    return(
                                                                    <li key={i} className="flex border-b-[1px] border-dotted py-1 last:border-none head-topic-sm">
                                                                        <i className="ri-arrow-right-double-fill text-moit font-seminormal me-1"></i>
                                                                        <Link href={submenu.path+submenu.fc_year+'/'+submenu._id} className="flex hover:text-moit">
                                                                            <div className="me-1">{submenu.nums}.</div>
                                                                            <div>{submenu.title}</div>
                                                                        </Link>
                                                                    </li>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <li key={i} className="flex border-b-[1px] border-dotted py-1 last:border-none head-topic-sm pointer-events-none text-gray-400">
                                                                            <i className="ri-arrow-right-double-fill font-seminormal me-1"></i>
                                                                            <Link href="" className="flex">
                                                                                <div className="me-1">{submenu.nums}.</div>
                                                                                <div>{submenu.title}</div>
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                }
                                                                }
                                                              )}
                                                          </ul>
                                                      </div>
                                                  </li>  
                                              )
                                          }
                                      })}
                                     
                                  </ul>
                              </div>
                          </li> 
                      )       
                  })}
                  
              </ul>
          </div>
      </div>
    )
   }catch(err){
    notFound()
   }
   
}
export default Moityear