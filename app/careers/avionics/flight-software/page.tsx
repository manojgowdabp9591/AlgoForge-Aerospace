import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Flight Software Engineer");

export default function FlightSoftwareEngineerPage() {
  return (
    <PageWrapper
      title="Flight Software Engineer (C++ / Rust)"
      intro="Avionics & Software · Bangalore, India · 2 Openings"
    >
      <Section title="About the Role">
        <li>
          Develop real-time flight software for autonomous launch and recovery.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Write safety-critical flight software</li>
        <li>Develop simulation and test frameworks</li>
        <li>Support flight testing</li>
      </Section>

      <Section title="Qualifications">
        <li>Strong C++ or Rust experience</li>
        <li>Embedded or real-time systems background</li>
      </Section>

      <Section title="What We Offer">
        <li>Direct impact on autonomous flight</li>
        <li>Exposure to real launch missions</li>
      </Section>

      <Apply role="Flight Software Engineer" />
    </PageWrapper>
  );
}
