import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("GNC Engineer");

export default function GNCEngineerPage() {
  return (
    <PageWrapper
      title="GNC Engineer"
      intro="Avionics & Software · Bangalore, India · 1 Opening"
    >
      <Section title="About the Role">
        <li>
          Design guidance, navigation, and control algorithms for autonomous rockets.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Develop control laws and estimators</li>
        <li>Build simulation and validation tools</li>
        <li>Support flight testing</li>
      </Section>

      <Section title="Qualifications">
        <li>Strong control systems background</li>
        <li>Experience with Kalman filtering</li>
      </Section>

      <Section title="What We Offer">
        <li>Work on autonomous flight systems</li>
        <li>High-impact algorithm development</li>
      </Section>

      <Apply role="GNC Engineer" />
    </PageWrapper>
  );
}
