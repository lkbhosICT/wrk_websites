import Banner from "./Banner"
const Bannerdata = async () => {
    const Apikey =process.env.API_FIRST_KEY
    const UrlApi = process.env.URL_API_NEXT
     try{
       const bannerRes = await fetch(`${UrlApi}banner`,{
        method: "GET",
        cache: 'no-store',
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Apikey}`,
        }
        })

        if(!bannerRes.ok){
            throw new Error("Failed to fetch data");
        }
        
        const bannerData = await bannerRes.json()
         return <Banner bannerData={bannerData[0]}/>

     }catch(err){
        console.error("Error fetching data:", err);
        return <div>Failed to load navigation data.</div>;
     }
}
export default Bannerdata