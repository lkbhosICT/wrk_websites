import Banner from "@/components/Banner";
import Checktable from "@/components/Checktable";
import Bannerdata from "@/components/Bannerdata";
import Bordnews from "@/components/Bordnews";
export const metadata = {
  title: 'โรงพยาบาลลานกระบือ',
  description: 'โรงพยาบาลลานกระบือ อำเภอลานกระบือ จังหวัดกำแพงเพชร สังกัดกระทรวงสาธารณสุข',
  openGraph: {
    title: "โรงพยาบาลลานกระบือ",
    description: "โรงพยาบาลลานกระบือ อำเภอลานกระบือ จังหวัดกำแพงเพชร ",
    url: "https://lkbhos.moph.go.th/",
    siteName: "เว็บไซต์โรงพยาบาลลานกระบือ สังกัดกระทรวงสาธารณสุข",
    images: [
      {
        url: "https://lkbhos.moph.go.th/api/files/lkbhos.jpg", 
        width: 1200,
        height: 630,
        alt: "lankrbue_hospital",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};
const page = () => {
  return (
    <div>
      <div className="bg-[url(/bg_bn.jpg)]">
        <Bannerdata/>
      </div>
      <div className="max-h-max mt-5">
        <Checktable/>
      </div>
      <div className="container mx-auto mt-5  w-full h-[600px]">
        <div className="w-full p-2">
           <Bordnews/>
        </div>
        
    </div>
  </div>
  )
}
export default page