import { machineCategories } from "./categories";
export const machineryData = [
    // Overlock Series (Three Line Narrow Edge)
    {
        id: "ol-001",
        name: "B8510 STEP MOTOR CONTROL SMART OVERLOCK MACHINE",
        category: "overlock",
        image: "/images/machinery/machine-001-20250612211209_8115.jpg",
        description: "Advanced step motor controlled smart overlock machine with intelligent features for precise edge finishing and professional garment construction.",
        features: ["Step motor control", "Smart operation", "Intelligent system", "Professional edge finishing"],
        applications: ["Edge finishing", "Seam overlocking", "Garment construction", "Professional sewing"],
        specifications: {
            needle: "DCX27 14#",
            stitchLength: "2-5mm",
            alternationRange: "3+4",
            lubricatingOil: "0.5-3.8",
            power: "0.7-2"
        }
    },
    {
        id: "ol-002",
        name: "B7510 Series High Speed Step Intelligent Overlock Sewing Machine",
        category: "overlock",
        image: "/images/machinery/machine-002-20240515152152_5874.jpg",
        description: "High-speed step motor intelligent overlock machine offering superior control and consistent stitching quality for professional applications.",
        features: ["High-speed operation", "Step motor control", "Intelligent control", "Consistent stitching"],
        applications: ["Professional overlocking", "High-volume production", "Quality edge work", "Industrial sewing"],
        specifications: {
            model: "B7510-17-MD2/MED3/MPD3 | B7510-13-MD2/MED3/MPD3",
            needle: "DCX27 11#",
            stitchLength: "2-4mm",
            alternationRange: "2+4",
            lubricatingOil: "0.7-4.5",
            power: "0.7-1.5"
        }
    },
    {
        id: "ol-003",
        name: "B7500 Series High Speed Side Suction Intelligent Overlock Sewing Machine",
        category: "overlock",
        image: "/images/machinery/machine-003-20240515152257_1598.jpg",
        description: "High-speed overlock machine with side suction system and intelligent control for clean, professional edge finishing.",
        features: ["High-speed operation", "Side suction system", "Intelligent control", "Clean operation"],
        applications: ["Edge finishing", "Professional garments", "Clean work environment", "High-volume production"],
        specifications: {
            needle: "DCX27 11#",
            stitchLength: "2-4mm",
            alternationRange: "2+4",
            lubricatingOil: "0.7-4.5",
            power: "0.7-1.5"
        }
    },
    {
        id: "ol-004",
        name: "B9500 SUPER HIGH SPEED INTELLIGENT OVERLOCK SEWING MACHINE",
        category: "overlock",
        image: "/images/machinery/machine-004-20250613100325_7867.jpg",
        description: "Super high-speed intelligent overlock machine with advanced core technology featuring innovative oil supply system, large needle gauge design, and intelligent control for maximum efficiency.",
        features: [
            "New appearance with enhanced technology and identification",
            "Control box of all-in-one machine is more stable and portable",
            "Large needle gauge design to improve feeding efficiency",
            "Patented oil supply system with more durable parts",
            "Through shaft for lighter torque and faster reaction",
            "All-inclusive needle bar oil absorption to prevent fabric pollution",
            "Simple panel, easy to operate",
            "New oil supply system for more accurate oil delivery",
            "11cm wide head with 4.5cm height providing large operation space"
        ],
        applications: ["High-speed overlocking", "Professional edge finishing", "Industrial manufacturing", "Quality garment production"],
        specifications: {
            model: "B9500"
        }
    },
    {
        id: "ol-005",
        name: "B9000 Series High Speed Direct Drive Overlock Sewing Machine",
        category: "overlock",
        image: "/images/machinery/machine-005-20240515151927_2671.jpg",
        description: "High-speed direct drive overlock machine featuring advanced technology with multiple stitch patterns, intelligent control systems, and precision operation for professional garment manufacturing.",
        features: [
            "High-speed direct drive technology",
            "Multiple stitch pattern capabilities",
            "Intelligent control system",
            "Precision operation and consistent quality",
            "Professional edge finishing",
            "Energy efficient operation",
            "Durable construction for industrial use",
            "Advanced needle threading system"
        ],
        applications: ["Professional overlocking", "High-volume production", "Edge finishing", "Garment manufacturing"],
        specifications: {
            model: "B9000"
        }
    },
    // Interlock Series
    {
        id: "il-001",
        name: "C2510 HIGH SPEED STEP CYLINDER TYPE INTERLOCK MACHINE",
        category: "interlock",
        image: "/images/machinery/machine-006-20240515152513_6239.jpg",
        description: "High-speed step cylinder type interlock machine designed for stretchy fabrics and professional garment construction.",
        features: ["High-speed operation", "Cylinder type", "Step control", "Interlock stitching"],
        applications: ["Knit fabrics", "Stretchy materials", "T-shirt manufacturing", "Professional garments"],
        specifications: {
            model: "C2510-156M-D3B/02"
        }
    },
    {
        id: "il-002",
        name: "ZJ2500A Series Super High Speed Interlock Sewing Machine",
        category: "interlock",
        image: "/images/machinery/machine-007-20240515152719_1641.jpg",
        description: "Super high-speed interlock sewing machine for maximum productivity in knit fabric processing and garment manufacturing.",
        features: ["Super high-speed", "Interlock stitching", "High productivity", "Knit fabric specialized"],
        applications: ["High-volume production", "Knit garments", "Industrial manufacturing", "Professional sewing"]
    },
    {
        id: "il-003",
        name: "ZJC2500 Series High Speed Direct-drive Automatic Trimming Cylinder Type Interlock Sewing Machine",
        category: "interlock",
        image: "/images/machinery/machine-008-20240515153044_5769.jpg",
        description: "Advanced direct-drive interlock machine with automatic trimming feature for efficient, high-quality garment production.",
        features: ["Direct-drive system", "Automatic trimming", "High-speed operation", "Cylinder type"],
        applications: ["Automated production", "Professional garments", "Efficient manufacturing", "Quality finishing"],
        specifications: {
            model: "ZJC2500-156M-BD-PD3C | ZJC2500-164M-BD-PD3C",
            needle: "UY128GAS11#",
            stitchLength: "3-5mm",
            alternationRange: "6.4",
            lubricatingOil: "1.4-4.4",
            power: "1/0.7-1/1.7"
        }
    },
    {
        id: "il-004",
        name: "C5100 HIGH SPEED STEPPING PLATFORM INTERLOCK SEWING MACHINE",
        category: "interlock",
        image: "/images/machinery/machine-009-20240515153309_2905.jpg",
        description: "High-speed stepping platform interlock machine with intelligent control for precise and consistent stitching results.",
        features: ["High-speed operation", "Stepping control", "Platform design", "Intelligent system"],
        applications: ["Platform sewing", "Controlled stitching", "Professional production", "Quality manufacturing"],
        specifications: {
            model: "C5100-356-D3B/02",
            needle: "UY128GAS11#-14#",
            stitchLength: "3-5mm",
            alternationRange: "5.6",
            lubricatingOil: "1.4-4.5",
            power: "1/0.6-1/1.3"
        }
    },
    {
        id: "il-005",
        name: "C5000 Series High Speed Automatic Strip Cutting Platform Sewing Machine",
        category: "interlock",
        image: "/images/machinery/machine-010-20240515153422_7955.jpg",
        description: "Automatic strip cutting platform machine for efficient production with integrated cutting and sewing capabilities.",
        features: ["Automatic strip cutting", "Platform design", "High-speed operation", "Integrated cutting"],
        applications: ["Strip cutting", "Platform sewing", "Automated production", "Efficient manufacturing"],
        specifications: {
            model: "C5000-356-02",
            needle: "UY128GAS11#",
            stitchLength: "3-5mm",
            alternationRange: "6.4",
            lubricatingOil: "1.4-4.5",
            power: "1/0.6-1/1.3"
        }
    },
    // Lockstitch Series
    {
        id: "ls-001",
        name: "A6000-G Series Direct Drive High Speed Lockstitch Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-011-20240515141924_0097.jpg",
        description: "Direct drive high-speed lockstitch machine with advanced core technology featuring energy saving, high efficiency, and precise control for professional garment manufacturing.",
        features: [
            "Energy saving and high efficiency",
            "Simple direct drive, separate motor",
            "Stable, efficient and cost-effective",
            "Handwheel with strong wind design to prevent overheating",
            "LED light design with three different lighting modes",
            "Core part is precise and wearable",
            "Direct drive all-in-one technology for quick start and energy saving",
            "More accurate and convenient sewing function"
        ],
        applications: ["Garment manufacturing", "Professional sewing", "High-volume production", "Quality finishing"],
        specifications: {
            model: "A6000-G"
        }
    },
    {
        id: "ls-002",
        name: "A6000P-D Series Direct Drive High Speed Auto Trimmer Lockstitch Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-012-20240515141708_8901.jpg",
        description: "Advanced direct drive lockstitch machine with automatic trimmer featuring core technology innovations including airframe optimization, accurate needle reinforcements, and intelligent control systems.",
        features: [
            "Airframe optimization for low noise and vibration",
            "Small body cavity structure for faster and lighter operation",
            "Accurate needle reinforcements for convenient and efficient sewing",
            "Slow start sewing function to reduce noise and eliminate break problems",
            "Time saving and increased efficiency with auto thread trimmer",
            "Wide voltage design with global adaptability (140-240V)",
            "Three level adjustable LED light with eye protection",
            "New appearance with enhanced technology and identification",
            "All-inclusive needle bar oil absorption to prevent fabric pollution",
            "Simple panel, easy to operate"
        ],
        applications: ["Garment manufacturing", "Professional sewing", "High-volume production", "Quality finishing"],
        specifications: {
            model: "A6000P-D"
        }
    },
    {
        id: "ls-003",
        name: "A6000-D Series High Speed Auto Trimmer Lockstitch Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-013-20240515142036_7947.jpg",
        description: "High-speed auto trimmer lockstitch machine designed for efficient garment production with automatic thread cutting.",
        features: ["High-speed operation", "Auto trimmer", "Lockstitch technology", "Efficient production"],
        applications: ["Garment manufacturing", "Professional sewing", "High-volume production", "Quality finishing"],
        specifications: {
            model: "A6000-D"
        }
    },
    {
        id: "ls-004",
        name: "A5410 Series Step Side Cutter Intelligent Lockstitch Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-014-20240515142259_4519.jpg",
        description: "Step motor controlled lockstitch machine with integrated side cutter for precise control and professional results.",
        features: ["Step motor control", "Side cutter", "Intelligent system", "Precise control"],
        applications: ["Precision sewing", "Professional applications", "Quality manufacturing", "Controlled operations"],
        specifications: {
            model: "A5410-D4-G | A5410-D4",
            thickness: "Medium-weight materials",
            speed: "5000rpm",
            stitchLength: "5mm",
            alternationRange: "5.5mm(Manual lift)-13mm(Knee lift)",
            needle: "DB×1 #11-#18",
            lubricatingOil: "10# white oil",
            power: "220V / 550W"
        }
    },
    {
        id: "ls-005",
        name: "A5400 Series Side Cutter Intelligent Lockstitch Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-015-20240515142704_1278.jpg",
        description: "Intelligent lockstitch machine with integrated side cutter for automatic trimming and efficient sewing operations.",
        features: ["Side cutter integration", "Intelligent control", "Automatic trimming", "Efficient operation"],
        applications: ["Garment manufacturing", "Professional sewing", "Production efficiency", "Quality finishing"],
        specifications: {
            model: "A5400-G | A5400-D2-02",
            thickness: "Medium-weight materials",
            speed: "5000rpm",
            stitchLength: "5mm",
            alternationRange: "5.5mm(Manual lift)-13mm(Knee lift)",
            needle: "DB×1 #11-#18",
            lubricatingOil: "10# white oil",
            power: "220V / 550W"
        }
    },
    {
        id: "ls-006",
        name: "A9200L Series Extra-large Space Oilfree Double Stepper Intelligent Lockstitch Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-016-20240515111931_5881.jpg",
        description: "Extra-large workspace oil-free lockstitch machine with double stepper control for intelligent, clean operation.",
        features: ["Extra-large workspace", "Oil-free operation", "Double stepper", "Intelligent control"],
        applications: ["Large projects", "Clean sewing", "Professional applications", "Precision work"],
        specifications: {
            model: "A9200L-D4S-W-CP/02"
        }
    },
    {
        id: "ls-007",
        name: "A8130 Series Memory Function One Click Exchange Lockstitch Sewing Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-017-20240515112301_9021.jpg",
        description: "Advanced lockstitch machine with memory function and one-click exchange capability for versatile sewing operations.",
        features: ["Memory function", "One-click exchange", "Advanced control", "Versatile operation"],
        applications: ["Variable sewing tasks", "Professional production", "Efficient operations", "Quality manufacturing"],
        specifications: {
            model: "A8130"
        }
    },
    {
        id: "ls-008",
        name: "A8110 Series Needle Decent Layer Intelligent Lockstitch Machine",
        category: "lockstitch",
        image: "/images/machinery/machine-018-20240515112422_6846.jpg",
        description: "Intelligent lockstitch machine with needle descent layer technology for precise control and professional results.",
        features: ["Needle descent control", "Layer technology", "Intelligent system", "Precise control"],
        applications: ["Precision sewing", "Layer work", "Professional applications", "Quality control"],
        specifications: {
            model: "A8110-D4"
        }
    },
    // Template Sewing Machine Series
    {
        id: "tm-001",
        name: "ZJ-M6 HIGH PRECISION INTELLIGENT TEMPLATE MACHINE",
        category: "template",
        image: "/images/machinery/machine-019-20250613220856_3734.jpg",
        description: "High-precision intelligent template machine with advanced pattern recognition and automated template sewing capabilities.",
        features: ["High precision", "Intelligent template system", "Pattern recognition", "Automated operation"],
        applications: ["Template sewing", "Pattern production", "Automated manufacturing", "Precision work"],
        specifications: {
            model: "ZJ-M6-GS900H-SF-LK2-V3",
            needle: "DPX5 7~14#",
            speed: "3200rpm(Needle gauge within 3.5mm)",
            alternationRange: "1300mm X 900mm",
            stitchLength: "0.05~12.7mm(0.05mm Unit)",
            thickness: "Standard 3mm"
        }
    },
    {
        id: "tm-002",
        name: "ZJ-M6 series high-precision intelligent template machine",
        category: "template",
        image: "/images/machinery/machine-020-20240515155438_6977.jpg",
        description: "High-precision intelligent template machine for automated pattern sewing with advanced control systems.",
        features: ["High precision", "Intelligent control", "Template automation", "Advanced systems"],
        applications: ["Pattern sewing", "Automated production", "Precision manufacturing", "Quality control"]
    },
    {
        id: "tm-003",
        name: "ZJ-M6 series high-precision automatic shuttle changing intelligent template machine",
        category: "template",
        image: "/images/machinery/machine-021-20240515155559_4928.jpg",
        description: "Advanced template machine with automatic shuttle changing capability for continuous, efficient production.",
        features: ["Automatic shuttle changing", "High precision", "Intelligent control", "Continuous operation"],
        applications: ["Continuous production", "Efficient manufacturing", "Advanced sewing", "Quality production"]
    },
    {
        id: "tm-004",
        name: "ZJ-M5 ULTRA HIGH-SPEED INTELLIGENT TEMPLATE MACHINE",
        category: "template",
        image: "/images/machinery/machine-022-20250613223000_4815.jpg",
        description: "Ultra high-speed template machine with intelligent control for maximum productivity and precision in pattern sewing.",
        features: ["Ultra high-speed", "Intelligent control", "Maximum productivity", "Precision sewing"],
        applications: ["High-volume production", "Speed-critical operations", "Industrial manufacturing", "Efficiency optimization"],
        specifications: {
            model: "ZJ-M5-S900H-SF-V7",
            needle: "DPX5 7~14#",
            speed: "3200rpm(Needle gauge within 3.5mm)",
            alternationRange: "1300mm X 900mm",
            stitchLength: "0.05~12.7mm(0.05mm Unit)",
            thickness: "Standard 3mm"
        }
    },
    {
        id: "tm-005",
        name: "ZJ-M5 ultra high speed intelligent template machine",
        category: "template",
        image: "/images/machinery/machine-023-20240515155722_2967.jpg",
        description: "Ultra high-speed intelligent template machine designed for maximum efficiency in pattern-based manufacturing.",
        features: ["Ultra high-speed", "Intelligent system", "Template automation", "Maximum efficiency"],
        applications: ["High-speed production", "Pattern manufacturing", "Industrial sewing", "Efficient operations"]
    },
    {
        id: "tm-006",
        name: "ZJ-M3 ROTATING HEAD INTELLIGENT TEMPLATE MACHINE",
        category: "template",
        image: "/images/machinery/machine-024-20250613223524_6753.jpg",
        description: "Rotating head template machine with intelligent features for versatile multi-angle template sewing applications.",
        features: ["Rotating head design", "Intelligent system", "Multi-angle capability", "Versatile operation"],
        applications: ["Multi-angle sewing", "Complex patterns", "Versatile manufacturing", "Advanced operations"],
        specifications: {
            model: "ZJ-M3-S500-SF-X-LK2-V3"
        }
    },
    {
        id: "tm-007",
        name: "ZJ-M3 SMALL TEMPLATE TECHNOLOGY INTELLIGENT TEMPLATE MACHINE",
        category: "template",
        image: "/images/machinery/machine-025-20250613224511_3102.jpg",
        description: "Compact intelligent template machine designed for small template operations with precision and flexibility.",
        features: ["Small template capability", "Precision operation", "Intelligent control", "Compact design"],
        applications: ["Small parts sewing", "Detailed work", "Precision manufacturing", "Flexible production"],
        specifications: {
            model: "ZJ-M3-S500-SF-X-LK2-V2"
        }
    },
    {
        id: "tm-008",
        name: "ZJ-M1 PRODUCTION LINE TECHNOLOGY INTELLIGENT TEMPLATE MACHINE",
        category: "template",
        image: "/images/machinery/machine-026-20250613225040_0681.jpg",
        description: "Production line template machine with intelligent technology for automated template-based sewing operations.",
        features: ["Production line integration", "Intelligent template system", "Automated operation", "High efficiency"],
        applications: ["Mass production", "Template sewing", "Automated manufacturing", "Quality standardization"],
        specifications: {
            model: "ZJ-M1-S5030-SF-X-V1"
        }
    },
    // Heavy Duty & Specialty
    {
        id: "hd-001",
        name: "ZJ335 Series Single Needle Cylinder Compound Feed Heavy Duty Lockstitch Sewing Machine",
        category: "heavy",
        image: "/images/machinery/machine-027-20240515161412_7966.jpg",
        description: "Heavy-duty single needle cylinder compound feed machine for thick materials and demanding industrial applications.",
        features: ["Heavy-duty construction", "Compound feed", "Cylinder type", "Industrial strength"],
        applications: ["Heavy fabric sewing", "Industrial applications", "Thick materials", "Demanding operations"],
        specifications: {
            model: "ZJ335"
        }
    },
    {
        id: "hd-002",
        name: "ZJ246 Series Single Needle Cylinder Type Comprehensive Feed Heavy Duty Lockstitch Sewing Machine",
        category: "heavy",
        image: "/images/machinery/machine-028-20240515161523_6873.jpg",
        description: "Comprehensive feed heavy-duty machine with cylinder type design for versatile thick material processing.",
        features: ["Comprehensive feed", "Heavy-duty capability", "Cylinder design", "Versatile operation"],
        applications: ["Thick material processing", "Heavy-duty sewing", "Industrial manufacturing", "Versatile applications"],
        specifications: {
            model: "ZJ246"
        }
    },
    {
        id: "hd-003",
        name: "ZJ-101 Series Industrial Blind Stitch Machine",
        category: "heavy",
        image: "/images/machinery/machine-029-20240515161641_3021.jpg",
        description: "Industrial blind stitch machine for invisible hemming and professional garment finishing applications.",
        features: ["Blind stitch capability", "Industrial grade", "Invisible hemming", "Professional finishing"],
        applications: ["Invisible hemming", "Professional garments", "Industrial finishing", "Quality hemming"]
    },
    {
        id: "hd-004",
        name: "ZJ8650 Series Single Needle Short Thread Head Stepper Computerized Post-Bed Sewing Machine",
        category: "heavy",
        image: "/images/machinery/machine-030-20240515160607_6392.jpg",
        description: "Computerized post-bed machine with stepper control for specialized sewing applications and professional results.",
        features: ["Post-bed design", "Stepper control", "Computerized operation", "Short thread system"],
        applications: ["Specialized sewing", "Post-bed applications", "Professional results", "Controlled operations"],
        specifications: {
            model: "ZJ8650-D3A-ZH-C-02-V"
        }
    },
    {
        id: "hd-005",
        name: "ZJ2628 Series Cylinder Type Single Needle Compound Feed Lockstitch Sewing Machine",
        category: "heavy",
        image: "/images/machinery/machine-031-20240515160714_2346.jpg",
        description: "Cylinder type compound feed machine for specialized applications requiring precise material handling.",
        features: ["Cylinder type", "Compound feed", "Single needle", "Precise handling"],
        applications: ["Specialized applications", "Precise sewing", "Compound feed work", "Professional operations"],
        specifications: {
            model: "ZJ2628 | ZJ2628-1",
            needle: "DP×17",
            stitchLength: "0-5mm",
            alternationRange: "6/15mm",
            speed: "2000rpm"
        }
    },
    {
        id: "hd-006",
        name: "ZJ1640 Series Heavy Duty Top And Bottom Feed Lockstitch Sewing Machine",
        category: "heavy",
        image: "/images/machinery/machine-032-20240515160820_0455.jpg",
        description: "Heavy-duty machine with top and bottom feed system for superior material control and professional results.",
        features: ["Heavy-duty construction", "Top and bottom feed", "Superior control", "Professional results"],
        applications: ["Heavy materials", "Superior control", "Professional sewing", "Demanding applications"]
    },
    {
        id: "hd-007",
        name: "ZJ0323E UP AND DOWN COMPOUND FEEDING STEPPING TWO IN ONE LOCKSTITCH MACHINE",
        category: "heavy",
        image: "/images/machinery/machine-033-20250613205800_6672.jpg",
        description: "Two-in-one lockstitch machine with up and down compound feeding and stepping control for versatile applications.",
        features: ["Two-in-one design", "Compound feeding", "Stepping control", "Versatile operation"],
        applications: ["Versatile sewing", "Compound feeding", "Professional applications", "Multi-function operations"],
        specifications: {
            model: "ZJ-0323E-D4"
        }
    },
    {
        id: "hd-008",
        name: "ZJ5760-3020HF1 ELECTRONIC PATTERN MACHINE",
        category: "heavy",
        image: "/images/machinery/machine-034-20250613225636_7656.jpg",
        description: "Electronic pattern machine for complex pattern sewing with programmable functions and precision control.",
        features: ["Electronic pattern control", "Programmable functions", "Precision sewing", "Complex patterns"],
        applications: ["Pattern sewing", "Decorative work", "Embroidery applications", "Custom designs"]
    },
    // Automation Equipment
    {
        id: "ae-001",
        name: "ZJ-UA-A9200L-JMX-WE5 AUTOMATIC SHIRT CUFF/COLLAR TOP STITCH SEWING UNIT",
        category: "automation",
        image: "/images/machinery/machine-035-20250613114903_7928.jpg",
        description: "Automatic sewing unit specialized for shirt cuff and collar top stitching with precision and efficiency.",
        features: ["Automatic operation", "Cuff/collar specialization", "Top stitch capability", "Precision sewing"],
        applications: ["Shirt manufacturing", "Cuff sewing", "Collar construction", "Professional garments"]
    },
    {
        id: "ae-002",
        name: "ZJ-UA-A8100W-XC-WE5 AUTOMATIC CUFF AND FORK MACHINE",
        category: "automation",
        image: "/images/machinery/machine-036-20250613114228_3786.jpg",
        description: "Automatic machine for cuff and fork operations with advanced control systems for consistent quality.",
        features: ["Automatic operation", "Cuff and fork capability", "Advanced control", "Consistent quality"],
        applications: ["Cuff operations", "Fork sewing", "Automated production", "Quality manufacturing"]
    },
    {
        id: "ae-003",
        name: "ZJ-UA-A8100-W-TD-CR-WB3 AUTOMATIC FRONT BREAST POCKET SEWING MACHINE",
        category: "automation",
        image: "/images/machinery/machine-037-20250613113754_4913.jpg",
        description: "Specialized automatic machine for front breast pocket sewing with precision positioning and consistent results.",
        features: ["Automatic operation", "Breast pocket specialization", "Precision positioning", "Consistent results"],
        applications: ["Breast pocket sewing", "Shirt manufacturing", "Automated production", "Professional garments"]
    },
    {
        id: "ae-004",
        name: "ZJ-UA-A9200L-W-DW-WE5 AUTOMATIC CUTTING TEMPLATE MACHINE",
        category: "automation",
        image: "/images/machinery/machine-038-20250613112643_2468.jpg",
        description: "Automatic cutting template machine for precise material cutting with integrated template system.",
        features: ["Automatic cutting", "Template system", "Precise cutting", "Integrated operation"],
        applications: ["Material cutting", "Template cutting", "Automated production", "Precision work"]
    },
    {
        id: "ae-005",
        name: "ZJ-UA-5781D-SY-WB5 FRONT PLACKET BUTTON HOLE MACHINE",
        category: "automation",
        image: "/images/machinery/machine-039-20250613112310_5554.jpg",
        description: "Specialized automatic machine for front placket buttonhole creation with precision and consistency.",
        features: ["Front placket specialization", "Buttonhole precision", "Automatic operation", "Consistent quality"],
        applications: ["Shirt manufacturing", "Placket construction", "Buttonhole creation", "Garment finishing"],
        specifications: {
            model: "≤14mm"
        }
    },
    {
        id: "ae-006",
        name: "ZJ-USM819-5770A-1510HF1-C FULLY AUTOMATIC ELASTIC BELT SPLICING MACHINE",
        category: "automation",
        image: "/images/machinery/machine-040-20250613191905_3303.jpg",
        description: "Fully automatic elastic belt splicing machine for seamless belt joining with consistent quality and high efficiency.",
        features: ["Fully automatic operation", "Elastic belt splicing", "Seamless joining", "High efficiency"],
        applications: ["Belt manufacturing", "Elastic band production", "Garment accessories", "Industrial splicing"]
    },
    // Coverstitch & Bartacking
    {
        id: "cv-001",
        name: "ZJ1903D HIGH SPEED ELECTRONIC BUTTON SEWING MACHINE",
        category: "coverstitch",
        image: "/images/machinery/machine-041-20250613233810_9553.jpg",
        description: "High-speed electronic button sewing machine for efficient button attachment with consistent quality and reliability.",
        features: ["Electronic control", "High-speed sewing", "Button attachment", "Quality consistency"],
        applications: ["Button sewing", "Garment finishing", "Mass production", "Industrial applications"],
        specifications: {
            model: "ZJ1903D-301B-3/04-V4"
        }
    },
    {
        id: "cv-002",
        name: "ZJ1900DCS-CK-3/04-V4-TP AUTOMATIC PUNCHING HIGH SPEED INTELLIGENT BARTACKING MACHINE",
        category: "coverstitch",
        image: "/images/machinery/machine-042-20250613234413_3791.jpg",
        description: "Advanced automatic punching bartacking machine with intelligent control system for high-speed operation and precise stitching.",
        features: ["Automatic punching system", "High-speed operation", "Intelligent control", "Precise stitching"],
        applications: ["Garment reinforcement", "Pocket construction", "Belt loop attachment", "Industrial sewing"]
    },
    {
        id: "cv-003",
        name: "ZJ-A3800 DIRECT DRIVE HIGH-SPEED CHAINSTITCH SEWING MACHINE",
        category: "coverstitch",
        image: "/images/machinery/machine-043-20250613235245_3912.jpg",
        description: "Direct drive chainstitch machine designed for heavy-duty materials and high-speed industrial sewing operations.",
        features: ["Direct drive system", "High-speed operation", "Heavy-duty capability", "Chainstitch technology"],
        applications: ["Heavy fabric sewing", "Industrial manufacturing", "Denim processing", "Canvas work"],
        specifications: {
            model: "ZJ-A3800-BD | ZJ-A3820-BD",
            needle: "TV×7",
            stitchLength: "4mm",
            thickness: "Light materials, Medium materials",
            alternationRange: "5.5/10",
            speed: "4500rpm"
        }
    },
    {
        id: "cv-004",
        name: "ZJ1900DSS-0605-3-M-B-TP-04-V4 HIGH SPEED INTELLIGENT PATTERN BINDING MACHINE",
        category: "coverstitch",
        image: "/images/machinery/machine-044-20250613233255_7778.jpg",
        description: "Intelligent pattern binding machine with advanced features for complex pattern sewing and binding operations.",
        features: ["Pattern binding", "Intelligent system", "High precision", "Automated operation"],
        applications: ["Pattern sewing", "Edge binding", "Decorative stitching", "Professional finishing"],
        specifications: {
            model: "ZJ1900DSS-0605-3-M-B-TP-04-V4"
        }
    },
    // Buttonhole Machine Series
    {
        id: "bh-001",
        name: "ZJ5781DS-V3-DS MOTOR SIDE SLIDING INTELLIGENT FLAT HEAD BUTTONHOLE MACHINE",
        category: "buttonhole",
        image: "/images/machinery/machine-045-20250613230951_0808.jpg",
        description: "Motor side sliding intelligent flat head buttonhole machine for efficient and precise buttonhole creation.",
        features: ["Motor side sliding", "Intelligent control", "Flat head design", "Precise operation"],
        applications: ["Flat head buttonholes", "Professional sewing", "Garment finishing", "Quality buttonholes"],
        specifications: {
            model: "ZJ5781DS-V3-DS"
        }
    },
    {
        id: "bh-002",
        name: "ZJ5821A FULLY AUTOMATIC EYELET BUTTONHOLING MACHINE(TOUCH SCREEN)",
        category: "buttonhole",
        image: "/images/machinery/machine-046-20250613231428_0311.jpg",
        description: "Fully automatic eyelet buttonholing machine with touch screen control for professional buttonhole production.",
        features: ["Fully automatic", "Eyelet capability", "Touch screen control", "Professional quality"],
        applications: ["Eyelet buttonholes", "Automated production", "Professional garments", "Quality manufacturing"],
        specifications: {
            model: "ZJ5820A | ZJ5821A",
            speed: "1000~2700rpm(can be set at 100rpm unit)",
            alternationRange: "35mm"
        }
    },
    {
        id: "bh-003",
        name: "ZJ5822 SHORT THREAD SMART ROUND HEAD BUTTONHOLE MACHINE",
        category: "buttonhole",
        image: "/images/machinery/machine-047-20250613231942_5198.jpg",
        description: "Smart round head buttonhole machine with short thread technology for efficient buttonhole creation.",
        features: ["Smart operation", "Round head design", "Short thread technology", "Efficient operation"],
        applications: ["Round buttonholes", "Garment finishing", "Professional sewing", "Quality buttonholes"],
        specifications: {
            model: "ZJ5822A"
        }
    },
    // Zigzag Seam
    {
        id: "zz-001",
        name: "ZJ2293 Series High-Speed Computerized Zigzag Sewing Machine",
        category: "zigzag",
        image: "/images/machinery/machine-048-20240515164409_2866.jpg",
        description: "High-speed computerized zigzag sewing machine for flexible seam construction and decorative stitching applications.",
        features: ["High-speed operation", "Computerized control", "Zigzag stitching", "Flexible seams"],
        applications: ["Seam finishing", "Decorative stitching", "Stretch fabrics", "Professional sewing"]
    },
    {
        id: "zz-002",
        name: "ZJ2290 Series Electronic Micro-Oil-Direct Drive High-Speed Zigzag Sewing Machine",
        category: "zigzag",
        image: "/images/machinery/machine-049-20240515164506_4891.jpg",
        description: "Electronic micro-oil direct drive zigzag machine for high-speed sewing with minimal maintenance requirements.",
        features: ["Electronic control", "Micro-oil system", "Direct drive", "High-speed operation"],
        applications: ["High-volume production", "Professional sewing", "Industrial applications", "Quality stitching"]
    },
    {
        id: "zz-003",
        name: "ZJ20U93 Series Zigzag Machine",
        category: "zigzag",
        image: "/images/machinery/machine-050-20240515164601_2012.jpg",
        description: "Professional zigzag sewing machine for flexible seam construction and decorative stitching applications.",
        features: ["Zigzag stitching", "Flexible seams", "Decorative options", "Professional quality"],
        applications: ["Seam finishing", "Decorative stitching", "Stretch fabrics", "Edge reinforcement"]
    },
    // Multi-Needle & Double Needle
    {
        id: "mn-001",
        name: "ZJ2845 HIGH SPEED DIRECT DRIVE DOUBLE-NEEDLE AUTO LUBRICATION LOCKSTITCH MACHINE",
        category: "multi",
        image: "/images/machinery/machine-051-20250612203934_3658.jpg",
        description: "High-speed double-needle machine with direct drive and auto lubrication for efficient parallel stitching operations.",
        features: ["Double-needle capability", "Direct drive", "Auto lubrication", "High-speed operation"],
        applications: ["Parallel stitching", "Double seams", "Professional sewing", "Efficient production"],
        specifications: {
            needle: "DB×5 14#-22#",
            stitchLength: "5mm",
            alternationRange: "7-13mm",
            power: "6.4"
        }
    },
    {
        id: "mn-002",
        name: "ZJ8450 HIGH SPEED DIRECT DRIVE AUTO LUBRICATION SEPARATED NEEDLE BAR LOCKSTITCH MACHINE",
        category: "multi",
        image: "/images/machinery/machine-052-20250612204717_1187.jpg",
        description: "High-speed separated needle bar machine with auto lubrication for versatile multi-needle applications.",
        features: ["Separated needle bar", "Direct drive", "Auto lubrication", "High-speed operation"],
        applications: ["Multi-needle sewing", "Separated operations", "Professional applications", "Versatile sewing"],
        specifications: {
            needle: "DB×5 11#-16#",
            stitchLength: "5mm",
            alternationRange: "7-15mm",
            power: "6.4"
        }
    }
];
// Group machines by category for easy access
export const modelsByCategory = machineCategories.reduce((acc, category) => {
    acc[category.id] = machineryData.filter(m => m.category === category.id);
    return acc;
}, {});
//# sourceMappingURL=models.js.map