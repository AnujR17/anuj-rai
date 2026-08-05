import { Container } from "@/components/ui/Container";
import { H1, H2, Body } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <div className="bg-zinc-900 aspect-[3/4] rounded-sm sticky top-32 flex items-center justify-center text-zinc-700">
              [Portrait Image Placeholder]
            </div>
          </div>
          <div className="md:col-span-7">
            <H1 className="mb-8">Design is the process of intentional reduction.</H1>
            <div className="flex flex-col gap-6">
              <Body>
                My approach to design is rooted in understanding complex systems before attempting to simplify them. I believe that true elegance in product design comes not from adding features, but from stripping away everything that isn't absolutely necessary.
              </Body>
              <Body>
                With a background in both engineering and fine arts, I bridge the gap between technical feasibility and human-centered aesthetics. I've spent the last decade working with startups and enterprises to build products that feel both inevitable and effortless.
              </Body>
              <Body>
                When I'm not designing, I'm usually documenting architectural anomalies, studying typography, or reading about behavioral economics.
              </Body>
            </div>
            
            <Divider />
            
            <H2 className="mb-6">Capabilities</H2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-zinc-100 font-medium mb-3">Design</h3>
                <ul className="text-zinc-400 space-y-2 text-sm">
                  <li>UX/UI Design</li>
                  <li>Design Systems</li>
                  <li>Prototyping</li>
                  <li>Interaction Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-zinc-100 font-medium mb-3">Strategy</h3>
                <ul className="text-zinc-400 space-y-2 text-sm">
                  <li>Product Strategy</li>
                  <li>User Research</li>
                  <li>Information Architecture</li>
                  <li>Brand Identity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
