export const calculateEarnings = (req, res) => {
  const { category, daysPerMonth = 8, dailyRate = 1200 } = req.body;

  const days = Math.min(Math.max(Number(daysPerMonth), 1), 30);
  const rate = Math.max(Number(dailyRate), 100);

  const monthlyGross = days * rate;
  const platformFeePercentage = 0.10; // 10% Rentic platform fee
  const netMonthly = Math.round(monthlyGross * (1 - platformFeePercentage));
  const netAnnual = netMonthly * 12;

  res.json({
    success: true,
    data: {
      category: category || 'cameras',
      daysPerMonth: days,
      dailyRate: rate,
      monthlyGross,
      platformFee: Math.round(monthlyGross * platformFeePercentage),
      netMonthlyEarnings: netMonthly,
      estimatedAnnualEarnings: netAnnual,
      formattedMonthly: `₹${netMonthly.toLocaleString('en-IN')}`,
      formattedAnnual: `₹${netAnnual.toLocaleString('en-IN')}`
    }
  });
};

