import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  BookOpen,
  Users,
  Building2,
  Briefcase,
  Code,
  Cpu,
  Network,
} from "lucide-react";
import {
  format,
  subDays,
  eachDayOfInterval,
  startOfDay,
  isWithinInterval,
} from "date-fns";

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

const StatCard = React.memo(({ icon, title, value, change, changeType, subtitle }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {change && (
        <div
          className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${
            changeType === "positive"
              ? "bg-green-100 text-green-700"
              : changeType === "negative"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {changeType === "positive" && (
            <TrendingUp className="w-3 h-3 mr-1" />
          )}
          {changeType === "negative" && (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {change}
        </div>
      )}
    </div>
  </div>
));

const ChartCard = React.memo(({ title, children, icon, subtitle }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
));

const Dashboard = ({ projects = [], trainings = [], partners = [] }) => {
  // Calculate total unique instructors
  const totalInstructors = useMemo(() => {
    const instructors = new Set();
    trainings.forEach((training) => {
      if (training.instructor) {
        instructors.add(training.instructor);
      }
    });
    return instructors.size;
  }, [trainings]);

  // PROJECT DASHBOARD LOGIC
  const projectDashboardData = useMemo(() => {
    const now = new Date();
    const sixtyDaysago = subDays(now, 60);
    const sevenDaysAgo = subDays(now, 7);

    const dailyActivity = eachDayOfInterval({
      start: sixtyDaysago,
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
    const sixtyDaysago = subDays(now, 30);

    const dailyActivity = eachDayOfInterval({
      start: sixtyDaysago,
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

    const categoryMap = {};
    trainings.forEach((training) => {
      const category = training.category;
      if (category) {
        if (!categoryMap[category]) categoryMap[category] = 0;
        categoryMap[category] += 1;
      }
    });

    const trainingCategories = Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    const totalTrainings = trainings.length;

    return {
      dailyActivity,
      trainingCategories,
      totalTrainings,
    };
  }, [trainings]);

  // PARTNERS DASHBOARD LOGIC
  const partnersDashboardData = useMemo(() => {
    const partnerTypeCounts = partners.reduce((acc, partner) => {
      acc[partner.type] = (acc[partner.type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(partnerTypeCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [partners]);

  // PROJECTS BY TYPE DATA FOR BAR CHART
  const projectsByTypeData = useMemo(() => {
    return Object.entries(projectDashboardData.projectsByType)
      .filter(([type, count]) => count > 0)
      .map(([type, count]) => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        count,
      }));
  }, [projectDashboardData.projectsByType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                C2I & Training Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive overview of your projects, trainings, and
                partnerships
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* MAIN STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Total Projects"
            value={projectDashboardData.totalProjects}
            subtitle={`${projectDashboardData.recentProjects} new this week`}
          />
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Training Categories"
            value={trainingDashboardData.trainingCategories.length}
            subtitle={`${trainingDashboardData.trainingCategories.length} categories available`}
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="Total Instructors"
            value={totalInstructors}
            subtitle={`${trainings.length} active trainings`}
          />
          <StatCard
            icon={<Building2 className="w-6 h-6" />}
            title="Partners"
            value={partners.length}
            subtitle={`${partnersDashboardData.length} partner types`}
          />
        </div>

        {/* PROJECTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Daily Project Activity */}
          <div className="lg:col-span-2">
            <ChartCard
              title="Project Activity"
              subtitle="Last 60 days"
              icon={<Code className="w-5 h-5" />}
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={projectDashboardData.dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="projects"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Project Types Distribution */}
          <ChartCard
            title="Project Types"
            icon={<PieChart className="w-5 h-5" />}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectsByTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="name"
                >
                  {projectsByTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={60}
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* TRAININGS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Daily Training Activity */}
          <div className="lg:col-span-2">
            <ChartCard
              title="Training Activity"
              subtitle="Last 60 days"
              icon={<Network className="w-5 h-5" />}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trainingDashboardData.dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="trainings"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#8b5cf6" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Training Categories Distribution */}
          <ChartCard
            title="Training Categories"
            icon={<BookOpen className="w-5 h-5" />}
          >
            {trainingDashboardData.trainingCategories.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trainingDashboardData.trainingCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {trainingDashboardData.trainingCategories.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={pieColors[(index + 3) % pieColors.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={60}
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No training data available</p>
                </div>
              </div>
            )}
          </ChartCard>
        </div>

        {/* PARTNERS & PROJECTS BY TYPE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partners by Type */}
          <ChartCard
            title="Partners by Type"
            icon={<Building2 className="w-5 h-5" />}
          >
            {partnersDashboardData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={partnersDashboardData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#2379BA" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Building2 className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No partners data available</p>
                </div>
              </div>
            )}
          </ChartCard>

          {/* Projects by Type - Bar Chart */}
          <ChartCard
            title="Projects by Type"
            icon={<Briefcase className="w-5 h-5" />}
          >
            {projectsByTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectsByTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {projectsByTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No projects data available</p>
                </div>
              </div>
            )}
          </ChartCard>

          {/* Technology Overview */}
          <ChartCard
            title="Technology Stack"
            icon={<Cpu className="w-5 h-5" />}
            subtitle="Distribution of technologies used"
          >
            <div className="space-y-4 h-60 flex items-center justify-center">
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">IoT Projects</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Web Development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm">Automation</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {projectDashboardData.projectsByType.iot}
                    </div>
                    <div className="text-xs text-gray-500">IoT</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {projectDashboardData.projectsByType.web}
                    </div>
                    <div className="text-xs text-gray-500">Web</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {projectDashboardData.projectsByType.automation}
                    </div>
                    <div className="text-xs text-gray-500">Automation</div>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} C2I & Training. All statistics are
            updated in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
