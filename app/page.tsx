import Bars from "@/app/assets/Bars.svg";
import Crack from "@/app/assets/Crack.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden z-500">
      <section className="mb-40">
        <div className="container flex flex-col justify-center mx-auto">
          <div className="absolute scale-[250%] left-0 top-0 -rotate-45 opacity-25 -z-[2000]">
            <Image src={Crack} alt="Crack" className="bg-blend-color-dodge" />
          </div>
          <div className="absolute scale-[250%] right-0 bottom-80 rotate-45 opacity-25 -z-[2000]">
            <Image src={Crack} alt="Crack" className="bg-blend-multiply" />
          </div>
          <div>
            <h1 className="text-7xl font-sans leading-snug font-semibold max-w-xl mt-40 mb-20 gradient-custom ml-56">
              Surface Crack Detection
            </h1>
          </div>
          <div className="flex justify-center">
            <Image src={Bars} alt="Bars" />
          </div>
        </div>
        <div className="flex justify-center ">
          <Button
            variant="outline"
            asChild
            className="rounded-full scale-150 mt-20"
          >
            <Link href="/detect" className="font-sans font-thin">
              Get started
            </Link>
          </Button>
        </div>
      </section>
      <section className="mb-20">
        <div className="container flex justify-center items-center mx-auto">
          <Card className="max-w-3xl backdrop-blur bg/black/20 shadow-inner shadow-slate-400 hover:shadow-slate-200 transition duration-300">
            <CardHeader className="font-sans font-bold uppercase tracking-wider text-3xl gradient-custom">
              Purpose
              <div className="flex justify-start mt-2">
                <hr className="border-t-2 border-blue-500 w-[152px]" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="gradient-custom">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsu
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
