import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import path to match your file structure

interface DashboardProps {
  messagesCount: number;
}

export default function Dashboard({ messagesCount }: DashboardProps) {
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        // Fetch all projects count
        const {
          data: projects,
          error: projectsError,
          count: projectsCount,
        } = await supabase
          .from("projects")
          .select("*", { count: "exact" });

        if (projectsError) {
          console.error("Error fetching projects:", projectsError);
        } else {
          setProjectsCount(projectsCount || projects?.length || 0);
        }

        // Fetch total likes from project_likes table
        const { data: likesData, error: likesError, count: likesCount } = await supabase
          .from("project_likes")
          .select("*", { count: "exact" });

        if (likesError) {
          console.error("Error fetching likes:", likesError);
          
          // Fallback: Calculate from projects table if project_likes doesn't exist yet
          const { data: projectsWithLikes, error: projectsLikesError } = await supabase
            .from("projects")
            .select("like_count");
            
          if (projectsLikesError) {
            console.error("Error fetching project likes:", projectsLikesError);
            setTotalLikes(0);
          } else {
            const total = projectsWithLikes?.reduce((sum, project) => sum + (project.like_count || 0), 0) || 0;
            setTotalLikes(total);
          }
        } else {
          // Use count from project_likes table
          setTotalLikes(likesCount || likesData?.length || 0);
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setProjectsCount(0);
        setTotalLikes(0);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm">All Projects</h2>
          <p className="text-3xl font-bold text-blue-500">
            {loading ? "..." : projectsCount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm">Messages</h2>
          <p className="text-3xl font-bold text-blue-500">
            {messagesCount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm">Total Likes</h2>
          <p className="text-3xl font-bold text-blue-500">
            {loading ? "..." : totalLikes.toLocaleString()}
          </p>
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