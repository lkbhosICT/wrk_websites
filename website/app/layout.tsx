import { ReactNode } from "react";
import NavbarMenu from "@/components/NavbarMenu";
import 'remixicon/fonts/remixicon.css';
import './globals.css'
import { Sarabun } from 'next/font/google'
import Footpage from "@/components/Footpage";
import Backgroup from "@/components/Backgroup";
const sarabun = Sarabun( {
  weight: ['200','400','500','600'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  preload: false,
})
interface Props {
  children: ReactNode;
}
export const metadata = {
  icons: {
    icon: '/moph.ico',
  },
};
const layout = ({ children }: Props) => {
  return (
    <html>
      <body className={`bg-customGray ${sarabun.className} min-h-screen relative`}>
        <Backgroup/>
        <NavbarMenu />
        <div className='w-full relative max-lg:px-1 mx-auto lg:mt-[4.2rem] max-lg:mt-[3.2rem] break-words'>
          {children}
        </div>
        <Footpage/>
      </body>
    </html>
  )
}
export default layout