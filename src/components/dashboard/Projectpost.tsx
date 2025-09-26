export default function Projects() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Website Redesign", "E-commerce App", "Landing Page"].map(
          (project) => (
            <div
              key={project}
              className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-700"
            >
              <h3 className="font-semibold text-lg">{project}</h3>
              <p className="text-gray-500 text-sm mt-2">
                This is a sample description for the project.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}