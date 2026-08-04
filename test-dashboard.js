const { format, subDays, eachDayOfInterval, startOfDay, isWithinInterval } = require('date-fns');

const now = new Date();
const sixtyDaysago = subDays(now, 60);

const projects = [
  { createdAt: new Date().toISOString(), type: 'iot' },
  { createdAt: subDays(now, 5).toISOString(), type: 'web' },
  { createdAt: subDays(now, 65).toISOString(), type: 'automation' }
];

// Original
console.time('original');
const dailyActivityOrig = eachDayOfInterval({ start: sixtyDaysago, end: now }).map((date) => {
  const dayStart = startOfDay(date);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
  const projectsOnDay = projects.filter((project) => {
    const createdDate = new Date(project.createdAt);
    return isWithinInterval(createdDate, { start: dayStart, end: dayEnd });
  });
  return { date: format(date, "MMM dd"), projects: projectsOnDay.length };
});
console.timeEnd('original');

// Optimized
console.time('optimized');
const projectCountsByDate = new Map();
projects.forEach((project) => {
  if (project.createdAt) {
    const dateKey = format(new Date(project.createdAt), "yyyy MMM dd");
    projectCountsByDate.set(dateKey, (projectCountsByDate.get(dateKey) || 0) + 1);
  }
});
const dailyActivityOpt = eachDayOfInterval({ start: sixtyDaysago, end: now }).map((date) => {
  const dateKey = format(date, "yyyy MMM dd");
  return { date: format(date, "MMM dd"), projects: projectCountsByDate.get(dateKey) || 0 };
});
console.timeEnd('optimized');

console.log(JSON.stringify(dailyActivityOrig) === JSON.stringify(dailyActivityOpt));
