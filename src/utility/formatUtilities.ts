  export function formatPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return;
  const area = phoneNumber.substring(0, 3);
  const prefix = phoneNumber.substring(3, 6);
  const line = phoneNumber.substring(6, 10);
  return `(${area}) ${prefix}-${line}`;
}


export function getTextBackgroundByStatus(status: string) {

  switch (status?.toUpperCase()) {
    case "APPROVED":    return "text-bg-secondary";
    case "NEW": return "text-bg-warning";
    case "REVIEW":     return "text-bg-info";
    case "REJECTED":    return "text-bg-danger";

    default:          return "";
  }
}

export function money(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}