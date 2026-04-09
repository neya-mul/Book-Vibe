import React from 'react'
import banner from "../assets/pngwing 1.png"

export default function Banner() {
    return (
        <div className="hero bg-base-200 min-h-[70vh] rounded-2xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={banner}
                    className="max-w-sm rounded-lg"
                />
                <div className='space-y-7'>
                    <h1 className="text-5xl font-bold">Books to freshen up <br /> your bookshelf</h1>

                    <button className="btn btn-success text-white">View the List</button>
                </div>
            </div>
        </div>
    )
}
