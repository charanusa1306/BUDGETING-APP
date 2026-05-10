
// app/page.tsx
export default function BudgetingApp() {
  const transactions = [
    { label: 'Salary', amount: 2000, balance: 2000 },
    { label: 'Rent', amount: -150, balance: 1850 },
    { label: 'Lunch', amount: -25, balance: 1825 },
    { label: 'Refund', amount: 100, balance: 1925 },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Multi-User Budgeting App</h1>
        <p className="text-slate-600">Budget tracking for you and your friends.</p>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction Log</h2>
          <div className="space-y-3 font-mono">
            {transactions.map((t, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <span>{t.amount > 0 ? '+' : ''}{t.amount} {t.label}</span>
                <span>Balance: {t.balance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
