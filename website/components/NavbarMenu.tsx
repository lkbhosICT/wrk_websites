import Navbar  from "./Navbar";
const NavbarMenu = async () => {
  const Apikey =process.env.API_FIRST_KEY
  const UrlApi = process.env.URL_API_LINK
  try{
    const [navbarRes, logoRes ] = await Promise.all([
        fetch(`${UrlApi}navbar`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Apikey}`,
            }
        }),

        fetch(`${UrlApi}logo`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Apikey}`,
            }
        })
    ]) 
     if(!navbarRes.ok || !logoRes.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const [navbarData, logoData] = await Promise.all([
        navbarRes.json(),
        logoRes.json(),
      ]);
  
      return <Navbar dataLogos={logoData} datanavbars={navbarData} />;
  }catch(err){
    console.error("Error fetching data:", err);
    return <div>Failed to load navigation data.</div>;
  }
  
}
export default NavbarMenu