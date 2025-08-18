import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterSection from "@/components/RegisterSection";
import { World } from "@/components/ui/Globe";

export default function Home() {
  const sampleData = [
  {
    order: 1,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.25,
    color: '#64B5F6',
  },
  {
    order: 2,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.15,
    color: '#64B5F6',
  },
  {
    order: 3,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.4,
    color: '#4169E1',
  },
  {
    order: 4,
    startLat: 19.0760,
    startLng: 72.8777,
    endLat: 52.5200,
    endLng: 13.4050,
    arcAlt: 0.35,
    color: '#4169E1',
  },
  {
    order: 5,
    startLat: -23.5558,
    startLng: -46.6396,
    endLat: -33.9249,
    endLng: 18.4241,
    arcAlt: 0.3,
    color: '#4169E1',
  },
  {
    order: 6,
    startLat: 39.9042,
    startLng: 116.4074,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.5,
    color: '#64B5F6',
  },
];

  return (
    <>
      <Navbar />
      <div className=" h-screen w-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
      <World
        globeConfig={{
  globeColor: "#000000",
  showAtmosphere: true,
  atmosphereColor: "#4169E1",
  atmosphereAltitude: 0.25,
  emissive: "FFFFFF",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#4169E1",
  directionalLeftLight: "#4169E1",
  directionalTopLight: "#4169E1",
  pointLight: "#4169E1",
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
}}
        data={sampleData}
      />
      </div>
       <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        <RegisterSection />
      </main>
      <Footer />
    </>
  );
}
