import CryptoJS from "crypto-js";
export async function POST(request, context) {
    const body = await request.json();
    const { source, id } = body
    const secretKey = process.env.NEXT_PUBLIC_API_KEY || ""
    if (!secretKey) {
      throw new Error("Missing API key");
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const rawString = id + source + timestamp;
    const signature = CryptoJS.HmacSHA256(rawString, secretKey).toString();
    const databody = {
      id : id,
      filename: source,
      timestamp: timestamp,
      signature: signature,
    }
    const apiKey = process.env.API_SECRET_KEY; 
    const api_secon_Key = process.env.API_SECON_KEY; 
    const URL_API = process.env.URL_API_LINK;

    try {
      const uuidResponse = await fetch(`${URL_API}getapikey`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "lkbhos-api-key": `${api_secon_Key}`
        }
      });
  
      if (!uuidResponse.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch API Key" }), { status: 500 });
      }
      const uuidData = await uuidResponse.json();
      const ex_apikey = uuidData.apiKey;
      const ex_signature = uuidData.signature;

      if (!ex_apikey || !ex_signature) {
        return new Response(JSON.stringify({ error: "Missing authentication keys" }), { status: 500 });
      }
      
      const response = await fetch(`${URL_API}download`, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ex_apikey}:${ex_signature}`
          },
          body:JSON.stringify(databody)
      })
      if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch menu" }), { status: 500 });
      }
      const downloaddata = await response.json()
      console.log(downloaddata)
      return Response.json(downloaddata);

    }catch(err){
        console.error("Error fetching menu:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch menu data" }), { status: 500 });
    }

   

}

 
  