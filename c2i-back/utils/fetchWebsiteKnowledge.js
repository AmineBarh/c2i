const Project = require("../Models/Projects");
const Training = require("../Models/training");

async function fetchWebsiteKnowledge() {
  // Limit the number of projects and trainings to prevent excessive context
  // This prevents the prompt from growing too large over time
  const projects = await Project.find(
    {},
    "title description technologies"
  ).limit(15);
  const trainings = await Training.find(
    {},
    "title description locations"
  ).limit(15);

  const staticContent = `
Bienvenue sur notre site. Nous offrons des projets innovants et des formations techniques.
`;

  // Limit the length of each project/training description to prevent individual items from being too long
  const projectText = projects
    .map((p) => {
      // Truncate description if too long (max 200 characters)
      const truncatedDesc =
        p.description.length > 200
          ? p.description.substring(0, 200) + "..."
          : p.description;
      return `Projet: ${
        p.title
      } — ${truncatedDesc}. Technologies: ${p.technologies.join(", ")}`;
    })
    .join("\n");

  const trainingText = trainings
    .map((t) => {
      // Truncate description if too long (max 200 characters)
      const truncatedDesc =
        t.description.length > 200
          ? t.description.substring(0, 200) + "..."
          : t.description;
      return `Formation: ${t.title} — ${truncatedDesc}. Lieu: ${t.locations}`;
    })
    .join("\n");

  // Combine all content and ensure it doesn't exceed a reasonable size
  let combinedContent =
    staticContent + "\n\n" + projectText + "\n\n" + trainingText;

  // Limit total content to 3000 characters to stay within model limits
  if (combinedContent.length > 3000) {
    combinedContent =
      combinedContent.substring(0, 3000) + "\n... (contenu tronqué)";
  }

  return combinedContent;
}

module.exports = fetchWebsiteKnowledge;
