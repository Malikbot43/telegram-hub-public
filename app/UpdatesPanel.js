export default function UpdatesPanel({ updates }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">
        <i className="fa-solid fa-bullhorn text-indigo-600 mr-2"></i>
        Admin Updates
      </h2>

      {updates.length === 0 && (
        <p className="text-gray-400 text-sm">No updates yet.</p>
      )}

      {updates.map((update) => (
        <div
          key={update.id}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-1"
        >
          <span className="text-xs text-gray-400">
            {new Date(update.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <h4 className="font-bold text-gray-800">{update.title}</h4>
          <p className="text-sm text-gray-600">{update.content}</p>
        </div>
      ))}
    </div>
  )
        }
            
