import { Footer } from "flowbite-react";
import { BsFacebook, BsLinkedin, BsHandThumbsUp } from "react-icons/bs";
import { SiTrustpilot } from "react-icons/si";

const FooterComponent = () => {
  return (
    <>
      <Footer className="mt-36 bg-primary rounded-none ">
        <div className="w-full">
          <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-3">
            <div>
              <Footer.Title title="Om Topdanmark" className="text-white" />
              <Footer.LinkGroup col className="text-secondary">
                <Footer.Link href="https://www.topdanmark.dk/om-topdanmark/">
                  Om Topdanmark
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/om-topdanmark/job-og-karriere/">
                  Job og Karriere
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/om-topdanmark/investor-relations/">
                  Investor relations
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/saadan-arbejder-vi/">
                  Sådan arbejder vi
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Kundeservice" className="text-white" />
              <Footer.LinkGroup col className="text-secondary">
                <Footer.Link href="https://www.topdanmark.dk/faa-hjaelp/kontakt-os/">
                  Kontakt os
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/fordele/">
                  Dine fordele hos os
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/faa-hjaelp/">
                  Spørgsmål og svar
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/vilkaar/">
                  Find vilkår
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Forsikringer" className="text-white" />
              <Footer.LinkGroup col className="text-secondary">
                <Footer.Link href="https://www.topdanmark.dk/forsikringer/">
                  Alle forsikringer
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/forsikringer/bilforsikring/">
                  Bilforsikring
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/forsikringer/husforsikring/">
                  Husforsikring
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/forsikringer/indboforsikring/">
                  Indboforsikring
                </Footer.Link>
                <Footer.Link href="https://www.topdanmark.dk/forsikringer/ulykkesforsikring/">
                  Ulykkeforsikring
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
          <div className="w-full bg-primary rounded-none px-4 py-6 sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              href="#"
              by="Topdanmark Forsikring A/S"
              year={2024}
              className="text-white"
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon
                href="https://www.facebook.com/Topdanmark"
                icon={BsFacebook}
                className="text-white"
              />
              <Footer.Icon
                href="https://www.linkedin.com/company/topdanmark"
                icon={BsLinkedin}
                className="text-white"
              />
              <Footer.Icon
                href="https://dk.trustpilot.com/review/www.topdanmark.dk"
                icon={SiTrustpilot}
                className="text-white"
              />
              <Footer.Icon
                href="https://www.topdanmark.dk/blog/"
                icon={BsHandThumbsUp}
                className="text-white"
              />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterComponent;
