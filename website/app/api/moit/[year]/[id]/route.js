import mongoose from "mongoose";


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
        const update_view = await fetch(`${URL_API}moit/update-view/${id}`, { 
          method: "PUT",
          cache: "no-store" ,
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${uuidKey}`
          }
        });
        if(!update_view.ok){
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
            console.error("Error fetching menu:", error);
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
            console.error("Error fetching menu:", error);
            return new Response(JSON.stringify({ error: "Failed to fetch menu data" }), { status: 500 });
        }
  }