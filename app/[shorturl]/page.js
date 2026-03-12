import { redirect, notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const shorturl = (await params).shorturl;

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("links");

  const doc = await collection.findOne({ shorturl: shorturl });

  if (doc) {
    redirect(doc.url);
  } else {
    notFound();
  }
}