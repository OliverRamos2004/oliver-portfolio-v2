import type { SkillCategory } from "@/types/skills";

export const skillCategories: SkillCategory[] = [
  {
    id: "consulting-strategy",
    ref: "01",
    heading: "Consulting & Strategy",
    description: "Bridging technical delivery and business stakeholders — the throughline across every engagement.",
    items: [
      {
        name: "Requirements Gathering",
        detail: "Translating a business owner's or clinic administrator's actual workflow into technical specifications, not assumptions.",
      },
      {
        name: "Stakeholder Management",
        detail: "Running workflow-mapping sessions directly with non-technical staff to keep technical decisions grounded in how people actually work.",
      },
      {
        name: "Workflow Automation",
        detail: "Automated billing reconciliation and financial reporting for Ramos Lawn Care & Services, eliminating paper invoicing and unbilled visits across 18 accounts.",
      },
      {
        name: "Client Advisory",
        detail: "Partner with local business owners to evaluate commercial operations and translate requirements into custom web and platform solutions.",
      },
    ],
  },
  {
    id: "cloud-data",
    ref: "02",
    heading: "Cloud & Data",
    description: "The infrastructure and data layer underneath every client system.",
    items: [
      {
        name: "AWS",
        detail: "AWS Certified Cloud Practitioner — provisioning and deploying accessible web infrastructure using cloud environment parameters.",
      },
      {
        name: "Relational Database Design",
        detail: "Designed custom PostgreSQL schemas and form-validation rules for a healthcare intake migration, built around ACID compliance.",
      },
      {
        name: "SQL",
        detail: "Query design and data modeling across relational systems — coursework in Database Programming plus applied production use.",
      },
      {
        name: "Data Analytics",
        detail: "Google Data Analytics Foundations certified; built the automated P&L reporting system Ramos Lawn Care now runs on.",
      },
    ],
  },
  {
    id: "engineering-tools",
    ref: "03",
    heading: "Engineering & Tools",
    description: "The day-to-day toolkit — building and shipping, not just architecting.",
    items: [
      {
        name: "Frontend Engineering",
        detail: "React, Next.js, TypeScript — five real client sites shipped and deployed, from static storefronts to full platform builds.",
      },
      {
        name: "Agile Delivery & Git",
        detail: "Sprint-based delivery and version control across every engagement, solo or on a 3-person team.",
      },
      {
        name: "Figma Prototyping",
        detail: "Prototype with clients before writing code — every independent engagement starts in Figma, not an editor.",
      },
      {
        name: "Excel & Reporting",
        detail: "Pivot tables and lookups underneath the financial reporting systems built for real operating businesses.",
      },
    ],
  },
];
