"use client";

import Bars from "@/app/assets/Bars.svg";
import Crack from "@/app/assets/Crack.svg";
import Image from "next/image";

export default function Detect() {
  return (
    <div className="relative overflow-x-clip">
      <div className="container flex flex-col justify-center mx-auto">
        <div className="absolute scale-[250%] left-0 top-0 -rotate-45 opacity-25 -z-[2000]">
          <Image src={Crack} alt="Crack" className="bg-blend-color-dodge" />
        </div>
        <div className="absolute scale-[250%] right-0 bottom-80 rotate-45 opacity-25 -z-[2000]">
          <Image src={Crack} alt="Crack" className="bg-blend-multiply" />
        </div>
        <div>
          <h1 className="text-7xl font-sans leading-snug font-semibold max-w-xl mt-40 gradient-custom ml-56">
            Detect
          </h1>
        </div>
        <div className="flex justify-center">
          <Image src={Bars} alt="Bars" />
        </div>
      </div>
      <div className="flex justify-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(e) => console.log(e.target.files)}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-full mt-20 px-6 py-3 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors font-sans text-lg font-thin"
        >
          📎 Upload a file
        </label>
      </div>
    </div>
  );
}
