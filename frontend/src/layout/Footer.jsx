import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
import Logo from "../components/Logo";
export default function FooterCom() {
  return (
    <Footer container className="border">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Logo />
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tarbiya Tales
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Contact Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="mailto:sabahalmel7@gmail.com">
                  Email
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/sabahAlmel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/sabah-almel"
                  target="_blank"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Sabah Almel"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="https://github.com/sabahAlmel" icon={BsGithub} />
            <Footer.Icon
              href="https://www.linkedin.com/in/sabah-almel"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
