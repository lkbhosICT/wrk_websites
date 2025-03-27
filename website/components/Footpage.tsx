import Link from "next/link"
const Footpage = () => {
  return (
    <div className="relative w-full h-full bg-moph max-h-full z-10">
        <div className="lg:container lg:m-auto">
            <div className="lg:grid lg:grid-cols-4 content-center text-white">
                <div className="lg:border-l-2 lg:border-r-2 text-center p-[0.5rem] max-lg:border-b-2 text-footer">
                    <div className="lg:w-[40px] w-[30px] mx-auto"><img src={process.env.NEXT_PUBLIC_API_URL+'/files/call_phone.png'} alt="" /></div>
                    <div>1669 หรือ 055-769-086 ต่อ 140</div>
                    <div>ฉุกเฉิน เรียกรถพยาบาล</div>
                    <div>พร้อมบริการทุกวัน 24 ชม.</div>
                </div>
                <div className="lg:border-r-2 lg:text-center text-center p-[0.5rem] max-lg:border-b-2 text-footer">
                    <div className="lg:w-[40px] w-[30px] mx-auto"><img src={process.env.NEXT_PUBLIC_API_URL+'/files/tell.png'} alt="" /></div>
                    <div>โทรหาโรงพยาบาล</div>
                    <div>055-769-086</div>
                    <div>บริการทุกวันจันทร์-ศุกร์ เวลา 08.30-16.30 น.</div>
                </div>
                <div className="lg:border-r-2 lg:text-center text-center p-[0.5rem] max-lg:border-b-2 text-footer">
                    <div className="lg:w-[40px] w-[30px] mx-auto"><img src={process.env.NEXT_PUBLIC_API_URL+'/files/rss.png'} alt="" /></div>
                    <div>สอบถามข้อมูลเพิ่มเติมผ่าน Social</div>
                    <div><i className="ri-mail-send-line"></i> : lkbhosp@moph.go.th</div>
                    <div><i className="ri-facebook-circle-fill"></i> : โรงพยาบาลลานกระบือ</div>
                </div>
                <div className="lg:border-r-2 lg:text-center text-center p-[0.5rem] text-footer">
                    <div className="lg:w-[40px] w-[30px] mx-auto"><img src={process.env.NEXT_PUBLIC_API_URL+'/files/loca.png'} alt="" /></div>
                    <div>แผนที่โรงพยาบาล</div>
                    <div className="mt-1"><Link className="text-footer border-[1px] px-3 py-1 hover:bg-white hover:text-moph transition-all duration-700" href="/" >ดูแผนที่</Link></div>
                    <div className="mt-3"><Link className="text-footer border-[1px] px-3 py-1 hover:bg-white hover:text-moph transition-all duration-700" href="/">สอบถาม-ร้องเรียน</Link></div>
                </div>
            </div>
        </div>
        <div className="bg-customGray w-full">
            <div className="lg:container mx-auto max-lg:px-7">
                <div className="lg:grid lg:grid-cols-3 content-center pt-[2rem] pb-[0.5rem]">
                    <div className="lg:border-r-[1px] lg:border-silver mb-5 max-lg:border-b-[1px] border-silver max-lg:pb-3">
                        <div className="underline mb-[1.25rem] text-txtgrays font-bold txt-foot-head">เกี่ยวกับเรา</div>
                        <div className="txt-footers text-txtgrays text-justify leading-relaxed px-2">โรงพยาบาลลานกระบือ เป็นสถานที่สำหรับให้บริการด้านสุขภาพให้กับผู้ป่วย โดยมักที่จะมุ่งเน้นการส่งเสริม 
                            ป้องกัน รักษา และฟื้นฟูภาวะความเจ็บป่วย หรือโรคต่าง ๆ ทั้งทางร่างกายและทางจิตใจ ปัจจุบันโรงพยาบาลลานกระบือ 
                            เป็นโรงพยาบาลขนาด 30 เตียง อยู่ภายใต้สังกัดกระทรวงสาธารณสุข
                        </div>
                        <div className="border-l-8 border-moph ps-5 mt-[2rem]">
                            <div className="text-txtgrays font-black">บริการดี มีมาตราฐานปลอดภัย พึงพอใจทั้งผู้ให้ และผู้รับบริการ</div>
                        </div>
                    </div>
                    <div className="lg:border-r-[1px] px-2 max-lg:border-b-[1px] border-silver max-lg:pb-3 mb-5">
                        <div className="underline mb-[1.25rem] text-txtgrays font-bold txt-foot-head">ติดต่อเรา</div>
                        <div className="txt-footers text-txtgrays text-justify leading-relaxed px-2">
                            <div><i className="ri-hospital-fill pe-1"></i>โรงพยาบาลลานกระบือ</div> 62 หมู่ 6 ตำบลลานกระบือ อำเภอลานกระบือ จังหวัดกำแพงเพชร 62170
                        </div>
                        <div className="mb-[1.25rem] lg:w-[70%] max-lg:w-full pt-6 ">
                            <div className="bg-moph p-1 text-white"><i className="ri-line-chart-fill pe-1"></i>สถิติเข้าชมเว็บไซต์</div>
                            <div className="grid grid-cols-4 p-1 bg-white text-txtgrays txt-footers border-b-[1px]">
                                <div className="col-span-2 "><i className="ri-arrow-right-s-fill pe-1"></i>จำนวนเข้าชมวันนี้</div>
                                <div className="text-center">50</div>
                                <div className="text-center">ครั้ง</div>
                            </div>
                            <div className="grid grid-cols-4 p-1 bg-white text-txtgrays txt-footers border-b-[1px]">
                                <div className="col-span-2 "><i className="ri-arrow-right-s-fill pe-1"></i>จำนวนเข้าชมเดือนนี้</div>
                                <div className="text-center">155</div>
                                <div className="text-center">ครั้ง</div>
                            </div>
                            <div className="grid grid-cols-4 p-1 bg-white text-txtgrays txt-footers">
                                <div className="col-span-2 "><i className="ri-arrow-right-s-fill pe-1"></i>จำนวนเข้าชมทั้งหมด</div>
                                <div className="text-center">1000</div>
                                <div className="text-center">ครั้ง</div>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 mb-4">
                        <div className="underline mb-[1.25rem] text-txtgrays font-bold txt-foot-head">ลิงค์ที่เกี่ยวข้อง และ บริการ</div>
                        <div className="px-4">
                            <div className="lg:grid lg:grid-cols-2 text-txtgrays  txt-footers">
                                <div className="grid lg:border-r-[1px] border-silver gap-y-1">
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">ระบบความเสี่ยง (HRMS)</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">ระบบสารบรรณ (e-Ofiice)</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">ระบบจัดซื้อ-จ้างภาครัฐ</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">เว็บไซต์ สสจ.กำแพงเพชร</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">RMC Plus</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">เช็คสิทธิออนไลน์</Link></div>
                                </div>
                                <div className="lg:px-4 grid gap-y-1">
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">HDC On Cloud</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">เยี่ยมบ้าน Smart COC</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">จัดหาคอมพิวเตอร์</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">PDPA</Link></div>
                                    <div><i className="ri-circle-fill text-moph text-[0.6rem] pe-1"></i><Link href="/" className="hover:lg:text-moph">จองคิวออนไลน์</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-ful bg-customGray mt-1">
            <div className="container mx-auto text-center">
                <div className="flex justify-center  text-txtgray text-footter-credit pt-2 mb-[1.25rem]">
                    <div className="border-r-[1px] border-silver px-[0.75rem] hover:text-moph"><Link href="/">ความเป็นส่วนตัว</Link></div>
                    <div className="border-r-[1px] border-silver px-[0.75rem] hover:text-moph"><Link href="/">เงื่อนไขการใช้งาน</Link></div>
                    <div className="px-[0.75rem] hover:text-moph"><Link href="/">นโยบายคุกกี้</Link></div>
                </div>
                <div className="text-footter-credit text-txtgray pb-[4rem]">
                    <div className="p-[0.2rem]">ลิขสิทธิ์ © 2025 โดย โรงพยาบาลลานกระบือ </div>
                    <div className="p-[0.2rem]">พัฒนาโดย งานสารสนเทศ โรงพยาบาลลานกระบือ</div>
                    <div className="p-[0.2rem]">โทร 055-769081 ต่อ 181</div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Footpage