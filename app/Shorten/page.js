"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

const Shorten = () => {
    const [url, setUrl] = React.useState("");
    const [shortUrl, setShortUrl] = React.useState("");
    const [generated, setGenerated] = React.useState("");
    const handleChange = (e) => {
        setUrl(e.target.value);
    }
    const generate = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shortUrl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUrl("");
                setShortUrl("");

                console.log(result)
                alert(result.message);
                setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`);


            })
            .catch((error) => console.error(error));
    }
    return (
        <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg'>
            <h1 className='font-extrabold text-2xl p-2 text-center'>Generate your short URLs</h1>
            <div className='flex flex-col'>
                <input type="text"
                    value={url}
                    placeholder='Enter your URL here'
                    onChange={e => { setUrl(e.target.value); }}
                    className='border-2 border-gray-300 bg-white rounded-2xl text-center p-2 w-full' />
                <input type="text"
                    value={shortUrl}
                    placeholder='Enter your preferred short URL text'
                    className='border-2 bg-white rounded-2xl text-center border-gray-300  p-2 w-full mt-3'
                    onChange={e => { setShortUrl(e.target.value); }} />
                <button onClick={generate}
                    className='bg-purple-900 rounded-lg shadow-lg p-3 m-5 mx-37 py-2 font-abold  text-white mt-3'>Shorten</button>
            </div>

            {generated && <><span>
                YOUR LINK: </span><code><Link href={generated} target="_blank" className='text-blue-500 underline'>
                    {generated}
                </Link>
                </code></>}

        </div>
    )
}

export default Shorten
