import { useState } from 'react';

const INITIAL_VALUES = {
  price: '',
  units: '',
  timePerProduct: '',
  toolsCost: '',
  otherCost: '',
};

function Field({ id, label, helper, value, onChange, required = true }) {
  return (
    <label htmlFor={id} className="block space-y-1">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <input
        id={id}
        name={id}
        inputMode="decimal"
        min="0"
        step="any"
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-gray-300 bg-transparent py-2 text-base text-black outline-none transition focus:border-black"
      />
      <span className="text-sm text-gray-500">{helper}</span>
    </label>
  );
}

function InputForm({ onSubmit, onBack }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value.replace(/[^\d.]/g, '');
    setValues((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ['price', 'units', 'timePerProduct', 'toolsCost'];
    const hasMissing = requiredFields.some((key) => values[key] === '' || Number(values[key]) <= 0);

    if (hasMissing) {
      setError('Something’s missing. Let’s fix it.');
      return;
    }

    setError('');
    onSubmit({
      price: Number(values.price),
      units: Number(values.units),
      timePerProduct: Number(values.timePerProduct),
      toolsCost: Number(values.toolsCost),
      otherCost: Number(values.otherCost || 0),
    });
  };

  return (
    <section className="space-y-10 py-20">
      <button type="button" onClick={onBack} className="text-sm text-gray-500 transition hover:text-black">
        ← Back
      </button>

      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Tell us about one product</h2>
        <p className="text-gray-600">Quick numbers only. No finance language, no complicated setup.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Field
          id="price"
          label="Price per product"
          helper="How much people pay for one unit."
          value={values.price}
          onChange={handleChange}
        />
        <Field
          id="units"
          label="Units sold"
          helper="How many units you sold this month."
          value={values.units}
          onChange={handleChange}
        />
        <Field
          id="timePerProduct"
          label="Time spent per product (hours)"
          helper="On average, how many hours each one takes you."
          value={values.timePerProduct}
          onChange={handleChange}
        />
        <Field
          id="toolsCost"
          label="Monthly tools cost"
          helper="Apps, subscriptions, software, and platform fees."
          value={values.toolsCost}
          onChange={handleChange}
        />
        <Field
          id="otherCost"
          label="Other costs (optional)"
          helper="Any extra spend like ads, assistants, or delivery."
          value={values.otherCost}
          onChange={handleChange}
          required={false}
        />

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          className="inline-flex items-center bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Show me the truth
        </button>
      </form>
    </section>
  );
}

export default InputForm;
