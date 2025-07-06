import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ConsultationData } from "../types/consultation";

interface ConsultationNotificationProps {
  consultation: ConsultationData & { userEmail?: string };
  userEmail?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export const ConsultationNotification = ({
  consultation,
  contactEmail,
  contactPhone,
}: ConsultationNotificationProps) => (
  <Html>
    <Head />
    <Preview>New consultation booking received</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Consultation Booking</Heading>
        <Text style={text}>
          A new consultation has been booked. Please review the details below:
          {(contactEmail || contactPhone) && (
            <>
              <br />
              <br />
              <strong>For questions or support, please contact:</strong>
              <br />
              {contactEmail && `Email: ${contactEmail}`}
              {contactEmail && contactPhone && <br />}
              {contactPhone && `Phone: ${contactPhone}`}
            </>
          )}
        </Text>

        <Section style={container}>
          <Heading style={h2}>Patient Information</Heading>
          <Text style={text}>
            <strong>Name:</strong> {consultation.firstName}{" "}
            {consultation.lastName}
          </Text>
          <Text style={text}>
            <strong>Email:</strong> {consultation.email}
          </Text>
          <Text style={text}>
            <strong>Phone:</strong> {consultation.phone}
          </Text>
          <Text style={text}>
            <strong>Date of Birth:</strong> {consultation.dateOfBirth}
          </Text>
          <Text style={text}>
            <strong>Gender:</strong> {consultation.gender}
          </Text>
        </Section>

        <Section style={container}>
          <Heading style={h2}>Consultation Details</Heading>
          <Text style={text}>
            <strong>Type:</strong> {consultation.consultationType}
          </Text>
          <Text style={text}>
            <strong>Preferred Date:</strong> {consultation.preferredDate}
          </Text>
          <Text style={text}>
            <strong>Preferred Time:</strong> {consultation.preferredTime}
          </Text>
          <Text style={text}>
            <strong>Urgency:</strong> {consultation.urgency}
          </Text>
        </Section>

        <Section style={container}>
          <Heading style={h2}>Medical Information</Heading>
          {consultation.symptoms && (
            <Text style={text}>
              <strong>Symptoms:</strong> {consultation.symptoms}
            </Text>
          )}
          {consultation.medicalHistory && (
            <Text style={text}>
              <strong>Medical History:</strong> {consultation.medicalHistory}
            </Text>
          )}
          {consultation.medications && (
            <Text style={text}>
              <strong>Current Medications:</strong> {consultation.medications}
            </Text>
          )}
          {consultation.allergies && (
            <Text style={text}>
              <strong>Allergies:</strong> {consultation.allergies}
            </Text>
          )}
        </Section>

        <Section style={container}>
          <Heading style={h2}>Form Submitter&apos;s Email</Heading>
          <Text style={text}>
            <strong>This consultation was submitted by:</strong>
            <br />
            {consultation.userEmail || consultation.email}
          </Text>
          <Text style={text}>
            <em>
              Please use this email address to contact the person who filled out
              the form if needed. This is not necessarily the patient email
              above.
            </em>
          </Text>
        </Section>

        <Section style={container}>
          <Heading style={h2}>Contact Information</Heading>
          <Text style={text}>
            <strong>Contact Email:</strong> {contactEmail || "N/A"}
          </Text>
          <Text style={text}>
            <strong>Contact Phone:</strong> {contactPhone || "N/A"}
          </Text>
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          Please contact the patient within 24 hours to confirm the appointment.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const h2 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "30px 0 15px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

export default ConsultationNotification;
