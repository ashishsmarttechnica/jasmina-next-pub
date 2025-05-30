import Poplur1 from "@/assets/homePage/Poplur1.png";
import Poplur2 from "@/assets/homePage/Poplur2.png";
import Poplur3 from "@/assets/homePage/Poplur3.png";
import Poplur4 from "@/assets/homePage/Poplur4.png";
import Poplur5 from "@/assets/homePage/Poplur5.png";
import MainTitle from "@/common/MainTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Popular = () => {
  const t = useTranslations("HomePage");
  return (
    <div>
      <div className="py-10">
        <div className="container mx-auto">
          <MainTitle title={t("popular.title")} subTitle={t("popular.subtitle")} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5">
            <div className="">
              <Image src={Poplur5} alt="" width={250} height={200} />
              <h5 className="py-2 text-center text-lg">{t("popular.popular1.title")} </h5>
            </div>
            <div className="">
              <Image src={Poplur2} alt="" width={250} height={200} />
              <div className="">
                <h5 className="py-2 text-center text-lg">{t("popular.popular2.title")} </h5>
              </div>
            </div>
            <div className="">
              <Image src={Poplur3} alt="" width={250} height={200} />
              <h5 className="py-2 text-center text-lg">{t("popular.popular3.title")} </h5>
            </div>
            <div className="">
              <Image src={Poplur4} alt="" width={250} height={200} />
              <h5 className="py-2 text-center text-lg">{t("popular.popular4.title")} </h5>
            </div>
            <div className="">
              <Image src={Poplur1} alt="" width={250} height={200} />
              <h5 className="py-2 text-center text-lg">{t("popular.popular5.title")} </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
