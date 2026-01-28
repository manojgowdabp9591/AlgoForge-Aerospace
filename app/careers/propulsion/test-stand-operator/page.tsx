import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Test Stand Operator");

export default function TestStandOperatorPage() {
  return (
    <PageWrapper
      title="Test Stand Operator"
      intro="Propulsion Engineering · Mahendragiri, Tamil Nadu, India · 2 Openings"
    >
      <Section title="About the Role">
        <li>
          You will operate and maintain propulsion test stands used for hot-fire
          testing of rocket engines and subsystems.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Prepare and execute propulsion test operations</li>
        <li>Monitor test data and safety systems</li>
        <li>Maintain and troubleshoot test infrastructure</li>
      </Section>

      <Section title="Qualifications">
        <li>Hands-on mechanical or test operations experience</li>
        <li>Strong safety mindset</li>
      </Section>

      <Section title="What We Offer">
        <li>Direct involvement in engine testing</li>
        <li>Work in a mission-critical test environment</li>
      </Section>

      <Apply role="Test Stand Operator" />
    </PageWrapper>
  );
}
