export async function GET() {
  try {
    const apiKey = process.env.API_SECRET_KEY;
    const api_secon_Key = process.env.API_SECON_KEY;

    if (!apiKey || !api_secon_Key) {
      return new Response(JSON.stringify({ error: "Missing API Keys" }), { status: 500 });
    }

    const uuidResponse = await fetch("http://10.10.5.2:8081/api/getapikey", {
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

    return new Response(JSON.stringify({
      apiKey: uuidData.apiKey,
      signature: uuidData.signature
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Unexpected error", details: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
