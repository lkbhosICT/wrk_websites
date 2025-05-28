import Bannerdata from "@/components/Bannerdata"
import Checktable from "@/components/Checktable"
import Bordnews from "@/components/Bordnews"

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