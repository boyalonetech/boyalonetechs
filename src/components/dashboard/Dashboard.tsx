import { JSX, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  MessageSquare,
  PlusCircle,
  User,
  RefreshCw,
  Heart,
  Mail,
} from "lucide-react";

interface DashboardProps {
  messagesCount?: number; // Make this optional
}

interface Activity {
  id: string;
  type: "message" | "project" | "like" | "login";
  description: string;
  timestamp: string;
  rawTimestamp: string;
  user?: string;
  icon: JSX.Element;
}

export default function Dashboard({ messagesCount }: DashboardProps) {
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);

      // Fetch all projects count
      const { count: projectsCount, error: projectsError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
      } else {
        setProjectsCount(projectsCount || 0);
      }

      // Fetch TOTAL messages count
      const { count: totalMessagesCount, error: messagesError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      if (messagesError) {
        console.error("Error fetching total messages:", messagesError);
        // Use prop if available, otherwise default to 0
        setTotalMessages(messagesCount || 0);
      } else {
        console.log("Total messages fetched:", totalMessagesCount);
        setTotalMessages(totalMessagesCount || 0);
      }

      // Fetch unread messages count
      const { count: unreadCount, error: unreadError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("read", false);

      if (unreadError) {
        console.error("Error fetching unread messages:", unreadError);
      } else {
        setUnreadMessages(unreadCount || 0);
      }

      // Fetch total likes from project_likes table
      const { count: likesCount, error: likesError } = await supabase
        .from("project_likes")
        .select("*", { count: "exact", head: true });

      if (likesError) {
        console.error("Error fetching likes:", likesError);
        // Fallback: Calculate from projects table
        const { data: projectsWithLikes } = await supabase
          .from("projects")
          .select("like_count");

        const total =
          projectsWithLikes?.reduce(
            (sum, project) => sum + (project.like_count || 0),
            0
          ) || 0;
        setTotalLikes(total);
      } else {
        setTotalLikes(likesCount || 0);
      }

      // Fetch recent activities
      await fetchRecentActivities();
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const newActivities: Activity[] = [];

      // Fetch recent messages (last 5)
      const { data: recentMessages, error: messagesError } = await supabase
        .from("messages")
        .select("id, from_name, subject, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      if (messagesError) {
        console.error("Error fetching recent messages:", messagesError);
      } else if (recentMessages) {
        recentMessages.forEach((msg: any) => {
          newActivities.push({
            id: msg.id,
            type: "message",
            description: `New message: ${msg.subject || "No subject"}`,
            timestamp: formatTimeAgo(msg.created_at),
            rawTimestamp: msg.created_at,
            user: `From: ${msg.from_name}`,
            icon: <MessageSquare className="text-blue-500 w-4 h-4" />,
          });
        });
      }

      // Fetch recent projects (last 3)
      const { data: recentProjects, error: projectsError } = await supabase
        .from("projects")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      if (projectsError) {
        console.error("Error fetching recent projects:", projectsError);
      } else if (recentProjects) {
        recentProjects.forEach((project: any) => {
          newActivities.push({
            id: project.id,
            type: "project",
            description: `Added project: ${project.title}`,
            timestamp: formatTimeAgo(project.created_at),
            rawTimestamp: project.created_at,
            icon: <PlusCircle className="text-green-500 w-4 h-4" />,
          });
        });
      }

      // Fetch recent likes (last 3)
      const { data: recentLikes, error: likesError } = await supabase
        .from("project_likes")
        .select("id, created_at, projects(title)")
        .order("created_at", { ascending: false })
        .limit(3);

      if (likesError) {
        console.error("Error fetching recent likes:", likesError);
      } else if (recentLikes) {
        recentLikes.forEach((like: any) => {
          newActivities.push({
            id: like.id,
            type: "like",
            description: `New like on: ${like.projects?.title || "project"}`,
            timestamp: formatTimeAgo(like.created_at),
            rawTimestamp: like.created_at,
            icon: (
              <Heart className="text-red-500 w-4 h-4" fill="currentColor" />
            ),
          });
        });
      }

      // Sort by raw timestamp (newest first) and limit to 8 most recent
      const sortedActivities = newActivities
        .sort(
          (a, b) =>
            new Date(b.rawTimestamp).getTime() -
            new Date(a.rawTimestamp).getTime()
        )
        .slice(0, 8);

      setActivities(sortedActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    if (!timestamp) return "just now";

    const now = new Date();
    const past = new Date(timestamp);

    if (isNaN(past.getTime())) {
      return "recently";
    }

    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 120) return "1 minute ago";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 7200) return "1 hour ago";
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return "1 day ago";
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 1209600) return "1 week ago";
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">Dashboard Overview</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <PlusCircle className="text-blue-500 w-5 h-5" />
            <h2 className="text-gray-500 text-sm">All Projects</h2>
          </div>
          <p className="text-3xl font-bold text-blue-500">
            {loading ? "..." : projectsCount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total projects created</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="text-blue-500 w-5 h-5" />
            <h2 className="text-gray-500 text-sm">Total Messages</h2>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-blue-500">
              {loading ? "..." : totalMessages.toLocaleString()}
            </p>
            {unreadMessages > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadMessages} unread
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Contact form submissions</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="text-red-500 w-5 h-5" fill="currentColor" />
            <h2 className="text-gray-500 text-sm">Total Likes</h2>
          </div>
          <p className="text-3xl font-bold text-blue-500">
            {loading ? "..." : totalLikes.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Across all projects</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="text-blue-500 w-5 h-5" />
            <h2 className="text-gray-500 text-sm">Recent Activity</h2>
          </div>
          <p className="text-3xl font-bold text-blue-500">
            {activities.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Last {activities.length} activities
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-500">
            Recent Activity (Newest First)
          </h2>
          <span className="text-sm text-gray-500">
            Updated:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No recent activity</p>
            <p className="text-sm">
              Activities will appear here as they happen
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center text-xs text-gray-400 mb-2">
              <div className="w-8 text-center">NEW</div>
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="w-8 text-center">OLD</div>
            </div>

            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex flex-col items-center mr-3 pt-1">
                  <div
                    className={`w-3 h-3 rounded-full mb-1 ${
                      index === 0
                        ? "bg-green-500"
                        : index === 1
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  />
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {activity.description}
                      </p>
                      {activity.user && (
                        <p className="text-sm text-gray-600 truncate">
                          {activity.user}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      index === 0
                        ? "bg-green-100 text-green-800"
                        : index === 1
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Activity Summary
            </h3>
            <span className="text-xs text-gray-500">
              Total: {activities.length} activities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Messages</p>
                <p className="text-xs text-gray-600">
                  {activities.filter((a) => a.type === "message").length} recent
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <PlusCircle className="text-green-500 w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Projects</p>
                <p className="text-xs text-gray-600">
                  {activities.filter((a) => a.type === "project").length} recent
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
              <Heart className="text-red-500 w-5 h-5" fill="currentColor" />
              <div>
                <p className="text-sm font-medium">Likes</p>
                <p className="text-xs text-gray-600">
                  {activities.filter((a) => a.type === "like").length} recent
                </p>
              </div>
            </div>
          </div>

          {activities.length > 0 && (
            <div className="mt-4 text-xs text-gray-500">
              <p>
                Showing newest activity from{" "}
                {formatTimeAgo(activities[0]?.rawTimestamp)} to{" "}
                {formatTimeAgo(activities[activities.length - 1]?.rawTimestamp)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
