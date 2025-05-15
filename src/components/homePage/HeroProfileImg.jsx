import React from "react";
import Image from "next/image";
import Employe34 from "@/assets/homePage/Employe34.png";
import Employe23 from "@/assets/homePage/Employe23.png";
import Employe12 from "@/assets/homePage/Employe12.png";
import Employe45 from "@/assets/homePage/Employe45.png";
import Employe56 from "@/assets/homePage/Employe56.png";
const HeroProfileImg = () => {
  return (
    <section className=" mt-5 sm:mx-0 mx-2 xl:mt-14 lg:mb-32 2xl:mb-0 mb-10">
      <div className="max-w-[1520px]  xl:mx-auto mx-0 px-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-6 justify-items-center items-end">
          <div className="relative  lg:top-28 2xl:end-10 ">
            <Image
              src={Employe34}
              alt="Employee 1 "
              className="rounded-xl  xl:w-[104px] xl:h-[104px] shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)]  object-cover"
            />
          </div>

          <div className="relative  lg:top-0 2xl:end-20">
            <Image
              src={Employe23}
              alt="Employee 2"
              className="rounded-xl object-cover  shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)]  xl:w-[180px] xl:h-[180px]"
            />
          </div>

          <div className="relative lg:top-14 2xl:top-14 ">
            <Image
              src={Employe12}
              alt="Employee 3"
              className="rounded-xl shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] "
            />
          </div>

          <div className="relative  lg:top-0 2xl:start-20">
            <Image
              src={Employe45}
              alt="Employee 4"
              className="rounded-xl object-cover  shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)]  xl:w-[180px] xl:h-[180px]"
            />
          </div>

          <div className="relative  lg:top-28 2xl:start-10">
            <Image
              src={Employe56}
              alt="Employee 5"
              className="rounded-xl xl:w-[104px] xl:h-[104px] object-end object-cover shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProfileImg;
