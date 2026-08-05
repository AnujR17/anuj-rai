import { Container } from "@/components/ui/Container";
import { H1, Body } from "@/components/ui/Typography";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export default function Work() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <H1 className="mb-6">Selected Work</H1>
        <Body className="max-w-2xl mb-24">
          A collection of projects focusing on deep research, structured reasoning, and intentional execution.
        </Body>

        <div className="grid grid-cols-1 gap-32">
          {projects.map((project) => (
            <div key={project.slug} className="group">
              <Link href={`/work/${project.slug}`}>
                <div className="bg-zinc-900 aspect-[21/9] rounded-sm mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                    [Large Project Image Placeholder]
                  </div>
                </div>
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-8">
                    <h2 className="text-3xl font-medium text-zinc-100 mb-4 group-hover:text-zinc-300 transition-colors">
                      {project.title}
                    </h2>
                    <Body>{project.summary}</Body>
                  </div>
                  <div className="md:col-span-4 flex md:justify-end items-start md:mt-2">
                    <div className="inline-flex items-center text-sm font-medium text-zinc-100 border-b border-zinc-700 pb-1 group-hover:border-zinc-400 transition-colors">
                      Read Case Study <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
