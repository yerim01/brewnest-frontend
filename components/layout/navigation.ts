export const navigation = {
  categories: [
    {
      id: "coffee",
      name: "Coffee",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "/nav-coffee-1.png",
          imageAlt:
            "Coffee - New Arrivals",
        },
        {
          name: "Shop All Coffee",
          href: "#",
          imageSrc:
            "/nav-coffee-2.png",
          imageAlt:
            "Coffee - Shop All",
        },
      ],
      sections: [
        {
          id: "shop-all-coffee",
          name: "Shop All Coffee",
          href: "#",
        },
        {
          id: "roast-profile",
          name: "Roast Profile",
          items: [
            { name: "Light", href: "#" },
            { name: "Medium", href: "#" },
            { name: "Dark", href: "#" },
            { name: "Decaf", href: "#" },
          ],
        },
      ],
    },
    {
      id: "matcha",
      name: "Matcha",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "/nav-matcha-1.png",
          imageAlt:
            "Matcha - New Arrivals.",
        },
        {
          name: "Shop All Matcha",
          href: "#",
          imageSrc:
            "/nav-matcha-2.png",
          imageAlt:
            "Matcha - Shop All",
        },
      ],
      sections: [
        {
          id: "shop-all-matcha",
          name: "Shop All Matcha",
          href: "#",
        },
      ],
    },
  ],
  pages: [
    { name: "Sale", href: "#" },
    { name: "Stores", href: "#" },
  ],
};