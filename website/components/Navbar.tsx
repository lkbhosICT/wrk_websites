"use client"
import Link from "next/link"
import Image from "next/image";
import '../app/globals.css'
import { useState } from "react"

interface LogoType {
  path: string;
  nameth: string;
  nameen: string;
  icon: string;
};

interface submenu{
  name: string;
  path: string;
}

interface childrens{
  name: string;
  icon: string;
  path: string;
  submenu: submenu[]
}

interface menu{
  name: string;
  icon: string;
  path: string;
  childrens: childrens[]
}
interface NavbarProps {
  dataLogos: LogoType[];
  datanavbars: menu[];
}

const Navbar: React.FC<NavbarProps> = ({ dataLogos, datanavbars }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null)
  const [clicksubmenu, setClickSubmenu] = useState<number | null>(null)
  const openToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className="fixed top-0 left-0 w-full shadow-lg bg-white z-50">
        <nav className="lg:container m-auto h-header lg:h-[calc(3.5rem+1rem)] lg:flex lg:justify-between">
          <div className="h-full flex justify-between items-center max-lg:px-2">
            {dataLogos?.map((logo,index)=>(
              <Link key={index} href={logo.path} className="inline-flex items-center  font-semibold transition-colors hover:text-moph">
                <div className="w-45p text-right drop-shadow-md">
                  <Image src={process.env.NEXT_PUBLIC_API_URL+logo.icon} width={100} height={100} unoptimized alt="logolkbhos" />
                </div>
                <div className="text-left">
                  <div className="border-b-4 border-moph text-logo drop-shadow-md text-shadow">{logo.nameth}</div>
                  <div className="text-slogo tracking-wider text-shadow">{logo.nameen}</div>
                </div>
              </Link>
            ))}
            <div onClick={openToggle} className="relative w-8 h-8 lg:hidden">
              <i className={`ri-menu-line font-semibold text-xl absolute grid place-items-center inset-0 cursor-pointer transition-[opacity,transform] duration-1000  ${isOpen ? "opacity-0 rotate-0" : "opacity-100 rotate-[180deg]"}`}></i>
              <i className={`ri-close-line font-semibold text-xl absolute grid place-items-center inset-0 cursor-pointer transition-[opacity,transform] duration-1000 ${isOpen ? "opacity-100 rotate-[90deg]" : "opacity-0 rotate-0"}`}></i>
            </div>
          </div>
          <div className={`lg:h-full max-lg:bg-white max-lg:absolute max-lg:left-0 max-lg:top-[2.5rem] max-lg:w-full max-lg:h-[calc(100vh-3.5rem)] max-lg:overflow-auto max-lg:pb-16 max-lg:pt-6 max-lg:transition-[top,opacity] max-lg:duration-700 ${isOpen ? "max-lg:opacity-100 max-lg:top-[3.5rem] max-lg:pointer-events-auto" : "max-lg:opacity-0 max-lg:pointer-events-none"}`}>
            <ul className="lg:flex lg:gap-x-16 lg:items-center lg:h-full ">
                {datanavbars?.map((menu,i)=>{
                   const isClicked = clicked === i
                   if(menu.childrens.length == 0){
                    return(
                      <li className="group" key={i}><Link href="/" className=" text-menu group-hover:lg:text-moph lg:duration-700 lg:ease-out max-lg:px-[1.5rem] max-lg:py-[1.10rem] flex max-lg:border-b max-lg:border-spacing-1"><i className="ri-home-9-line pr-1 lg:hidden"></i>{menu.name}</Link></li>
                    )
                   }else{
                    return(
                      <li key={i} className="lg:flex lg:cursor-pointer group lg:h-full lg:items-center max-lg:border-b max-lg:border-spacing-1 ">
                        <div onClick={() => setClicked(clicked === i ? null : i)} className="text-menu flex group-hover:lg:text-moph lg:duration-700 lg:ease-out max-lg:justify-between max-lg:px-[1.5rem] max-lg:py-[1.10rem]"><p><i className="ri-menu-unfold-line pr-1 lg:hidden"></i>{menu.name}</p><i className={`ri-arrow-down-s-line max-lg:font-semibold transition-transform duration-700 group-hover:lg:text-moph group-hover:lg:rotate-180 ${isClicked && "max-lg:rotate-180"}`}></i></div>
                        <div className={`${isClicked && "max-lg:max-h-[500px]"} max-lg:max-h-[0px] max-lg:transition-all max-lg:duration-700 max-lg:overflow-hidden lg:bg-white lg:py-10 lg:absolute lg:left-0 lg:right-0 lg:bg-body-color lg:shadow-[0_6px_8px_rgba(37,56,88,0.05)] lg:transition-[top,opacity] lg:duration-700 lg:top-[6rem] lg:opacity-0 lg:pointer-events-none lg:max-h-max group-hover:lg:top-[4.5rem] group-hover:lg:opacity-100 group-hover:lg:pointer-events-auto group-hover:lg:cursor-auto`}>
                            <div className="max-lg:grid max-lg:gap-2 lg:container  lg:m-auto lg:px-10 lg:grid lg:grid-cols-6 lg:gap-x-3 lg:mx-auto lg:gap-y-6">
                                {Array.isArray(menu.childrens) &&
                                menu.childrens.map((child,i)=>{
                                  const isSubmenu = clicksubmenu === i
                                  if(Array.isArray(child.submenu) && child.submenu.length === 0){
                                    return(
                                      <div key={i} className="lg:relative lg:content-baseline lg:text-center max-lg:border-b max-lg:border-spacing-1 max-lg:last:border-spacing-0 max-lg:last:border-0">
                                        <div className="w-16 h-16 bgicon m-auto rounded-full grid place-items-center drop-shadow-md transition-all duration-700 ease-out hover:drop-shadow-lg hover:scale-105 max-lg:hidden">
                                          <Image src={process.env.NEXT_PUBLIC_API_URL+child.icon} width={100} height={100} unoptimized className="lg:max-w-[45px] lg:w-full lg:h-auto lg:drop-shadow-lg " alt="icon__menu" />
                                        </div>
                                        <Link href="/" className="max-lg:px-[1.5rem] text-dropdown font-normal  hover:lg:text-texthv transition-all duration-700 ease-out block hover:lg:translate-x-[10px]"><i className="ri-arrow-right-s-line lg:hidden"></i>{child.name}</Link>
                                      </div>
                                    )
                                  }else{
                                    return(
                                      <div key={i} className="lg:relative lg:content-baseline lg:text-center max-lg:border-b max-lg:border-spacing-1 max-lg:last:border-spacing-0 max-lg:last:border-0">
                                          <div className="w-16 h-16 bgicon m-auto rounded-full grid place-items-center drop-shadow-md transition-all duration-700 ease-out hover:drop-shadow-lg hover:scale-105 max-lg:hidden">
                                            <Image src={process.env.NEXT_PUBLIC_API_URL+child.icon} width={100} height={100} unoptimized className="max-w-[45px] w-full h-auto drop-shadow-lg" alt="icon__menu" />
                                          </div>
                                          <div className="relative cursor-pointer group/outer">
                                            <div onClick={()=> setClickSubmenu(clicksubmenu === i ? null : i)} className="max-lg:pl-[1.5rem] max-lg:pr-[2.5rem] max-lg:flex max-lg:justify-between text-dropdown font-normal  transition-all duration-700 ease-out group-hover/outer:lg:text-texthv">
                                            <div><i className="ri-arrow-right-s-line lg:hidden"></i>{child.name} <i className="ri-arrow-right-s-fill max-lg:hidden"></i></div>
                                            <div className={`transition-transform duration-700  ${isSubmenu && "max-lg:rotate-180"}`}><i className={`ri-arrow-down-s-line lg:hidden max-lg:font-semibold`}></i></div>
                                            </div>
                                            <ul className={`${isSubmenu && "max-lg:max-h-[500px]"} max-lg:font-thin max-lg:grid max-lg:gap-1 max-lg:px-10 max-lg:max-h-[0px] max-lg:transition-all max-lg:duration-700 max-lg:overflow-hidden lg:absolute lg:grid lg:gap-y-1 lg:p-[0.5rem] lg:bg-white lg:left-full lg:drop-shadow-lg lg:w-[max-content] lg:text-left text-submenu lg:transition-all lg:duration-700 lg:ease-out lg:translate-y-[-27%] lg:opacity-0 lg:pointer-events-none lg:translate-x-[-20%] group-hover/outer:lg:opacity-100 group-hover/outer:2xl:translate-x-[-3.5rem] group-hover/outer:xl:translate-x-[-2.5rem] group-hover/outer:lg:translate-x-[-1.5rem] group-hover/outer:lg:pointer-events-auto group-hover/outer:lg:cursor-auto`}>
                                                {Array.isArray(child.submenu) &&
                                                  child.submenu.map((subm, i: number)=>(
                                                  <li key={i} className="hover:lg:text-moph group/icon"><Link href="/"><i className="ri-arrow-right-s-line group-hover/icon:hidden max-lg:hidden"></i><i className="ri-arrow-right-double-line lg:hidden group-hover/icon:inline-block"></i>{subm.name}</Link></li>
                                                ))}
                                            </ul>
                                          </div>   
                                    </div>
                                    )
                                  }
                                })}
                                
                            </div>
                        </div>
                      </li>  
                    )
                   }
                })}
                
                   
            </ul>
          </div>
        </nav>
    </header>
  )
}
export default Navbar