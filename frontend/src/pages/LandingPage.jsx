import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sprout, Wheat, FlaskConical, TrendingUp, Leaf,
  ArrowRight, Upload, Bug, Phone, Mail
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const marketRates = [
  { crop: "Wheat", price: "₹2,275", change: "+2.3%", up: true },
  { crop: "Rice (Basmati)", price: "₹3,850", change: "+1.8%", up: true },
  { crop: "Cotton", price: "₹6,380", change: "-0.5%", up: false },
  { crop: "Soybean", price: "₹4,600", change: "+3.1%", up: true }
];

const fertilizers = [
  { name: "Urea (46-0-0)", price: "₹267/bag", brand: "IFFCO" },
  { name: "DAP (18-46-0)", price: "₹1,350/bag", brand: "Coromandel" },
  { name: "NPK (10-26-26)", price: "₹1,470/bag", brand: "RCF" }
];

const schemes = [
  {
    title: "PM-KISAN Samman Nidhi",
    desc: "Direct income support of ₹6,000/year to farmer families."
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana",
    desc: "Crop insurance scheme providing financial support to farmers."
  },
  {
    title: "Kisan Credit Card",
    desc: "Provides farmers with affordable credit."
  }
];

export default function LandingPage() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setResult({
        disease: "Leaf Blight",
        confidence: 94,
        remedy: "Apply Mancozeb fungicide and remove infected leaves."
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}

      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sprout className="text-green-600" />
            Smart Agri Market
          </Link>

          <nav className="hidden md:flex gap-6 text-gray-600">
            <a href="#market">Market Rates</a>
            <a href="#fertilizers">Fertilizers</a>
            <a href="#schemes">Schemes</a>
            <a href="#disease">AI Detector</a>
          </nav>

          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 border rounded">
              Login
            </Link>

            <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded">
              Register
            </Link>
          </div>

        </div>
      </header>

      {/* HERO */}

      <section className="text-center py-20 bg-green-50">

        <h1 className="text-5xl font-bold mb-4">
          Smart Agriculture Marketplace
        </h1>

        <p className="text-gray-600 mb-8">
          Real-time crop auctions, fertilizer marketplace, and AI crop disease detection.
        </p>

        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded inline-flex items-center gap-2"
        >
          Start Selling <ArrowRight />
        </Link>

      </section>

      {/* MARKET RATES */}

      <section id="market" className="max-w-7xl mx-auto py-16 px-4">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Today's Market Rates
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          {marketRates.map((item, i) => (

            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
              className="border rounded p-4 flex justify-between"
            >

              <div>
                <h3 className="font-bold">{item.crop}</h3>
                <p className="text-gray-500 text-sm">Per Quintal</p>
              </div>

              <div className="text-right">
                <p className="font-bold">{item.price}</p>
                <p className={item.up ? "text-green-600" : "text-red-500"}>
                  {item.change}
                </p>
              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* FERTILIZERS */}

      <section id="fertilizers" className="bg-gray-50 py-16">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-8 text-center">
            Fertilizer Marketplace
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {fertilizers.map((f, i) => (

              <div key={i} className="border rounded p-5">

                <FlaskConical className="mb-2"/>

                <h3 className="font-bold">{f.name}</h3>

                <p className="text-gray-500">{f.brand}</p>

                <p className="font-bold mt-2">{f.price}</p>

                <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full">
                  Buy
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* GOVERNMENT SCHEMES */}

      <section id="schemes" className="max-w-7xl mx-auto py-16 px-4">

        <h2 className="text-3xl font-bold text-center mb-10">
          Government Schemes
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {schemes.map((s, i) => (

            <div key={i} className="border rounded p-6">

              <Leaf className="mb-2"/>

              <h3 className="font-bold">{s.title}</h3>

              <p className="text-gray-600 text-sm mt-2">
                {s.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* AI DISEASE DETECTOR */}

      <section id="disease" className="bg-gray-50 py-16">

        <div className="max-w-4xl mx-auto text-center px-4">

          <h2 className="text-3xl font-bold mb-6">
            AI Crop Disease Detector
          </h2>

          <input type="file" onChange={handleImageUpload} />

          {selectedImage && (
            <img src={selectedImage} className="mx-auto mt-6 h-40 rounded"/>
          )}

          {selectedImage && (

            <button
              onClick={analyzeImage}
              className="mt-4 bg-green-600 text-white px-5 py-2 rounded"
            >
              Detect Disease
            </button>

          )}

          {analyzing && <p className="mt-4">Analyzing...</p>}

          {result && (

            <div className="mt-6 border rounded p-4">

              <p className="font-bold text-red-600">
                {result.disease}
              </p>

              <p className="text-sm mt-2">
                Confidence: {result.confidence}%
              </p>

              <p className="text-sm mt-2">
                Remedy: {result.remedy}
              </p>

            </div>

          )}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-black text-white py-10">

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-bold text-xl mb-2">
              Smart Agri Market
            </h3>
            <p className="text-gray-400 text-sm">
              Empowering farmers with technology.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Contact</h4>

            <p className="flex items-center gap-2">
              <Phone size={16}/> 1800‑000‑000
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16}/> support@agri.com
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              © 2026 Smart Agri Market
            </p>
          </div>

        </div>

      </footer>

    </div>
  );
}