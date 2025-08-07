type UserProfile = {
  name: string;
  birthday: string;
  emoji: string;
  lastOnline: string;
};

export function ProfileHeader({ userProfile }: { userProfile: UserProfile }) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      {/* Profile Picture and Name */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
            {userProfile.name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{userProfile.name}</h1>
          <p className="text-gray-600 mb-2">Zenaris Nutzer</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Hier kannst Du jegliche Einstellungen für {userProfile.name} vornehmen.
          </p>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-xs text-gray-500 mb-1">Geburtstag</div>
          <div className="font-medium text-gray-800">{userProfile.birthday}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-xs text-gray-500 mb-1">Emoji</div>
          <div className="text-2xl">{userProfile.emoji}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-xs text-gray-500 mb-1">Zuletzt Online</div>
          <div className="font-medium text-gray-800">{userProfile.lastOnline}</div>
        </div>
      </div>
    </section>
  );
} 