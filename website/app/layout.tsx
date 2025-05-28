import { ReactNode } from "react";
import 'remixicon/fonts/remixicon.css';
import './globals.css'
import { Sarabun } from 'next/font/google'
import FootpageData from "@/components/FootpageData";
import Backgroup from "@/components/Backgroup";
import NavbarMenu from "@/components/NavbarMenu";
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
export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body className={`bg-customGray ${sarabun.className} min-h-screen relative`}>
        <Backgroup />
        <NavbarMenu/>
        <div className='w-full relative max-lg:px-1 mx-auto lg:mt-[4.2rem] max-lg:mt-[3.2rem] break-words'>
          {children}
        </div>
        <FootpageData />
      </body>
    </html>
  )
}
