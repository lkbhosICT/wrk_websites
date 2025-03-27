"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from 'swiper/modules';
const Checktable = () => {
  return (
    <div className="container mx-auto p-2  overflow-hidden">
        <div className='text-2xl font-bold'>เวลาทำการ และ คลินิกพิเศษ</div>
        <div className='w-[19%] h-[5px] bg-moph mb-5'></div>
         <Swiper
            slidesPerView={4}
            spaceBetween={30}
            freeMode={true}
            speed={1000}
            loop={true}
            autoplay={{
                delay: 4000, 
                disableOnInteraction: false, 
            }}
            pagination={{ clickable: true }}
            breakpoints={{
                320: { slidesPerView: 1 }, 
                640: { slidesPerView: 2 }, 
                1024: { slidesPerView: 3 }, 
                1360: { slidesPerView: 4 }, 
            }}
            modules={[FreeMode, Autoplay ]}
            className="w-full"
        >
            <SwiperSlide>
                <div className='shadow-x border-[1px] border-pastelyellow h-[290px] bg-white'>
                    <div className='border-b-[1px] p-2 text-[1rem] bg-pastelyellow text-white'><i className="ri-bar-chart-box-ai-line"></i> วันจันทร์</div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ตรวจโรคทั่วไป (OPD)</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องฉุกเฉิน (ER)</div>
                        <div className='col-span-1 text-center'>ตลอด 24 ชั่วโมง</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องทันตกรรม</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>แพทย์แผนไทย</div>
                        <div className='col-span-1 text-center'>08.00 - 20.30 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>กายภาพ</div>
                        <div className='col-span-1 text-center'>08.00 - 20.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกฟ้าใส</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกสบายใจ</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelyellow text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลินิกทางเดินหายใจ (COPD)</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='shadow-x border-[1px] border-pastelpink h-[290px] bg-white'>
                    <div className='border-b-[1px] p-2 text-[1rem] bg-pastelpink text-white'><i className="ri-bar-chart-box-ai-line"></i> วันอังคาร</div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ตรวจโรคทั่วไป (OPD)</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องฉุกเฉิน (ER)</div>
                        <div className='col-span-1 text-center'>ตลอด 24 ชั่วโมง</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องทันตกรรม</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>แพทย์แผนไทย</div>
                        <div className='col-span-1 text-center'>08.00 - 20.30 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>กายภาพ</div>
                        <div className='col-span-1 text-center'>08.00 - 20.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกฟ้าใส</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกสบายใจ</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกเบาหวาน</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpink text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิก ANC ฝากครรภ์ ตรวจครรภ์</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='shadow-x border-[1px] border-pastelgreen h-[290px] bg-white'>
                    <div className='border-b-[1px] p-2 text-[1rem] bg-pastelgreen text-white'><i className="ri-bar-chart-box-ai-line"></i> วันพุธ</div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ตรวจโรคทั่วไป (OPD)</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องฉุกเฉิน (ER)</div>
                        <div className='col-span-1 text-center'>ตลอด 24 ชั่วโมง</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องทันตกรรม</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>แพทย์แผนไทย</div>
                        <div className='col-span-1 text-center'>08.00 - 20.30 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>กายภาพ</div>
                        <div className='col-span-1 text-center'>08.00 - 20.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกฟ้าใส</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกสบายใจ</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลินิกโรคความดันโลหิตสูง</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลินิกโรคไต</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelgreen text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลินิกวางแผนครอบครัว/<br/>ตรวจมะเร็งปากมดลู</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='shadow-x border-[1px] border-pastelorange h-[290px] bg-white'>
                    <div className='border-b-[1px] p-2 text-[1rem] bg-pastelorange text-white'><i className="ri-bar-chart-box-ai-line"></i> วันพฤหัสบดี</div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ตรวจโรคทั่วไป (OPD)</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องฉุกเฉิน (ER)</div>
                        <div className='col-span-1 text-center'>ตลอด 24 ชั่วโมง</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องทันตกรรม</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>แพทย์แผนไทย</div>
                        <div className='col-span-1 text-center'>08.00 - 20.30 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>กายภาพ</div>
                        <div className='col-span-1 text-center'>08.00 - 20.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกฟ้าใส</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกสบายใจ</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>สุขภาพเด็กดี(ฉีดวัคซีนเด็ก)</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>
                        คลินิกโรคความดันโลหิตสูง</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelorange text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>
                        คลินิกโรคไต</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='shadow-x border-[1px] border-pastelblue h-[290px] bg-white'>
                    <div className='border-b-[1px] p-2 text-[1rem] bg-pastelblue text-white'><i className="ri-bar-chart-box-ai-line"></i> วันศุกร์</div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ตรวจโรคทั่วไป (OPD)</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องฉุกเฉิน (ER)</div>
                        <div className='col-span-1 text-center'>ตลอด 24 ชั่วโมง</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องทันตกรรม</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>แพทย์แผนไทย</div>
                        <div className='col-span-1 text-center'>08.00 - 20.30 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>กายภาพ</div>
                        <div className='col-span-1 text-center'>08.00 - 20.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกฟ้าใส</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลิกนิกสบายใจ</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelblue text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>คลินิกโรคเบาหวานและไทรอยด์</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='shadow-x border-[1px] border-pastelpuple h-[290px] bg-white'>
                    <div className='border-b-[1px] p-2 text-[1rem] bg-pastelpuple text-white'><i className="ri-bar-chart-box-ai-line"></i> วันเสาร์</div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpuple text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องฉุกเฉิน (ER)</div>
                        <div className='col-span-1 text-center'>ตลอด 24 ชั่วโมง</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpuple text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>แพทย์แผนไทย</div>
                        <div className='col-span-1 text-center'>08.00 - 20.30 น.</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelpuple text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>กายภาพ</div>
                        <div className='col-span-1 text-center'>08.00 - 16.00 น.</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='shadow-x border-[1px] border-pastelred h-[290px] bg-white'>
                    <div className='border-b-[1px] p-2 text-[1rem] bg-pastelred text-white'><i className="ri-bar-chart-box-ai-line"></i> วันอาทิตย์</div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelred text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>ห้องฉุกเฉิน (ER)</div>
                        <div className='col-span-1 text-center'>ตลอด 24 ชั่วโมง</div>
                    </div>
                    <div className='grid grid-cols-3 px-1 border-dashed border-b-[1px] border-pastelred text-[0.80rem]  last:border-none'>
                        <div className='col-span-2'><i className="ri-arrow-right-s-fill"></i>แพทย์แผนไทย</div>
                        <div className='col-span-1 text-center'>08.00 - 20.30 น.</div>
                    </div>
                   
                </div>
            </SwiperSlide>
        </Swiper>
  </div>
  )
}
export default Checktable