const Project = require("../Models/Projects");
const Training = require("../Models/training");

async function fetchWebsiteKnowledge() {
  const projects = await Project.find({}, "title description technologies");
  const trainings = await Training.find({}, "title description locations");

  const staticContent = `
Bienvenue sur notre site. Nous offrons des projets innovants et des formations techniques.
`;

  const projectText = projects
    .map(
      (p) =>
        `Projet: ${p.title} — ${
          p.description
        }. Technologies: ${p.technologies.join(", ")}`
    )
    .join("\n");

  const trainingText = trainings
    .map(
      (t) => `Formation: ${t.title} — ${t.description}. Lieu: ${t.locations}`
    )
    .join("\n");

  return staticContent + "\n\n" + projectText + "\n\n" + trainingText;
}

module.exports = fetchWebsiteKnowledge;
