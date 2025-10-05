import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Nutrients {
  N: number;
  P: number;
  K: number;
}

interface SoilAnalysis {
  id: string;
  userId: string;
  soilType: string;
  ph: number;
  nutrients: Nutrients;
  recommendedInputs: { name: string; quantity: string }[];
  createdAt: string;
}

const SoilAdvice: React.FC = () => {
  const [soilType, setSoilType] = useState<string>("");
  const [ph, setPh] = useState<number | "">("");
  const [nutrients, setNutrients] = useState<Nutrients>({ N: 0, P: 0, K: 0 });
  const [result, setResult] = useState<SoilAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleNutrientChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNutrients({ ...nutrients, [name]: Number(value) });
  };

  // **Fetch latest IoT reading**
  const fetchFromDevice = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/soil/latest?userId=64fabc123def4567890abcd1"
      );
      const data = response.data;
      setSoilType(data.soilType);
      setPh(data.ph);
      setNutrients(data.nutrients);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data from IoT device.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/soil/advice", {
        userId: "64fabc123def4567890abcd1",
        soilType,
        ph: Number(ph),
        nutrients,
      });
      setResult(response.data.analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch soil recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 sm:p-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Soil Fertility Advice
      </h1>

      <div className="max-w-2xl mx-auto mb-6 text-center">
        <button
          onClick={fetchFromDevice}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Fetch from Device
        </button>
      </div>

      <form
        className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block font-semibold mb-1">Soil Type</label>
          <input
            type="text"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. sandy, clay, loamy"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">pH Level</label>
          <input
            type="number"
            step="0.1"
            value={ph}
            onChange={(e) => setPh(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. 6.5"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {["N", "P", "K"].map((nutrient) => (
            <div key={nutrient}>
              <label className="block font-semibold mb-1">{nutrient}</label>
              <input
                type="number"
                value={nutrients[nutrient as keyof Nutrients]}
                name={nutrient}
                onChange={handleNutrientChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder={`Amount of ${nutrient}`}
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white font-bold py-2 rounded-md hover:bg-green-800 transition-colors"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Get Recommendations"}
        </button>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto mt-6 text-red-600 font-semibold text-center">
          {error}
        </div>
      )}

      {result && (
        <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Recommendations</h2>
          <p>
            <strong>Soil Type:</strong> {result.soilType}, <strong>pH:</strong>{" "}
            {result.ph}
          </p>
          <ul className="mt-3 list-disc list-inside">
            {result.recommendedInputs.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SoilAdvice;
