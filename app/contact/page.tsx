import { Container } from "@/components/ui/Container";
import { H1, Body } from "@/components/ui/Typography";

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-2xl">
          <H1 className="mb-6">Let's build something intentional.</H1>
          <Body className="mb-12">
            I am currently open to new opportunities. If you have a project in mind, 
            or just want to discuss typography and system design, feel free to reach out.
          </Body>
          
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-sm text-zinc-500 mb-2">Email</div>
              <a href="mailto:hello@example.com" className="text-xl text-zinc-100 hover:text-zinc-400 transition-colors border-b border-zinc-800 pb-1">
                hello@example.com
              </a>
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-2">Social</div>
              <div className="flex gap-6">
                <a href="#" className="text-lg text-zinc-100 hover:text-zinc-400 transition-colors">LinkedIn</a>
                <a href="#" className="text-lg text-zinc-100 hover:text-zinc-400 transition-colors">Twitter</a>
                <a href="#" className="text-lg text-zinc-100 hover:text-zinc-400 transition-colors">Read.cv</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
