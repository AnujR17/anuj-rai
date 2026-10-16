import { Lab } from "@/components/portfolio/Lab";
import { ResearchSpotlight } from "@/components/portfolio/ResearchSpotlight";
import { ResearchList } from "@/components/portfolio/ResearchList";
import { SelectedWork } from "@/components/concept/SelectedWork";

export default function Work() {
  return (
    <div className="portfolio-shell work-index">
      <header className="work-heading">
        <h1>Selected work</h1>
        <nav className="work-sections" aria-label="Work sections">
          <a href="#design">Design &amp; build</a>
          <a href="#fieldwork">Fieldwork</a>
          <a href="#analysis">Analysis</a>
          <a href="#lab">Experiments</a>
        </nav>
      </header>
      <SelectedWork allProjects id="design" />
      <ResearchSpotlight />
      <ResearchList />
      <Lab />
    </div>
  );
}
