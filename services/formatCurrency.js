export const formatCurrency = (input) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    input
  );
