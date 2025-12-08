import { ServerIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Settings</h2>
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div
            className="flex bg-blue-500 gap-2 w-max text-white p-3 px-6 rounded-xl cursor-pointer"
            onClick={() =>
              router.push(
                "https://supabase.com/dashboard/project/qwumsqzcfjurbwrjxuoe"
              )
            }
          >
            <h1>Database</h1>
            <ServerIcon />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
