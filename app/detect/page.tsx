"use client";

import Bars from "@/app/assets/Bars.svg";
import Crack from "@/app/assets/Crack.svg";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Detect() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data.result);
    } catch (error) {
      console.error("Error uploading the image", error);
      setResult("Error processing the image");
    } finally {
      setLoading(false);
    }
  };

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
          onChange={handleImageUpload}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-full mt-20 px-6 py-3 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors font-sans text-lg font-thin"
        >
          📎 Upload a file
        </label>
      </div>

      {preview && (
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-sans gradient-custom text-lg font-semibold mb-2">
            Image Preview:
          </h2>
          <img
            src={preview}
            alt="Image Preview"
            className="w-60 h-60 object-cover"
          />

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-2 bg-blue-500 font-sans text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            {loading ? "Submitting..." : "Submit for Detection"}
          </button>
        </div>
      )}

      {result && (
        <div className="flex justify-center mt-6">
          <h3 className="font-sans gradient-custom text-2xl font-semibold">
            {result}
          </h3>
        </div>
      )}
    </div>
  );
}
