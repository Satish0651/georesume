const CAREER_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [77.4538, 28.6083] },
      properties: {
        id: "amity",
        name: "Amity University",
        role: "M.Sc. GIS & Remote Sensing",
        period: "Education",
        location: "Noida, Uttar Pradesh",
        icon: "fas fa-graduation-cap",
        color: "#8b5cf6",
        order: 0,
        isEducation: true,
        highlights: [
          "Master of Science in GIS & Remote Sensing",
          "Built foundation in spatial analysis, cartography, and geospatial technologies",
          "Hands-on training with ArcGIS, ERDAS Imagine, and open-source GIS tools"
        ],
        skills: ["Remote Sensing", "Spatial Analysis", "Cartography", "ArcGIS", "ERDAS Imagine"]
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [77.3260, 28.5815] },
      properties: {
        id: "sisl",
        name: "SISL Infotech",
        role: "GIS Specialist",
        period: "2019 – 2021",
        location: "Noida, Uttar Pradesh",
        icon: "fas fa-map-location-dot",
        color: "#ff6b35",
        order: 1,
        isEducation: false,
        highlights: [
          "Delivered 20+ client demos and GIS solutions across multiple domains",
          "Designed and implemented location-based service solutions",
          "Supported pre-sales with technical GIS demonstrations and PoCs"
        ],
        skills: ["ArcGIS", "Location Intelligence", "Solution Design", "Client Demos", "PoC Development"]
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [73.8135, 18.6298] },
      properties: {
        id: "nascent",
        name: "Nascent Info Technologies",
        role: "GIS Business Analyst",
        period: "2021 – 2022",
        location: "Pune, Maharashtra (PCMC)",
        icon: "fas fa-city",
        color: "#00e676",
        order: 2,
        isEducation: false,
        highlights: [
          "Worked on Smart City GIS ERP for Pimpri-Chinchwad Municipal Corporation (PCMC)",
          "Improved municipal service delivery efficiency through GIS integration",
          "Analyzed spatial data to optimize urban planning and city operations"
        ],
        skills: ["Smart City GIS", "ERP Integration", "Web GIS", "SQL", "Urban Planning"]
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [73.0169, 19.0760] },
      properties: {
        id: "jio",
        name: "Jio Platforms Limited",
        role: "Manager — Enterprise GIS Analytics",
        period: "2023 – Present",
        location: "Navi Mumbai, Maharashtra",
        icon: "fas fa-satellite-dish",
        color: "#00d4ff",
        order: 3,
        isEducation: false,
        isCurrent: true,
        highlights: [
          "Leading enterprise GIS platform handling massive telecom datasets",
          "Improved geospatial data processing efficiency by ~30%",
          "Integrated real-time data pipelines using Apache Spark and NiFi",
          "Architecting scalable, future-ready GIS solutions for India's largest telecom"
        ],
        skills: ["ArcGIS Enterprise", "Apache Spark", "NiFi", "Python", "Azure", "GIS Architecture", "Real-time Pipelines"]
      }
    }
  ]
};

const FLIGHT_ARC_PAIRS = [
  { from: "amity", to: "sisl" },
  { from: "sisl", to: "nascent" },
  { from: "nascent", to: "jio" }
];

const MAP_VIEWS = {
  india:   { center: [22, 78],            zoom: 5  },
  amity:   { center: [28.6083, 77.4538],  zoom: 13 },
  sisl:    { center: [28.5815, 77.3260],  zoom: 13 },
  nascent: { center: [18.6298, 73.8135],  zoom: 13 },
  jio:     { center: [19.0760, 73.0169],  zoom: 13 },
  skills:  { center: [22, 78],            zoom: 5  },
  certs:   { center: [22, 78],            zoom: 5  },
  contact: { center: [19.0760, 73.0169],  zoom: 11 },
};
