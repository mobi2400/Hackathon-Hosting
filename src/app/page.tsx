import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { World } from "@/components/ui/Globe";

export default function Home() {
  const sampleData = [
    {
      order: 1,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: "red",
    },
    {
      order: 2,
      startLat: 51.5074,
      startLng: -0.1278,
      endLat: 48.8566,
      endLng: 2.3522,
      arcAlt: 0.2,
      color: "blue",
    },
  ];

  return (
    <>
      <Navbar />
      <World
        globeConfig={{
          globeColor: "#4169E1",
          
          autoRotate: true,
          autoRotateSpeed: 0.5,
        }}
        data={sampleData}
      />
      <Footer />
    </>
  );
}