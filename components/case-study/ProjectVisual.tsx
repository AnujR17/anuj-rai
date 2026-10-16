import Image from "next/image";
import type { Project } from "@/data/case-study";
import MedicineScreen from "./MedicineScreen";
import CaregiverScreen from "./CaregiverScreen";
import styles from "./case-study.module.css";

export function ProjectVisual({ project, linkedToCase = false, presentation = false }: { project: Project; linkedToCase?: boolean; presentation?: boolean }) {
  if (project.visual === "medicine") {
    const screens = (
      <div className={styles.phones}>
        <div className={styles.phone} role="img" aria-label="Original medicine-taker interface with the current dose, recording action and daily schedule">
          <div className={styles.phoneUi} aria-hidden="true"><MedicineScreen /></div>
        </div>
        <div className={styles.phone} role="img" aria-label="Original caregiver interface with daily progress, dose records and a call action">
          <div className={styles.phoneUi} aria-hidden="true"><CaregiverScreen /></div>
        </div>
      </div>
    );
    return linkedToCase && !presentation ? <a href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>{screens}</a> : screens;
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
