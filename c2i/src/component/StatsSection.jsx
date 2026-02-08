import React from "react";
import CountUp from "../blocks/CountUp/CountUp";
import { Users, Award, TrendingUp } from "lucide-react";

const HappyClients = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="mb-6 flex items-center justify-center">
      <Users color="#8EC64C" size={48} />
    </div>
    <div className="text-5xl font-extrabold text-gray-900 mb-2 flex items-center justify-center">
      <>
        <CountUp from={0} to={150} duration={1.5} separator="," />
        <span className="ml-1 text-4xl font-extrabold text-bluec2i-500">+</span>
      </>
    </div>
    <div className="text-lg font-semibold text-gray-600">
      Clients satisfaits
    </div>
  </div>
);

const ProjectsCompleted = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="mb-6 flex items-center justify-center">
      <Award color="#F8B74C" size={48} />
    </div>
    <div className="text-5xl font-extrabold text-gray-900 mb-2 flex items-center justify-center">
      <>
        <CountUp from={0} to={30} duration={1.5} separator="," />
        <span className="ml-1 text-4xl font-extrabold text-bluec2i-500">+</span>
      </>
    </div>
    <div className="text-lg font-semibold text-gray-600">Projets réalisés</div>
  </div>
);

const SuccessRate = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="mb-6 flex items-center justify-center">
      <TrendingUp color="#2379BA" size={48} />
    </div>
    <div className="text-5xl font-extrabold text-gray-900 mb-2 flex items-center justify-center">
      <>
        <CountUp from={0} to={90} duration={1.5} separator="," />
        <span className="ml-1 text-4xl font-extrabold text-bluec2i-500">%</span>
      </>
    </div>
    <div className="text-lg font-semibold text-gray-600">Taux de réussite</div>
  </div>
);

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-emerald-50 via-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <HappyClients />
          <ProjectsCompleted />
          <SuccessRate />
        </div>
      </div>
    </section>
  );
};

// Optimization: Memoize StatsSection to prevent unnecessary re-renders when parent state updates.
export default React.memo(StatsSection);
