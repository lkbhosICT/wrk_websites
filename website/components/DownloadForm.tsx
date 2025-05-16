import Breadcrumbs from "./Breadcrumbs"
import DownloadmoitBtn from "./DownloadmoitBtn";
import { encryptAES } from "@/utils/encryption"

interface downloads{
    _id : string;
    form_name: string;
    file_name: string;
    file_type: string;
    make_by   : string;
    updateAt : string;
}

interface Downloadprops{
    datadownload : downloads[]
}

const DownloadForm: React.FC<Downloadprops> = ({datadownload}) => {
  return (
     <div className="lg:container mx-auto lg:p-2 max-lg:pt-2 overflow-hidden mb-10">
        <Breadcrumbs pathname="/download-form" breadcrumbLabels={{"download-form": "ดาวน์โหลดแบบฟอร์ม"}} />
        <div className="lg:w-[95%] w-full mx-auto max-h-[50vh]  bg-cover bg-center shadow-sm  mb-6" style={{ backgroundImage: `url('/download_bg.jpg')` }}>
            <div className="flex justify-center items-center p-[2rem] w-[80%]   mx-auto">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="lg:flex lg:flex-col lg:justify-center text-center lg:relative">
                    <h1 className="font-extrabold head-topic text-shadow">ดาวน์โหลดแบบฟอร์ม</h1>
                    <hr className=" mt-2 mx-auto w-[100%]  block border-none h-[3px] bg-gradient-to-r from-white via-moph  to-white"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[93%] lg:w-[85%] h-full bg-white mx-auto -mt-10 box-shadows-5">
            <div className="lg:p-5 p-3">
                <div className="grid gap-y-1 font-thin">

                    {datadownload?.map((item,index)=>{

                        const dateStr = item.updateAt;
                        const date = new Date(dateStr);
                        const formattedDate = date.toLocaleDateString("th-TH");
                        const encryptedFilename = encryptAES(item.file_name);
                        const typefile = item.file_type
                        let icon;

                        if (typefile === 'pdf') {
                        icon = <i className="ri-file-pdf-2-fill text-red-600"></i>;
                        } else if (typefile === 'docx') {
                        icon = <i className="ri-file-word-line text-sky-700"></i>;
                        } else {
                        icon = <i className="ri-file-image-line"></i>; 
}

                        return(
                        <div key={index} className=" border-b-silver border-b-[1px] border-dotted last:border-b-0">
                        <div className="flex justify-between">
                            <div>
                                 <h3 className="hover:text-moph cursor-default text-msg"><i className="ri-arrow-right-s-fill"></i>{item.form_name}</h3>
                                 <div className="flex text-[0.65rem] text-gray-400 max-lg:hidden ps-2">
                                    <p><i className="ri-edit-line me-1"></i>แก้ไขล่าสุด {formattedDate}</p>
                                    <p className="ms-2">ชนิดไฟล์. {icon}</p>
                                </div>
                            </div>
                            <div>
                                <div className="text-[0.35rem]">
                                    <DownloadmoitBtn id={item._id} location="downloadform" filename={encryptedFilename}/>
                                </div>
                            </div>
                        </div>
                    </div>
                        )
                    })}
                    
                    
                </div>
            </div>
        </div>
     </div>
  )
}
export default DownloadForm