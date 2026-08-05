import { Container } from "@/components/ui/Container";
import { H1, Lead, Body } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function Home() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="pt-32 pb-16">
      <Container>
        <div className="max-w-3xl">
          <H1 className="mb-8">Understanding complex systems to design simple solutions.</H1>
          <Lead className="mb-12 max-w-2xl">
            I am a Senior Product Designer, UX Designer, and Creative Director. 
            I believe that every visual element should have a reason to exist, and that 
            clarity and reasoning always precede execution.
          </Lead>
        </div>
      </Container>

      <Container>
        <Divider />
      </Container>

      <Container>
        <div className="flex flex-col gap-24">
          {featuredProjects.map((project) => (
            <div key={project.slug} className="group cursor-pointer">
              <Link href={`/work/${project.slug}`} className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 bg-zinc-900 aspect-video rounded-sm overflow-hidden relative">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                    [Project Image Placeholder]
                  </div>
                </div>
                <div className="md:col-span-5 flex flex-col justify-center h-full pt-4 md:pt-0">
                  <div className="text-zinc-500 text-sm mb-4 font-medium tracking-wide uppercase">
                    {project.type} &mdash; {project.year}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-zinc-100 mb-4 group-hover:text-zinc-300 transition-colors">
                    {project.title}
                  </h3>
                  <Body className="mb-8">{project.summary}</Body>
                  <div className="flex items-center text-sm font-medium text-zinc-100 group-hover:text-zinc-400 transition-colors">
                    View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <Link href="/work" className="inline-flex items-center justify-center border border-zinc-800 hover:border-zinc-700 bg-transparent text-zinc-300 px-6 py-3 rounded-full text-sm font-medium transition-colors">
            View All Work
          </Link>
        </div>
      </Container>
    </div>
  );
}
