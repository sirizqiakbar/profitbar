import { useMemo, useState } from 'react';
import InputForm from './components/InputForm';
import Landing from './components/Landing';
import Result from './components/Result';

const HOURLY_RATE = 50000;

function App() {
  const [stage, setStage] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = (values) => {
    setIsLoading(true);

    window.setTimeout(() => {
      const revenue = values.price * values.units;
      const timeCost = values.timePerProduct * values.units * HOURLY_RATE;
      const totalCost = values.toolsCost + values.otherCost + timeCost;
      const realProfit = revenue - totalCost;
      const perceivedProfit = revenue - (values.toolsCost + values.otherCost);

      setResult({
        revenue,
        timeCost,
        totalCost,
        realProfit,
        perceivedProfit,
      });

      setStage('result');
      setIsLoading(false);
    }, 700);
  };

  const stageView = useMemo(() => {
    if (isLoading) {
      return (
        <section className="py-24">
          <p className="text-2xl font-medium tracking-tight">Calculating your real numbers...</p>
        </section>
      );
    }

    if (stage === 'landing') {
      return <Landing onStart={() => setStage('form')} />;
    }

    if (stage === 'form') {
      return <InputForm onSubmit={handleCalculate} onBack={() => setStage('landing')} />;
    }

    return <Result result={result} onReset={() => setStage('landing')} />;
  }, [isLoading, stage, result]);

  return (
    <main className="min-h-screen bg-white transition-opacity duration-300 ease-out">
      <div className="mx-auto max-w-3xl px-6">{stageView}</div>
    </main>
  );
}

export default App;
