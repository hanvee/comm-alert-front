import Navbar from "./components/header";
import HomeContent from "./components/home";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Emergency Contact", link: "/contact-emergency" },
  { name: "Alert", link: "/alert" } 
];

export default function Home() {
  return (
    <>
      <Navbar navItems={navItems} />
      <HomeContent />
    </>
  );
}
