import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
  }, []);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full min-h-screen max-w-6xl mx-auto px-4 py-12 rounded-lg">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold mb-6">Invoice List</h1>
          <button
            onClick={() => navigate("/create-invoice")}
            className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
          >
            <span>Create Invoice</span>
          </button>
        </div>
        {invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Vendor Info
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    PO Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Amount</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Invoice Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.vendor || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.invoiceNumber || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${invoice.totalAmount || "0.00"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.invoiceDate || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => openModal(invoice)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <img
              src={window.location.origin + "/img/nodata.png"}
              alt=""
              className="w-64 h-64"
            />
          </div>
        )}
      </div>

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
            <div className="mb-4">
              <p>
                <span className="font-semibold">Vendor:</span>{" "}
                {selectedInvoice.vendor || "N/A"}
              </p>
              <p>
                <span className="font-semibold">PO Number:</span>{" "}
                {selectedInvoice.invoiceNumber || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> $
                {selectedInvoice.totalAmount || "0.00"}
              </p>
              <p>
                <span className="font-semibold">Invoice Date:</span>{" "}
                {selectedInvoice.invoiceDate || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Payment Terms:</span>{" "}
                {selectedInvoice.paymentTerms || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                {selectedInvoice.invoiceDueDate || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {selectedInvoice.invoiceDescription || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Comments:</span>{" "}
                {selectedInvoice.comments || "N/A"}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
