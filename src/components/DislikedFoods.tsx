import { useState } from 'react';
import { BanIcon, PlusIcon, TrashIcon } from './Icons';
import { CustomDropdown } from './CustomDropdown';

type DislikedFood = {
    id: string;
    name: string;
    severity: 'mild' | 'strong' | 'absolute';
  };

const severityOptions = [
  { value: 'mild', label: 'Mild Dislike' },
  { value: 'strong', label: 'Strong Dislike' },
  { value: 'absolute', label: "Won't Eat" }
];

export function DislikedFoods({ foods, setFoods }: {
  foods: DislikedFood[];
  setFoods: (foods: DislikedFood[]) => void;
}) {
  const [newFood, setNewFood] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'strong' | 'absolute'>('mild');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSeverity, setEditSeverity] = useState<'mild' | 'strong' | 'absolute'>('mild');

  const addFood = () => {
    if (newFood.trim()) {
      setFoods([...foods, {
        id: Date.now().toString(),
        name: newFood.trim(),
        severity
      }]);
      setNewFood('');
    }
  };

  const removeFood = (id: string) => {
    setFoods(foods.filter(food => food.id !== id));
  };

  const startEditing = (food: DislikedFood) => {
    setEditingId(food.id);
    setEditName(food.name);
    setEditSeverity(food.severity);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditSeverity('mild');
  };

  const saveEdit = () => {
    if (editName.trim() && editingId) {
      setFoods(foods.map(food => 
        food.id === editingId 
          ? { ...food, name: editName.trim(), severity: editSeverity }
          : food
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
      addFood();
    }
  };

  const severityColors = {
    mild: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    strong: 'bg-orange-50 text-orange-800 border-orange-200',
    absolute: 'bg-red-50 text-red-800 border-red-200'
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-yellow-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-yellow-700">
        <BanIcon className="w-6 h-6" />
        Disliked Foods
      </h2>
      
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          value={newFood}
          onChange={(e) => setNewFood(e.target.value)}
          placeholder="Add disliked food..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 text-gray-800 bg-white"
          onKeyDown={handleInputKeyPress}
        />
        <CustomDropdown
          options={severityOptions}
          value={severity}
          onChange={(value) => setSeverity(value as 'mild' | 'strong' | 'absolute')}
          placeholder="Select severity"
          theme="yellow"
        />
        <button
          onClick={addFood}
          className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add
        </button>
      </div>

      {foods.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {foods.map(food => (
            <li 
              key={food.id}
              className={`p-4 rounded-lg border ${severityColors[food.severity]} flex justify-between items-center`}
            >
              {editingId === food.id ? (
                <div className="flex-1 flex flex-col gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 text-gray-800 bg-white"
                    autoFocus
                  />
                  <CustomDropdown
                    options={severityOptions}
                    value={editSeverity}
                    onChange={(value) => setEditSeverity(value as 'mild' | 'strong' | 'absolute')}
                    placeholder="Select severity"
                    theme="yellow"
                    className="text-sm"
                  />
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
                  <span className="font-medium">{food.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColors[food.severity].replace('bg-', 'bg-opacity-70 bg-')}`}>
                      {food.severity}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEditing(food)}
                        className="text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100"
                        aria-label={`Edit ${food.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeFood(food.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                        aria-label={`Remove ${food.name}`}
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
        <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 p-4 rounded-lg">
          No disliked foods added yet
        </div>
      )}
    </section>
  );
}