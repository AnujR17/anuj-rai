import type { Metadata } from "next";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { projects } from "@/data/projects";
import { workProjectSlugs } from "@/data/work-projects";

export const metadata: Metadata = { title: "Work | Anuj Rai", description: "Eight projects in interaction design, interfaces, connected objects and field research by Anuj Rai." };

export default function Work() {
  const items = workProjectSlugs.map(slug => {
    const project = projects.find(item => item.slug === slug)!;
    const cover = slug === "toki" ? "/portfolio/banners/toki-desk.png" : `/portfolio/banners/${slug}.png`;
    return { slug, title: project.title, cover };
  });
  return <WorkGallery items={items} />;
}
