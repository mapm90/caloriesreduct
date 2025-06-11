import React from 'react';
import { AlertTriangle, CheckCircle, Heart, Scale, AlertCircle } from 'lucide-react';

interface BMICalculatorProps {
  weight: number; // peso en kilogramos
  height: number; // altura en metros
}

interface BMIResult {
  bmi: number;
  category: string;
  message: string;
  color: string;
  bgColor: string;
  alertType: 'success' | 'warning' | 'error';
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ weight, height }) => {

  const calculateBMI = (weight: number, height: number): number => {
    if (height <= 0 || weight <= 0) return 0;
    return weight / (height * height);
  };

  // 🔹 Función para calcular kilómetros diarios a correr
  const calculateDailyKilometers = (currentWeight: number, targetWeight: number): number => {
    const caloriesPerKg = 7700; // calorías para perder 1 kg
    const caloriesPerKm = 60; // calorías quemadas por km corrido
    const totalWeightToLose = currentWeight - targetWeight;
    const totalCaloriesToBurn = totalWeightToLose * caloriesPerKg;
    const dailyCaloriesToBurn = totalCaloriesToBurn / 30; // 30 días
    const dailyKilometers = dailyCaloriesToBurn / caloriesPerKm;
    return dailyKilometers > 0 ? dailyKilometers : 0;
  };

  // 🔹 Función para calcular calorías diarias necesarias para subir de peso
  const calculateDailyCaloriesToGain = (currentWeight: number, targetWeight: number): number => {
    const caloriesPerKg = 7700; // calorías para ganar 1 kg
    const totalWeightToGain = targetWeight - currentWeight;
    const totalCaloriesToConsume = totalWeightToGain * caloriesPerKg;
    const dailyExtraCalories = totalCaloriesToConsume / 30; // 30 días
    return dailyExtraCalories > 0 ? dailyExtraCalories : 0;
  };

  const getBMIResult = (bmi: number): BMIResult => {
    const minNormalBMI = 18.5;
    const maxNormalBMI = 24.9;
    const targetBMI = bmi < minNormalBMI ? minNormalBMI : maxNormalBMI;

    const targetWeight = targetBMI * (height * height);

    if (bmi === 0) {
      return {
        bmi,
        category: 'Datos inválidos',
        message: '⚠️ Por favor ingresa valores válidos para peso y altura.',
        color: 'text-gray-700',
        bgColor: 'bg-gray-50 border-gray-200',
        alertType: 'warning'
      };
    } else if (bmi < 18.5) {
      const dailyCalories = calculateDailyCaloriesToGain(weight, targetWeight);
      return {
        bmi,
        category: 'Bajo peso',
        message: `⚠️ Tu IMC indica bajo peso. Es recomendable consultar con un profesional de la salud. Para alcanzar un IMC saludable en 30 días, deberías consumir aproximadamente ${dailyCalories.toFixed(0)} calorías extra por día con el mismo ritmo de actividad fìsica.`,
        color: 'text-orange-700',
        bgColor: 'bg-orange-50 border-orange-200',
        alertType: 'warning'
      };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return {
        bmi,
        category: 'Peso normal',
        message: '🎉 ¡Felicidades! Tu IMC está en el rango saludable. Mantén tus hábitos alimenticios y de ejercicio 🎉',
        color: 'text-green-700',
        bgColor: 'bg-green-50 border-green-200',
        alertType: 'success'
      };
    } else if (bmi >= 25 && bmi <= 29.9) {
      const dailyKilometers = calculateDailyKilometers(weight, targetWeight);
      return {
        bmi,
        category: 'Sobrepeso',
        message: ` Tu IMC indica sobrepeso. Considera adoptar hábitos más saludables. Segùn estudios de la OMS para alcanzar un IMC saludable en 30 días, deberías correr aproximadamente ${dailyKilometers.toFixed(2)} km diarios. Si te parece mdemaciodo, en la suite de aplicaciones encontraràs herramientas que ayudan a confeccionar planes mas ajustados a ti para alcanzar tus metas`,
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-50 border-yellow-200',
        alertType: 'warning'
      };
    } else {
      const dailyKilometers = calculateDailyKilometers(weight, targetWeight);
      return {
        bmi,
        category: 'Obesidad',
        message: ` Tu IMC indica obesidad. Es importante que consultes con un profesional de la salud. Segùn estudios de la OMS para alcanzar un IMC saludable en 30 días, deberías correr aproximadamente ${dailyKilometers.toFixed(2)} km diarios. Si te parece mdemaciodo, en la suite de aplicaciones encontraràs herramientas que ayudan a confeccionar planes mas ajustados a ti para alcanzar tus metas`,
        color: 'text-red-700',
        bgColor: 'bg-red-50 border-red-200',
        alertType: 'error'
      };
    }
  };

  const bmi = calculateBMI(weight, height);
  const result = getBMIResult(bmi);

  const renderIcon = () => {
    if (bmi === 0) return <AlertCircle className="w-6 h-6 text-gray-500" />;
    if (result.alertType === 'success') return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (result.alertType === 'warning') return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    if (result.alertType === 'error') return <Heart className="w-6 h-6 text-red-500" />;
    return null;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <Scale className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Calculadora de IMC</h2>
        <p className="text-gray-600">Índice de Masa Corporal</p>
      </div>

      {/* Input Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600 mb-1">Peso</p>
          <p className="text-xl font-semibold text-gray-800">{weight} kg</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600 mb-1">Altura</p>
          <p className="text-xl font-semibold text-gray-800">{height} m</p>
        </div>
      </div>

      {/* BMI Result */}
      {bmi > 0 && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
            <span className="text-2xl font-bold text-blue-600">{result.bmi.toFixed(1)}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tu IMC: {result.bmi.toFixed(1)}</h3>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {result.category}
          </span>
        </div>
      )}

      {/* Alert Message */}
      <div className={`${result.bgColor} border-2 rounded-xl p-4 mb-4`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {renderIcon()}
          </div>
          <div className="flex-1">
            <p className={`text-sm ${result.color} leading-relaxed`}>
              {result.message}
            </p>
          </div>
        </div>
      </div>

      {/* BMI Scale Reference */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Escala de IMC: {bmi > 0 ? result.bmi.toFixed(1) : '-'}</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-orange-600">Bajo peso</span>
            <span className="text-gray-600">&lt; 18.5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Peso normal</span>
            <span className="text-gray-600">18.5 - 24.9</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-600">Sobrepeso</span>
            <span className="text-gray-600">25.0 - 29.9</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600">Obesidad</span>
            <span className="text-gray-600">≥ 30.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
