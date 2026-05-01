'use client';

export default function UserApplications({ applications }: any) {
  return (
    <div className="space-y-4 mt-4">

      {applications.map((app: any) => (
        <div key={app._id} className="border p-4 rounded-md">

          <h2 className="font-semibold text-lg">
            {app.jobId?.company} - {app.jobId?.role}
          </h2>

          <p className="text-sm text-gray-500">
            📍 {app.jobId?.location}
          </p>

          <p className="mt-2">
            Status:{" "}
            <span className={`font-semibold ${
              app.status === "Offer"
                ? "text-green-500"
                : app.status === "Rejected"
                ? "text-red-600"
                : app.status === "Interview"
                ? "text-blue-600"
                : "text-gray-600"
            }`}>
              {app.status}
            </span>
          </p>

          <a
            href={app.resume}
            target="_blank"
            className="text-blue-500 underline text-sm"
          >
            View Resume
          </a>

        </div>
      ))}

    </div>
  );
}