import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterSection from "@/components/RegisterSection";
import { World } from "@/components/ui/Globe";

export default function Home() {
  const sampleData = [
  { order: 1, startLat: 34.28, startLng: 69.11, endLat: 41.18, endLng: 19.49, arcAlt: 0.3, color: '#FF0000' },
  { order: 2, startLat: 36.42, startLng: 3.08, endLat: -14.16, endLng: -170.43, arcAlt: 0.8, color: '#00FF00' },
  { order: 3, startLat: 42.31, startLng: 1.32, endLat: -8.5, endLng: 13.15, arcAlt: 0.6, color: '#0000FF' },
  { order: 4, startLat: 17.127, startLng: -61.846, endLat: -36.3, endLng: -60, arcAlt: 0.2, color: '#FF0000' },
  { order: 5, startLat: 40.1, startLng: 44.31, endLat: -35.15, endLng: 149.08, arcAlt: 0.7, color: '#00FF00' },
  { order: 6, startLat: 48.12, startLng: 16.22, endLat: 40.29, endLng: 49.56, arcAlt: 0.4, color: '#0000FF' },
  { order: 7, startLat: 25.05, startLng: -77.2, endLat: 26.1, endLng: 50.3, arcAlt: 0.5, color: '#FF0000' },
  { order: 8, startLat: 23.43, startLng: 90.26, endLat: 13.05, endLng: -59.3, arcAlt: 0.9, color: '#00FF00' },
  { order: 9, startLat: 53.52, startLng: 27.3, endLat: 50.51, endLng: 4.21, arcAlt: 0.1, color: '#0000FF' },
  { order: 10, startLat: 17.18, startLng: -88.3, endLat: 6.23, endLng: 2.42, arcAlt: 0.3, color: '#FF0000' },
  { order: 11, startLat: 27.31, startLng: 89.45, endLat: -16.2, endLng: -68.1, arcAlt: 0.8, color: '#00FF00' },
  { order: 12, startLat: 43.52, startLng: 18.26, endLat: -24.45, endLng: 25.57, arcAlt: 0.6, color: '#0000FF' },
  { order: 13, startLat: -15.47, startLng: -47.55, endLat: 4.52, endLng: 115, arcAlt: 0.2, color: '#FF0000' },
  { order: 14, startLat: 42.45, startLng: 23.2, endLat: 12.15, endLng: -1.3, arcAlt: 0.7, color: '#00FF00' },
  { order: 15, startLat: -3.16, startLng: 29.18, endLat: 11.33, endLng: 104.55, arcAlt: 0.4, color: '#0000FF' },
  { order: 16, startLat: 3.5, startLng: 11.35, endLat: 45.27, endLng: -75.42, arcAlt: 0.5, color: '#FF0000' },
  { order: 17, startLat: 15.02, startLng: -23.34, endLat: 34.28, endLng: 69.11, arcAlt: 0.9, color: '#00FF00' },
  { order: 18, startLat: 41.18, startLng: 19.49, endLat: 36.42, endLng: 3.08, arcAlt: 0.1, color: '#0000FF' },
  { order: 19, startLat: -14.16, startLng: -170.43, endLat: 42.31, endLng: 1.32, arcAlt: 0.3, color: '#FF0000' },
  { order: 20, startLat: -8.5, startLng: 13.15, endLat: 17.127, endLng: -61.846, arcAlt: 0.8, color: '#00FF00' },
  { order: 21, startLat: -36.3, startLng: -60, endLat: 40.1, endLng: 44.31, arcAlt: 0.6, color: '#0000FF' },
  { order: 22, startLat: -35.15, startLng: 149.08, endLat: 48.12, endLng: 16.22, arcAlt: 0.2, color: '#FF0000' },
  { order: 23, startLat: 40.29, startLng: 49.56, endLat: 25.05, endLng: -77.2, arcAlt: 0.7, color: '#00FF00' },
  { order: 24, startLat: 26.1, startLng: 50.3, endLat: 23.43, endLng: 90.26, arcAlt: 0.4, color: '#0000FF' },
  { order: 25, startLat: 13.05, startLng: -59.3, endLat: 53.52, endLng: 27.3, arcAlt: 0.5, color: '#FF0000' },
  { order: 26, startLat: 50.51, startLng: 4.21, endLat: 17.18, endLng: -88.3, arcAlt: 0.9, color: '#00FF00' },
  { order: 27, startLat: 6.23, startLng: 2.42, endLat: 27.31, endLng: 89.45, arcAlt: 0.1, color: '#0000FF' },
  { order: 28, startLat: -16.2, startLng: -68.1, endLat: 43.52, endLng: 18.26, arcAlt: 0.3, color: '#FF0000' },
  { order: 29, startLat: -24.45, startLng: 25.57, endLat: -15.47, endLng: -47.55, arcAlt: 0.8, color: '#00FF00' },
  { order: 30, startLat: 4.52, startLng: 115, endLat: 42.45, endLng: 23.2, arcAlt: 0.6, color: '#0000FF' },
  { order: 31, startLat: 12.15, startLng: -1.3, endLat: -3.16, endLng: 29.18, arcAlt: 0.2, color: '#FF0000' },
  { order: 32, startLat: 11.33, startLng: 104.55, endLat: 3.5, endLng: 11.35, arcAlt: 0.7, color: '#00FF00' },
  { order: 33, startLat: 45.27, startLng: -75.42, endLat: 15.02, endLng: -23.34, arcAlt: 0.4, color: '#0000FF' },
  { order: 34, startLat: 34.28, startLng: 69.11, endLat: -14.16, endLng: -170.43, arcAlt: 0.5, color: '#FF0000' },
  { order: 35, startLat: 41.18, startLng: 19.49, endLat: 42.31, endLng: 1.32, arcAlt: 0.9, color: '#00FF00' },
  { order: 36, startLat: 36.42, startLng: 3.08, endLat: -8.5, endLng: 13.15, arcAlt: 0.1, color: '#0000FF' },
  { order: 37, startLat: -14.16, startLng: -170.43, endLat: 17.127, endLng: -61.846, arcAlt: 0.3, color: '#FF0000' },
  { order: 38, startLat: 42.31, startLng: 1.32, endLat: -36.3, endLng: -60, arcAlt: 0.8, color: '#00FF00' },
  { order: 39, startLat: -8.5, startLng: 13.15, endLat: 40.1, endLng: 44.31, arcAlt: 0.6, color: '#0000FF' },
  { order: 40, startLat: 17.127, startLng: -61.846, endLat: -35.15, endLng: 149.08, arcAlt: 0.2, color: '#FF0000' },
  { order: 41, startLat: -36.3, startLng: -60, endLat: 48.12, endLng: 16.22, arcAlt: 0.7, color: '#00FF00' },
  { order: 42, startLat: 40.1, startLng: 44.31, endLat: 40.29, endLng: 49.56, arcAlt: 0.4, color: '#0000FF' },
  { order: 43, startLat: -35.15, startLng: 149.08, endLat: 25.05, endLng: -77.2, arcAlt: 0.5, color: '#FF0000' },
  { order: 44, startLat: 48.12, startLng: 16.22, endLat: 26.1, endLng: 50.3, arcAlt: 0.9, color: '#00FF00' },
  { order: 45, startLat: 40.29, startLng: 49.56, endLat: 23.43, endLng: 90.26, arcAlt: 0.1, color: '#0000FF' },
  { order: 46, startLat: 25.05, startLng: -77.2, endLat: 13.05, endLng: -59.3, arcAlt: 0.3, color: '#FF0000' },
  { order: 47, startLat: 26.1, startLng: 50.3, endLat: 53.52, endLng: 27.3, arcAlt: 0.8, color: '#00FF00' },
  { order: 48, startLat: 23.43, startLng: 90.26, endLat: 50.51, endLng: 4.21, arcAlt: 0.6, color: '#0000FF' },
  { order: 49, startLat: 13.05, startLng: -59.3, endLat: 17.18, endLng: -88.3, arcAlt: 0.2, color: '#FF0000' },
  { order: 50, startLat: 53.52, startLng: 27.3, endLat: 6.23, endLng: 2.42, arcAlt: 0.7, color: '#00FF00' }
];

  return (
    <>
      <Navbar />
      <div className=" h-screen w-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
       <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white [text-shadow:1px_1px_0_theme(colors.blue.500),2px_2px_0_theme(colors.blue.600),3px_3px_0_theme(colors.blue.700)]">TECH MEETS INNOVATION</h1>
      <World
        globeConfig={{
  globeColor: "#060606",
  showAtmosphere: true,
  atmosphereColor: "#4169E1",
  atmosphereAltitude: 0.25,
  emissive: "FFFFFF",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "#FFA500",
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
