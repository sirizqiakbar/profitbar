function Landing({ onStart }) {
  return (
    <section className="space-y-8 py-24 md:py-32">
      <p className="text-xs uppercase tracking-[0.22em] text-gray-500">ProfitBar</p>
      <div className="space-y-5">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Revenue isn’t profit. ProfitBar shows the truth.
        </h1>
        <p className="max-w-2xl text-lg text-gray-700 md:text-xl">
          You’re making sales. But are you actually making money?
        </p>
      </div>
      <p className="max-w-2xl text-base leading-relaxed text-gray-600">
        Most creators price based on guesswork. ProfitBar helps you see what you really earn after time and cost.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Check your real profit
      </button>
    </section>
  );
}

export default Landing;
