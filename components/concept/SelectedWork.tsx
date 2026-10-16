import { home } from "@/data/home";
import { mainProjects } from "@/data/projects";
import { ProjectVisual } from "@/components/case-study/ProjectVisual";
import { ProjectCollage } from "./ProjectCollage";

export function SelectedWork({ allProjects = false, id = "work" }: { allProjects?: boolean; id?: string }) {
  const selection = allProjects ? mainProjects : home.work.map(item => mainProjects.find(project => project.slug === item.slug)!);
  const items = selection.map(project => {
    const supplied = home.work.find(item => item.slug === project.slug);
    return {
      slug: project.slug,
      title: supplied?.title ?? project.title,
      descriptor: supplied?.descriptor,
      description: supplied?.description ?? project.summary,
      visual: <ProjectVisual project={project} presentation />,
    };
  });
  return <ProjectCollage id={id} items={items} embedded={allProjects} />;
}
