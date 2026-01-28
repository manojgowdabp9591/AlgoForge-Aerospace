import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Ground Support Equipment Engineer");

export default function GroundSupportEngineerPage() {
  return (
    <PageWrapper
      title="Ground Support Equipment Engineer"
      intro="Launch Operations · Sriharikota, Andhra Pradesh, India · 2 Openings"
    >
      <Section title="About the Role">
        <li>
          Design and maintain ground support equipment used for launch vehicle
          integration and testing.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Design and maintain GSE hardware</li>
        <li>Support vehicle integration and testing</li>
        <li>Maintain launch site infrastructure</li>
      </Section>

      <Section title="Qualifications">
        <li>Mechanical or systems engineering background</li>
        <li>Hands-on fabrication experience</li>
      </Section>

      <Section title="What We Offer">
        <li>Work at the center of launch operations</li>
        <li>Direct involvement in launch campaigns</li>
      </Section>

      <Apply role="Ground Support Equipment Engineer" />
    </PageWrapper>
  );
}
