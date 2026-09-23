import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

const RESUMES = [
  { label: "Resume — Consulting", href: "/resume-consulting.pdf" },
  { label: "Resume — Product", href: "/resume-product.pdf" },
];

interface ResumeSectionProps {
  /** false when a divider-less CTA strip already precedes this section */
  dividerTop?: boolean;
}

export function ResumeSection({ dividerTop = true }: ResumeSectionProps = {}) {
  return (
    <section
      id="resume"
      className={`${dividerTop ? "hairline-t " : ""}px-4 py-14 md:px-8 md:py-20`}
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {RESUMES.map((resume) => (
          <Button key={resume.href} href={resume.href} target="_blank" rel="noopener noreferrer">
            <FileText size={13} strokeWidth={1.5} />
            {resume.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
