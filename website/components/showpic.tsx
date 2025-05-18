"use client";

import { useEffect, useState } from "react";
import DownloadmoitBtn from "./DownloadmoitBtn";
import CryptoJS from "crypto-js";
import Image from "next/image";

interface Props {
  makeBy: string;
  id: string;
  pdfname: string;
  view: number;
}

type ImgItem = {
  img: string;
};

const ShowPic: React.FC<Props> = ({ makeBy, view, id, pdfname }) => {
  const [images, setImages] = useState<ImgItem[]>([]);
  const [loading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("pending");
  const [total, setTotal] = useState(0);
  const [numpage, setNumpage] = useState(0);
  const [filenameencyp , setFilenameencyp] = useState<string>("ไม่มีข้อมูล")

  const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_CRYPTO_KEY || "");
  const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_CRYPTO_IV || "");

  function encryptAES(text: string) {
    return CryptoJS.AES.encrypt(text, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  const secretKey = process.env.NEXT_PUBLIC_API_KEY || "";
  if (!secretKey) {
    throw new Error("Missing API key");
  }

  useEffect(() => {
    const timestamp = Math.floor(Date.now() / 1000);
  
    const encryptedId = encryptAES(id);
    const encryptedFilename = encryptAES(pdfname);
    setFilenameencyp(encryptedFilename)
    const rawString = encryptedId + encryptedFilename + timestamp;
    const rawStrings = encryptedId + timestamp;
  
    const signature = CryptoJS.HmacSHA256(rawString, secretKey).toString();
    const signatures = CryptoJS.HmacSHA256(rawStrings, secretKey).toString();
  
    const body = {
      id: encryptedId,
      filename: encryptedFilename,
      timestamp,
      signature,
    };
  
    const bodyget = {
      id: encryptedId,
      timestamp,
      signature: signatures,
    };
  
    fetch(`${process.env.NEXT_PUBLIC_API_URL}tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setNumpage(data.numpage);
        if (
          data.status === "done" ||
          data.status === "processing" ||
          data.status === "pending"
        ) {
          const interval = setInterval(() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}task`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyget),
            })
              .then((res) => res.json())
              .then((data) => {
                setStatus(data.status);
                setProgress(data.progress);
                setTotal(data.total);
  
                if (data.status === "done") {
                  setImages(data.img_name);
                  clearInterval(interval);
                }
              });
          }, 2000);
          return () => clearInterval(interval);
        }
      });
  }, [id, pdfname, secretKey]);
  

  return (
    <div className="relative lg:w-[90%] mx-auto text-center">
      {loading ? (
        <div
          className="radial-progress text-moit head-topic"
          style={
            {
              "--value": `${progress}`,
              "--size": "10rem",
              "--thickness": "1rem",
            } as React.CSSProperties
          }
          aria-valuenow={progress}
          role="progressbar"
        >
          กำลังโหลด..{progress}%
        </div>
      ) : images.length > 0 ? (
        <div>
          {images.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="divider text-gray-500 lg:my-2 max-lg:my-[0.25rem] text-[0.75rem]">
                หน้า {idx + 1}
              </div>
              <Image
                className="box-shadows-5 w-full h-full"
                src={item.img}
                alt={`img${idx}`}
                width={1000}
                height={1400}
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement & {
                    dataset: { retried?: string };
                  };
                  if (!img.dataset.retried) {
                    img.dataset.retried = "true";
                    img.src = item.img + `?retry=1`;
                  }
                }}
              />
              {idx === images.length - 1 && (
                <div className="flex justify-between mt-4">
                  <div className="font-thin text-left">
                    <div className="txt-credit-moit">โดย. {makeBy}</div>
                    <div className="txt-count-view text-gray-600">
                      <i className="ri-eye-line"></i> จำนวนเข้าชม {view} ครั้ง
                    </div>
                  </div>
                  <DownloadmoitBtn
                    id={id}
                    location="moit"
                    filename={filenameencyp}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {status === "pending" && (
            <div className="flex flex-col items-center">
              <span className="loading loading-dots loading-xl"></span>
              <span className="mt-2 text-sm">{`กำลังเตรียมแปลงเอกสารจำนวน ${numpage} หน้า `}</span>
              <span className="mt-2 text-sm text-red-700 font-semibold">
                {`กรุณารอสักครู่...`}
              </span>
            </div>
          )}

          {status === "processing" && (
            <div className="flex flex-col items-center">
              <span className="loading loading-bars loading-xl"></span>
              <span className="mt-2 text-lg font-normal">{`กำลังแปลงเอกสาร ${progress}/${total} หน้า`}</span>
            </div>
          )}

          {status === "done" && (
            <div className="text-green-600 font-medium text-lg">เสร็จแล้ว!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowPic;
