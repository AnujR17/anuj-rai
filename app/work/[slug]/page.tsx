import { Container } from "@/components/ui/Container";
import { H1, H2, H3, Lead, Body } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/components/utils/cn";

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudy({ params }: Props) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <Container className="mb-16">
        <Link href="/work" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-100 transition-colors mb-12">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Work
        </Link>
        <div className="text-zinc-500 text-sm mb-6 font-medium tracking-wide uppercase">
          {project.type} &mdash; {project.year}
        </div>
        <H1 className="mb-8">{project.title}</H1>
        <Lead className="max-w-3xl">{project.summary}</Lead>
      </Container>

      {/* Hero Image */}
      <div className="w-full max-w-[1400px] mx-auto px-6 mb-24">
        <div className={cn("aspect-[21/9] rounded-sm flex items-center justify-center", project.accentColor)}>
          [Hero Image Placeholder]
        </div>
      </div>

      {/* Overview & My Role */}
      <Container className="mb-24">
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-8">
            <H2 className="mb-6">Overview</H2>
            <Body>{project.overview}</Body>
          </div>
          <div className="md:col-span-4 bg-zinc-900/50 p-8 rounded-sm">
            <h3 className="text-lg font-medium text-zinc-100 mb-6 border-b border-zinc-800 pb-4">My Role</h3>
            
            {project.roles.led.length > 0 && (
              <div className="mb-6">
                <div className="text-sm text-zinc-500 mb-2">Led</div>
                <ul className="text-zinc-300 text-sm space-y-1">
                  {project.roles.led.map((role, i) => <li key={i}>{role}</li>)}
                </ul>
              </div>
            )}
            
            {project.roles.contributed.length > 0 && (
              <div className="mb-6">
                <div className="text-sm text-zinc-500 mb-2">Contributed</div>
                <ul className="text-zinc-300 text-sm space-y-1">
                  {project.roles.contributed.map((role, i) => <li key={i}>{role}</li>)}
                </ul>
              </div>
            )}
            
            {project.roles.team.length > 0 && (
              <div>
                <div className="text-sm text-zinc-500 mb-2">Team</div>
                <ul className="text-zinc-300 text-sm space-y-1">
                  {project.roles.team.map((role, i) => <li key={i}>{role}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Problem & Context */}
      <Container className="mb-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <H3 className="mb-4">The Problem</H3>
            <Body>{project.problem}</Body>
          </div>
          <div>
            <H3 className="mb-4">Context</H3>
            <Body>{project.context}</Body>
          </div>
        </div>
      </Container>

      {/* Research Placeholder Image */}
      <Container className="mb-24">
        <div className="bg-zinc-900 aspect-video rounded-sm flex items-center justify-center text-zinc-700">
          [Research Artifact Placeholder]
        </div>
      </Container>

      {/* Research & Insights */}
      <Container className="mb-24">
        <H2 className="mb-6">Research & Insights</H2>
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-7">
            <Body>{project.research}</Body>
          </div>
          <div className="md:col-span-5">
            <div className="flex flex-col gap-6">
              {project.insights.map((insight, i) => (
                <div key={i} className="pl-6 border-l-2 border-zinc-800">
                  <Body className="text-zinc-300">{insight}</Body>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Design Decisions & Iterations */}
      <Container className="mb-24">
        <Divider />
        <div className="mt-16">
          <H2 className="mb-6">Design Decisions</H2>
          <div className="grid md:grid-cols-12 gap-16 mb-16">
            <div className="md:col-span-5">
              <ul className="space-y-4">
                {project.designDecisions.map((decision, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-zinc-900 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0 text-zinc-500">{i + 1}</span>
                    <Body className="text-zinc-300">{decision}</Body>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-7">
               <div className="bg-zinc-900 aspect-[4/3] rounded-sm flex items-center justify-center text-zinc-700">
                [Diagram / Architecture Placeholder]
              </div>
            </div>
          </div>
          
          <H3 className="mb-4">Iterations</H3>
          <Body className="max-w-3xl mb-8">{project.iterations}</Body>
          <div className="grid grid-cols-2 gap-8">
             <div className="bg-zinc-900 aspect-square rounded-sm flex items-center justify-center text-zinc-700 text-center p-4">
                [Early Prototype Placeholder]
              </div>
              <div className="bg-zinc-900 aspect-square rounded-sm flex items-center justify-center text-zinc-700 text-center p-4">
                [Refined Prototype Placeholder]
              </div>
          </div>
        </div>
      </Container>

      {/* Solution & Outcome */}
      <Container className="mb-24">
        <H2 className="mb-6">Solution & Outcome</H2>
        <div className="grid md:grid-cols-12 gap-16 mb-16">
          <div className="md:col-span-8">
            <Body className="mb-8">{project.solution}</Body>
          </div>
          <div className="md:col-span-4">
            <div className="bg-zinc-900/50 p-8 rounded-sm">
              <h3 className="text-lg font-medium text-zinc-100 mb-4">Outcome</h3>
              <Body className="text-sm">{project.outcome}</Body>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-zinc-900 aspect-[21/9] rounded-sm flex items-center justify-center text-zinc-700 mb-16">
          [Final Solution / Prototype Video Placeholder]
        </div>
      </Container>

      {/* Reflection */}
      <Container>
        <Divider />
        <div className="mt-16 max-w-3xl">
          <H2 className="mb-6">Reflection</H2>
          <Body>{project.reflection}</Body>
        </div>
      </Container>
      
      {/* Next Project (Optional) */}
      <Container className="mt-32">
        <div className="text-center">
          <Link href="/work" className="inline-flex items-center justify-center border border-zinc-800 hover:border-zinc-700 bg-transparent text-zinc-300 px-6 py-3 rounded-full text-sm font-medium transition-colors">
            View All Work
          </Link>
        </div>
      </Container>
    </div>
  );
}
