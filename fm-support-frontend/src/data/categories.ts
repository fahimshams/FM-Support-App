export interface MachineCategory {
  id: string;
  name: string;
  description: string;
}

export const machineCategories: MachineCategory[] = [
  {
    id: "overlock",
    name: "Three Line Narrow Edge / Overlock",
    description: "Professional overlock machines with intelligent control, side suction, and high-speed capabilities for edge finishing"
  },
  {
    id: "lockstitch",
    name: "Lockstitch Series", 
    description: "Auto-trimming lockstitch machines with side cutters, intelligent control systems, and high-speed operation"
  },
  {
    id: "template", 
    name: "Template Sewing Machine",
    description: "High-precision intelligent template machines for automated pattern sewing and production line technology"
  },
  {
    id: "buttonhole",
    name: "Buttonhole Machine Series",
    description: "Specialized buttonhole machines for flat head, round head, and eyelet buttonholing operations"
  },
  {
    id: "coverstitch",
    name: "Coverstitch & Bartacking",
    description: "High-speed intelligent bartacking and pattern binding machines for professional garment finishing"
  },
  {
    id: "automation",
    name: "Automation Equipment", 
    description: "Fully automatic machines for shirt manufacturing, pocket sewing, and specialized automated operations"
  },
  {
    id: "zigzag",
    name: "Zigzag Seam",
    description: "High-speed computerized zigzag sewing machines for flexible seam construction and decorative stitching"
  },
  {
    id: "heavy",
    name: "Heavy Duty & Specialty",
    description: "Heavy-duty machines for thick materials, cylinder types, and specialized industrial applications"
  },
  {
    id: "multi",
    name: "Multi-Needle & Double Needle", 
    description: "Versatile multi-needle lockstitch machines with auto lubrication and separated needle bar systems"
  },
  {
    id: "interlock",
    name: "Interlock Series",
    description: "High-speed interlock sewing machines with stepping control for stretchy fabrics and knitted materials"
  }
];
