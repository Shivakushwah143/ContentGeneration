import { Marquee } from "@/components/ui/marquee";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const MarqueeComponent = () => {
  const arr = [
    { logo: Linkedin, name: "LinkedIn" },
    { logo: Instagram, name: "Instagram" },
    { logo: Twitter, name: "X" },
  ];

  return (
    <Marquee>
      {arr.map(({ logo: Logo, name }, index) => (
        <div
          key={index}
          className="relative h-full w-full mx-12 flex items-center justify-center text-2xl font-semibold text-foreground/80"
        >
          <Logo className="h-6 w-6" />
         
          <span className="ml-2">{name}</span>
        </div>
      ))}
    </Marquee>
  );
};

export default MarqueeComponent;
