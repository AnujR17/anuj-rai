import type { Metadata } from "next";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { projects } from "@/data/projects";
import { workProjectSlugs } from "@/data/work-projects";

export const metadata: Metadata = { title: "Work | Anuj Rai", description: "Eight projects in interaction design, interfaces, connected objects and field research by Anuj Rai." };

export default function Work() {
  const items = workProjectSlugs.map(slug => {
    const project = projects.find(item => item.slug === slug)!;
    return { slug, title: project.title };
  });
  return <WorkGallery items={items} />;
}
