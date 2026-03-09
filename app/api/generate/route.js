import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, shorturl } = body;

    if (!url || !shorturl) {
      return new Response(JSON.stringify({
        message: "URL and short URL are required",
        success: false,
        error: true
      }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("links");

    // Check if short URL already exists
    const existing = await collection.findOne({ shorturl });
    if (existing) {
      return new Response(JSON.stringify({
        message: "Short URL already exists",
        success: false,
        error: true
      }), { status: 409 });
    }

    // Insert new short URL
    await collection.insertOne({
      url,
      shorturl,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({
      message: "Short URL generated successfully",
      success: true,
      error: false
    }), { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(JSON.stringify({
      message: "Internal server error",
      success: false,
      error: true
    }), { status: 500 });
  }
}