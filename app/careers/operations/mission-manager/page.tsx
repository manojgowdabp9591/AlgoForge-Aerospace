import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Mission Manager");

export default function MissionManagerPage() {
  return (
    <PageWrapper
      title="Mission Manager"
      intro="Launch Operations · Sriharikota, Andhra Pradesh, India · 1 Opening"
    >
      <Section title="About the Role">
        <li>
          Lead mission planning and execution across launch operations.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Plan and execute launch campaigns</li>
        <li>Coordinate cross-functional teams</li>
        <li>Ensure mission success and safety</li>
      </Section>

      <Section title="Qualifications">
        <li>Aerospace operations experience</li>
        <li>Strong leadership skills</li>
      </Section>

      <Section title="What We Offer">
        <li>Mission-level ownership</li>
        <li>Leadership role in launch operations</li>
      </Section>

      <Apply role="Mission Manager" />
    </PageWrapper>
  );
}
