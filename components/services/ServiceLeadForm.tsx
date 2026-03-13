'use client';

import { FormEvent, useMemo, useState } from 'react';
import { isBusinessFinancingService, isPayrollWorkersCompService } from '@/lib/services/catalog';

type ServiceLeadFormProps = {
  serviceSlug: string;
  serviceName: string;
};

type ServiceLeadFormState = {
  fullName: string;
  legalBusinessName: string;
  dba: string;
  email: string;
  phone: string;
  industry: string;
  businessAddress: string;
  yearsInBusiness: string;
  locationCount: string;
  preferredContactTime: string;
  notesGoals: string;
  consentToContact: boolean;
  dataProcessingConsent: boolean;
  employeeCountW2: string;
  employeeCount1099: string;
  totalMonthlyPayroll: string;
  currentPayrollProvider: string;
  currentWorkersCompCarrier: string;
  currentWorkersCompPremiumAnnual: string;
  claimsHistoryPast3Years: string;
  jobClassesRoles: string;
  fein: string;
  employeeWorkStates: string;
  desiredEffectiveDate: string;
  fundingType: string;
  businessStructure: string;
  federalTaxId: string;
  averageMonthlyDeposits: string;
  businessDateFounded: string;
  businessOwnedSince: string;
  businessWebsite: string;
  homeOwnership: string;
  honeypot: string;
};

const defaultState: ServiceLeadFormState = {
  fullName: '',
  legalBusinessName: '',
  dba: '',
  email: '',
  phone: '',
  industry: '',
  businessAddress: '',
  yearsInBusiness: '',
  locationCount: '1',
  preferredContactTime: 'Morning',
  notesGoals: '',
  consentToContact: false,
  dataProcessingConsent: false,
  employeeCountW2: '',
  employeeCount1099: '',
  totalMonthlyPayroll: '',
  currentPayrollProvider: '',
  currentWorkersCompCarrier: '',
  currentWorkersCompPremiumAnnual: '',
  claimsHistoryPast3Years: '',
  jobClassesRoles: '',
  fein: '',
  employeeWorkStates: '',
  desiredEffectiveDate: '',
  fundingType: 'Business Funding',
  businessStructure: '',
  federalTaxId: '',
  averageMonthlyDeposits: '',
  businessDateFounded: '',
  businessOwnedSince: '',
  businessWebsite: '',
  homeOwnership: 'Rent',
  honeypot: ''
};

