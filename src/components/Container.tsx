import { useCallback, useState, type ChangeEventHandler } from 'react';
import { useF1Score } from '../hooks/useF1Score';
import { Badge } from './Badge';
import { Footer } from './Footer';

export const Container = () => {
  const [placings, setPlacings] = useState('');
  const onPlacingsChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setPlacings(e.target.value),
    []
  );
  const systems = useF1Score(placings);
  return (
    <div className="min-h-screen bg-gray-200 sm:p-20">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-700">F1 Scoring Systems</h1>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter placings (e.g. 1f,1,3,2s)"
            className="w-full p-2 border rounded mb-4"
            value={placings}
            onChange={onPlacingsChange}
          />
          <div className="flex gap-2 mb-4">
            <button
              className="text-blue-700 underline hover:text-blue-600 text-xs"
              onClick={() =>
                setPlacings(
                  '19,1,1f,1s,1f,1,3,1,1,7,2f,1s,1,1,1f,1f,1,7,1,1,1,6,4s,1'
                )
              }
            >
              Max Verstappen (2022)
            </button>
            <button
              className="text-blue-700 underline hover:text-blue-600 text-xs"
              onClick={() =>
                setPlacings('2,1,1,2,1f,1,1,1,5,1f,9,1,2,3f,4,1f,3f,1,2,7,1f')
              }
            >
              Lewis Hamilton (2019)
            </button>
            <button
              className="text-blue-700 underline hover:text-blue-600 text-xs"
              onClick={() =>
                setPlacings('3,1,4f,1f,4,2f,1,1,3,1f,1,1f,1f,1,1,1,1f,1')
              }
            >
              Sebastian Vettel (2013)
            </button>
            <button
              className="text-blue-700 underline hover:text-blue-600 text-xs"
              onClick={() =>
                setPlacings('1f,1,1f,1f,1f,1f,1,1,1f,1f,1,1f,2,2,12f,1,7')
              }
            >
              Michael Schumacher (2004)
            </button>
            <button
              className="text-blue-700 underline hover:text-blue-600 text-xs"
              onClick={() => setPlacings('1,1,1,1,3,3,4,7,1,1,2f,2,5,2f,1')}
            >
              Ayrton Senna (1991)
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {systems.map(({ label, score, supportedModifiers = [] }) => (
              <div key={label} className="bg-gray-100 p-4 rounded border">
                <h2 className="text-lg font-bold mb-2">{label}</h2>
                <p>{score} Points</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {supportedModifiers.map(({ label, value }) => (
                    <Badge key={value}>{label}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
