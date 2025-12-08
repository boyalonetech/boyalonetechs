import { Trash2 } from "lucide-react";

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

interface WaitlistProps {
  waitlist: WaitlistEntry[];
  onDelete: (id: string) => void;
}

export default function Waitlist({ waitlist, onDelete }: WaitlistProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Waitlist</h2>
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Waitlist Entries</h3>
        </div>
        <div className="divide-y">
          {waitlist.map((entry) => (
            <div
              key={entry.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{entry.email}</p>
                <p className="text-gray-500 text-sm">
                  Joined: {new Date(entry.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => onDelete(entry.id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}