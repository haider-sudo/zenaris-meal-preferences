import { ClipboardIcon } from './Icons';

export function SpecialInstructions({ instructions, setInstructions }: {
  instructions: string;
  setInstructions: (instructions: string) => void;
}) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-purple-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-700">
        <ClipboardIcon className="w-6 h-6" />
        Special Instructions
      </h2>
      
      <div className="relative">
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Texture preferences, temperature preferences, cultural/religious restrictions..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 min-h-[150px] text-gray-800 bg-white"
          maxLength={500}
        />
        <div className={`absolute bottom-3 right-3 text-sm px-2 py-1 rounded ${
          instructions.length >= 450 
            ? 'bg-red-100 text-red-800' 
            : 'bg-purple-100 text-purple-600'
        }`}>
          {instructions.length}/500
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-500">
        <p>Examples:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Prefers soft foods due to dentures</li>
          <li>Likes meals served warm, not hot</li>
          <li>No pork products for religious reasons</li>
        </ul>
      </div>
    </section>
  );
}