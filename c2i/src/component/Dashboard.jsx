import React, { useMemo } from "react";
import { Target, Users } from "lucide-react";
import {
  format,
  subDays,
  eachDayOfInterval,
  startOfDay,
  isWithinInterval,
} from "date-fns";

const Dashboard = ({ projects = [], trainings = [] }) => {
  // Calculate total projects
  const totalProjects = projects.length;

  // Calculate total unique instructors (more accurate than totalStudents)
  const totalInstructors = useMemo(() => {
    const instructors = new Set();
    trainings.forEach((training) => {
      if (training.instructor) {
        instructors.add(training.instructor);
      }
    });
    return instructors.size;
  }, [trainings]);

  const StatCard = ({ icon, title, value }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Agency & Training Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Overview of your projects and training programs.
        </p>
      </div>

      {/* STATS - Only showing the two requested metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={<Target />}
          title="Total Projects"
          value={totalProjects}
        />
        <StatCard
          icon={<Users />}
          title="Total Instructors"
          value={totalInstructors}
        />
      </div>
    </div>
  );
};

export default Dashboard;
