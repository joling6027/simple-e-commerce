import { useContext, useEffect, useState } from "react"
import Footer from "./Footer"
import { ProductsContext } from "./ProductsContext";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);
  const [ message, setMessage ] = useState("");
  useEffect(() => {
    if (window.location.href.includes('success')) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      <NavBar />
      <div className="p-5 min-h-screen">
        {success && (
          <div className="mb-5 bg-gradient-to-r from-green-600 to-green-400 text-white text-lg p-5 rounded-xl">
            Thank you for your order!
          </div>
        )}
        {children}
      </div>
      <Footer />
    </>

  )
}