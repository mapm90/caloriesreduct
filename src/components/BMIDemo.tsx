import React, { useState } from 'react';
import BMICalculator from './BMICalculator';
import { Calculator } from 'lucide-react';

const BMIDemo: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(1.75);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Calculator className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de IMC</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calcula tu Índice de Masa Corporal y conoce tu estado de salud
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Ingresa tus datos</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ej: 70"
                  min="1"
                  max="300"
                  step="0.1"
                />
              </div>
              
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (metros)
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ej: 1.75"
                  min="0.5"
                  max="2.5"
                  step="0.01"
                />
              </div>

              {/* Quick Presets */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Ejemplos rápidos:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setWeight(60); setHeight(1.65); }}
                    className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    60kg / 1.65m
                  </button>
                  <button
                    onClick={() => { setWeight(80); setHeight(1.80); }}
                    className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    80kg / 1.80m
                  </button>
                  <button
                    onClick={() => { setWeight(90); setHeight(1.70); }}
                    className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    90kg / 1.70m
                  </button>
                  <button
                    onClick={() => { setWeight(55); setHeight(1.60); }}
                    className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    55kg / 1.60m
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BMI Calculator Result */}
          <div>
            <BMICalculator weight={weight} height={height} />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700 text-center">
            <strong>Nota:</strong> El IMC es una herramienta de evaluación general. 
            Para un análisis completo de tu salud, consulta siempre con un profesional médico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMIDemo;