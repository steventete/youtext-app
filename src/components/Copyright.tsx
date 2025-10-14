import { Github } from "lucide-react";

const Copyright = () => {
  return (
    <a
      href="https://github.com/StevenTete"
      target="_blank"
      rel="noopener noreferrer"
      className="
        absolute top-7 right-7
        flex items-center justify-center
        size-12
        rounded-full
        bg-black/60
        p-3
        hover:scale-110
        transition-transform duration-200
        shadow-lg
      "
    >
      <Github className="size-12 text-white" />
    </a>
  );
};

export default Copyright;