export default function ServiceLeadForm({ serviceSlug, serviceName }: ServiceLeadFormProps) {
  const [formData, setFormData] = useState(defaultState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const needsPayrollWorkersCompFields = useMemo(() => isPayrollWorkersCompService(serviceSlug), [serviceSlug]);
  const needsFinancingFields = useMemo(() => isBusinessFinancingService(serviceSlug), [serviceSlug]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/service-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug,
          fullName: formData.fullName,
          legalBusinessName: formData.legalBusinessName,
          dba: formData.dba,
          email: formData.email,
          phone: formData.phone,
          industry: formData.industry,
          businessAddress: formData.businessAddress,
          yearsInBusiness: formData.yearsInBusiness,
          locationCount: Number(formData.locationCount),
          preferredContactTime: formData.preferredContactTime,
          notesGoals: formData.notesGoals,
          consentToContact: formData.consentToContact,
          dataProcessingConsent: formData.dataProcessingConsent,
          employeeCountW2: formData.employeeCountW2 ? Number(formData.employeeCountW2) : undefined,
          employeeCount1099: formData.employeeCount1099 ? Number(formData.employeeCount1099) : undefined,
          totalMonthlyPayroll: formData.totalMonthlyPayroll,
          currentPayrollProvider: formData.currentPayrollProvider,
          currentWorkersCompCarrier: formData.currentWorkersCompCarrier,
          currentWorkersCompPremiumAnnual: formData.currentWorkersCompPremiumAnnual,
          claimsHistoryPast3Years: formData.claimsHistoryPast3Years,
          jobClassesRoles: formData.jobClassesRoles,
          fein: formData.fein,
          employeeWorkStates: formData.employeeWorkStates,
          desiredEffectiveDate: formData.desiredEffectiveDate,
          fundingType: formData.fundingType,
          businessStructure: formData.businessStructure,
          federalTaxId: formData.federalTaxId,
          averageMonthlyDeposits: formData.averageMonthlyDeposits,
          businessDateFounded: formData.businessDateFounded,
          businessOwnedSince: formData.businessOwnedSince,
          businessWebsite: formData.businessWebsite,
          homeOwnership: formData.homeOwnership,
          honeypot: formData.honeypot
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit service lead');
      }

      setSubmitted(true);
      setFormData(defaultState);
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to submit right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-6 shadow-card md:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Request This Service</p>
      <h2 className="mt-3 text-2xl font-bold text-white">{serviceName} Lead Form</h2>
      <p className="mt-2 text-sm text-slate-100/90">Submit core business details and we will route your request internally.</p>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-[#46a7a6]/35 bg-[#46a7a6]/10 p-4 text-sm text-white">
          Thanks, your request was submitted. Our team will contact you shortly.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="sr-only">
            Leave this field empty
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(event) => setFormData((prev) => ({ ...prev, honeypot: event.target.value }))}
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Full Name
            <input
              required
              value={formData.fullName}
              onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Business Legal Name
            <input
              required
              value={formData.legalBusinessName}
              onChange={(event) => setFormData((prev) => ({ ...prev, legalBusinessName: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Doing Business As (DBA)
            <input
              required
              value={formData.dba}
              onChange={(event) => setFormData((prev) => ({ ...prev, dba: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Email
            <input
              type="email"
              required
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Phone
            <input
              required
              value={formData.phone}
              onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Industry
            <input
              required
              value={formData.industry}
              onChange={(event) => setFormData((prev) => ({ ...prev, industry: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90 md:col-span-2">
            Business Address (City, State, ZIP)
            <input
              required
              value={formData.businessAddress}
              onChange={(event) => setFormData((prev) => ({ ...prev, businessAddress: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Years in Business
            <input
              required
              value={formData.yearsInBusiness}
              onChange={(event) => setFormData((prev) => ({ ...prev, yearsInBusiness: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Number of Locations
            <input
              type="number"
              min={1}
              required
              value={formData.locationCount}
              onChange={(event) => setFormData((prev) => ({ ...prev, locationCount: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-100/90">
            Preferred Contact Time
            <select
              value={formData.preferredContactTime}
              onChange={(event) => setFormData((prev) => ({ ...prev, preferredContactTime: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            >
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>

          {needsPayrollWorkersCompFields ? (
            <>
              <div className="md:col-span-2 mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#46a7a6]">
                Payroll &amp; Workers&apos; Compensation Details
              </div>

              <label className="space-y-2 text-sm text-slate-100/90">
                Employee Count (W-2)
                <input
                  type="number"
                  min={0}
                  required
                  value={formData.employeeCountW2}
                  onChange={(event) => setFormData((prev) => ({ ...prev, employeeCountW2: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Employee Count (1099)
                <input
                  type="number"
                  min={0}
                  required
                  value={formData.employeeCount1099}
                  onChange={(event) => setFormData((prev) => ({ ...prev, employeeCount1099: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Total Monthly Payroll
                <input
                  required
                  value={formData.totalMonthlyPayroll}
                  onChange={(event) => setFormData((prev) => ({ ...prev, totalMonthlyPayroll: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Current Payroll Provider (if any)
                <input
                  value={formData.currentPayrollProvider}
                  onChange={(event) => setFormData((prev) => ({ ...prev, currentPayrollProvider: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Current Workers&apos; Comp Carrier (if any)
                <input
                  value={formData.currentWorkersCompCarrier}
                  onChange={(event) => setFormData((prev) => ({ ...prev, currentWorkersCompCarrier: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Current Workers&apos; Comp Premium (Annual)
                <input
                  value={formData.currentWorkersCompPremiumAnnual}
                  onChange={(event) => setFormData((prev) => ({ ...prev, currentWorkersCompPremiumAnnual: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90 md:col-span-2">
                Claims History (Past 3 Years)
                <textarea
                  rows={3}
                  required
                  value={formData.claimsHistoryPast3Years}
                  onChange={(event) => setFormData((prev) => ({ ...prev, claimsHistoryPast3Years: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90 md:col-span-2">
                Job Classes / Roles (High-Level)
                <textarea
                  rows={3}
                  required
                  value={formData.jobClassesRoles}
                  onChange={(event) => setFormData((prev) => ({ ...prev, jobClassesRoles: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                FEIN (or “will provide securely”)
                <input
                  required
                  value={formData.fein}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fein: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                State(s) Where Employees Work
                <input
                  required
                  value={formData.employeeWorkStates}
                  onChange={(event) => setFormData((prev) => ({ ...prev, employeeWorkStates: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Desired Effective Date
                <input
                  type="date"
                  required
                  value={formData.desiredEffectiveDate}
                  onChange={(event) => setFormData((prev) => ({ ...prev, desiredEffectiveDate: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>
            </>
          ) : null}

          {needsFinancingFields ? (
            <>
              <div className="md:col-span-2 mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#46a7a6]">
                Business Financing Details
              </div>

              <label className="space-y-2 text-sm text-slate-100/90">
                Funding Type
                <select
                  required
                  value={formData.fundingType}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fundingType: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                >
                  <option>Business Funding</option>
                  <option>Real Estate Funding</option>
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Business Structure
                <input
                  required
                  value={formData.businessStructure}
                  onChange={(event) => setFormData((prev) => ({ ...prev, businessStructure: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Federal Tax ID
                <input
                  required
                  value={formData.federalTaxId}
                  onChange={(event) => setFormData((prev) => ({ ...prev, federalTaxId: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Average Monthly Deposits
                <input
                  required
                  value={formData.averageMonthlyDeposits}
                  onChange={(event) => setFormData((prev) => ({ ...prev, averageMonthlyDeposits: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Business Date Founded
                <input
                  type="date"
                  required
                  value={formData.businessDateFounded}
                  onChange={(event) => setFormData((prev) => ({ ...prev, businessDateFounded: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Business Owned Since
                <input
                  type="date"
                  required
                  value={formData.businessOwnedSince}
                  onChange={(event) => setFormData((prev) => ({ ...prev, businessOwnedSince: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Business Website (Optional)
                <input
                  value={formData.businessWebsite}
                  onChange={(event) => setFormData((prev) => ({ ...prev, businessWebsite: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Rent or Own Home
                <select
                  required
                  value={formData.homeOwnership}
                  onChange={(event) => setFormData((prev) => ({ ...prev, homeOwnership: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                >
                  <option>Rent</option>
                  <option>Own</option>
                </select>
              </label>
            </>
          ) : null}

          <label className="space-y-2 text-sm text-slate-100/90 md:col-span-2">
            Notes / Goals
            <textarea
              rows={4}
              required
              value={formData.notesGoals}
              onChange={(event) => setFormData((prev) => ({ ...prev, notesGoals: event.target.value }))}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            />
          </label>

          <label className="md:col-span-2 flex items-start gap-3 text-sm text-slate-100/90">
            <input
              type="checkbox"
              required
              checked={formData.consentToContact}
              onChange={(event) => setFormData((prev) => ({ ...prev, consentToContact: event.target.checked }))}
              className="mt-1"
            />
            <span>I consent to be contacted about this request.</span>
          </label>

          <label className="md:col-span-2 flex items-start gap-3 text-sm text-slate-100/90">
            <input
              type="checkbox"
              required
              checked={formData.dataProcessingConsent}
              onChange={(event) => setFormData((prev) => ({ ...prev, dataProcessingConsent: event.target.checked }))}
              className="mt-1"
            />
            <span>I acknowledge and consent to data processing for lead qualification and partner routing.</span>
          </label>

          {errorMessage ? (
            <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100 md:col-span-2">
              {errorMessage}
            </p>
          ) : null}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
            >
              {submitting ? 'Submitting...' : 'Submit Service Lead'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
