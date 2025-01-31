import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <>
      <footer className="relative left-0 bottom-0 py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 px-4 sm:px-20">
        {/* Copyright Text */}
        <section className="text-lg sm:text-base text-center sm:text-left mb-4 sm:mb-0">
          Copyright {year} | All rights reserved
        </section>

        {/* Social Media Icons */}
        <section className="flex items-center justify-center gap-5 text-2xl sm:text-3xl text-white">
          <a
            href="https://www.facebook.com"
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            <BsFacebook />
          </a>
          <a
            href="https://www.instagram.com"
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            <BsInstagram />
          </a>
          <a
            href="https://www.linkedin.com"
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://www.twitter.com"
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            <BsTwitter />
          </a>
        </section>
      </footer>
    </>
  );
}

export default Footer;
