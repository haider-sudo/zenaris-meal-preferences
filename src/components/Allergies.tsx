import { useState } from 'react';
import { AlertTriangleIcon, PlusIcon, TrashIcon } from './Icons';
import { CustomDropdown } from './CustomDropdown';

type Allergy = {
    id: string;
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
    isCommon: boolean;
  };
  
const commonAllergies = ['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy'];

const severityOptions = [
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' }
];

export function Allergies({ allergies, setAllergies }: {
  allergies: Allergy[];
  setAllergies: (allergies: Allergy[]) => void;
}) {
  const [newAllergy, setNewAllergy] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSeverity, setEditSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [editIsCommon, setEditIsCommon] = useState(false);

  const addAllergy = (name: string, isCommon: boolean) => {
    if (name.trim()) {
      setAllergies([...allergies, {
        id: Date.now().toString(),
        name: name.trim(),
        severity,
        isCommon
      }]);
      setNewAllergy('');
    }
  };

  const removeAllergy = (id: string) => {
    setAllergies(allergies.filter(allergy => allergy.id !== id));
  };

  const startEditing = (allergy: Allergy) => {
    setEditingId(allergy.id);
    setEditName(allergy.name);
    setEditSeverity(allergy.severity);
    setEditIsCommon(allergy.isCommon);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditSeverity('moderate');
    setEditIsCommon(false);
  };

  const saveEdit = () => {
    if (editName.trim() && editingId) {
      setAllergies(allergies.map(allergy => 
        allergy.id === editingId 
          ? { ...allergy, name: editName.trim(), severity: editSeverity, isCommon: editIsCommon }
          : allergy
      ));
      cancelEditing();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addAllergy(newAllergy, false);
    }
  };

  const severityColors = {
    mild: 'bg-blue-50 text-blue-800 border-blue-200',
    moderate: 'bg-orange-50 text-orange-800 border-orange-200',
    severe: 'bg-red-50 text-red-800 border-red-200'
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-red-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-700">
        <AlertTriangleIcon className="w-6 h-6" />
        Allergies & Intolerances
      </h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">Common Allergies:</h3>
        <div className="flex flex-wrap gap-2">
          {commonAllergies.map(allergy => (
            <button
              key={allergy}
              onClick={() => addAllergy(allergy, true)}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-full text-sm transition-colors flex items-center gap-2 text-red-700 border border-red-200"
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
          placeholder="Other allergy/intolerance..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400 text-gray-800 bg-white"
          onKeyDown={handleInputKeyPress}
        />
        <CustomDropdown
          options={severityOptions}
          value={severity}
          onChange={(value) => setSeverity(value as 'mild' | 'moderate' | 'severe')}
          placeholder="Select severity"
          theme="red"
        />
        <button
          onClick={() => addAllergy(newAllergy, false)}
          className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add
        </button>
      </div>

      {allergies.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {allergies.map(allergy => (
            <li 
              key={allergy.id}
              className={`p-4 rounded-lg border ${severityColors[allergy.severity]} flex justify-between items-center`}
            >
              {editingId === allergy.id ? (
                <div className="flex-1 flex flex-col gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-200 focus:border-red-400 text-gray-800 bg-white"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <CustomDropdown
                      options={severityOptions}
                      value={editSeverity}
                      onChange={(value) => setEditSeverity(value as 'mild' | 'moderate' | 'severe')}
                      placeholder="Select severity"
                      theme="red"
                      className="flex-1 text-sm"
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={editIsCommon}
                        onChange={(e) => setEditIsCommon(e.target.checked)}
                        className="rounded bg-white border-gray-300 focus:ring-red-500 accent-red-600"
                      />
                      Common
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className={`font-medium ${allergy.isCommon ? 'text-gray-900' : 'text-gray-700'}`}>
                      {allergy.name}
                    </span>
                    {allergy.isCommon && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Common
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColors[allergy.severity].replace('bg-', 'bg-opacity-70 bg-')}`}>
                      {allergy.severity}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEditing(allergy)}
                        className="text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100"
                        aria-label={`Edit ${allergy.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeAllergy(allergy.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                        aria-label={`Remove ${allergy.name}`}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-red-50 border border-red-100 text-red-800 p-4 rounded-lg">
          No allergies or intolerances added yet
        </div>
      )}
    </section>
  );
}