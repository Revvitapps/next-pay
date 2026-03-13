import { NextResponse } from 'next/server';
import { isBusinessFinancingService, isPayrollWorkersCompService, getServiceBySlug } from '@/lib/services/catalog';
import { routeServiceLead, type ServiceLeadPayload } from '@/lib/services/routing';

export const runtime = 'nodejs';

type ServiceLeadRequest = Partial<ServiceLeadPayload> & {
  honeypot?: string;
};

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validatePayload(body: ServiceLeadRequest) {
  if (!isNonEmpty(body.serviceSlug)) {
    return { ok: false as const, error: 'Missing required core fields.' };
  }

  const serviceSlug = body.serviceSlug;

  const coreValid =
    isNonEmpty(body.fullName) &&
    isNonEmpty(body.legalBusinessName) &&
    isNonEmpty(body.dba) &&
    isNonEmpty(body.email) &&
    isNonEmpty(body.phone) &&
    isNonEmpty(body.industry) &&
    isNonEmpty(body.businessAddress) &&
    isNonEmpty(body.yearsInBusiness) &&
    Number.isFinite(body.locationCount) &&
    isNonEmpty(body.preferredContactTime) &&
    isNonEmpty(body.notesGoals) &&
    body.consentToContact === true &&
    body.dataProcessingConsent === true;

  if (!coreValid) {
    return { ok: false as const, error: 'Missing required core fields.' };
  }

  if (isPayrollWorkersCompService(serviceSlug)) {
    const payrollValid =
      Number.isFinite(body.employeeCountW2) &&
      Number.isFinite(body.employeeCount1099) &&
      isNonEmpty(body.totalMonthlyPayroll) &&
      isNonEmpty(body.claimsHistoryPast3Years) &&
      isNonEmpty(body.jobClassesRoles) &&
      isNonEmpty(body.fein) &&
      isNonEmpty(body.employeeWorkStates) &&
      isNonEmpty(body.desiredEffectiveDate);

    if (!payrollValid) {
      return { ok: false as const, error: 'Missing required payroll/workers comp fields.' };
    }
  }

  if (isBusinessFinancingService(serviceSlug)) {
    const financingValid =
      isNonEmpty(body.fundingType) &&
      isNonEmpty(body.businessStructure) &&
      isNonEmpty(body.federalTaxId) &&
      isNonEmpty(body.averageMonthlyDeposits) &&
      isNonEmpty(body.businessDateFounded) &&
      isNonEmpty(body.businessOwnedSince) &&
      isNonEmpty(body.homeOwnership);

    if (!financingValid) {
      return { ok: false as const, error: 'Missing required business financing fields.' };
    }
  }

  return { ok: true as const };
}

