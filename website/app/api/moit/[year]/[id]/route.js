

export async function GET(request, { params }) {
    const { year, id } = await params;

    if(!year) {
      return new Response(JSON.stringify({ error: "Year not Found" }), { status: 500 });
    }
     
    if(!id){
      return new Response(JSON.stringify({ error: "ID not Found" }), { status: 500 });
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
      
      const update_view = await fetch(`${URL_API}moit/update-view/${id}`, {
          method: "PUT",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ex_apikey}:${ex_signature}`
          }
      })

      const updatedata = await update_view.json

      if(updatedata.success == false){
        return new Response(JSON.stringify({ error: "Failed to Insert View" }), { status: 500 });
      }
      
      const response = await fetch(`${URL_API}moit/${year}/${id}`, { 
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ex_apikey}:${ex_signature}`
          }
      });
      if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch menu" }), { status: 500 });
      }
  
      const data = await response.json();
      return Response.json(data);
    }catch(err){
        console.error("Error fetching menu:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch menu data" }), { status: 500 });
    }
  }






  
  export async function PUT(request, { params }) {
    const { year, id } = await params;

    if(!year) {
      return new Response(JSON.stringify({ error: "Year not Found" }), { status: 500 });
    }
     
    if(!id){
      return new Response(JSON.stringify({ error: "ID not Found" }), { status: 500 });
    }

    const apiKey = process.env.API_SECRET_KEY; 
    const api_secon_Key = process.env.API_SECON_KEY; 
    const URL_API = process.env.URL_API_LINK;

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

      try {
        const update_download = await fetch(`${URL_API}moit/update-download/${id}`, { 
          method: "PUT",
          cache: "no-store" ,
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${uuidKey}`
          }
        });
        if(!update_download){
          return new Response(JSON.stringify({ error: "Failed to Insert View" }), { status: 500 });
        }
        const response = await fetch(`${URL_API}moit/${year}/${id}`, { 
              method: "GET",
              cache: "no-store" ,
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${uuidKey}`
              }
            });
          const data = await response.json();
      
          return Response.json(data);
        }catch(err){
            console.error("Error fetching menu:", err);
            return new Response(JSON.stringify({ error: "Failed to fetch menu data" }), { status: 500 });
        }
  }