"use client";
import { useState, useEffect } from "react";
import DownloadmoitBtn from "./DownloadmoitBtn";

interface PdfProps {
  pdfUrl: string;
  logoUrl: string;
  view: string;
  makeBy: string;
  id: string;
  download: string;
  year: string;
}

const Pdfjs: React.FC<PdfProps> = ({ pdfUrl, logoUrl, view, makeBy, id, download, year }) => {
  const [images, setImages] = useState<{ page: number; src: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [loadedPages, setLoadedPages] = useState(0); // นับหน้าที่โหลดแล้ว

  useEffect(() => {
    const fetchAndRenderPdf = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjs.getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        const containerWidth = document.body.clientWidth;
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = logoUrl;
        await new Promise((resolve) => (logo.onload = resolve));

        if (pdf.numPages <= 10) {
          // ✅ ใช้ for-loop โหลดทุกหน้าแบบปกติ
          const newImages = [];
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const renderedPage = await renderPage(page, containerWidth, logo, i, pdf.numPages);
            newImages.push(renderedPage);
            setProgress(Math.round((i / pdf.numPages) * 100));
          }
          setImages(newImages);
        } else {
          // ✅ ใช้ Lazy Load ถ้าเกิน 10 หน้า
          setLoadedPages(1);
        }
      } catch (error) {
        console.error("PDF loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRenderPdf();
  }, [pdfUrl, logoUrl]);

  useEffect(() => {
    if (numPages > 10 && loadedPages > 0 && loadedPages <= numPages) {
      const loadPage = async () => {
        const pdfjs = await import("pdfjs-dist");
        const pdf = await pdfjs.getDocument({ url: pdfUrl }).promise;
        const containerWidth = document.body.clientWidth;
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = logoUrl;
        await new Promise((resolve) => (logo.onload = resolve));

        const page = await pdf.getPage(loadedPages);
        const renderedPage = await renderPage(page, containerWidth, logo, loadedPages, numPages);
        setImages((prev) => [...prev, renderedPage]);

        setProgress(Math.round((loadedPages / numPages) * 100));
        setLoadedPages((prev) => prev + 1); // โหลดหน้าถัดไป
      };

      loadPage();
    }
  }, [loadedPages, numPages, pdfUrl, logoUrl]);

  // ฟังก์ชันเรนเดอร์หน้า PDF พร้อมใส่โลโก้
  const renderPage = async (page: any, containerWidth: number, logo: HTMLImageElement, pageNumber: number, totalPages: number) => {
    const viewport = page.getViewport({ scale: 1.0 });
    const scale = containerWidth / viewport.width;
    const adjustedViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return { page: pageNumber, src: "" };

    canvas.width = adjustedViewport.width;
    canvas.height = adjustedViewport.height;
    await page.render({ canvasContext: context, viewport: adjustedViewport }).promise;

    // ใส่โลโก้โปร่งแสง
    const logoSize = Math.min(canvas.width, canvas.height) * 0.9;
    const x = (canvas.width - logoSize) / 2;
    const y = (canvas.height - logoSize) / 2;
    context.globalAlpha = 0.09;
    context.drawImage(logo, x, y, logoSize, logoSize);
    context.globalAlpha = 1.0;

    return { page: pageNumber, src: canvas.toDataURL("image/webp") };
  };

  return (
    <div className="relative lg:w-[95%] mx-auto text-center">
      {loading ? (
        <div
          className="radial-progress text-moit head-topic"
          style={{ "--value": `${progress}`, "--size": "10rem", "--thickness": "1rem" } as any}
          aria-valuenow={progress}
          role="progressbar"
        >
          กำลังโหลด..{progress}%
        </div>
      ) : images.length > 0 ? (
        <div>
          {images.map(({ page, src }, index) => (
            <div key={page} className="relative">
              <div className="divider text-gray-500 lg:my-2 max-lg:my-[0.25rem] text-[0.75rem]">
                หน้า {page}
              </div>
              <img
                className="box-shadows-5"
                src={src}
                alt={`Page ${page}`}
                width="100%"
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
              {index === images.length - 1 && (
                <div className="flex justify-between mt-4">
                  <div className="font-thin">
                    <div className="txt-credit-moit">โดย. {makeBy}</div>
                    <div className="txt-count-view text-gray-600 text-left">
                      <i className="ri-eye-line"></i> จำนวนเข้าชม {view} ครั้ง
                    </div>
                  </div>
                  <DownloadmoitBtn id={String(id)} countDownload={String(download)} year={year} />
                </div>
              )}
            </div>
          ))}
          
          {numPages > 10 && loadedPages <= numPages && (
            <button
              className="btn btn-primary mt-4"
              onClick={() => setLoadedPages((prev) => prev + 1)}
            >
              โหลดหน้าถัดไป
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <span className="loading loading-dots loading-xl"></span>
          <div className="font-bold text-moit">กำลังโหลด....</div>
        </div>
      )}
    </div>
  );
};

export default Pdfjs;
