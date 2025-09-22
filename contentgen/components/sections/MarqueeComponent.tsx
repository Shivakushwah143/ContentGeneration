import { Marquee } from "@/components/ui/marquee";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MarqueeComponent = () => {
  const arr = [
    { logo: FaLinkedinIn, name: "LinkedIn" },
    { logo: FaInstagram, name: "Instagram" },
    { logo: FaXTwitter, name: "X" },
  ];

  return (
    <Marquee>
      {arr.map(({ logo: Logo, name }, index) => (
        <div
          key={index}
          className="relative h-full w-full mx-12 flex items-center justify-center text-4xl font-bold dark:text-white text-black"
        >
          <Logo />
         
          <span className="ml-2">{name}</span>
        </div>
      ))}
    </Marquee>
  );
};

export default MarqueeComponent;