async function sendResendEmail(params: {
  apiKey: string;
  from: string;
  to: string[];
  cc?: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: params.from,
      to: params.to,
      cc: params.cc?.length ? params.cc : undefined,
      reply_to: params.replyTo,
      subject: params.subject,
      text: params.text,
      html: params.html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error ${response.status}: ${errorText}`);
  }

  return (await response.json()) as { id?: string };
}

function toLeadPayload(body: ServiceLeadRequest): ServiceLeadPayload {
  return {
    serviceSlug: body.serviceSlug!.trim(),
    fullName: body.fullName!.trim(),
    legalBusinessName: body.legalBusinessName!.trim(),
    dba: body.dba!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    industry: body.industry!.trim(),
    businessAddress: body.businessAddress!.trim(),
    yearsInBusiness: body.yearsInBusiness!.trim(),
    locationCount: Number(body.locationCount),
    preferredContactTime: body.preferredContactTime!.trim(),
    notesGoals: body.notesGoals!.trim(),
    consentToContact: Boolean(body.consentToContact),
    dataProcessingConsent: Boolean(body.dataProcessingConsent),
    employeeCountW2: Number.isFinite(body.employeeCountW2) ? Number(body.employeeCountW2) : undefined,
    employeeCount1099: Number.isFinite(body.employeeCount1099) ? Number(body.employeeCount1099) : undefined,
    totalMonthlyPayroll: body.totalMonthlyPayroll?.trim(),
    currentPayrollProvider: body.currentPayrollProvider?.trim(),
    currentWorkersCompCarrier: body.currentWorkersCompCarrier?.trim(),
    currentWorkersCompPremiumAnnual: body.currentWorkersCompPremiumAnnual?.trim(),
    claimsHistoryPast3Years: body.claimsHistoryPast3Years?.trim(),
    jobClassesRoles: body.jobClassesRoles?.trim(),
    fein: body.fein?.trim(),
    employeeWorkStates: body.employeeWorkStates?.trim(),
    desiredEffectiveDate: body.desiredEffectiveDate?.trim(),
    fundingType: body.fundingType?.trim(),
    businessStructure: body.businessStructure?.trim(),
    federalTaxId: body.federalTaxId?.trim(),
    averageMonthlyDeposits: body.averageMonthlyDeposits?.trim(),
    businessDateFounded: body.businessDateFounded?.trim(),
    businessOwnedSince: body.businessOwnedSince?.trim(),
    businessWebsite: body.businessWebsite?.trim(),
    homeOwnership: body.homeOwnership?.trim()
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ServiceLeadRequest;

    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const validation = validatePayload(body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const leadPayload = toLeadPayload(body);
    const service = getServiceBySlug(leadPayload.serviceSlug);
    if (!service) {
      return NextResponse.json({ error: 'Unknown service selected.' }, { status: 400 });
    }

    const route = routeServiceLead(leadPayload);
    const leadId = `svc_${Date.now().toString(36)}`;

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
    const internalToRaw = process.env.SERVICE_LEAD_INTERNAL_TO?.trim() || process.env.CONTACT_TO_EMAIL?.trim() || '';
    const internalCcRaw = process.env.SERVICE_LEAD_INTERNAL_CC?.trim() || process.env.CONTACT_CC_EMAIL?.trim() || '';

    const internalTo = internalToRaw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    const internalCc = internalCcRaw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    const internalSubject = `[Service Lead][${service.name}] ${leadPayload.legalBusinessName} (${leadId})`;
    const internalText = [
      `Lead ID: ${leadId}`,
      `Service: ${service.name} (${leadPayload.serviceSlug})`,
      `Routed Partner: ${route.partnerName} <${route.partnerEmail}>`,
      `Routing Rule: ${route.ruleMatched}`,
      '',
      `Full Name: ${leadPayload.fullName}`,
      `Business Legal Name: ${leadPayload.legalBusinessName}`,
      `DBA: ${leadPayload.dba}`,
      `Email: ${leadPayload.email}`,
      `Phone: ${leadPayload.phone}`,
      `Industry: ${leadPayload.industry}`,
      `Business Address: ${leadPayload.businessAddress}`,
      `Years in Business: ${leadPayload.yearsInBusiness}`,
      `Locations: ${leadPayload.locationCount}`,
      `Preferred Contact Time: ${leadPayload.preferredContactTime}`,
      `Notes / Goals: ${leadPayload.notesGoals}`,
      `Consent to Contact: ${leadPayload.consentToContact ? 'Yes' : 'No'}`,
      `Data Processing Consent: ${leadPayload.dataProcessingConsent ? 'Yes' : 'No'}`,
      `Employee Count W-2: ${leadPayload.employeeCountW2 ?? 'N/A'}`,
      `Employee Count 1099: ${leadPayload.employeeCount1099 ?? 'N/A'}`,
      `Total Monthly Payroll: ${leadPayload.totalMonthlyPayroll ?? 'N/A'}`,
      `Current Payroll Provider: ${leadPayload.currentPayrollProvider ?? 'N/A'}`,
      `Current Workers' Comp Carrier: ${leadPayload.currentWorkersCompCarrier ?? 'N/A'}`,
      `Current Workers' Comp Premium Annual: ${leadPayload.currentWorkersCompPremiumAnnual ?? 'N/A'}`,
      `Claims History Past 3 Years: ${leadPayload.claimsHistoryPast3Years ?? 'N/A'}`,
      `Job Classes / Roles: ${leadPayload.jobClassesRoles ?? 'N/A'}`,
      `FEIN: ${leadPayload.fein ?? 'N/A'}`,
      `Employee Work States: ${leadPayload.employeeWorkStates ?? 'N/A'}`,
      `Desired Effective Date: ${leadPayload.desiredEffectiveDate ?? 'N/A'}`,
      `Funding Type: ${leadPayload.fundingType ?? 'N/A'}`,
      `Business Structure: ${leadPayload.businessStructure ?? 'N/A'}`,
      `Federal Tax ID: ${leadPayload.federalTaxId ?? 'N/A'}`,
      `Average Monthly Deposits: ${leadPayload.averageMonthlyDeposits ?? 'N/A'}`,
      `Business Date Founded: ${leadPayload.businessDateFounded ?? 'N/A'}`,
      `Business Owned Since: ${leadPayload.businessOwnedSince ?? 'N/A'}`,
      `Business Website: ${leadPayload.businessWebsite ?? 'N/A'}`,
      `Home Ownership: ${leadPayload.homeOwnership ?? 'N/A'}`
    ].join('\n');

    const internalHtml = internalText.replace(/\n/g, '<br />');

    const partnerSubject = `New routed lead: ${service.name} (${leadId})`;
    const partnerText = [
      `Lead ID: ${leadId}`,
      `Service: ${service.name}`,
      '',
      `Full Name: ${leadPayload.fullName}`,
      `Business Legal Name: ${leadPayload.legalBusinessName}`,
      `DBA: ${leadPayload.dba}`,
      `Email: ${leadPayload.email}`,
      `Phone: ${leadPayload.phone}`,
      `Industry: ${leadPayload.industry}`,
      `Locations: ${leadPayload.locationCount}`,
      `Preferred Contact Time: ${leadPayload.preferredContactTime}`,
      `Notes / Goals: ${leadPayload.notesGoals}`
    ].join('\n');

    const partnerHtml = partnerText.replace(/\n/g, '<br />');

    if (resendApiKey && fromEmail && internalTo.length) {
      // Data ownership: full lead is always delivered to internal recipients first.
      await sendResendEmail({
        apiKey: resendApiKey,
        from: fromEmail,
        to: internalTo,
        cc: internalCc,
        replyTo: leadPayload.email,
        subject: internalSubject,
        text: internalText,
        html: internalHtml
      });

      await sendResendEmail({
        apiKey: resendApiKey,
        from: fromEmail,
        to: [route.partnerEmail],
        replyTo: leadPayload.email,
        subject: partnerSubject,
        text: partnerText,
        html: partnerHtml
      });

      console.info('[service_lead_routed]', {
        leadId,
        serviceSlug: leadPayload.serviceSlug,
        partnerId: route.partnerId,
        ruleMatched: route.ruleMatched
      });
    } else {
      console.info('[service_lead_submission_local]', {
        leadId,
        payload: leadPayload,
        route,
        hasResendApiKey: Boolean(resendApiKey),
        hasFromEmail: Boolean(fromEmail),
        hasInternalTo: Boolean(internalTo.length)
      });
    }

    return NextResponse.json({ ok: true, leadId, routedPartner: route.partnerId });
  } catch (error) {
    console.error('[service_lead_api_error]', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
