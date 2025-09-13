//donneees de test

// src/components/discovery/mockData.js
export const mockOSCs = [
  {
    id: 1,
    name: "EcoGreen Cameroun",
    location: "Yaoundé, Centre",
    country: "Cameroun",
    focus_areas: ["Environnement", "Sensibilisation", "Protection"],
    description: "Organisation environnementale spécialisée en sensibilisation communautaire et protection des écosystèmes locaux.",
    matchScore: 92,
    size: "Moyenne",
    avatar: "EG"
  },
  {
    id: 2,
    name: "Santé pour Tous",
    location: "Douala, Littoral",
    country: "Cameroun", 
    focus_areas: ["Santé", "Prévention", "Communautaire"],
    description: "Promotion de la santé communautaire et prévention des maladies dans les zones rurales et urbaines.",
    matchScore: 87,
    size: "Grande",
    avatar: "SF"
  },
  {
    id: 3,
    name: "Jeunesse Active",
    location: "Bafoussam, Ouest",
    country: "Cameroun",
    focus_areas: ["Formation", "Jeunesse", "Entrepreneuriat"],
    description: "Formation professionnelle et accompagnement des jeunes entrepreneurs dans leurs projets.",
    matchScore: 76,
    size: "Petite",
    avatar: "JA"
  },
  {
    id: 4,
    name: "Éducation Nord",
    location: "Maroua, Extrême-Nord",
    country: "Cameroun",
    focus_areas: ["Éducation", "Formation", "Alphabétisation"],
    description: "Construction d'écoles et programmes d'alphabétisation dans les zones rurales du Nord.",
    matchScore: 84,
    size: "Moyenne",
    avatar: "EN"
  },
  {
    id: 5,
    name: "Femmes Entrepreneures",
    location: "Bamenda, Nord-Ouest",
    country: "Cameroun",
    focus_areas: ["Autonomisation", "Finance", "Formation"],
    description: "Autonomisation économique des femmes à travers la formation en gestion et microfinance.",
    matchScore: 91,
    size: "Moyenne",
    avatar: "FE"
  },
  {
    id: 6,
    name: "Tech4Good Sénégal",
    location: "Dakar, Dakar",
    country: "Sénégal",
    focus_areas: ["Technologie", "Innovation", "Formation"],
    description: "Démocratisation de l'accès à la technologie et formation numérique pour les jeunes.",
    matchScore: 73,
    size: "Grande",
    avatar: "T4"
  },
  {
    id: 7,
    name: "Agriculteurs Unis",
    location: "Bouaké, Vallée du Bandama",
    country: "Côte d'Ivoire",
    focus_areas: ["Agriculture", "Formation", "Coopérative"],
    description: "Coopérative d'agriculteurs pour l'amélioration des techniques agricoles et la commercialisation.",
    matchScore: 69,
    size: "Grande",
    avatar: "AU"
  },
  {
    id: 8,
    name: "Droits & Justice",
    location: "Libreville, Estuaire",
    country: "Gabon",
    focus_areas: ["Droits humains", "Justice", "Sensibilisation"],
    description: "Défense des droits humains et accompagnement juridique des populations vulnérables.",
    matchScore: 82,
    size: "Petite",
    avatar: "DJ"
  }
];

// Données pour les filtres
export const countries = [
  "Tous les pays",
  "Cameroun", 
  "Sénégal",
  "Côte d'Ivoire",
  "Gabon"
];

export const sectors = [
  "Tous les secteurs",
  "Environnement",
  "Santé", 
  "Éducation",
  "Formation",
  "Droits humains",
  "Agriculture",
  "Technologie",
  "Jeunesse",
  "Autonomisation"
];

export const sizes = [
  "Toutes les tailles",
  "Petite (1-10)",
  "Moyenne (11-50)", 
  "Grande (50+)"
];