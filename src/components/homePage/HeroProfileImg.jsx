import Employe12 from "@/assets/homePage/Employe13.png";
import Employe23 from "@/assets/homePage/Employe23.png";
import Employe34 from "@/assets/homePage/Employe34.png";
import Employe45 from "@/assets/homePage/Employe50.png";
import Employe56 from "@/assets/homePage/Employe56.png";

import Image from "next/image";
const HeroProfileImg = () => {
  return (
    <section className="mx-2 mt-5 mb-10 sm:mx-0 lg:mb-32 xl:mt-14 2xl:mb-0">
      <div className="mx-0 max-w-[1520px] px-5 xl:mx-auto">
        <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-5 lg:items-end lg:gap-6">
          <div className="relative lg:top-28 2xl:end-10">
            <Image
              src={Employe34}
              alt="Employee 1 "
              width={104}
              height={104}
              className="h-[104px] w-[250px] rounded-xl object-cover shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] xl:h-[104px] xl:w-[104px]"
            />
          </div>

          <div className="relative lg:top-0 2xl:end-20">
            <Image
              src={Employe23}
              alt="Employee 2"
              width={180}
              height={180}
              className="h-[104px] w-[250px] rounded-xl object-cover shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] xl:h-[180px] xl:w-[180px]"
            />
          </div>

          <div className="relative lg:top-14 2xl:top-14">
            <Image
              src={Employe12}
              alt="Employee 3"
              width={250}
              height={250}
              className=" rounded-xl shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)]"
            />
          </div>

          <div className="relative lg:top-0 2xl:start-20">
            <Image
              src={Employe45}
              alt="Employee 4"
              width={180}
              height={180}
              className="h-[104px] w-[250px] rounded-xl object-cover shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] xl:h-[180px] xl:w-[180px]"
            />
          </div>

          <div className="relative lg:top-28 2xl:start-10">
            <Image
              src={Employe56}
              alt="Employee 5"
              width={104}
              height={104}
              className="lg:object-end h-[104px] w-[250px] rounded-xl object-cover shadow-[0_10px_20px_rgba(0,_0,_0,_0.3)] xl:h-[104px] xl:w-[104px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProfileImg;
