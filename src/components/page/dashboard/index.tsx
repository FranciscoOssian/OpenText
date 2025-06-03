"use client";

import { createProject } from "@/services/firebase/Create/project";
import { Project, User } from "@/services/firebase/types";
import { Button } from "antd";

import { useRouter } from "next/navigation";

export default function HomePage({
  user,
  projects,
}: {
  user: User;
  projects: Project[];
}) {
  const router = useRouter();

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const onHandleCreateProject = async () => {
    console.log(user);
    const id = await createProject(user.uid);
    router.push(`/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              My Projects Dashboard
            </h1>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.displayName}
              </span>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button onClick={onHandleCreateProject} type="primary">
          <span>+</span>
          <span>New Project</span>
        </Button>

        {/* Projects List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Last updated: {formatDate(project.updatedAt)}
              </p>
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View/Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
