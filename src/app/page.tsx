import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterSection from "@/components/RegisterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        <RegisterSection />
      </main>
      <Footer />
    </>
  );
}
