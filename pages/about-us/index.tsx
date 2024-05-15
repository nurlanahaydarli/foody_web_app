import React from "react";
import MainLayout from '../../shared/components/admin/Layout/MainLayout'
import Image from "next/image";



function AboutUs() {
  

  return (
    <>
      <MainLayout>
        <main className="">
          <section className=" flex flex-wrap py-8 md:py-[110px] mx-auto gap-[60px]  justify-center xxl:justify-between">
            <div
                data-aos="fade-right"
                className="max-w-[565px] flex flex-col gap-8 ml-8"
            >
              <p className="font-mukta text-[45px] font-semibold leading-8 tracking-tight ">
                About Us
              </p>
              <p className=" text-[#828282] font-roboto text-[20px] font-medium leading-7 tracking-tight">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and visual
                mockups.Lorem ipsum is placeholder text commonly used in the
                graphic, print, and publishing industries for previewing layouts
                and visual mockups.Lorem ipsum is placeholder text commonly used
                in the graphic, print, and publishing industries for previewing
                layouts and visual mockups.
              </p>
            </div>
            <div
                data-aos="fade-left"
                className=" relative w-[634px] h-[789px] mr-[50px] "
            >
              <Image
                  width={680}
                  className=""
                  height={407}
                  src={"/aboutUsYellow.svg"}
                  alt="yellow-bg"
              />

              <Image
                  width={274}
                  className=" mx-auto absolute top-[-10px] left-[330px] "
                  height={174}
                  src={"/AboutUsHamburger.svg"}
                  alt="yellow-bg"
              />
              <Image
                  width={274}
                  className=" mx-auto absolute top-[195px] left-[50px] "
                  height={174}
                  src={"/aboutUsPizza.svg"}
                  alt="yellow-b"
              />
              <Image
                  width={274}
                  className=" mx-auto absolute top-[375px]  right-0"
                  height={174}
                  src={"/aboutUsSoup.svg"}
                  alt="yellow-bg"
              />
              <Image
                  width={274}
                  className=" mx-auto absolute  bottom-[0px] left-0"
                  height={174}
                  src={"/aboutUsCoffe.svg"}
                  alt="yellow-bg"
              />
            </div>
          </section>
        </main>
      </MainLayout>
    </>
  );
};

export default AboutUs;
