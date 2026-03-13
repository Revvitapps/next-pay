export type Vertical = {
  id: string;
  label: string;
  summary: string;
  serviceFit: string[];
};

export const verticals: Vertical[] = [
  {
    id: 'law-firms',
    label: 'Law Firms',
    summary: 'Payment acceptance, trust accounting workflow alignment, and operational reporting for legal practices.',
    serviceFit: ['POS + Payments', 'Time & Attendance', 'Business Financing']
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    summary: 'Commission workflow support, business financing paths, and multi-office operations infrastructure.',
    serviceFit: ['Business Financing', 'Payroll', 'HR + Benefits Administration']
  },
  {
    id: 'automotive',
    label: 'Automotive',
    summary: 'High-ticket payment reliability, shift scheduling, and payroll/workers comp intake for shop teams.',
    serviceFit: ['POS + Payments', 'Payroll', "Workers' Compensation"]
  },
  {
    id: 'medical',
    label: 'Medical',
    summary: 'Operational controls and staff administration support for clinics and provider groups.',
    serviceFit: ['HR + Benefits Administration', 'Payroll', 'Time & Attendance']
  },
  {
    id: 'home-services',
    label: 'Home Services',
    summary: 'Field-team payroll, recurring billing operations, and financing paths for growth and equipment.',
    serviceFit: ['Payroll', 'Workers\' Compensation', 'Business Financing']
  },
  {
    id: 'barbershops',
    label: 'Barbershops',
    summary: 'Front-desk payment modernization and simplified back-office payroll/tax workflows.',
    serviceFit: ['POS + Payments', 'Payroll', 'Tax Credit / Compliance Advisory']
  },
  {
    id: 'ott-streaming',
    label: 'OTT Streaming',
    summary: 'Subscription billing operations and finance visibility for recurring digital revenue models.',
    serviceFit: ['POS + Payments', 'Business Financing', 'Tax Credit / Compliance Advisory']
  }
];

export function getVerticalById(id: string) {
  return verticals.find((vertical) => vertical.id === id);
}
