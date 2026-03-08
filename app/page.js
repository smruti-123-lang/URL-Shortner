import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className=" flex flex-col justify-center items-centre gap-5 p-15 m-3">
          <p className="font-bold text-3xl text-center">The Best URL Shortener....</p>
          <p className="text-1xl text-center">We are the Best In the Market. We understand your needs..We are Easy to use...</p>
          <p className='flex gap-3 justify-center'>
                <Link href ="/Shorten"><button className='bg-purple-900 rounded-lg shadow-lg p-3 py-2 font-bold text-white'>Try Now</button></Link>
                <Link href ="/github"><button className='bg-purple-900 rounded-lg shadow-lg p-3 py-2 font-bold text-white'>Github</button></Link>

            </p>
        </div>
        <div className=" flex justify-start relative">
          <Image className="mix-blend-darken" alt =" Image of an vector" src="/vector2.jpg"   fill={true}></Image>

        </div>

      </section>
    </main>
  );
}
