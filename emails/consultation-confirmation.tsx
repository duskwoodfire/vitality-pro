import * as React from 'react';
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
} from '@react-email/components';
import { ConsultationData } from '../types/consultation';

interface ConsultationConfirmationProps {
  consultation: ConsultationData;
}

export const ConsultationConfirmation = ({
  consultation,
}: ConsultationConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Your consultation has been booked successfully</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Consultation Booking </Heading>
        <Text style={text}>
          Dear {consultation.firstName} {consultation.lastName},
        </Text>
        <Text style={text}>
         You have received a new consultation booking!
         <br />
         Please Check the details bellow:
        </Text>
        
        <Section style={section}>
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
            <Text style={text}>
            <strong>Contact Email:</strong> {consultation.email}
          </Text>
            <Text style={text}>
            <strong>Contact Number:</strong> {consultation.phone}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const section = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

export default ConsultationConfirmation;