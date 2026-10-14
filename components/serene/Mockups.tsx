import Image from "next/image";
import MedicineScreen from "./MedicineScreen";
import CaregiverScreen from "./CaregiverScreen";
export function PhonePair() {
  return (
    <div
      className="phone-pair"
      aria-label="Original medicine app interfaces in phone mockups"
    >
      <div className="phone-frame">
        <div className="phone-ui" aria-hidden="true">
          <MedicineScreen />
        </div>
        <span className="phone-label">Medicine taker</span>
      </div>
      <div className="phone-frame">
        <div className="phone-ui" aria-hidden="true">
          <CaregiverScreen />
        </div>
        <span className="phone-label">Caregiver</span>
      </div>
    </div>
  );
}
export function Laptop() {
  return (
    <div className="laptop">
      <div className="laptop-screen">
        <div className="web-bar">
          <i />
          <i />
          <i />
          <span>India in Orbit</span>
        </div>
        <Image
          src="/portfolio/india-in-orbit.png"
          alt="India in Orbit’s rendered Earth and introduction, shown inside a laptop mockup"
          width={1280}
          height={850}
        />
      </div>
      <div className="laptop-base" />
    </div>
  );
}
export function DashboardPlate() {
  return (
    <div className="dashboard-plate">
      <div className="cockpit-static">
        <Image
          src="/portfolio/cockpit.jpg"
          alt="Royal Enfield Himalayan 450 cockpit photograph by Ajay Ananth"
          width={1024}
          height={768}
        />
        <div className="cluster-mask">
          <Image
            src="/portfolio/himalayan-dashboard.png"
            alt="Anuj’s original circular dashboard concept, composited into the bike’s display housing"
            width={385}
            height={385}
          />
        </div>
      </div>
    </div>
  );
}
export function ProductPlate({ physical = false }: { physical?: boolean }) {
  return (
    <div className={`product-plate ${physical ? "clay" : "olive"}`}>
      <Image
        src={physical ? "/portfolio/physical.jpg" : "/portfolio/toki.jpg"}
        alt={
          physical
            ? "Original physical Meditimer model from the project’s Figma file"
            : "Toki concept visualization from the original project Figma file; not a photograph of a built product"
        }
        width={physical ? 700 : 830}
        height={physical ? 500 : 830}
      />
    </div>
  );
}
