import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Composite Manufacturing Engineer");

export default function CompositeManufacturingEngineerPage() {
  return (
    <PageWrapper
      title="Composite Manufacturing Engineer"
      intro="Structures & Materials · Bangalore, India · 2 Openings"
    >
      {/* ABOUT ROLE */}
      <Section title="About the Role">
        <li>
          As a Composite Manufacturing Engineer at Space Gen, you will design,
          fabricate, and qualify lightweight composite structures for reusable
          launch vehicles operating in extreme environments.
        </li>
      </Section>

      {/* RESPONSIBILITIES */}
      <Section title="Key Responsibilities">
        <li>Develop composite layups and manufacturing processes</li>
        <li>Support tooling design and fabrication</li>
        <li>Inspect and qualify flight hardware</li>
        <li>Collaborate with propulsion and structures teams</li>
      </Section>

      {/* QUALIFICATIONS */}
      <Section title="Qualifications">
        <li>Bachelor’s or Master’s in Mechanical / Aerospace Engineering</li>
        <li>Experience with carbon composite materials</li>
        <li>Hands-on manufacturing or lab experience</li>
      </Section>

      {/* OFFER */}
      <Section title="What We Offer">
        <li>Work on flight hardware that goes to space</li>
        <li>Fast-paced, high-ownership engineering environment</li>
        <li>Opportunity to grow with an early-stage space company</li>
      </Section>

      {/* APPLY */}
      <Apply role="Composite Manufacturing Engineer" />
    </PageWrapper>
  );
}
