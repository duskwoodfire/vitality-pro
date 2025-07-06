import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { ConsultationConfirmation } from '@/emails/consultation-confirmation';
import { ConsultationNotification } from '@/emails/consultation-notification';
import { ConsultationData } from '@/types/consultation';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const consultationData: ConsultationData = await request.json();
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'gender',
      'consultationType',
      'preferredDate',
      'preferredTime',
      'urgency',
    ];

    for (const field of requiredFields) {
      if (!consultationData[field as keyof ConsultationData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const patientEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CENTER_EMAIL || '',
      subject: 'Consultation Booking Confirmation',
      react: ConsultationConfirmation({ consultation: consultationData }),
    });

    // Log admin email address for debugging
    console.log('Admin email address:', process.env.ADMIN_EMAIL);
    // Always send admin notification to admin email, include user's email in the message
    const adminNotificationProps = {
      consultation: {
        ...consultationData,
        userEmail: consultationData.email, // preserve user's email
      },
      userEmail: consultationData.email, // pass explicitly for template
    };
    let adminEmail, adminError;
    try {
      adminEmail = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.ADMIN_EMAIL!,
        subject: `New Consultation Booking - ${consultationData.firstName} ${consultationData.lastName}`,
        react: ConsultationNotification(adminNotificationProps),
      });
      console.log('Admin email response:', adminEmail);
    } catch (err) {
      adminError = err;
      console.error('Error sending admin email:', err);
    }

    return NextResponse.json({
      message: 'Consultation booked successfully',
      patientEmailId: patientEmail.data?.id,
      adminEmailId: adminEmail?.data?.id,
      adminError: adminError ? String(adminError) : undefined,
    });
  } catch (error) {
    console.error('Error sending consultation emails:', error);
    return NextResponse.json(
      { error: 'Failed to send consultation emails' },
      { status: 500 }
    );
  }
}