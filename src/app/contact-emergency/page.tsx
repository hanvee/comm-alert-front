import ContactEmergencyContent from "@/app/components/emergency";
import Navbar from "@/app/components/header";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Emergency Contact", link: "/contact-emergency" },
  { name: "Alert", link: "/alert" } 
];

export default function ContactEmergency() {
  return (
    <>
      <Navbar navItems={navItems} />
      <ContactEmergencyContent />
    </>
  );
}
