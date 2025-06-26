
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout.js";
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import { getFriendRequests } from "../lib/api"; // Import the API function

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  // Fetch friend requests to determine if there are new notifications
  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    // Only enable this query if a user is authenticated
    enabled: !!authUser,
  });

  // Determine if there are incoming friend requests (new notifications)
  const hasNewNotifications = (friendRequests?.incomingReqs?.length || 0) > 0;

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle relative"> {/* Added relative positioning */}
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                {hasNewNotifications && ( // Conditionally render the dot
                  <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full"></span>
                )}
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic || ''}
                alt={authUser?.fullName || 'User Avatar'}
                rel="noreferrer"
                onError={(e) => {
                  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.fullName?.charAt(0).toUpperCase() || 'U')}&background=random&color=fff&size=128`;
                  if (e.currentTarget.src !== fallbackUrl) {
                      console.warn("Navbar: User avatar failed to load, falling back to UI Avatar for:", authUser?.fullName);
                      e.currentTarget.src = fallbackUrl;
                  }
                }}
              />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
