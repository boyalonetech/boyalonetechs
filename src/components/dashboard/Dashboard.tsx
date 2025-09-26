interface DashboardProps {
  messagesCount: number;
}

export default function Dashboard({ messagesCount }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-700">
          <h2 className="text-gray-500 text-sm">Total Projects</h2>
          <p className="text-3xl font-bold text-blue-700">24</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-700">
          <h2 className="text-gray-500 text-sm">Messages</h2>
          <p className="text-3xl font-bold text-blue-700">{messagesCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-700">
          <h2 className="text-gray-500 text-sm">Profile Views</h2>
          <p className="text-3xl font-bold text-blue-700">5,430</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">
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
