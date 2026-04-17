const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

function getInsights({ realProfit, perceivedProfit, revenue, timeCost }) {
  const insights = [];
  const margin = revenue > 0 ? realProfit / revenue : 0;
  const timeCostRatio = revenue > 0 ? timeCost / revenue : 0;

  if (realProfit < 0) {
    insights.push('This looks profitable. It’s not.');
  }

  if (timeCostRatio > 0.5) {
    insights.push('Most of your profit is eaten by your time.');
  }

  if (margin > 0 && margin < 0.2) {
    insights.push('You’re underpricing your work.');
  }

  if (perceivedProfit > 0 && realProfit / perceivedProfit < 0.4) {
    insights.push('High effort, low return product.');
  }

  if (insights.length === 0) {
    insights.push('Healthy setup, but keep watching your time cost.');
    insights.push('Raising price slightly could unlock better margins.');
  }

  return insights.slice(0, 3);
}

function ComparisonBar({ label, value, maxValue, tone = 'bg-black' }) {
  const width = maxValue === 0 ? 0 : Math.max((value / maxValue) * 100, 2);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{label}</span>
        <span>{formatCurrency(value)}</span>
      </div>
      <div className="h-2 w-full bg-gray-100">
        <div className={`h-full ${tone}`} style={{ width: `${Math.min(width, 100)}%` }} />
      </div>
    </div>
  );
}

function Result({ result, onReset }) {
  const { revenue, totalCost, realProfit, perceivedProfit, timeCost } = result;
  const chartMax = Math.max(revenue, totalCost, Math.max(realProfit, 0), 1);
  const insights = getInsights({ realProfit, perceivedProfit, revenue, timeCost });

  return (
    <section className="space-y-12 py-20">
      <button type="button" onClick={onReset} className="text-sm text-gray-500 transition hover:text-black">
        ← Start over
      </button>

      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Here’s what you actually make</h2>
        <p className="text-gray-600">Revenue is the top line. Profit is what survives your actual effort.</p>
      </div>

      <div className="space-y-8 border-y border-gray-200 py-10">
        <div>
          <p className="text-sm text-gray-500">Real Profit</p>
          <p className="text-4xl font-semibold tracking-tight md:text-6xl">{formatCurrency(realProfit)}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Perceived Profit</p>
            <p className="text-2xl font-semibold">{formatCurrency(perceivedProfit)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Cost</p>
            <p className="text-2xl font-semibold">{formatCurrency(totalCost)}</p>
          </div>
        </div>
        <div className="space-y-1 text-gray-700">
          <p>You thought you made: {formatCurrency(perceivedProfit)}</p>
          <p>After time & cost: {formatCurrency(realProfit)}</p>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Revenue ≠ Profit ≠ Cashflow</h3>
        <ComparisonBar label="Revenue" value={revenue} maxValue={chartMax} tone="bg-gray-800" />
        <ComparisonBar label="Cost" value={totalCost} maxValue={chartMax} tone="bg-gray-400" />
        <ComparisonBar label="Real Profit" value={Math.max(realProfit, 0)} maxValue={chartMax} tone="bg-black" />
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Reality check</h3>
        <ul className="space-y-2">
          {insights.map((insight) => (
            <li key={insight} className="text-gray-800">
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Result;
