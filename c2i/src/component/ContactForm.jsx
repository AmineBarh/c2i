import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  // Form data and submission
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <section className="py-24 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ready to Get
            <span className="text-purplec2i-500 ms-3">Started?</span>
          </h2>
          <p className="text-xl text-gray-600">
            Contact us today to discuss your training needs and get a customized
            quote.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-info flex items-start flex-col justify-start gap-5">
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
                className="w-full px-4 outline-none py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent transition-all duration-300"
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
                className="w-full px-4 outline-none py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent transition-all duration-300"
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
                className="w-full px-4 outline-none py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent transition-all duration-300"
                placeholder="name@c2i.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-2"
                htmlFor="message"
              >
                Training Interest
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 outline-none py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent transition-all duration-300"
                placeholder="Tell us about your training needs..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purplec2i-900 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purplec2i-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
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
  );
};

export default ContactForm;
