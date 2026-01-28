import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Turbomachinery Specialist");

export default function TurbomachinerySpecialistPage() {
  return (
    <PageWrapper
      title="Turbomachinery Specialist"
      intro="Propulsion Engineering · Bangalore, India · 1 Opening"
    >
      <Section title="About the Role">
        <li>
          You will design and validate turbopumps and rotating machinery that power
          Space Gen’s reusable rocket engines.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Design turbopumps and rotating assemblies</li>
        <li>Analyze vibration, fatigue, and thermal loads</li>
        <li>Support manufacturing and component testing</li>
      </Section>

      <Section title="Qualifications">
        <li>Strong mechanical engineering fundamentals</li>
        <li>Experience with turbomachinery or rotating systems</li>
        <li>CFD or FEA experience is a plus</li>
      </Section>

      <Section title="What We Offer">
        <li>Ownership of critical propulsion subsystems</li>
        <li>Exposure to full engine development lifecycle</li>
      </Section>

      <Apply role="Turbomachinery Specialist" />
    </PageWrapper>
  );
}
