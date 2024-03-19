import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsEnvelope,
  BsPhone,
} from "react-icons/bs";
import Logo from "../components/Logo";
export default function FooterCom() {
  return (
    <Footer container className="border">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between flex-wrap">
          <div className="mt-5">
            <Logo />
          </div>
          <div className="mb-10 md:mb-0">
            <Footer.Title title="Quick Links" />
            <Footer.LinkGroup col>
              <Footer.Link href="/">Home</Footer.Link>
              <Footer.Link href="/about">Tarbiya Tales</Footer.Link>
              <Footer.Link href="/search">Search</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="mb-10 md:mb-0">
            <Footer.Title title="Contact Us" />
            <Footer.LinkGroup col>
              <div>
                <div className="flex gap-3 items-center">
                  <Footer.Icon
                    href="mailto:sabahalmel7@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={BsEnvelope}
                  />{" "}
                  <Footer.Link
                    href="mailto:sabahalmel7@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email
                  </Footer.Link>
                </div>
              </div>
              <div>
                <div className="flex gap-3 items-center">
                  <Footer.Icon
                    href=" https://wa.me/+9613314520"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={BsPhone}
                  />
                  <Footer.Link
                    href=" https://wa.me/+9613314520"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Phone
                  </Footer.Link>
                </div>
              </div>
            </Footer.LinkGroup>
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
            <Footer.Icon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsInstagram}
            />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon
              href="https://github.com/sabahAlmel"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/sabah-almel"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
