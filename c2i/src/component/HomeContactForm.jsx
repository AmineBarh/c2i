import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const HomeContactForm = () => {
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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
          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-2"
                htmlFor="name"
              >
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3  outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                placeholder="Nom / Nom de l'entreprise"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-2"
                htmlFor="phone"
              >
                Numéro de téléphone
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
                placeholder="nom@c2i.com"
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
                placeholder="Parlez-nous de votre projet..."
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
                  Envoi...
                </>
              ) : (
                "Envoyer le message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeContactForm;
