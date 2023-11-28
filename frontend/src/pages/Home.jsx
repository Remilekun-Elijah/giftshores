import { Avatar, Box, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const text = [
    "Create an amazing list of gifts you want",
    "copying the emails of friends you want to",
    "send them to in a very easy and convenient way.",
  ];

  return (
    <div>
      <Navbar />

      <main className="mt-16">
        <div className="text-center py-0 bg-[#eee]">
          <div
            style={{ borderBottom: "1px solid purple" }}
            className="flex shadow- items-center py-10 bg-white text-center justify-around flex-wrap lg:rounded-br-[100px] lg:rounded-bl-[100px] sm:rounded-br-[40px] sm:rounded-bl-[40px] rounded-bl-[30px] rounded-br-[30px]"
          >
            <Avatar
              src="/wavy_list.jpg"
              alt=""
              sx={{
                height: { lg: "100px", sm: "100px", xs: "50px" },
                width: { md: "100px", sm: "100px", xs: "50px" },
              }}
            />
            <div>
              <h1 className="lg:text-3xl md:text-2xl sm:text-lg font-[700] text-lg uppercase">
                Creating wish list
              </h1>
              <h1 className="lg:text-3xl md:text-2xl sm:text-lg font-[700] text-lg uppercase">
                Just got easier
              </h1>
            </div>
            <Avatar
              src="/wavy_list.jpg"
              alt=""
              sx={{
                height: { lg: "100px", sm: "100px", xs: "50px" },
                width: { md: "100px", sm: "100px", xs: "50px" },
              }}
            />
          </div>
          <center className="py-5">
            <Button
              component={Link}
              to={"/create-list"}
              size="large"
              sx={{
                px: 10,
                py: 2,
                background: "linear-gradient(to right, purple, #E491E8)",
              }}
              color="error"
              className="z-10 px-10"
              variant="contained"
            >
              Create List
            </Button>
          </center>

          <div className="text-center mt-10 py-10 px-3 flex flex-col items-center">
            <div className="flex items-center flex-wrap justify-center md:gap-10 gap-0">
              <img
                src="/wish_list.png"
                alt=""
                width={"300px"}
                height={"300px"}
              />
              <div className="text-lg">
                {text.map((a) => (
                  <p key={a}>{a}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center flex-wrap justify-center md:gap-10 gap-0 md:my-0 my-10">
              <div className="text-lg order-1 md:order-none">
                {text.map((a) => (
                  <p key={a}>{a}</p>
                ))}
              </div>
              <img
                src="/mail_friends.png"
                alt=""
                width={"300px"}
                height={"300px"}
              />
            </div>

            <div className="flex items-center flex-wrap justify-center md:gap-10 gap-0">
              <img
                src="/gift_friend.png"
                alt=""
                width={"300px"}
                height={"300px"}
              />
              <div className="text-lg">
                {text.map((a) => (
                  <p key={a}>{a}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <center className="py-5">
          <Button
            component={Link}
            to={"/create-list"}
            size="large"
            sx={{ background: "linear-gradient(to right, purple, #E491E8)" }}
            color="error"
            className="z-10"
            variant="contained"
          >
            Create List
          </Button>
        </center>
        <section className="bg-[#8D83B3] hidden py-10 text-white text-center px-3">
          <h2 className="lg:text-3xl md:text-2xl sm:text-lg text-lg">
            {" "}
            What Users are saying
          </h2>

          <div className="flex justify-center items-center mt-10 flex-wrap">
            <div className="max-w-[400px] sm:mr-10">
              <div className="flex items-center">
                <Avatar
                  sx={{
                    background: "linear-gradient(to right, purple, #E491E8)",
                    border: "1px solid purple",
                  }}
                >
                  AO
                </Avatar>
                <p className="text-lg uppercase ml-5">Abayomi Oluga</p>
              </div>
              <Box sx={{ borderLeft: "2px solid purple", ml: 2.5 }}>
                <p className="ml-10 text-left py-5">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
                  tenetur odio exercitationem libero voluptatibus impedit
                  sapiente reiciendis non laudantium ut at facere incidunt
                  perspiciatis, in quos temporibus? Error, fuga velit.
                </p>
              </Box>
            </div>

            <div className="max-w-[400px] sm:mr-10">
              <div className="flex items-center">
                <Avatar
                  sx={{
                    background: "linear-gradient(to right, purple, #E491E8)",
                    border: "1px solid purple",
                  }}
                >
                  OO
                </Avatar>
                <p className="text-lg uppercase ml-5">Olumide Oluga</p>
              </div>
              <Box sx={{ borderLeft: "2px solid purple", ml: 2.5 }}>
                <p className="ml-10 text-left py-5">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
                  tenetur odio exercitationem libero voluptatibus impedit
                  sapiente reiciendis non laudantium ut at facere incidunt
                  perspiciatis, in quos temporibus? Error, fuga velit.
                </p>
              </Box>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
