import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Combustion Devices Engineer");

export default function CombustionEngineerPage() {
  return (
    <PageWrapper
      title="Combustion Devices Engineer"
      intro="Propulsion Engineering · Bangalore, India · 1 Opening"
    >
      <Section title="About the Role">
        <li>
          You will design, analyze, and test combustion systems for high-performance
          liquid rocket engines operating at extreme pressures and temperatures.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Design injector and combustion chamber geometries</li>
        <li>Analyze combustion stability and performance</li>
        <li>Support hot-fire engine testing campaigns</li>
        <li>Collaborate with turbomachinery and test teams</li>
      </Section>

      <Section title="Qualifications">
        <li>Bachelor’s or Master’s in Aerospace / Mechanical Engineering</li>
        <li>Strong background in thermodynamics and fluid mechanics</li>
        <li>Experience with propulsion or high-pressure systems preferred</li>
      </Section>

      <Section title="What We Offer">
        <li>Hands-on ownership of flight propulsion hardware</li>
        <li>Fast-paced development environment</li>
        <li>Direct impact on reusable launch vehicle missions</li>
      </Section>

      <Apply role="Combustion Devices Engineer" />
    </PageWrapper>
  );
}
