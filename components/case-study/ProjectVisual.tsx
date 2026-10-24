import Image from "next/image";
import type { Project } from "@/data/case-study";
import { ProjectArtwork } from "./ProjectArtwork";
import styles from "./case-study.module.css";

export function ProjectVisual({ project, linkedToCase = false, presentation = false }: { project: Project; linkedToCase?: boolean; presentation?: boolean }) {
  if (project.visual === "medicine") {
    const screens = <ProjectArtwork project={project} />;
    if (presentation) return screens;
    return <a href={linkedToCase ? `/work/${project.slug}` : "/portfolio/banners/medicine-app.png"} aria-label={linkedToCase ? `View ${project.title} case study` : "View the original medicine interfaces in their mockups at full size"}>{screens}</a>;
  }
  if (!project.image) return null;
  const surface = project.slug === "two-wheeler-dashboard" ? styles.dashboard : project.slug === "medtimer" ? styles.physical : "";
  const image = <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 700px) 90vw, 1000px" />;
  return (
    <figure className={`${styles.visual} ${surface}`}>
      {presentation ? image : <a href={linkedToCase ? `/work/${project.slug}` : project.image.src} aria-label={linkedToCase ? `View ${project.title} case study` : `${project.title} image at full size`}>{image}</a>}
    </figure>
  );
}
