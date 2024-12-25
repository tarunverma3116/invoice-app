import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import { getSuccessNotificationMessage } from "./NotificationMessage";
import UploadSection from "./UploadSection";

const CreateInvoice = () => {
  const navigate = useNavigate();

  const defaultInitialValues = {
    vendor: "",
    invoiceNumber: "",
    invoiceDate: "",
    totalAmount: "",
    paymentTerms: "",
    invoiceDueDate: "",
    glPostDate: "",
    invoiceDescription: "",
    expenses: [
      {
        lineAmount: "",
        department: "",
        account: "",
        location: "",
        description: "",
      },
    ],
    comments: "",
  };

  const [activeTab, setActiveTab] = useState("Vendor Details");
  const [vendorDetails, setVendorDetails] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    vendor: Yup.string().required("Vendor is required"),
    invoiceNumber: Yup.string().required("Invoice Number is required"),
    invoiceDate: Yup.date().required("Invoice Date is required"),
    totalAmount: Yup.number()
      .required("Total Amount is required")
      .min(0.01, "Amount must be greater than 0"),
    paymentTerms: Yup.string().required("Payment Terms are required"),
    invoiceDueDate: Yup.date().required("Invoice Due Date is required"),
    glPostDate: Yup.date(),
    invoiceDescription: Yup.string().required(
      "Invoice Description is required"
    ),
    expenses: Yup.array().of(
      Yup.object().shape({
        lineAmount: Yup.number().required("Line Amount is required"),
        department: Yup.string().required("Department is required"),
        account: Yup.string().required("Account is required"),
        location: Yup.string().required("Location is required"),
        description: Yup.string().required("Description is required"),
      })
    ),
    comments: Yup.string(),
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem("currentInvoice");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        const mergedValues = { ...defaultInitialValues, ...parsedDraft };
        setInitialValues(mergedValues);
      } catch (error) {
        console.error("Error parsing saved draft:", error);
      }
    } else {
      setInitialValues(defaultInitialValues);
    }
  }, [localStorage.getItem("currentInvoice")]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto px-10 py-8 bg-white shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-black font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={24} height={24}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold">Create Invoice</h1>
          </div>
          <div className="hidden md:flex gap-4">
            {["Vendor Details", "Invoice Details", "Comments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-b-2 font-medium transition ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section: Upload Invoice */}
          <UploadSection/>

          {/* Right Section: Form */}
          <div className="invoice-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={(values, { resetForm }) => {
                const invoices =
                  JSON.parse(localStorage.getItem("invoices")) || [];
                invoices.push(values);
                localStorage.setItem("invoices", JSON.stringify(invoices));
                resetForm();
                getSuccessNotificationMessage(
                  "Invoice saved and ready for a new entry!"
                );
                localStorage.setItem("currentInvoice", "");
              }}
            >
              {({ values, setFieldValue, touched, errors, resetForm }) => (
                <Form
                  onFocus={(e) => {
                    const fieldName = e.target.name;
                    if (
                      fieldName === "vendor" ||
                      fieldName === "purchaseOrderNumber"
                    ) {
                      setActiveTab("Vendor Details");
                    } else if (
                      [
                        "invoiceNumber",
                        "invoiceDate",
                        "totalAmount",
                        "paymentTerms",
                        "invoiceDueDate",
                        "glPostDate",
                        "invoiceDescription",
                      ].includes(fieldName)
                    ) {
                      setActiveTab("Invoice Details");
                    } else if (fieldName === "comments") {
                      setActiveTab("Comments");
                    }
                  }}
                >
                  {/* Vendor Details */}
                  <div className="mb-8">
                    <h2 className="flex items-center gap-3 text-lg font-semibold mb-4">
                      <img
                        className="w-12 h-12"
                        src={window.location.origin + "/img/vendor.svg"}
                        alt=""
                      />
                      Vendor Details
                    </h2>
                    <p className="text-lg font-semibold mb-3">
                      Vendor Information
                    </p>
                    <label className="block mb-2 font-medium">
                      Vendor <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="vendor"
                      className="w-full border rounded-lg p-2 mb-2"
                    >
                      <option value="">Select Vendor</option>
                      <option
                        value="550 Main St., Lynn"
                        label="A-1 Exterminators"
                      >
                        A-1 Exterminators
                      </option>
                      <option value="221B Baker St., UK" label="Vendor 2">
                        Vendor 2
                      </option>
                    </Field>
                    <ErrorMessage
                      name="vendor"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    {values.vendor ? (
                      <p className="text-sm">{values.vendor}</p>
                    ) : null}
                    {vendorDetails ? (
                      <p className="text-sm">{values.vendor}</p>
                    ) : null}
                    <div className="flex justify-center w-full">
                      <Link
                        className="mx-auto text-[#1787E0] my-3 flex items-center gap-1 text-xs"
                        onClick={() => setVendorDetails(!vendorDetails)}
                      >
                        {!vendorDetails ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            width={18}
                            height={18}
                            className="size-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            width={18}
                            height={18}
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        )}
                        {vendorDetails
                          ? "Hide Vendor Details"
                          : "View Vendor Details"}
                      </Link>
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="mb-8">
                    <h2 className="flex items-center gap-3 text-lg font-semibold mb-4">
                      <img
                        className="w-12 h-12"
                        src={window.location.origin + "/img/details.svg"}
                        alt=""
                      />
                      Invoice Details
                    </h2>
                    <p className="text-lg font-semibold mb-3">
                      General Information
                    </p>
                    <label className="block mb-2 font-medium">
                      Purchase Order Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="poNumber"
                      className="w-full border rounded-lg p-2 mb-5"
                    >
                      <option value="">Select PO Number</option>
                      <option value="Purchase Order 1">Purchase Order 1</option>
                      <option value="Purchase Order 2">Purchase Order 2</option>
                    </Field>
                    <ErrorMessage
                      name="poNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <p className="text-lg font-semibold mb-3">
                      Invoice Details
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-medium">
                          Invoice Number <span className="text-red-500">*</span>
                        </label>
                        {/* <Field
                          name="invoiceNumber"
                          type="text"
                          placeholder="Invoice Number"
                          className="w-full border rounded-lg p-2"
                        /> */}
                        <Field
                          as="select"
                          name="invoiceNumber"
                          className="w-full border rounded-lg p-2 mb-2"
                        >
                          <option value="">Invoice Number</option>
                          <option value="Invoice Number 1">
                            Invoice Number 1
                          </option>
                          <option value="Invoice Number 2">
                            Invoice Number 2
                          </option>
                        </Field>
                        <ErrorMessage
                          name="invoiceNumber"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">
                          Invoice Date <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="invoiceDate"
                          type="date"
                          className="w-full border rounded-lg p-2"
                        />
                        <ErrorMessage
                          name="invoiceDate"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">
                          Total Amount <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="totalAmount"
                          type="number"
                          placeholder="Total Amount"
                          className="w-full border rounded-lg p-2"
                        />
                        <ErrorMessage
                          name="totalAmount"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">
                          Payment Terms <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="paymentTerms"
                          className="w-full border rounded-lg p-2 mb-2"
                        >
                          <option value="">Select</option>
                          <option value="Terms 1">Terms 1</option>
                          <option value="Terms 2">Terms 2</option>
                        </Field>
                        <ErrorMessage
                          name="paymentTerms"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">
                          Invoice Due Date{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="invoiceDueDate"
                          type="date"
                          className="w-full border rounded-lg p-2"
                        />
                        <ErrorMessage
                          name="invoiceDueDate"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">
                          GL Post Date <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="glPostDate"
                          type="date"
                          className="w-full border rounded-lg p-2"
                        />
                        <ErrorMessage
                          name="glPostDate"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block mb-2 font-medium">
                          Invoice Description{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="invoiceDescription"
                          type="text"
                          placeholder="Invoice Description"
                          className="w-full border rounded-lg p-2"
                        />
                        <ErrorMessage
                          name="invoiceDescription"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <p className="text-lg font-semibold mb-3">
                      Expense Details Information
                    </p>
                  </div>

                  {/* Expense Details */}
                  <div className="mb-8">
                    <FieldArray
                      name="expenses"
                      render={(arrayHelpers) => (
                        <>
                          {values.expenses.map((_, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-2 gap-4 mb-4"
                            >
                              <div>
                                <label className="block mb-2 font-medium">
                                  Line Amount{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  name={`expenses.${index}.lineAmount`}
                                  type="number"
                                  placeholder="Line Amount"
                                  className="w-full border rounded-lg p-2"
                                />
                                <ErrorMessage
                                  name={`expenses.${index}.lineAmount`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block mb-2 font-medium">
                                  Department{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  as="select"
                                  name={`expenses.${index}.department`}
                                  className="w-full border rounded-lg p-2 mb-2"
                                >
                                  <option value="">Select Department</option>
                                  <option value="Department 1">
                                    Department 1
                                  </option>
                                  <option value="Department 2">
                                    Department 2
                                  </option>
                                </Field>
                                <ErrorMessage
                                  name={`expenses.${index}.department`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block mb-2 font-medium">
                                  Account{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  as="select"
                                  name={`expenses.${index}.account`}
                                  className="w-full border rounded-lg p-2 mb-2"
                                >
                                  <option value="">Select Account</option>
                                  <option value="Account 1">Account 1</option>
                                  <option value="Account 2">Account 2</option>
                                </Field>
                                <ErrorMessage
                                  name={`expenses.${index}.account`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block mb-2 font-medium">
                                  Location{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  as="select"
                                  name={`expenses.${index}.location`}
                                  className="w-full border rounded-lg p-2 mb-2"
                                >
                                  <option value="">Select Location</option>
                                  <option value="Location 1">Location 1</option>
                                  <option value="Location 2">Location 2</option>
                                </Field>
                                <ErrorMessage
                                  name={`expenses.${index}.location`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block mb-2 font-medium">
                                  Description{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  name={`expenses.${index}.description`}
                                  type="text"
                                  placeholder="Description"
                                  className="w-full border rounded-lg p-2"
                                />
                                <ErrorMessage
                                  name={`expenses.${index}.description`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <hr />
                            </div>
                          ))}
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="w-60 bg-white-500 text-[#64748B] py-3 rounded-lg border-2 border-[#64748B]"
                              onClick={() =>
                                arrayHelpers.push({
                                  lineAmount: "",
                                  department: "",
                                  account: "",
                                  location: "",
                                  description: "",
                                })
                              }
                            >
                              + Add Expense Coding
                            </button>
                          </div>
                        </>
                      )}
                    />
                  </div>

                  {/* Comments */}
                  <div className="mb-8">
                    <h2 className="flex items-center gap-3 text-lg font-semibold mb-4">
                      <img
                        className="w-12 h-12"
                        src={window.location.origin + "/img/comments.svg"}
                        alt=""
                      />
                      Comments
                    </h2>
                    <Field
                      name="comments"
                      type="text"
                      placeholder="Add a comment and use @Name to tag someone"
                      className="w-full border rounded-lg p-2 my-3"
                    />
                    <ErrorMessage
                      name="comments"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="w-full bg-white-500 text-[#64748B] py-3 rounded-lg border-2 border-[#64748B]"
                      onClick={() => {
                        localStorage.setItem(
                          "currentInvoice",
                          JSON.stringify(values)
                        );
                        getSuccessNotificationMessage(
                          "Draft saved successfully!"
                        );
                      }}
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-3 rounded-lg"
                    >
                      Submit & New
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
