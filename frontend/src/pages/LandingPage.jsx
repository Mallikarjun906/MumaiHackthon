import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sprout, Wheat, FlaskConical, TrendingUp, Leaf,
  ArrowRight, Upload, Bug, Phone, Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
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
  { title: "PM-KISAN Samman Nidhi", desc: "Direct income support of ₹6,000/year to farmers." },
  { title: "Pradhan Mantri Fasal Bima Yojana", desc: "Crop insurance scheme providing financial support." },
  { title: "Kisan Credit Card", desc: "Affordable credit support for farmers." }
];

export default function LandingPage() {
    const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">

      {/* NAVBAR */}

      <header className="sticky top-0 backdrop-blur-lg bg-white/80 border-b z-50">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-700">
            <Sprout />
            Smart Agri Market
          </Link>

          <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
            <a href="#market" className="hover:text-green-600">Market</a>
            <a href="#fertilizers" className="hover:text-green-600">Fertilizers</a>
        
             <button
             
              onClick={() => navigate("/government-schemes")}
              className={`transition-colors hover:text-emerald-500 bg-transparent border-none cursor-pointer ? "text-gray-400" : "text-gray-600"}`}
            >Schemes
              
            </button>
          </nav>

          <div className="flex gap-3">

            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Register
            </Link>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="py-28 text-center bg-gradient-to-br from-green-600 to-emerald-500 text-white">

        <motion.h1
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Smart Agriculture Marketplace
        </motion.h1>

        <p className="max-w-xl mx-auto text-lg opacity-90 mb-10">
          Real-time crop auctions, fertilizer marketplace and AI powered crop disease detection.
        </p>

        <Link
          to="/register"
          className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:scale-105 transition"
        >
          Start Selling <ArrowRight size={18}/>
        </Link>

      </section>

      {/* MARKET */}

      <section id="market" className="max-w-7xl mx-auto py-20 px-4">

        <h2 className="text-3xl font-bold text-center mb-12">
          Today's Market Rates
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {marketRates.map((item,i)=>(

            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
              className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition"
            >

              <div className="flex justify-between">

                <div>
                  <h3 className="font-semibold">{item.crop}</h3>
                  <p className="text-sm text-gray-500">Per Quintal</p>
                </div>

                <TrendingUp className="text-green-600"/>

              </div>

              <p className="mt-4 text-xl font-bold">{item.price}</p>

              <p className={item.up ? "text-green-600" : "text-red-500"}>
                {item.change}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* FERTILIZERS */}

      <section id="fertilizers" className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-12">
            Fertilizer Marketplace
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {fertilizers.map((f,i)=>(

              <div
                key={i}
                className="p-6 bg-gradient-to-b from-white to-green-50 border rounded-xl shadow hover:shadow-lg transition"
              >

                <FlaskConical className="text-green-600 mb-3"/>

                <h3 className="font-semibold">{f.name}</h3>

                <p className="text-gray-500">{f.brand}</p>

                <p className="mt-3 font-bold text-lg">{f.price}</p>

                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  Buy
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* SCHEMES */}

      <section id="schemes" className="py-20">

        <div className="max-w-7xl mx-auto px-4">
 <button
             
              onClick={() => navigate("/government-schemes")}
              className={`transition-colors hover:text-emerald-500 bg-transparent border-none cursor-pointer  ? "text-gray-400" : "text-gray-600"}`}
            >
           <h2 className="text-3xl font-bold text-center mb-12">
            Government Schemes
          </h2>
            </button>
          

          <div className="grid md:grid-cols-3 gap-8">

            {schemes.map((s,i)=>(

              <div
                key={i}
                className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition"
              >

                <Leaf className="text-green-600 mb-3"/>

                <h3 className="font-semibold">{s.title}</h3>

                <p className="text-gray-600 mt-2 text-sm">
                  {s.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* AI DETECTOR */}

      <section id="disease" className="py-20 bg-gray-50">

        <div className="max-w-xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-6">
            AI Crop Disease Detector
          </h2>

          <div className="p-6 bg-white rounded-xl shadow">

            <Upload className="mx-auto text-green-600 mb-3"/>

            <input type="file" onChange={handleImageUpload}/>

            {selectedImage && (
              <img
                src={selectedImage}
                className="mx-auto mt-4 h-40 rounded-lg"
              />
            )}

            {selectedImage && (

              <button
                onClick={analyzeImage}
                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Detect Disease
              </button>

            )}

            {analyzing && <p className="mt-3">Analyzing...</p>}

            {result && (

              <div className="mt-4 p-4 border rounded-lg">

                <p className="font-bold text-red-600">{result.disease}</p>

                <p className="text-sm mt-1">
                  Confidence: {result.confidence}%
                </p>

                <p className="text-sm mt-1">
                  Remedy: {result.remedy}
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-gray-900 text-white py-12">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">

          <div>
            <h3 className="font-bold text-xl mb-2">
              Smart Agri Market
            </h3>

            <p className="text-gray-400 text-sm">
              Empowering farmers with technology.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>

            <p className="flex items-center gap-2 text-sm">
              <Phone size={16}/> 1800‑000‑000
            </p>

            <p className="flex items-center gap-2 text-sm mt-2">
              <Mail size={16}/> support@agri.com
            </p>
          </div>

          <div className="text-gray-400 text-sm">
            © 2026 Smart Agri Market
          </div>

        </div>

      </footer>

    </div>
  );
}