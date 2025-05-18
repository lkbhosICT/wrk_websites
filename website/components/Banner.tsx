"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay }, 
  }),
}
const fadeRightVariants = {
  hidden: { opacity: 0, x: -50 }, 
  visible: (delay: number) => ({
    opacity: 1,
    x: 0, 
    transition: { duration: 0.6, delay },
  }),
};


interface imgbanner{
  name: string
  path: string
}

interface bannertype{
  wellcome: string
  hosname: string
  location: string
  title: string
  vision: string
  imgbanner: imgbanner[]
}

interface bannerProps{
  bannerData: bannertype
}


const Banner: React.FC<bannerProps> = ({bannerData}) => {
   try{
    if (!bannerData) {
      return <div>Failed to load Banner data.</div>;
    }
  
    return (
      <div className="lg:container mx-auto relative overflow-y-hidden lg:grid lg:grid-cols-2 max-h-max">
          <div className="flex flex-col mt-8 lg:mt-20 leading-8 ps-2">
                  <motion.h1
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="text-[clamp(0.875rem, 0.8rem + 0.375vw, 1.25rem)] tracking-[4px] lg:mb-5 mb-1 max-lg:px-1"
                  >
                    {bannerData?.wellcome}
                  </motion.h1>
              <div className='lg:max-w-max w-full max-h-max p-1 '>
                  <motion.h1
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="lg:py-5 lg:px-1 text-baner font-extrabold tracking-[2px] bg-gradient-to-r from-[#056839] to-black bg-clip-text text-transparent drop-shadow-[3px_-2px_9px_rgba(0,0,0,0.2)]"
                  >
                    {bannerData.hosname}
                  </motion.h1>
                <div className='flex items-center'>
                    <motion.h1
                      variants={fadeRightVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                      className="h-[5px] bg-moph max-lg:w-[20%] w-[60%] mt-1"
                    ></motion.h1>
                    <motion.h1
                      variants={fadeRightVariants}
                      initial="hidden"
                      animate="visible"
                      custom={3}
                      className="text-right tracking-[2px] font-thin text-[0.85rem] ms-2"
                    >
                      {bannerData.location}
                    </motion.h1>
                    
                </div>
              </div>
              <motion.h1
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={4}
                      className="lg:w-[75%] lg:pl-4 p-1 leading-relaxed lg:mt-2 mt-1 text-msg"
              >
                {bannerData.title}
              </motion.h1>
              <motion.h1
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={5}
                      className="lg:w-[80%] lg:ps-3 text-[1.5rem] font-bold text-moph lg:mt-7 mt-4 max-lg:text-center"
              >
                {"- "+bannerData.vision+" -"}
              </motion.h1>
          </div>
          <div className="flex items-center justify-center overflow-hidden">
              <div className="relative w-[85%] h-[600px] mt-[4.5rem]">
                <Swiper effect={'cube'}
                        grabCursor={true}
                        loop={true}
                        speed={1000}
                        cubeEffect={{
                          shadow: true,
                          slideShadows: true,
                          shadowOffset: 20,
                          shadowScale: 0.94,
                        }}
                        pagination={true}
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                        }}
                        modules={[EffectCube, Autoplay]}
                        className="overflow-visible"
                >    
                    {bannerData.imgbanner.map((img , index) =>(
                          <SwiperSlide key={index} className="relative z-10 border-[1px] rounded-[20px] select-none w-full h-full overflow-visible pointer-events-auto ">
                          <Image className="w-full h-[450px] object-cover shadow-lg" src={img.path} width={100} height={100} unoptimized alt={`Slide ${index}`} />
                          <Dialog>
                              <DialogTrigger className="absolute z-50 text-left ps-5 bottom-0 w-full h-[90px] bg-[rgba(93,95,145,0.4)] backdrop-blur-[10px] text-white  text-lg font-bold cursor-pointer">
                                {img.name}
                              </DialogTrigger>
                              <DialogContent className="z-[100] max-w-4xl w-full max-h-max p-2">
                                <DialogHeader className="hidden">
                                  <DialogTitle>My Modal</DialogTitle>
                                </DialogHeader>
                                <Image
                                  src={img.path}
                                  alt={`Selected Slide ${index}`}
                                  width={1200}
                                  height={800}
                                  className="w-full h-auto object-contain"
                                  unoptimized
                                />
                              </DialogContent>
                        </Dialog>
                        </SwiperSlide>
                    ))}
                </Swiper>
              </div>
          </div>
      </div>
    )


   }catch(err){
    console.error("Error fetching data:", err);
    return <div>Failed to load Banner data.</div>;
   }
}
export default Banner