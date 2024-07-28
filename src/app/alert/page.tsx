import Navbar from "@/app/components/header";
import AlertContent from "../components/alert";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Emergency Contact", link: "/contact-emergency" },
  { name: "Alert", link: "/alert" } 
];

export default function ContactEmergency() {
  return (
    <>
      <Navbar navItems={navItems} />
      <AlertContent />
    </>
  );
}
