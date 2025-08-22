import { Oleo_Script } from "next/font/google";
// Archivo_Black, Abril_Fatface, Oleo_Script
const oleoScript = Oleo_Script({
  weight: "700",
  subsets: ["latin"],
});

type CategoryHeaderProps = {
  categoryId: string;
};

const categoryBackgrounds: Record<string, string> = {
  coffee: "/category-header-coffee.png",
  matcha: "/category-header-matcha.png",
};

export default function CategoryHeader({ categoryId }: CategoryHeaderProps) {
  const bgImage = categoryBackgrounds[categoryId];

  return (
    <div
      className="relative h-84 w-full flex items-center justify-center text-cente text-[var(--brand-color-light)]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />{" "}
      <h1
        className={`relative z-10 text-3xl font-bold capitalize md:text-5xl ${oleoScript.className}`}
      >
        {categoryId === "coffee"
          ? "Crafted Coffee, Crafted Moments"
          : "Pure Green Goodness"}
      </h1>
    </div>
  );
}
