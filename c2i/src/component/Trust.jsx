import React from "react";

const Trust = ({
  partners,
  partnerType,
  setPartnerType,
  partnerFile,
  setPartnerFile,
  handleAddPartner,
  handleDeletePartner,
}) => {
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
                    <tr key={partner._id}>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {partner.type === "trusted"
                          ? "Trusted By"
                          : "Our Partner"}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={`http://localhost:7000/uploads/${partner.img}`}
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
                      colSpan="3"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No partners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trust;
