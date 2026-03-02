import React, { useEffect, useState } from "react";
import ReactRotatingText from "react-rotating-text";

import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import bglanding from "../images/bglanding.png";
import {
  ArrowRight,
  Cpu,
  Globe,
  Cog,

  Mail,
  Phone,
  MapPin,
  Bot,
} from "lucide-react";
import Chatbot from "../component/Chatbot";
import StatsSection from "../component/StatsSection";
import ContactForm from "../component/ContactForm";

const Home = () => {
  const [trustedPartners, setTrustedPartners] = useState([]);

  // Fetch partners from API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/partners`
        );
        const data = await response.json();
        setTrustedPartners(
          data.filter((partner) => partner.type === "trusted")
        );

      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleComponent = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={bglanding}
            alt="Modern technology workspace with IoT devices and digital solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="title text-white font-bold flex flex-col items-center gap-4">
            <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Solutions expertes en
            </div>
            <div className="py-2 xs:py-3 sm:py-4 md:py-5 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-purplec2i-500 ">
              <ReactRotatingText
                items={[
                  "Automatisation !",
                  "Ingénierie IoT !",
                  "Développement Web !",
                ]}
                pause={1500}
              />
            </div>
          </div>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 max-w-2xl xs:max-w-3xl mx-auto leading-relaxed">
            Transformer les entreprises grâce à des solutions IoT innovantes, un
            développement web de pointe et des systèmes d'automatisation
            intelligents.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-5 py-2.5 xs:px-6 xs:py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm xs:text-base sm:text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
            >
              Découvrez notre travail
              <ArrowRight className="ml-2 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={scrollToContact}
              className="border-2 border-gray-300 text-white px-5 py-2.5 xs:px-6 xs:py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm xs:text-base sm:text-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
            >
              Contactez-nous
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="ourexpertise text-center my-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Approuvé par{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              les leaders de l'industrie
            </span>
          </h2>
          <p className="text-gray-600">
            Rejoignez des centaines d'entreprises qui font confiance à C2I pour
            leur transformation numérique
          </p>
        </div>
        <div className="mx-64">
          <Marquee
            pauseOnHover
            speed={50}
            direction="right"
            autoFill
            className="pb-16"
          >
            {trustedPartners.map((partner, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API_URL}/uploads/${partner.img}`}
                alt={`Partner ${index + 1}`}
                className="mx-16 h-16 object-contain"
              />
            ))}
          </Marquee>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="ourexpertise flex flex-col mb-40 bg-white px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-center py-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Notre{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                expertise
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous sommes spécialisés dans trois domaines clés qui stimulent la
              transformation numérique des entreprises modernes.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Automation Card */}
          <div className="automation bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-gradient-to-r from-orangec2i-500 to-orange-700 p-5 m-5 rounded-xl w-16 flex items-center justify-center">
              <Cpu color="#ffffff" />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">
                Automatisation
              </h5>
              <p className="mb-3 text-blackc2i-100">
                Rationalisez les opérations avec des solutions d'automatisation
                intelligentes et l'optimisation des processus.
              </p>
              <Link
                to="/automation"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-greenc2i-500"
              >
                <div className="flex items-center text-orangec2i-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
          {/* IoT Engineering Card */}
          <div className="iot bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-gradient-to-l from-greenc2i-500 to-emerald-600 p-5 m-5 rounded-xl w-16 flex items-center justify-center">
              <Globe color="#ffffff" />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">
                Ingénierie IoT
              </h5>
              <p className="mb-3 text-blackc2i-100">
                Construisez des systèmes connectés et des produits intelligents
                grâce à notre expertise IoT.
              </p>
              <Link
                to="/iot"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-bluec2i-500"
              >
                <div className="flex items-center text-greenc2i-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
          {/* Web Development Card */}
          <div className="dev bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-gradient-to-r from-bluec2i-500 to-bluec2i-900 p-5 m-5 rounded-xl w-16 flex items-center justify-center">
              <Cog color="#ffffff" />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">
                Développement Web
              </h5>
              <p className="mb-3 text-blackc2i-100">
                Développez des sites web modernes et réactifs ainsi que des
                plateformes adaptées à vos besoins.
              </p>
              <Link
                to="/web-dev"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-orangec2i-500"
              >
                <div className="flex items-center text-bluec2i-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Call to Action */}
      <section>
        <StatsSection />
      </section>

      {/* Contact Section */}
      <section id="contactform" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contactez
              <span className="bg-gradient-to-r ms-2 from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Nous
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Prêt à démarrer votre prochain projet ? Nous serions ravis de vous
              entendre.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12" id="contact">
            {/* Contact Info */}
            <div className="contact-info flex items-start flex-col justify-center gap-5">
              <div className="contactinfotext text-2xl font-bold text-gray-900 mb-6">
                Informations de contact
              </div>
              {/* Email */}
              <div className="email flex gap-8 items-center">
                <div className="boxemail bg-green-100 p-2 rounded-md">
                  <Mail color="#8EC64C" />
                </div>
                <div className="mails flex items-start flex-col">
                  <div>contact@c2i.tn</div>
                  <div>info@c2i.tn</div>
                </div>
              </div>
              {/* Phone */}
              <div className="contact1 flex gap-10 items-center">
                <div className="boxemail bg-blue-100 p-2 rounded-md">
                  <Phone color="#2379BA" />
                </div>
                <div className="mails flex flex-col">
                  <div>+216 53 258 794</div>
                  <div>+216 55 405 940</div>
                </div>
              </div>
              {/* Location */}
              <div className="place flex gap-10 items-center">
                <div className="boxemail bg-orange-100 p-2 rounded-md">
                  <MapPin color="#F8B74C" />
                </div>
                <div className="mails flex flex-col">
                  <div>El Zeouiet</div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            {/* Performance Optimization: Extracted ContactForm to prevent re-rendering entire Home page on keystroke */}
            <ContactForm />
          </div>
        </div>
      </section>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {isOpen && (
          <Chatbot className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden" />
        )}
        <button onClick={toggleComponent}>
          <Bot className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Home;
