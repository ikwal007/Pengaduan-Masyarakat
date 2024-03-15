import React from "react";
import Typography from "../Atoms/Typography";
import { IoLogoGithub, IoLogoInstagram } from "react-icons/io5";
import GlobalLink from "../Atoms/GlobalLink";

const Footer = () => {
    const author = import.meta.env.VITE_AUTHOR;
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer items-center p-4 bg-white dark:bg-gray-800 rounded-t-xl">
            <div className="items-center grid-flow-col">
                <Typography tag="p">
                    &copy; {currentYear} {author}. All Rights Reserved.
                </Typography>
            </div>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href="https://github.com/ikwal007">
                    <IoLogoGithub className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/ikwal_coder">
                    <IoLogoInstagram className="w-6 h-6" />
                </a>
            </nav>
        </footer>
    );
};

export default Footer;
