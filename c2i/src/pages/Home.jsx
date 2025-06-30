import React, { useEffect, useState } from "react";
import ReactRotatingText from "react-rotating-text";
import CountUp from "../blocks/CountUp/CountUp";
import GradientText from "../blocks/GradientText/GradientText";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  ArrowRight,
  Cpu,
  Globe,
  Cog,
  Users,
  Award,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import emailjs from "emailjs-com";

const Home = () => {
  const [trustedPartners, setTrustedPartners] = useState([]);
  const [ourPartners, setOurPartners] = useState([]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("3hPUSBblupmxQk9Wg"); // Your public key
  }, []);

  // Fetch partners from API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/partners");
        const data = await response.json();
        setTrustedPartners(
          data.filter((partner) => partner.type === "trusted")
        );
        setOurPartners(data.filter((partner) => partner.type === "partner"));
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  // EmailJS configuration
  const SERVICE_ID = "service_3570rmk"; // Replace with your actual Service ID
  const TEMPLATE_ID = "template_28ffssr"; // Replace with your actual Template ID

  // Handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const btn = document.getElementById("button");
    btn.disabled = true;
    btn.textContent = "Sending...";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, e.target)
      .then(() => {
        alert("Message sent successfully!");
        e.target.reset(); // Reset form fields
      })
      .catch((error) => {
        console.error("EmailJS Error:", error.text);
        alert(`Failed to send message. Error: ${error.text}`);
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = "Send Message";
      });
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      {/* Hero Section */}
      <section className="herosection text-center items-center flex flex-col gap-2 min-h-screen justify-center px-4 bg-gradient-to-r from-greenc2i-100 via-bluec2i-100 to-orangec2i-100">
        <div className="title text-7xl sm:text-4xl md:text-6xl font-bold flex flex-col items-center gap-2">
          <div>C2I & Training: Expert Solutions In</div>
          <div className="py-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
            <ReactRotatingText
              items={["Automation!", "IoT Engineering!", "Web Development!"]}
              pause={1500}
            />
          </div>
        </div>
        <div className="subtext text-center w-2/3">
          Transforming businesses through innovative IoT solutions, cutting-edge
          web development, and intelligent automation systems
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center">
            Explore Our Work
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300">
            Get In Touch
          </button>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="ourexpertise text-center my-12">
        <div className="text-6xl font-bold text-center my-5 flex items-center justify-center gap-3">
          Trusted by
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 py-5">
            Industry Leaders
          </div>
        </div>
        <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto mb-8">
          We specialize in three core areas that drive digital transformation
          for modern businesses.
        </p>
        <Marquee
          pauseOnHover
          speed={50}
          direction="right"
          autoFill
          className="py-16"
        >
          {trustedPartners.map((partner, index) => (
            <img
              key={index}
              src={`http://localhost:7000/uploads/${partner.img}`}
              alt={`Partner ${index + 1}`}
              className="mx-16 h-24 object-contain"
            />
          ))}
        </Marquee>
      </section>

      {/* Expertise Section */}
      <section className="ourexpertise flex flex-col mb-40 bg-white px-4">
        <div className="flex justify-center py-5">
          <div className="title text-6xl font-bold inline-flex items-center gap-2">
            Our
            <div className="camelion py-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
              Expertise
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 max-w-6xl mx-auto px-10">
          {/* Automation Card */}
          <div className="automation bg-white border border-gray-200 rounded-lg shadow-sm w-80 h-80">
            <div className="bg-gradient-to-r from-greenc2i-500 to-emerald-600 p-5 m-5 rounded-xl w-16 flex items-center justify-center">
              <Cpu color="#ffffff" />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">
                Automation
              </h5>
              <p className="mb-3 text-blackc2i-100">
                Streamline operations with intelligent automation solutions and
                process optimization.
              </p>
              <Link
                to="/automation"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-greenc2i-500"
              >
                Learn more
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
          {/* IoT Engineering Card */}
          <div className="iot bg-white border border-gray-200 rounded-lg shadow-sm w-80 h-80">
            <div className="bg-gradient-to-l from-bluec2i-500 to-bluec2i-900 p-5 m-5 rounded-xl w-16 flex items-center justify-center">
              <Globe color="#ffffff" />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">
                IoT Engineering
              </h5>
              <p className="mb-3 text-blackc2i-100">
                Build connected systems and smart products with our IoT
                expertise.
              </p>
              <Link
                to="/web-dev"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-bluec2i-500"
              >
                Learn more
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
          {/* Web Development Card */}
          <div className="dev bg-white border border-gray-200 rounded-lg shadow-sm w-80 h-80">
            <div className="bg-gradient-to-r from-orangec2i-500 to-orange-700 p-5 m-5 rounded-xl w-16 flex items-center justify-center">
              <Cog color="#ffffff" />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold text-blackc2i-500">
                Web Development
              </h5>
              <p className="mb-3 text-blackc2i-100">
                Develop modern, responsive websites and platforms tailored to
                your needs.
              </p>
              <Link
                to="/web-dev"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-orangec2i-500"
              >
                Learn more
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Call to Action */}
      <section className="somestuff">
        <div className="anotherhero py-24 bg-gradient-to-r from-emerald-50 via-blue-50 to-orange-50">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Happy Clients */}
            <div className="clients flex flex-col items-center justify-center">
              <div className="bg-white rounded-full p-5 m-5 flex items-center justify-center">
                <Users color="#8EC64C" size={40} />
              </div>
              <div className="number font-bold text-5xl text-center flex-1">
                <CountUp from={0} to={150} separator="," duration={1} />
                <span>+</span>
              </div>
              <div className="number text-lg">Happy Clients</div>
            </div>
            {/* Projects */}
            <div className="projects flex flex-col items-center justify-center">
              <div className="bg-white p-5 m-5 rounded-full flex items-center justify-center">
                <Award color="#F8B74C" size={40} />
              </div>
              <div className="number font-bold text-5xl text-center flex-1">
                <CountUp from={0} to={30} separator="," duration={1} />
                <span>+</span>
              </div>
              <div className="number text-lg">Projects Delivered</div>
            </div>
            {/* Success Rate */}
            <div className="stats flex flex-col items-center justify-center">
              <div className="bg-white p-5 m-5 rounded-full flex items-center justify-center">
                <TrendingUp color="#2379BA" size={40} />
              </div>
              <div className="number font-bold text-5xl p-1">
                <GradientText
                  colors={["#2379BA", "#8EC64C"]}
                  animationSpeed={4}
                >
                  90%
                </GradientText>
              </div>
              <div className="number text-lg">Success rate</div>
            </div>
          </div>
        </div>
        {/* Partners Component */}
        <div className="text-6xl font-bold text-center my-5 flex items-center justify-center gap-3">
          Our
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
            Partners
          </div>
        </div>
        <div className="marquee">
          <Marquee
            pauseOnHover
            speed={50}
            direction="right"
            autoFill
            className="py-16"
          >
            {ourPartners.map((partner, index) => (
              <img
                key={index}
                src={`http://localhost:7000/uploads/${partner.img}`}
                alt="Partner"
                className="mx-16 h-24 object-contain"
              />
            ))}
          </Marquee>
        </div>
        {/* CTA Section */}
        <div className="anotherhero2 bg-gradient-to-r from-[#059669]/50 via-[#2469E4] to-[#EA580C]/50 flex justify-center flex-col items-center gap-10 py-24 px-4 min-h-fit">
          <div className="title text-5xl text-white font-bold">
            Ready to Transform Your Business?
          </div>
          <div className="subtitle text-white">
            Let’s discuss solutions for your business or create it using our
            expertise
          </div>
          <div className="buttons flex items-center justify-around px-24 gap-5">
            <button className="py-2 bg-white rounded-lg px-5">
              Contact Us
            </button>
            <button className="py-2 text-white border-2 border-white rounded-lg px-5">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Ready to start your next project? We'd love to hear from you.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="contact-info flex items-start flex-col justify-center gap-5">
              <div className="contactinfotext text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </div>
              {/* Email */}
              <div className="email flex gap-8 items-center">
                <div className="boxemail bg-greenc2i-100 p-2 rounded-md">
                  <Mail color="#8EC64C" />
                </div>
                <div className="mails flex items-start flex-col">
                  <div>contact@c2i.tn</div>
                  <div>info@c2i.tn</div>
                </div>
              </div>
              {/* Phone */}
              <div className="contact1 flex gap-10 items-center">
                <div className="boxemail bg-bluec2i-100 p-2 rounded-md">
                  <Phone color="#2379BA" />
                </div>
                <div className="mails flex flex-col">
                  <div>+216 55 405 940</div>
                  <div>+216 53 258 794</div>
                </div>
              </div>
              {/* Location */}
              <div className="place flex gap-10 items-center">
                <div className="boxemail bg-orangec2i-100 p-2 rounded-md">
                  <MapPin color="#F8B74C" />
                </div>
                <div className="mails flex flex-col">
                  <div>El Zeouiet</div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleOnSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-900 mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Name/Company name"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-900 mb-2"
                    htmlFor="phone_numb"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone_numb"
                    name="phone_numb"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="+216 12 345 678"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-900 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="name@c2i.com"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-900 mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  id="button"
                  className="w-full bg-gradient-to-r from-greenc2i-600 via-bluec2i-900 to-greenc2i-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-greenc2i-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
