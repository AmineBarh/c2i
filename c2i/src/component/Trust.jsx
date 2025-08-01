import React, { useState } from "react";
import { X } from "lucide-react";

const Trust = ({
  partners,
  partnerType,
  setPartnerType,
  partnerFile,
  setPartnerFile,
  handleAddPartner,
  handleDeletePartner,
}) => {
  const [selectedPartners, setSelectedPartners] = useState([]);

  const toggleSelectPartner = (partnerId) => {
    setSelectedPartners((prevSelected) =>
      prevSelected.includes(partnerId)
        ? prevSelected.filter((id) => id !== partnerId)
        : [...prevSelected, partnerId]
    );
  };

  const toggleSelectAllPartners = () => {
    if (selectedPartners.length === partners.length) {
      setSelectedPartners([]);
    } else {
      setSelectedPartners(partners.map((p) => p._id));
    }
  };

  const handleBulkDeletePartners = () => {
    if (
      selectedPartners.length > 0 &&
      window.confirm(
        `Are you sure you want to delete ${selectedPartners.length} selected partner(s)?`
      )
    ) {
      selectedPartners.forEach((partnerId) => {
        handleDeletePartner(partnerId);
      });
      setSelectedPartners([]);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8 px-4 sm:px-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Partners</h2>

          {/* Add New Partner Form */}
          <div className="mb-6 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Add New Partner</h3>
            <form
              onSubmit={handleAddPartner}
              className="flex flex-wrap items-center gap-4"
            >
              <select
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
                required
              >
                <option value="trusted">Trusted By</option>
                <option value="partner">Our Partner</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPartnerFile(e.target.files[0])}
                className="border border-gray-300 rounded-md p-2"
                required
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add Partner
              </button>
            </form>
          </div>

          {/* Partners Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        selectedPartners.length === partners.length &&
                        partners.length > 0
                      }
                      onChange={toggleSelectAllPartners}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {partners.length > 0 ? (
                  partners.map((partner) => (
                    <tr
                      key={partner._id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPartners.includes(partner._id)}
                          onChange={() => toggleSelectPartner(partner._id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {partner.type === "trusted"
                          ? "Trusted By"
                          : "Our Partner"}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/${partner.img}`}
                          alt={`${partner.type} logo`}
                          className="h-16 object-contain"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeletePartner(partner._id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No partners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleBulkDeletePartners}
              disabled={selectedPartners.length === 0}
              className={`font-semibold flex items-center gap-2 bg-gradient-to-r ${
                selectedPartners.length === 0
                  ? "from-gray-400 to-gray-600 cursor-not-allowed"
                  : "from-red-600 to-red-800 hover:bg-red-700"
              } text-white px-4 py-2 rounded-md transition-colors`}
            >
              Delete Selected
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trust;
