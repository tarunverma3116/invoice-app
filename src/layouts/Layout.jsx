import React, { useEffect, useRef, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useNavigate } from "react-router-dom";

const EmptyLayout = ({ children }) => <>{children}</>;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    let user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    if (Object.keys(user).length > 0) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
      navigate("/login");
    }
    setLoading(false);
  }, []);

  return loading ? <>Loading</> : (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header isSignedIn={isSignedIn} />
        <main className="flex-grow py-12">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export { AdminLayout, EmptyLayout };
