import { Avatar, Box, Button } from "@mui/material";
// import Navbar from "../components/Navbar";
import gsap from "gsap";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>

      {/* <Navbar /> */}

      <div className="bg-white">
        <header className="bg-[#FCF8F1] bg-opacity-30">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                  <img className="w-auto h-20" src="/logo.png" alt="" />
                </a>

              </div>

              <button
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8h16M4 16h16"></path>
                </svg>

                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <a
                href="#"
                title=""
                className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-[#593C8F] hover:text-white focus:text-black focus:bg-blue-300 font-semibold text-white bg-black rounded-full"
                role="button">
                {" "}
                Create List{" "}
              </a>
            </div>
          </div>
        </header>

        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                  IT'S THAT TIME OF THE YEAR
                </p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                  Creating wishlists, just got easier.
                </h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                  Create an amazing list of gifts.
                </p>

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                  role="button">
                  Get Gifting!
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <img className="w-full" src="/public/giftbox.webp" alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* cards  */}

      <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div class="grid grid-cols-1 mt-12 lg:mt-24 gap-y-12 md:grid-cols-3 gap-x-6">
          <div class="md:px-4 lg:px-10">
            <img class="-rotate-1" src="/wavy_list.jpg" alt="" />
            <h3 class="mt-8 text-xl font-semibold leading-tight text-black">Card 1</h3>
            <p class="mt-4 text-base text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </p>
          </div>

          <div class="md:px-4 lg:px-10">
            <img class="rotate-1" src="/wish_list.png" alt="" />
            <h3 class="mt-8 text-xl font-semibold leading-tight text-black">Card 2</h3>
            <p class="mt-4 text-base text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </p>
          </div>

          <div class="md:px-4 lg:px-10">
            <img class="-rotate-1" src="/mail_friends.png" alt="" />
            <h3 class="mt-8 text-xl font-semibold leading-tight text-black">Card 3</h3>
            <p class="mt-4 text-base text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </p>
          </div>
        </div>
      </section>

      <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="lg:max-w-3xl">
            <h2 class="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              What our users are saying..
            </h2>

            <div class="mt-20">
              <blockquote>
                <p class="text-2xl leading-relaxed text-black md:leading-relaxed md:text-3xl">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos,
                  omnis explicabo tempore sint nihil corrupti fuga impedit optio
                  architecto nulla vitae inventore rerum esse, at blanditiis deserunt ea,
                  et exercitationem?
                </p>
              </blockquote>
              <div class="flex items-center mt-16">
                <p class="text-lg font-semibold text-black">Moses Adebayo</p>
              </div>
            </div>

            <div class="flex items-center mt-12 space-x-4">
              <div class="flex items-center justify-center w-24 h-24 rounded-full ring-2 ring-fuchsia-600">
                <img
                  class="object-cover w-20 h-20 rounded-full"
                  src="/avatar-2.jpg"
                  alt=""
                />
              </div>

              <div class="flex items-center justify-center w-24 h-24 rounded-full ring-2 ring-transparent">
                <img
                  class="object-cover w-20 h-20 rounded-full"
                  src="/avatar-2.jpg"
                  alt=""
                />
              </div>

              <div class="flex items-center justify-center w-24 h-24 rounded-full ring-2 ring-transparent">
                <img
                  class="object-cover w-20 h-20 rounded-full"
                  src="/avatar-2.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA  */}
      <center classNameName="py-5">
        <Button
          component={Link}
          to={"/create-list"}
          size="large"
          className="z-10 inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
          variant="contained">
          Create List
        </Button>

        {/* end cta  */}
      </center>
      <Footer />
    </div>
  );
};

export default Home;
