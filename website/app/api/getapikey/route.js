export async function GET() {
  const apiKey = process.env.API_SECRET_KEY; 
  const api_secon_Key = process.env.API_SECON_KEY; 
  const uuidResponse = await fetch("http://10.10.5.1:5000/api/apikey",{
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

  const response = await fetch("http://10.10.5.1:5000/api/product", { 
        method: "GET",
        cache: "no-store" ,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${uuidKey}`
        }
      });
    const data = await response.json();

    return Response.json(data);

}