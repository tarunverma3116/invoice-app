import React, { useState } from "react";
import Dropzone from "react-dropzone";

const UploadSection = () => {
  const [preview, setPreview] = useState(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
  };

  return (
    <div className="max-h-[100vh] flex flex-col justify-center items-center bg-gray-100 border-dashed border-2 border-gray-300 p-6 rounded-lg">
      {preview ? (
        <div
          className="relative cursor-pointer"
          onClick={handleRemovePreview}
          title="Click to upload a new image"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Click on the image to upload a new one
          </p>
        </div>
      ) : (
        <>
          <p className="text-xl font-semibold">Upload Your Invoice</p>
          <p className="text-gray-600">To auto-populate fields and save time</p>
          <img
            src={window.location.origin + "/img/file.png"} // Replace with the actual image path
            alt="Invoice"
            className="w-64 h-64 mb-4"
          />
          <Dropzone
            onDrop={handleDrop}
            accept={{ "image/jpeg": [], "image/png": [], "image/jpg": [] }}
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="cursor-pointer text-center"
                title="Click or drag to upload"
              >
                <input name="image-upload" {...getInputProps()} />
                <button
                  htmlFor="image-upload"
                  className="w-60 bg-white-500 text-[#64748B] py-3 rounded-lg border-2 border-[#64748B] flex items-center justify-center gap-2"
                >
                  Upload File{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      width={18}
                      height={18}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </span>
                </button>
                <p className="text-gray-600 mt-3">
                  <span className="text-blue-600">Click to upload</span> or drag
                  and drop
                </p>
              </div>
            )}
          </Dropzone>
        </>
      )}
    </div>
  );
};

export default UploadSection;
