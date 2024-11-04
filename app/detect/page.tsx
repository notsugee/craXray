"use client";

import Bars from "@/app/assets/Bars.svg";
import Crack from "@/app/assets/Crack.svg";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

export default function Detect() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [grayscaleImage, setGrayscaleImage] = useState<string | null>(null);
  const [binaryImage, setBinaryImage] = useState<string | null>(null);
  const [contourImage, setContourImage] = useState<string | null>(null);
  const [boundingBoxImage, setBoundingBoxImage] = useState<string | null>(null);

  const [crackDepth, setCrackDepth] = useState<string | null>(null);
  const [crackRatio, setCrackRatio] = useState<string | null>(null);
  const [predictedGrowth, setPredictedGrowth] = useState<string | null>(null);
  const [numDays, setNumDays] = useState<number>(30);

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
    formData.append("num_days", String(numDays));

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response Data:", response.data); // Log full response

      setResult(response.data.result || "No result provided");

      setGrayscaleImage(response.data.data.grayscale_image || "");
      setBinaryImage(response.data.data.binary_image || "");
      setContourImage(response.data.data.contour_image || "");
      setBoundingBoxImage(response.data.data.bounding_box_image || "");

      // Rounding each value to two decimal places
      setCrackDepth(
        response.data.analysis?.estimated_depth_mm
          ? parseFloat(response.data.analysis.estimated_depth_mm).toFixed(2)
          : "N/A"
      );
      console.log(
        "Estimated Depth:",
        response.data.analysis?.estimated_depth_mm
      );

      setCrackRatio(
        response.data.analysis?.crack_ratio
          ? parseFloat(response.data.analysis.crack_ratio).toFixed(2)
          : "N/A"
      );
      console.log("Crack Ratio:", response.data.analysis?.crack_ratio);

      setPredictedGrowth(
        response.data.analysis?.predicted_growth_mm
          ? parseFloat(response.data.analysis.predicted_growth_mm).toFixed(2)
          : "N/A"
      );
      console.log(
        "Predicted Growth:",
        response.data.analysis?.predicted_growth_mm
      );
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

          <div className="max-w-20">
            <Input
              type="number"
              value={numDays}
              onChange={(e) => setNumDays(Number(e.target.value))}
              className="mt-4 px-4 py-2 border rounded"
              placeholder="Enter number of days for prediction"
            />
          </div>

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

      <div className="flex flex-col items-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {grayscaleImage && (
            <div className="mt-6">
              <h4 className="ml-3">Grayscale Image</h4>
              <img
                src={`data:image/png;base64,${grayscaleImage}`}
                alt="Grayscale"
                className="w-60 h-60 object-cover scale-125"
                style={{ clipPath: "inset(12% 10% 12% 14%)" }}
              />
            </div>
          )}

          {binaryImage && (
            <div className="mt-6">
              <h4 className="ml-3">Binary Image</h4>
              <img
                src={`data:image/png;base64,${binaryImage}`}
                alt="Binary"
                className="w-60 h-60 object-cover scale-125"
                style={{ clipPath: "inset(12% 10% 12% 14%)" }}
              />
            </div>
          )}

          {contourImage && (
            <div className="mt-6">
              <h4 className="ml-3">Contour Image</h4>
              <img
                src={`data:image/png;base64,${contourImage}`}
                alt="Contour"
                className="w-60 h-60 object-cover scale-125"
                style={{ clipPath: "inset(12% 10% 12% 14%)" }}
              />
            </div>
          )}

          {boundingBoxImage && (
            <div className="mt-6">
              <h4 className="ml-3">Bounding Box Image</h4>
              <img
                src={`data:image/png;base64,${boundingBoxImage}`}
                alt="Bounding Box"
                className="w-60 h-60 object-cover scale-125"
                style={{ clipPath: "inset(12% 10% 12% 14%)" }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        {crackDepth && (
          <div className="mt-6">
            <h4>Estimated Crack Depth: {crackDepth} mm</h4>
          </div>
        )}
        {crackRatio && (
          <div className="mt-6">
            <h4>Crack-to-Image Ratio: {crackRatio}</h4>
          </div>
        )}
        {predictedGrowth && (
          <div className="mt-6">
            <h4>Predicted Crack Growth: {predictedGrowth} mm</h4>
          </div>
        )}
      </div>
    </div>
  );
}
