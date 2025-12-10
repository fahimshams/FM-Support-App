export function generateSerials(modelId: string): any[] {
  const count = 6 + Math.floor(Math.random() * 5); // 6–10 serials
  const serials = [];

  for (let i = 0; i < count; i++) {
    const year = 2022 + Math.floor(Math.random() * 3); // 2022–2024
    const rand = Math.floor(1000 + Math.random() * 9000);
    const serial = `${modelId}-${year}-${rand}`;

    const purchaseDate = new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const warrantyYears = 2;

    const expiryDate = new Date(purchaseDate);
    expiryDate.setFullYear(purchaseDate.getFullYear() + warrantyYears);

    serials.push({
      serial,
      purchaseDate: purchaseDate.toISOString().split("T")[0],
      expiryDate: expiryDate.toISOString().split("T")[0],
      active: expiryDate > new Date(),
      coverage: "2Y Mechanical + 1Y Electrical",
    });
  }

  return serials;
}
