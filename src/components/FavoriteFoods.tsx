import { useState, type JSX } from 'react';
import { AppleIcon, HeartIcon, MoonIcon, PlusIcon, SunIcon, TrashIcon, UtensilsIcon } from './Icons';
import { CustomDropdown } from './CustomDropdown';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const categoryOptions = categories.map(cat => ({ value: cat, label: cat }));

type FoodItem = {
    id: string;
    name: string;
    category?: string;
  };
  
  function CategoryIcon({ category, className }: { category: string; className?: string }) {
    const icons: Record<string, JSX.Element> = {
      Breakfast: <SunIcon className={className} />,
      Lunch: <UtensilsIcon className={className} />,
      Dinner: <MoonIcon className={className} />,
      Snacks: <AppleIcon className={className} />
    };
    return icons[category] || <UtensilsIcon className={className} />;
  }

export function FavoriteFoods({ foods, setFoods }: {
  foods: FoodItem[];
  setFoods: (foods: FoodItem[]) => void;
}) {
  const [newFood, setNewFood] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const addFood = () => {
    if (newFood.trim()) {
      setFoods([...foods, {
        id: Date.now().toString(),
        name: newFood.trim(),
        category: selectedCategory
      }]);
      setNewFood('');
    }
  };

  const removeFood = (id: string) => {
    setFoods(foods.filter(food => food.id !== id));
  };

  const startEditing = (food: FoodItem) => {
    setEditingId(food.id);
    setEditName(food.name);
    setEditCategory(food.category || categories[0]);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditCategory('');
  };

  const saveEdit = () => {
    if (editName.trim() && editingId) {
      setFoods(foods.map(food => 
        food.id === editingId 
          ? { ...food, name: editName.trim(), category: editCategory }
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

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-green-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-700">
        <HeartIcon className="w-6 h-6" />
        Favorite Foods
      </h2>
      
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          value={newFood}
          onChange={(e) => setNewFood(e.target.value)}
          placeholder="Add favorite food..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 text-gray-800 bg-white"
          onKeyDown={handleInputKeyPress}
        />
        <CustomDropdown
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Select category"
          theme="green"
        />
        <button
          onClick={addFood}
          className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add
        </button>
      </div>

      <div className="space-y-6">
        {foods.length === 0 ? (
          <div className="bg-green-50 border border-green-100 text-green-800 p-4 rounded-lg">
            No favorite foods added yet
          </div>
        ) : (
          categories.map(category => {
            const categoryFoods = foods.filter(food => food.category === category);
            if (categoryFoods.length === 0) return null;
            
            return (
              <div key={category} className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                  <CategoryIcon category={category} className="w-5 h-5 text-green-600" />
                  {category}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {categoryFoods.map(food => (
                    <li key={food.id} className="flex justify-between items-center bg-white p-3 rounded border border-green-100">
                      {editingId === food.id ? (
                        <div className="flex-1 flex flex-col gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-200 focus:border-green-400 text-gray-800 bg-white"
                            autoFocus
                          />
                          <CustomDropdown
                            options={categoryOptions}
                            value={editCategory}
                            onChange={setEditCategory}
                            placeholder="Select category"
                            theme="green"
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
                          <span className="truncate">{food.name}</span>
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
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
