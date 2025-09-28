import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import path to match your file structure

interface DashboardProps {
  messagesCount: number;
}

export default function Dashboard({ messagesCount }: DashboardProps) {
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        setLoading(true);

        // Fetch all projects (remove the pinned filter)
        const {
          data: projects,
          error,
          count,
        } = await supabase
          .from("projects") // Make sure this matches your table name
          .select("*", { count: "exact" }); // This gets the count directly
        // Removed: .eq("pinned", false)

        if (error) {
          throw error;
        }

        // Use the count if available, otherwise use the array length
        setProjectsCount(count || projects?.length || 0);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectsCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchAllProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm">All Projects</h2>
          <p className="text-3xl font-bold text-blue-500">
            {loading ? "..." : projectsCount}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm">Messages</h2>
          <p className="text-3xl font-bold text-blue-500">{messagesCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm">Profile Views</h2>
          <p className="text-3xl font-bold text-blue-500">5,430</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 lg:p-6">
        <h2 className="text-lg font-semibold mb-4 text-blue-500">
          Recent Activity
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between border-b pb-2">
            <span>Added new project &apos;Portfolio Redesign&apos;</span>
            <span className="text-gray-500 text-sm">2 days ago</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>Received message from John Doe</span>
            <span className="text-gray-500 text-sm">4 days ago</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>Updated profile</span>
            <span className="text-gray-500 text-sm">1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
