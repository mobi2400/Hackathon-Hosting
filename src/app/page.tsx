import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterSection from "@/components/RegisterSection";
import { WorldMap } from "@/components/ui/world-map";


export default function Home() {
  const cities = [
    { name: "London", lat: 51.5074, lng: 0.1278 },
    { name: "New York", lat: 40.7128, lng: -74.0060 },
    { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
    { name: "Sydney", lat: -33.8688, lng: 151.2093 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Beijing", lat: 39.9042, lng: 116.4074 },
    { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
    { name: "Cairo", lat: 30.0444, lng: 31.2357 },
    { name: "Moscow", lat: 55.7558, lng: 37.6173 },
    { name: "Berlin", lat: 52.5200, lng: 13.4050 },
    { name: "Rome", lat: 41.9028, lng: 12.4964 },
    { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    { name: "Singapore", lat: 1.3521, lng: 103.8198 },
    { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
  ];

  const generateRandomDots = (numDots: number) => {
    const generatedDots = [];
    for (let i = 0; i < numDots; i++) {
      const startCity = cities[Math.floor(Math.random() * cities.length)];
      let endCity = cities[Math.floor(Math.random() * cities.length)];
      while (endCity === startCity) {
        endCity = cities[Math.floor(Math.random() * cities.length)];
      }
      generatedDots.push({
        start: { lat: startCity.lat, lng: startCity.lng, label: startCity.name },
        end: { lat: endCity.lat, lng: endCity.lng, label: endCity.name },
      });
    }
    return generatedDots;
  };

  const dots = generateRandomDots(15); // Generate 15 random connections

  return (
    <>
      <Navbar />
      <div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] z-10 bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 text-transparent bg-clip-text text-3d">TECH MEETS INNOVATION</h1>
     <WorldMap dots={dots} />
      </div>
     
       <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        <RegisterSection />
      </main>
      <Footer />
    </>
  );
}