import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Wedding Entity",
    short_name: "Wedding Entity",
    description:
      "Wedding stories shaped around people, place, movement, and feeling.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f7f4",
    theme_color: "#343434",
  };
}
