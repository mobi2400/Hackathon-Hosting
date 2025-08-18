import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterSection from "@/components/RegisterSection";
import { WorldMap } from "@/components/ui/world-map";


export default function Home() {
  const dummyDots = [
    {
      start: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
      end: { lat: 40.7128, lng: -74.0060, label: "New York" },
    },
    {
      start: { lat: 51.5074, lng: 0.1278, label: "London" },
      end: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
    },
    {
      start: { lat: 34.685, lng: 135.5, label: "Osaka" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    {
      start: { lat: 28.6139, lng: 77.2090, label: "New Delhi" },
      end: { lat: 31.2304, lng: 121.4737, label: "Shanghai" },
    },
  ];

  return (
    <>
      <Navbar />
      <div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] z-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-3d">TECH MEETS INNOVATION</h1>
     <WorldMap dots={dummyDots} />
      </div>
     
       <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        <RegisterSection />
      </main>
      <Footer />
    </>
  );
}
