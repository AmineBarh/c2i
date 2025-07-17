import React, { useEffect, useState } from "react";
import ReactRotatingText from "react-rotating-text";
import CountUp from "../blocks/CountUp/CountUp";
import GradientText from "../blocks/GradientText/GradientText";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
// import c2o from "../images/c2o.png";
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
const Home = () => {
  const [trustedPartners, setTrustedPartners] = useState([]);
  const [ourPartners, setOurPartners] = useState([]);

  // Form data and submission
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:7000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      alert("Message sent successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Update your inputs to use the controlled form:

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
            alt="Modern technology workspace with IoT devices and digital solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="title text-white text-7xl sm:text-4xl md:text-6xl font-bold flex flex-col items-center gap-2">
            <div>Expert Solutions In</div>
            <div className="py-5 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
              <ReactRotatingText
                items={["Automation!", "IoT Engineering!", "Web Development!"]}
                pause={1500}
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses through innovative IoT solutions,
            cutting-edge web development, and intelligent automation systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center">
              Explore Our Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-gray-300 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="ourexpertise text-center my-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-gray-600">
            Join hundreds of companies that trust C2I for their digital
            transformation
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
                src={`http://localhost:7000/uploads/${partner.img}`}
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
              Our{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in three core areas that drive digital
              transformation for modern businesses.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Automation Card */}
          <div className="automation bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2">
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
                <div className="flex items-center text-greenc2i-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
          {/* IoT Engineering Card */}
          <div className="iot bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2">
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
                <div className="flex items-center text-bluec2i-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
          {/* Web Development Card */}
          <div className="dev bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:-translate-y-2">
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
                <div className="flex items-center text-orangec2i-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Call to Action */}
      <section className="somestuff">
        <div className="anotherhero py-24 bg-gradient-to-r from-emerald-50 via-blue-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Happy Clients */}
              <div className="clients flex flex-col items-center justify-center">
                <div className="p-5 m-5 w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Users color="#8EC64C" size={40} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  <CountUp from={0} to={150} separator="," duration={1} />
                  <span>+</span>
                </div>
                <div className="text-gray-600 font-medium">Happy Clients</div>
              </div>
              {/* Projects */}
              <div className="projects flex flex-col items-center justify-center">
                <div className="bg-white p-5 m-5 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Award color="#F8B74C" size={40} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  <CountUp from={0} to={30} separator="," duration={1} />
                  <span>+</span>
                </div>
                <div className=" text-gray-600 font-medium">
                  Projects Delivered
                </div>
              </div>
              {/* Success Rate */}
              <div className="stats flex flex-col items-center justify-center">
                <div className="bg-white p-5 m-5 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <TrendingUp color="#2379BA" size={40} />
                </div>
                <div className="number text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  <GradientText
                    colors={["#2379BA", "#8EC64C"]}
                    animationSpeed={4}
                  >
                    90%
                  </GradientText>
                </div>
                <div className="text-gray-600 font-medium">Success rate</div>
              </div>
            </div>
          </div>
        </div>
        {/* Partners Component */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Our
                <span className="bg-gradient-to-r ml-2 from-bluec2i-500 to-orangec2i-500 bg-clip-text text-transparent">
                  Partners
                </span>
              </h2>
              <p className="text-gray-600">
                Powered by the world's leading technology platforms and
                frameworks
              </p>
            </div>
          </div>
        </section>
        <div className="marquee mx-64 ">
          <Marquee
            pauseOnHover
            speed={50}
            direction="right"
            autoFill
            className="pb-16"
          >
            {ourPartners.map((partner, index) => (
              <img
                key={index}
                src={`http://localhost:7000/uploads/${partner.img}`}
                alt="Partner"
                className="mx-16 h-16 object-contain"
              />
            ))}
          </Marquee>
        </div>
        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our innovative solutions can drive your business
              forward in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>
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
          <div className="grid lg:grid-cols-2 gap-12" id="contact">
            {/* Contact Info */}
            <div className="contact-info flex items-start flex-col justify-center gap-5">
              <div className="contactinfotext text-2xl font-bold text-gray-900 mb-6">
                Contact Information
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
                  <div>+216 55 405 940</div>
                  <div>+216 53 258 794</div>
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
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3  outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Name/Company name"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-gray-900 mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3  outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3  outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3  outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-greenc2i-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
