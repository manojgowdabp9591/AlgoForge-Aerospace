import Apply from "@/app/components/Apply";
import { PageWrapper, Section } from "@/app/components/CareersLayout";
import { jobMetadata } from "@/app/components/JobMeta";
export const metadata = jobMetadata("Embedded Systems Developer");

export default function EmbeddedSystemsDeveloperPage() {
  return (
    <PageWrapper
      title="Embedded Systems Developer"
      intro="Avionics & Software · Hyderabad, Telangana, India · 1 Opening"
    >
      <Section title="About the Role">
        <li>
          Develop low-level firmware for flight computers and avionics hardware.
        </li>
      </Section>

      <Section title="Key Responsibilities">
        <li>Develop embedded firmware</li>
        <li>Interface with sensors and actuators</li>
        <li>Debug hardware-software interactions</li>
      </Section>

      <Section title="Qualifications">
        <li>Embedded C/C++ experience</li>
        <li>RTOS knowledge preferred</li>
      </Section>

      <Section title="What We Offer">
        <li>Hands-on avionics development</li>
        <li>Work on flight-critical systems</li>
      </Section>

      <Apply role="Embedded Systems Developer" />
    </PageWrapper>
  );
}
