import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Thermal Protection Systems Lead");

export default function ThermalProtectionPage() {
  return (
    <PageWrapper
      title="Thermal Protection Systems Lead"
      intro="Structures & Materials · Bangalore, India · 1 Opening"
    >
      <Section title="About the Role">
        <li>
          Lead the design and qualification of thermal protection systems for
          launch and reentry environments.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Develop TPS materials and architectures</li>
        <li>Analyze thermal loads and margins</li>
        <li>Lead testing and qualification efforts</li>
      </Section>

      <Section title="Qualifications">
        <li>High-temperature materials experience</li>
        <li>Thermal or aerospace engineering background</li>
      </Section>

      <Section title="What We Offer">
        <li>Technical leadership responsibility</li>
        <li>Work on next-generation space vehicles</li>
      </Section>

      <Apply role="Thermal Protection Systems Lead" />
    </PageWrapper>
  );
}
