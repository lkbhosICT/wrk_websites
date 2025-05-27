import Footpage from "./Footpage";
const FootpageData = async () => {
    const apiKey = process.env.API_FIRST_KEY ?? "";
    const urlApi = process.env.URL_API_NEXT ?? "";
    
    if (!apiKey || !urlApi) {
        console.error("Missing API key or URL in environment variables.");
        return <div>Server configuration error.</div>;
    }

    const urlImg1 = `${urlApi}geturl/call_phone.png`;
    const urlImg2 = `${urlApi}geturl/tell.png`;
    const urlImg3 = `${urlApi}geturl/rss.png`;
    const urlImg4 = `${urlApi}geturl/loca.png`;

    try{
        const [url1 ,url2 ,url3, url4] = await Promise.all([
            fetch(`${urlImg1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
              }),
              fetch(`${urlImg2}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
              }),
              fetch(`${urlImg3}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
              }),
              fetch(`${urlImg4}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
              }),
        ])
        if (!url1.ok || !url2.ok || !url3.ok || !url4.ok) {
            throw new Error(`Failed to fetch data, Status: ${url1.status} || ${url2.status} || ${url3.status} || ${url4.status}`);
        }
        const [urlData1, urlData2,urlData3 ,urlData4] = await Promise.all([
            url1.json(),
            url2.json(),
            url3.json(),
            url4.json(),
          ])
         return <Footpage url1={urlData1} url2={urlData2} url3={urlData3} url4={urlData4}/>
      }catch(err){
         console.error("Error fetching data:", err);
         return <div>Failed to load navigation data.</div>;
      }

}
export default FootpageData