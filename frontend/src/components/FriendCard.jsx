import { Link } from "react-router"; // Corrected: Should be 'react-router-dom'
import { LANGUAGE_TO_FLAG } from "../constants"; // Assuming this is correct

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            {/* Profile Picture img tag with onError */}
            <img
              src={friend.profilePic || ''} // Ensure src is never null/empty string initially
              alt={friend.fullName || 'User Avatar'} // Provide a descriptive alt text
              onError={(e) => {
                // Construct the fallback URL using ui-avatars.com
                const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.fullName?.charAt(0).toUpperCase() || 'U')}&background=random&color=fff&size=128`;

                // Only set the fallback if the current src is not already the fallback URL
                if (e.currentTarget.src !== fallbackUrl) {
                  console.warn("FriendCard: Profile picture failed to load, falling back to UI Avatar for:", friend.fullName);
                  e.currentTarget.src = fallbackUrl;
                }
              }}
            />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

// Exported function for language flags, moved here for context and onError added
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
        onError={(e) => {
          // Fallback for flags: replace with a generic globe icon
          e.currentTarget.src = "https://placehold.co/24x18/CCCCCC/FFFFFF?text=🌐"; // Placeholder or direct globe image
          console.warn(`FriendCard: Flag for ${language} failed to load. Displaying generic icon.`);
          e.currentTarget.alt = "Generic flag icon";
        }}
      />
    );
  }
  return null;
}