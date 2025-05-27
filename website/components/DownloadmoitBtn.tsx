"use client";
import { useEffect, useState } from "react";

interface BtnMoitProps {
  id: string;
  filename: string;
  location: string;
}

const DownloadMoitBtn: React.FC<BtnMoitProps> = ({ id, filename, location }) => {
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const time = Math.floor(Date.now() / 1000);

  const apiKey = process.env.NEXT_PUBLIC_API_FIRST_KEY ?? "";
  const urlApi = process.env.NEXT_PUBLIC_URL_API_NEXT ?? "";

  useEffect(() => {
    const fetchDownloadCount = async () => {
      if (!apiKey || !urlApi) return;
      try {
        const res = await fetch(`${urlApi}download-count/${location}/${id}`, {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setDownloadCount(Number(data.download_count) || 0);
        } else {
          console.warn("⚠️ Unable to fetch download count");
        }
      } catch (error) {
        console.error("❌ Error fetching download count:", error);
      }
    };

    fetchDownloadCount();
  }, [id, location, apiKey, urlApi]);

  const handleDownload = async () => {
    if (!apiKey || !urlApi) {
      console.error("❌ Missing environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const downloadRes = await fetch(`${urlApi}download-files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ source: filename, id }),
        cache: "no-store",
      });

      if (!downloadRes.ok) throw new Error("❌ Failed to request download link.");

      const { link } = await downloadRes.json();
      if (!link) throw new Error("❌ No download link returned.");

      const countRes = await fetch(`${urlApi}download-count/${location}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        cache: "no-store",
      });

      if (countRes.ok) {
        const countData = await countRes.json();
        const updatedCount = Number(countData.download_count) || downloadCount;
        setDownloadCount(updatedCount);
      } else {
        console.warn("⚠️ Failed to update download count");
      }

      const fileRes = await fetch(link);
      const blob = await fileRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${filename.replace(/\.[^/.]+$/, "")}_${downloadCount}_${time}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Download failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col lg:max-w-[300px] max-w-[100px]">
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="relative overflow-hidden lg:px-1 w-full max-lg:max-w-max max-lg:px-5 bg-moph text-white rounded-xl border-[2px] border-white txt-btn hover:box-shadows-5 hover:text-moph hover:bg-white hover:border-moph transition-all duration-700"
      >
        <span className="inline-block transition-opacity duration-1000" key={isLoading ? 1 : 0}>
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            <span><i className="ri-download-line me-1"></i>ดาวน์โหลด</span>
          )}
        </span>
      </button>
      <div className="font-thin txt-count-view text-gray-600">
        <i className="ri-download-cloud-line"></i> ดาวน์โหลด {downloadCount} ครั้ง
      </div>
    </div>
  );
};

export default DownloadMoitBtn;
