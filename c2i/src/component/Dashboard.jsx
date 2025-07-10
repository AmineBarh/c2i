import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Users,
  Award,
  Clock,
  Target,
  BookOpen,
  Cpu,
  Code,
  Cog,
  Star,
  MapPin,
} from "lucide-react";
import {
  format,
  subDays,
  eachDayOfInterval,
  startOfDay,
  isWithinInterval,
} from "date-fns";

const Dashboard = ({ projects = [], trainings = [] }) => {
  // PROJECT DASHBOARD LOGIC
  const projectDashboardData = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 60);
    const sevenDaysAgo = subDays(now, 7);

    const dailyActivity = eachDayOfInterval({
      start: thirtyDaysAgo,
      end: now,
    }).map((date) => {
      const dayStart = startOfDay(date);
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
      const projectsOnDay = projects.filter((project) => {
        const createdDate = new Date(project.createdAt);
        return isWithinInterval(createdDate, { start: dayStart, end: dayEnd });
      });
      return {
        date: format(date, "MMM dd"),
        projects: projectsOnDay.length,
      };
    });

    const projectsByType = {
      iot: projects.filter((p) => p.type === "iot").length,
      web: projects.filter((p) => p.type === "web").length,
      automation: projects.filter((p) => p.type === "automation").length,
    };

    const totalProjects = projects.length;
    const recentProjects = projects.filter(
      (p) => new Date(p.createdAt) >= sevenDaysAgo
    ).length;

    return {
      dailyActivity,
      projectsByType,
      totalProjects,
      recentProjects,
    };
  }, [projects]);

  // TRAINING DASHBOARD LOGIC
  const trainingDashboardData = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);

    const dailyActivity = eachDayOfInterval({
      start: thirtyDaysAgo,
      end: now,
    }).map((date) => {
      const dayStart = startOfDay(date);
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
      const trainingsOnDay = trainings.filter((training) => {
        if (!training.createdAt) return false;
        const createdDate = new Date(training.createdAt);
        return isWithinInterval(createdDate, { start: dayStart, end: dayEnd });
      });
      return {
        date: format(date, "MMM dd"),
        trainings: trainingsOnDay.length,
      };
    });

    const trainingsByCategory = {
      iot: trainings.filter((t) => t.category === "IoT").length,
      web: trainings.filter((t) => t.category === "Web Development").length,
      automation: trainings.filter((t) => t.category === "Automation").length,
    };

    const totalTrainings = trainings.length;
    const totalStudents = trainings.reduce(
      (sum, t) => sum + (t.students || 0),
      0
    );

    return {
      dailyActivity,
      trainingsByCategory,
      totalTrainings,
      totalStudents,
    };
  }, [trainings]);
  const dashboardData = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 60);
    const sevenDaysAgo = subDays(now, 7);

    // Projects by type
    const projectsByType = {
      iot: projects.filter((p) => p.type === "iot").length,
      web: projects.filter((p) => p.type === "web").length,
      automation: projects.filter((p) => p.type === "automation").length,
    };

    // Recent projects (last 7 days)
    const recentProjects = projects.filter((project) => {
      const createdDate = new Date(project.createdAt);
      return createdDate >= sevenDaysAgo;
    });

    // Monthly projects (last 30 days)
    const monthlyProjects = projects.filter((project) => {
      const createdDate = new Date(project.createdAt);
      return createdDate >= thirtyDaysAgo;
    });

    // Daily activity for the last 30 days (GitHub-style)
    const dailyActivity = eachDayOfInterval({
      start: thirtyDaysAgo,
      end: now,
    }).map((date) => {
      const dayStart = startOfDay(date);
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
      const projectsOnDay = projects.filter((project) => {
        const createdDate = new Date(project.createdAt);
        return isWithinInterval(createdDate, { start: dayStart, end: dayEnd });
      });
      return {
        date: format(date, "MMM dd"),
        projects: projectsOnDay.length,
        iot: projectsOnDay.filter((p) => p.type === "iot").length,
        web: projectsOnDay.filter((p) => p.type === "web").length,
        automation: projectsOnDay.filter((p) => p.type === "automation").length,
      };
    });

    // Weekly summary for the last 4 weeks
    const weeklyData = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = subDays(now, (i + 1) * 7);
      const weekEnd = subDays(now, i * 7);
      const weekProjects = projects.filter((project) => {
        const createdDate = new Date(project.createdAt);
        return isWithinInterval(createdDate, {
          start: weekStart,
          end: weekEnd,
        });
      });
      weeklyData.push({
        week: `Week ${4 - i}`,
        projects: weekProjects.length,
        iot: weekProjects.filter((p) => p.type === "iot").length,
        web: weekProjects.filter((p) => p.type === "web").length,
        automation: weekProjects.filter((p) => p.type === "automation").length,
      });
    }

    // Category distribution
    const categories = [...new Set(projects.map((p) => p.category))];
    const categoryData = categories.map((category) => ({
      name: category,
      value: projects.filter((p) => p.category === category).length,
      type: projects.find((p) => p.category === category)?.type || "web",
    }));

    // Technology usage
    const allTechnologies = projects.flatMap((p) => p.technologies);
    const techCount = allTechnologies.reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {});

    const topTechnologies = Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    return {
      projectsByType,
      recentProjects: recentProjects.length,
      monthlyProjects: monthlyProjects.length,
      dailyActivity,
      weeklyData,
      categoryData,
      topTechnologies,
      totalProjects: projects.length,
      avgProjectsPerWeek: Math.round(monthlyProjects.length / 4),
    };
  }, [projects]);

  const typeColors = {
    iot: "#8EC64C", // emerald
    web: "#2379BA", // blue
    automation: "#F8B74C", // orange
  };

  const pieColors = [
    "#8EC64C",
    "#2379BA",
    "#F8B74C",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#84cc16",
  ];

  const StatCard = ({ icon, title, value, change, changeType }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-greenc2i-500 to-bluec2i-500 rounded-lg flex items-center justify-center text-white">
            {icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {change && (
          <div
            className={`flex items-center text-sm font-medium ${
              changeType === "positive"
                ? "text-green-600"
                : changeType === "negative"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {changeType === "positive" && (
              <TrendingUp className="w-4 h-4 mr-1" />
            )}
            {changeType === "negative" && (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {change}
          </div>
        )}
      </div>
    </div>
  );

  // REUSABLE COMPONENTS

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

      {/* PROJECT STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Target />}
          title="Total Projects"
          value={projectDashboardData.totalProjects}
        />
        <StatCard
          icon={<Clock />}
          title="Recent Projects"
          value={projectDashboardData.recentProjects}
        />
      </div>

      {/* PROJECT CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Project Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Daily Project Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projectDashboardData.dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="projects"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project Types Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Project Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: "IoT",
                    value: projectDashboardData.projectsByType.iot,
                  },
                  {
                    name: "Web",
                    value: projectDashboardData.projectsByType.web,
                  },
                  {
                    name: "Automation",
                    value: projectDashboardData.projectsByType.automation,
                  },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {[
                  { color: "#8EC64C" },
                  { color: "#2379BA" },
                  { color: "#F8B74C" },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TRAINING STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard
          icon={<BookOpen />}
          title="Total Trainings"
          value={trainingDashboardData.totalTrainings}
        />
        <StatCard
          icon={<Users />}
          title="Total Students"
          value={trainingDashboardData.totalStudents}
        />
      </div>

      {/* TRAINING CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Training Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">
            Daily Training Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trainingDashboardData.dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="trainings"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Training Categories Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Training Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: "IoT",
                    value: trainingDashboardData.trainingsByCategory.iot,
                  },
                  {
                    name: "Web",
                    value: trainingDashboardData.trainingsByCategory.web,
                  },
                  {
                    name: "Automation",
                    value: trainingDashboardData.trainingsByCategory.automation,
                  },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {[
                  { color: "#10b981" },
                  { color: "#3b82f6" },
                  { color: "#f97316" },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
