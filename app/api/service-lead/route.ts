import { NextResponse } from 'next/server';
import { createLeadFromServiceSubmission } from '@/lib/admin/repository';
import { sendLeadNotification } from '@/lib/server/email/resendService';
import { ingestStatementUpload } from '@/lib/server/statement/pipeline';
import { isBusinessFinancingService, isPayrollWorkersCompService, getServiceBySlug } from '@/lib/services/catalog';
import { routeServiceLead, type ServiceLeadPayload } from '@/lib/services/routing';

export const runtime = 'nodejs';

type ServiceLeadRequest = Partial<ServiceLeadPayload> & {
  submissionType?: 'service-lead';
  honeypot?: string;
  statementFile?: {
    name?: string;
    type?: string;
    size?: number;
    dataUrl?: string;
  };
};

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validatePayload(body: ServiceLeadRequest) {
  if (!isNonEmpty(body.serviceSlug)) return { ok: false as const, error: 'Missing required core fields.' };

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

  if (!coreValid) return { ok: false as const, error: 'Missing required core fields.' };

  if (isPayrollWorkersCompService(body.serviceSlug)) {
    const payrollValid =
      Number.isFinite(body.employeeCountW2) &&
      Number.isFinite(body.employeeCount1099) &&
      isNonEmpty(body.totalMonthlyPayroll) &&
      isNonEmpty(body.claimsHistoryPast3Years) &&
      isNonEmpty(body.jobClassesRoles) &&
      isNonEmpty(body.fein) &&
      isNonEmpty(body.employeeWorkStates) &&
      isNonEmpty(body.desiredEffectiveDate);

    if (!payrollValid) return { ok: false as const, error: 'Missing required payroll/workers comp fields.' };
  }

  if (isBusinessFinancingService(body.serviceSlug)) {
    const financingValid =
      isNonEmpty(body.fundingType) &&
      isNonEmpty(body.businessStructure) &&
      isNonEmpty(body.federalTaxId) &&
      isNonEmpty(body.averageMonthlyDeposits) &&
      isNonEmpty(body.businessDateFounded) &&
      isNonEmpty(body.businessOwnedSince) &&
      isNonEmpty(body.homeOwnership);

    if (!financingValid) return { ok: false as const, error: 'Missing required business financing fields.' };
  }

  return { ok: true as const };
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
    homeOwnership: body.homeOwnership?.trim(),
    currentProcessor: body.currentProcessor?.trim(),
    estimatedMonthlyVolume: body.estimatedMonthlyVolume?.trim()
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

    const adminLead = createLeadFromServiceSubmission({
      serviceSlug: leadPayload.serviceSlug,
      fullName: leadPayload.fullName,
      legalBusinessName: leadPayload.legalBusinessName,
      email: leadPayload.email,
      phone: leadPayload.phone,
      currentProcessor: leadPayload.currentProcessor,
      estimatedMonthlyVolume: leadPayload.estimatedMonthlyVolume
    });

    await sendLeadNotification({
      submissionType: 'service-lead',
      businessName: adminLead.businessName,
      contactName: adminLead.contactName,
      email: adminLead.email,
      phone: adminLead.phone,
      serviceInterest: adminLead.serviceInterest,
      leadId: adminLead.id
    });

    if (body.statementFile?.name && body.statementFile?.type && typeof body.statementFile?.size === 'number' && body.statementFile?.dataUrl) {
      await ingestStatementUpload({
        leadId: adminLead.id,
        sourceForm: 'service-lead',
        businessName: leadPayload.legalBusinessName,
        email: leadPayload.email,
        phone: leadPayload.phone,
        currentProcessor: leadPayload.currentProcessor ?? 'Unknown Processor',
        monthlyVolume: leadPayload.estimatedMonthlyVolume ?? 'Unknown',
        file: body.statementFile,
        linkedLead: {
          type: 'service-lead',
          fullName: leadPayload.fullName,
          legalBusinessName: leadPayload.legalBusinessName,
          serviceSlug: leadPayload.serviceSlug,
          estimatedMonthlyVolume: leadPayload.estimatedMonthlyVolume
        }
      });
    }

    return NextResponse.json({ ok: true, routedQueue: route.queueId, leadId: adminLead.id });
  } catch (error) {
    console.error('[service_lead_api_error]', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
