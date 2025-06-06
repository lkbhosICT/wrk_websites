export async function GET() {
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

    const response = await fetch(`${URL_API}logo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ex_apikey}:${ex_signature}`
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch logo" }), { status: 500 });
    }

    const data = await response.json();
    return Response.json(data);

  } catch (err) {
    console.error("Error fetching logo:", err);
    return new Response(JSON.stringify({ error: "Unexpected error occurred" }), { status: 500 });
  }
}
