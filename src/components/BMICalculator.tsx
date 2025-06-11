import React, { useState, useEffect } from 'react';
import { FaWeight, FaRulerVertical, FaRunning, FaCalendarDay, FaRoad, FaFireAlt, FaCheckCircle } from 'react-icons/fa';

const CALORIES_PER_KM = 60;

const IMCCalorieCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [minCaloriesToBurn, setMinCaloriesToBurn] = useState<number | null>(null);

  const [days, setDays] = useState<number | ''>('');
  const [kms, setKms] = useState<number | ''>('');
  const [calories, setCalories] = useState<number | ''>('');

  const [calculationResult, setCalculationResult] = useState<string | null>(null);

  const [editableFields, setEditableFields] = useState<Array<'days' | 'kms' | 'calories'>>([]);

  const [showCongrats, setShowCongrats] = useState(false);

  const calculateMinCalories = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const currentBMI = weight / (heightInMeters * heightInMeters);
      const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);
      const weightToLose = weight - maxHealthyWeight;
      const caloriesToBurn = weightToLose * 7700;

      if (weightToLose > 0) {
        setMinCaloriesToBurn(caloriesToBurn);
        setShowCongrats(false);
      } else {
        setShowCongrats(true);
        setMinCaloriesToBurn(null);
      }
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setMinCaloriesToBurn(null);
    setDays('');
    setKms('');
    setCalories('');
    setCalculationResult(null);
    setEditableFields([]);
    setShowCongrats(false);
  };

  useEffect(() => {
    const filled = [];
    if (days !== '') filled.push('days');
    if (kms !== '') filled.push('kms');
    if (calories !== '') filled.push('calories');

    if (filled.length === 2 && editableFields.length === 0) {
      setEditableFields(filled);
    }

    if (editableFields.length === 2) {
      const lockedField = ['days', 'kms', 'calories'].find(f => !editableFields.includes(f))!;

      if (lockedField === 'calories' && days !== '' && kms !== '') {
        const totalCalories = Number(days) * Number(kms) * CALORIES_PER_KM;
        setCalories(totalCalories);
        setCalculationResult(`Para correr ${days} días a ${kms} km por día, quemarás aproximadamente ${totalCalories.toFixed(0)} kcal.`);
      } else if (lockedField === 'kms' && days !== '' && calories !== '') {
        const kmPerDay = Number(calories) / (Number(days) * CALORIES_PER_KM);
        setKms(Number(kmPerDay));
        setCalculationResult(`Para correr ${days} días y quemar ${calories} kcal, debes correr aproximadamente ${kmPerDay.toFixed(2)} km por día.`);
      } else if (lockedField === 'days' && kms !== '' && calories !== '') {
        const daysNeeded = Number(calories) / (Number(kms) * CALORIES_PER_KM);
        setDays(Number(daysNeeded));
        setCalculationResult(`Para correr ${kms} km por día y quemar ${calories} kcal, necesitarás correr aproximadamente ${daysNeeded.toFixed(0)} días.`);
      }
    }
  }, [days, kms, calories, editableFields]);

  const isDisabled = (field: 'days' | 'kms' | 'calories') => {
    if (editableFields.length === 0) return false;
    if (editableFields.includes(field)) return false;
    return true;
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-3xl shadow-2xl border border-indigo-200 transform transition-all duration-500 hover:scale-[1.02]">
      {showCongrats ? (
        <div className="text-center bg-green-100 border border-green-400 text-green-900 p-8 rounded-xl shadow-md animate-fadeIn">
          <FaCheckCircle className="mx-auto text-6xl mb-4 animate-pulse text-green-600" />
          <h3 className="font-extrabold text-3xl mb-2">🎉 ¡Felicidades! 🎉</h3>
          <p className="mb-6 text-lg">Tu peso ya está dentro de un IMC saludable.</p>
          <button
            onClick={resetCalculator}
            className="mt-2 inline-flex items-center gap-2 justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-colors duration-300"
          >
            Reiniciar
          </button>
        </div>
      ) : !minCaloriesToBurn ? (
        <>
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-md">
            Calcula tus calorías mínimas a quemarr
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <FaWeight className="absolute top-3 left-3 text-indigo-500" />
              <input
                type="number"
                placeholder="Peso (kg)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-indigo-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                value={weight}
                onChange={(e) => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                min={0}
              />
            </div>
            <div className="relative">
              <FaRulerVertical className="absolute top-3 left-3 text-indigo-500" />
              <input
                type="number"
                placeholder="Altura (cm)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-indigo-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                value={height}
                onChange={(e) => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                min={0}
              />
            </div>
            <button
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-transform duration-150"
              onClick={calculateMinCalories}
              disabled={!(weight && height)}
            >
              Calcular calorías mínimas
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-md">
            Planifica tu quema de calorías
          </h2>

          <div className="mb-8 text-center animate-fadeIn">
            <p className="text-gray-600 text-lg mb-2">Calorías mínimas a quemar para alcanzar un IMC saludable:</p>
            <p className="text-5xl font-extrabold text-red-600 drop-shadow-md">{minCaloriesToBurn.toFixed(0)} kcal</p>
          </div>

          <p className="mb-6 text-center text-gray-700 text-lg font-medium">
            Completa <strong>dos de las tres opciones</strong>. La tercera se calculará automáticamente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="relative">
              <label className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold">
                <FaCalendarDay /> Días corriendo
              </label>
              <input
                type="number"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  isDisabled('days') ? 'bg-gray-100 border-gray-300' : 'border-indigo-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300'
                } outline-none transition`}
                value={days}
                onChange={(e) => setDays(e.target.value === '' ? '' : parseFloat(e.target.value))}
                disabled={isDisabled('days')}
                min={0}
                placeholder="Ej. 5"
              />
              <FaCalendarDay className="absolute top-3 left-3 text-indigo-500 pointer-events-none" />
            </div>
            <div className="relative">
              <label className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold">
                <FaRoad /> Km por día
              </label>
              <input
                type="number"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  isDisabled('kms') ? 'bg-gray-100 border-gray-300' : 'border-indigo-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300'
                } outline-none transition`}
                value={kms}
                onChange={(e) => setKms(e.target.value === '' ? '' : parseFloat(e.target.value))}
                disabled={isDisabled('kms')}
                min={0}
                placeholder="Ej. 3"
              />
              <FaRoad className="absolute top-3 left-3 text-indigo-500 pointer-events-none" />
            </div>
            <div className="relative">
              <label className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold">
                <FaFireAlt /> Calorías totales
              </label>
              <input
                type="number"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  isDisabled('calories') ? 'bg-gray-100 border-gray-300' : 'border-indigo-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300'
                } outline-none transition`}
                value={calories}
                onChange={(e) => setCalories(e.target.value === '' ? '' : parseFloat(e.target.value))}
                disabled={isDisabled('calories')}
                min={0}
                placeholder="Ej. 900"
              />
              <FaFireAlt className="absolute top-3 left-3 text-indigo-500 pointer-events-none" />
            </div>
          </div>

          {calculationResult && (
            <div className="mb-6 p-5 bg-green-50 border-l-8 border-green-500 text-green-700 rounded-xl shadow-md animate-fadeIn">
              <p className="font-semibold mb-2 text-lg">Resultado:</p>
              <p className="text-md">{calculationResult}</p>
            </div>
          )}

          <button
            className="w-full py-3 bg-gray-300 rounded-xl font-semibold hover:bg-gray-400 active:scale-95 transition-transform duration-150 shadow-md"
            onClick={resetCalculator}
          >
            Reiniciar
          </button>
        </>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(10px);}
            to {opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default IMCCalorieCalculator;
