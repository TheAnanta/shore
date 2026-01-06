"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getEventCategories } from "@/lib/api";

export default function WhatToExpect() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getEventCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <section className="w-full bg-white py-20 text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 uppercase">What to Expect at Shore '26</h2>
          <p className="text-gray-500 mb-12">Get ready for an immersive experience like never before.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((item, index) => (
              <div key={index}>
                <div className="relative h-64 w-full bg-gray-200 mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <Image width={512} height={512} src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold uppercase mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-black py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 uppercase">Register now</h2>
          <p className="text-gray-500 mb-12">Get ready for an immersive experience like never before.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.filter((e) => e.slug).map((item, index) => (
              <Link aria-disabled={!item.slug} href={`/events?q=` + item.slug} key={index} className={!item.slug ? 'pointer-events-none' : 'cursor-pointer'}>
                <div className="relative h-64 w-full bg-gray-200 mb-4 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <Image width={512} height={512} src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 p-6 pt-16 bg-linear-to-t from-black to-transparent w-full">
                    <h3 className="text-xl font-bold uppercase mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-300/80">{item.description}</p>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
