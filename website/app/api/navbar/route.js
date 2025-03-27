export async function GET() {
    const apiKey = process.env.API_SECRET_KEY; 
    const api_secon_Key = process.env.API_SECON_KEY; 
    const URL_API = process.env.URL_API_LINK;
    const uuidResponse = await fetch(`${URL_API}apikey`,{
       method: "GET",
       cache: "no-store",
       headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "lkbhos-api-key": `${api_secon_Key}`
       }
      }
      )
      if (!uuidResponse.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch API Key" }), { status: 500 });
      }
      
      const uuidData = await uuidResponse.json(); 
      const uuidKey = uuidData.apiKey; 
      if (!uuidKey) {
        return new Response(JSON.stringify({ error: "Invalid API Key" }), { status: 500 });
      }
      try {
    const response = await fetch(`${URL_API}menu`, { 
          method: "GET",
          cache: "no-store" ,
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${uuidKey}`
          }
        });
      if(!response){
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
      }
      const data = await response.json();
      
      return Response.json(data);
    }catch(err){
        console.error("Error fetching menu:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch menu data" }), { status: 500 });
    }
  }