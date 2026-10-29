import type { Article, Door, Enquiry, Property } from "./types";

const unsplash = (id: string, crop = "w=1600") => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&${crop}`;


export const properties: Property[] = [
  {
    id: "1",
    title: "OTUMFUOR COMPLEX ANNEX",
    address: "PMB CT 279",
    location: "Taifa - Kwabenya, Accra",
    price: "95,000",
    period: "/month",
    bedrooms: "3 & 2 Bedroom Terrace",
    beds: 3,
    baths: 3,
    area: "Available on request",
    description:
      "Stunning terrace home with modern amenities and landscaped gardens. Located in Taifa–Kwabenya with 24/7 security.",
    features: [
      "Fitted Kitchen",
      "Utility",
      "Balconies",
      "En-suite Bedrooms",
      "Spacious Living and Dining area",
    ],
    image: "/img/otumfour1.jpg",
    images: ["/img/otumfour1.jpg", "/img/otumfour2.jpg", "/img/otumfour3.jpg"],
    status: "listed",
  },
  {
    id: "2",
    title: "AIRBAN PREMIUM COURT",
    address: "Off Adenta-Aburi Road",
    location: "Adenta – Aburi Ridge Cap, Accra",
    price: "300,000",
    period: "/month",
    bedrooms: "4 Bedroom",
    beds: 4,
    baths: 4,
    area: "Available on request",
    description:
      "Spacious townhouse in a gated community near Adenta. Built for families who want comfort, security, and a home office.",
    features: [
      "All rooms En-suite",
      "Fully fitted kitchen with appliance",
      "Electric Fence",
      "CCTV",
      "Boys quarters",
      "Storeroom",
      "Swimming Pool",
      "Home office",
      "Air condition units in all rooms",
      "Security Post",
    ],
    image: "/img/apc1.jpg",
    images: ["/img/apc1.jpg", "/img/apc2.jpg", "/img/apc3.jpg"],
    status: "listed",
  },
  {
    id: "3",
    title: "AIRBAN PROPERTY",
    address: "909 Woodland St, Ridge, Accra",
    location: "Ridge, Accra",
    price: "80,000",
    period: "/month",
    bedrooms: "2 Bedroom (4 Expandable)",
    beds: 2,
    baths: 2,
    area: "Available on request",
    description:
      "Elegant home in Ridge with close access to embassies, international schools, and business districts.",
    features: [
      "Fully fitted kitchen with appliances",
      "Electric Fence",
      "Air condition units in all rooms",
    ],
    image: "/img/ap1.jpg",
    images: ["/img/ap1.jpg", "/img/ap2.jpg", "/img/ap3.jpg"],
    status: "listed",
  },
  {
    id: "4",
    title: "THE PALMS, TRASACCO VALLEY",
    address: "Trasacco Valley Estate, East Legon",
    location: "East Legon, Accra",
    price: "650,000",
    period: "",
    bedrooms: "5 Bedroom Detached",
    beds: 5,
    baths: 6,
    area: "620",
    description:
      "Contemporary five-bedroom villa on a landscaped plot inside the gated Trasacco Valley estate. A double-height living room opens onto the garden, the kitchen is built around a large island, and the master suite has a walk-in closet and private terrace.",
    features: [
      "All bedrooms en-suite",
      "Walk-in closet in master suite",
      "Kitchen with island and pantry",
      "Two-car carport",
      "Boys' quarters",
      "Standby generator",
      "Borehole and water storage",
      "24/7 estate security",
    ],
    image: unsplash("photo-1782720829237-ec146b0afe0a"),
    images: [
      unsplash("photo-1782720829237-ec146b0afe0a"),
      unsplash("photo-1773578978637-c9771e7a9913"),
      unsplash("photo-1778731660397-6a66493be391"),
      unsplash("photo-1653974123568-b5eff6d851e1"),
    ],
    status: "listed",
  },
  {
    id: "5",
    title: "AIRPORT RESIDENTIAL APARTMENTS",
    address: "4th Circular Rd, Airport Residential Area",
    location: "Airport Residential, Accra",
    price: "4,500",
    period: "/month",
    bedrooms: "2 & 3 Bedroom Apartments",
    beds: 3,
    baths: 3,
    area: "185",
    description:
      "Serviced two and three-bedroom apartments a short drive from Kotoka International Airport. Every unit has an open-plan living and dining area, a fitted kitchen and a balcony, and residents share a gym and rooftop pool.",
    features: [
      "Fully furnished",
      "Fitted kitchen with appliances",
      "Private balcony",
      "Rooftop swimming pool",
      "Residents' gym",
      "Backup generator",
      "Elevator access",
      "Dedicated parking",
    ],
    image: unsplash("photo-1614115863913-b04024ec4ed1"),
    images: [
      unsplash("photo-1614115863913-b04024ec4ed1"),
      unsplash("photo-1705321963943-de94bb3f0dd3"),
      unsplash("photo-1484154218962-a197022b5858"),
      unsplash("photo-1595526051245-4506e0005bd0"),
    ],
    status: "listed",
  },
  {
    id: "6",
    title: "ROMAN RIDGE TOWNHOUSE",
    address: "Senchi St, Roman Ridge",
    location: "Roman Ridge, Accra",
    price: "420,000",
    period: "",
    bedrooms: "4 Bedroom Townhouse",
    beds: 4,
    baths: 5,
    area: "340",
    description:
      "Glass-fronted four-bedroom townhouse in a private enclave of six homes, minutes from the Airport City business district. Floor-to-ceiling windows open the living area onto a covered terrace and garden.",
    features: [
      "All rooms en-suite",
      "Open-plan kitchen and dining",
      "Covered terrace",
      "Private garden",
      "Staff quarters",
      "Solar water heating",
      "Electric fence and CCTV",
    ],
    image: unsplash("photo-1748063578185-3d68121b11ff"),
    images: [
      unsplash("photo-1748063578185-3d68121b11ff"),
      unsplash("photo-1602028915047-37269d1a73f7"),
      unsplash("photo-1512918728675-ed5a9ecdebfd"),
      unsplash("photo-1629079447777-1e605162dc8d"),
    ],
    status: "listed",
  },
  {
    id: "7",
    title: "CANTONMENTS POOL VILLA",
    address: "Josif Broz Tito Ave, Cantonments",
    location: "Cantonments, Accra",
    price: "950,000",
    period: "",
    bedrooms: "5 Bedroom Villa",
    beds: 5,
    baths: 6,
    area: "710",
    description:
      "Five-bedroom villa with a 15-metre pool and outdoor lounge on a quiet, tree-lined street in Cantonments, close to the embassies and Labone. Sold in 2025.",
    features: [
      "15-metre swimming pool",
      "All bedrooms en-suite",
      "Open kitchen with patio access",
      "Home office",
      "Boys' quarters",
      "Standby generator",
    ],
    image: unsplash("photo-1613977257363-707ba9348227"),
    images: [
      unsplash("photo-1613977257363-707ba9348227"),
      unsplash("photo-1786053538161-501fbdd89629"),
      unsplash("photo-1633505650701-6104c4fc72c2"),
      unsplash("photo-1696987007764-7f8b85dd3033"),
    ],
    status: "previous",
  },
  {
    id: "8",
    title: "EAST LEGON HILLS RESIDENCE",
    address: "East Legon Hills, off Santeo Rd",
    location: "East Legon Hills, Accra",
    price: "385,000",
    period: "",
    bedrooms: "4 Bedroom Detached",
    beds: 4,
    baths: 4,
    area: "410",
    description:
      "Four-bedroom detached home with a pool and a large paved forecourt in East Legon Hills. Sold within six weeks of listing.",
    features: ["Swimming pool", "Fitted kitchen with island", "Master suite with balcony", "Boys' quarters", "Borehole"],
    image: unsplash("photo-1602343168117-bb8ffe3e2e9f"),
    images: [
      unsplash("photo-1602343168117-bb8ffe3e2e9f"),
      unsplash("photo-1771372125074-5c7c4332095f"),
      unsplash("photo-1560185893-a55cbc8c57e8"),
    ],
    status: "previous",
  },
  {
    id: "9",
    title: "TSE ADDO BEACH APARTMENTS",
    address: "Beach Rd, Tse Addo",
    location: "Tse Addo, Accra",
    price: "3,200",
    period: "/month",
    bedrooms: "1 & 2 Bedroom Apartments",
    beds: 2,
    baths: 2,
    area: "120",
    description: "One and two-bedroom apartments a short walk from the beach at Tse Addo. All units let.",
    features: ["Sea-facing balconies", "Fitted kitchen", "Backup generator", "Secure parking"],
    image: unsplash("photo-1619994121345-b61cd610c5a6"),
    images: [unsplash("photo-1619994121345-b61cd610c5a6")],
    status: "previous",
  },
  {
    id: "10",
    title: "DZORWULU GARDEN VILLA",
    address: "Blohum St, Dzorwulu",
    location: "Dzorwulu, Accra",
    price: "520,000",
    period: "",
    bedrooms: "4 Bedroom Villa",
    beds: 4,
    baths: 5,
    area: "450",
    description: "Four-bedroom villa with a pool and mature garden in Dzorwulu. Sold in 2024.",
    features: ["Swimming pool", "Mature garden", "All rooms en-suite", "Boys' quarters"],
    image: unsplash("photo-1600596542815-ffad4c1539a9"),
    images: [unsplash("photo-1600596542815-ffad4c1539a9")],
    status: "previous",
  },
];

export const doors: Door[] = [
  {
    id: "496b151b-770e-469d-88ca-f3420cdf6da5",
    name: "Airban Security Door",
    price: "GHS 9000.00",
    type: "Single Wide",
    image: "/img/security-door.jpg",
    description:
      "A single-wide security door finished for front entrances that need a stronger, more finished look.",
    stock: 6,
  },
  {
    id: "699fc25d-4319-49d2-b227-0166636c3b23",
    name: "Dry Aged Oak Dual Leaf",
    price: "GHS 13200.00",
    type: "Double",
    image: "/img/oak-dual.jpg",
    description:
      "A double-leaf door with a dry-aged oak finish, suited to wider openings and formal rooms.",
    stock: 4,
  },
  {
    id: "9d291fa2-7cb0-459b-920d-5146b3b3ee53",
    name: "Internal Door",
    price: "GHS 1450.00",
    type: "Single",
    image: unsplash("photo-1749911775037-3c65053d2c55"),
    description:
      "Flush internal door in a dark walnut veneer with a solid core, for bedrooms, studies and connecting rooms. Leaf size 900 mm × 2100 mm; supplied pre-hung in a matching frame.",
    stock: 12,
  },
  {
    id: "ae5fe099-7625-4289-bef7-5863c23b879c",
    name: "Modern Glass Single Wide",
    price: "GHS 7450.00",
    type: "Single Wide",
    image: "/img/door2.jpg",
    description:
      "A single-wide door with glass panels, for entrances that need light as well as a clean modern line.",
    stock: 8,
  },
  {
    id: "c73be886-5a22-4d75-bff6-59d9c3a49770",
    name: "Natural Oak Double Entrance Door",
    price: "GHS 14500.00",
    type: "Double",
    image: unsplash("photo-1677468678917-310526a5ab15"),
    description:
      "Solid oak double-leaf entrance with flush vertical grooves and full-length bar handles. Factory-sealed with a UV-resistant finish for front-facing entrances. Leaf size 2 × 900 mm × 2400 mm.",
    stock: 3,
  },
  {
    id: "e5a1bdd6-631d-4124-ac68-5625e969285f",
    name: "Heritage Arched Mahogany Double Door",
    price: "GHS 21800.00",
    type: "Double",
    image: unsplash("photo-1530982937671-bc00141b5d79"),
    description:
      "Hand-carved mahogany double door with an arched head and wrought-iron glazed panels. Made to order for arched openings and supplied with frame, hinges and three-point locking.",
    stock: 0,
  },
  {
    id: "788fd203-4511-49e6-8826-02ac713d48e0",
    name: "Classic Sapele Panel Double Door",
    price: "GHS 12800.00",
    type: "Double",
    image: unsplash("photo-1620887147081-68a8eb3cc66c"),
    description:
      "Raised-panel double door in kiln-dried Sapele with a natural oil finish and black iron knockers. A traditional entrance that suits both new builds and renovations.",
    stock: 2,
  },
  {
    id: "ba8fe52a-4def-4a4e-8392-2b1db67fc570",
    name: "Frosted Glass Double Door – Wenge Frame",
    price: "GHS 9750.00",
    type: "Double",
    image: unsplash("photo-1759803545394-041ea7b71989"),
    description:
      "Double door with full-height frosted safety glass set in a wenge-stained hardwood frame. Lets light through while keeping privacy, ideal between a living room and dining area.",
    stock: 0,
  },
  {
    id: "838880be-3698-4556-9085-1ce354ad75f0",
    name: "Black Aluminium Glass Pivot Door",
    price: "GHS 8400.00",
    type: "Single Wide",
    image: unsplash("photo-1537199322506-85bfd51c0601"),
    description:
      "Powder-coated black aluminium pivot door with a tinted tempered-glass insert. The offset pivot gives a wide, clean opening for modern entrances. Leaf width 1100 mm.",
    stock: 1,
  },
  {
    id: "ab1d3339-69ab-4027-bb26-0112e71b8625",
    name: "Walnut Veneer Flush Door",
    price: "GHS 1850.00",
    type: "Single",
    image: unsplash("photo-1603673298820-40d77252226d", "w=900&h=1600&crop=focalpoint&fp-x=0.42&fp-y=0.5"),
    description:
      "Horizontal-grain walnut veneer on a solid particle core, with a satin lacquer finish. A clean, handle-only design for bedrooms and offices. Leaf size 900 mm × 2100 mm.",
    stock: 14,
  },
  {
    id: "568a2036-958d-4234-897f-3943b5ca3aab",
    name: "Dark Walnut One-and-Half Door",
    price: "GHS 11200.00",
    type: "One and Half",
    image: unsplash("photo-1776632001065-ad9efe3ee60e"),
    description:
      "Wide entrance door with a main leaf and a fixed side leaf in dark walnut, finished with square recessed pulls. Gives a generous opening without the full width of a double door.",
    stock: 2,
  },
  {
    id: "e0642381-2c1a-4a1e-9c3c-5bc3296750eb",
    name: "Wenge Door with Vision Strip",
    price: "GHS 3600.00",
    type: "Single",
    image: unsplash("photo-1569008857929-1a100f2f93fb"),
    description:
      "Solid wenge-finish door with a slim vertical vision strip in reeded glass and a brushed steel lever handle. Popular for home offices and apartment entrances.",
    stock: 0,
  },
  {
    id: "07653c45-e8c1-4cd3-be70-87e5db06ce29",
    name: "Carved Odum Panel Door",
    price: "GHS 2950.00",
    type: "Single",
    image: unsplash("photo-1605700498877-48e5fc5fbd8b"),
    description:
      "Locally made Odum hardwood door with carved upper panels and a satin chrome lever. Hard-wearing and termite resistant, suited to bedrooms and internal hallways.",
    stock: 6,
  },
  {
    id: "85591c87-34d7-4393-8e4c-e1073972236d",
    name: "Royal Mahogany Double Door – Brass Handles",
    price: "GHS 16750.00",
    type: "Double",
    image: unsplash("photo-1655720449294-a5035c3a0256", "w=1200&h=1600&crop=focalpoint&fp-x=0.42&fp-y=0.5"),
    description:
      "Book-matched mahogany double door with an inlaid diamond pattern and long brass pull handles. A statement entrance for villas and reception rooms.",
    stock: 1,
  },
  {
    id: "f4e78310-212c-4963-9656-c2a33e4cb8d4",
    name: "Black Frame Glass Panel Door",
    price: "GHS 4200.00",
    type: "Single",
    image: unsplash("photo-1624213647811-53b45dcef2cd"),
    description:
      "Matte black door with a full-height frosted glass panel, for bathrooms, walk-in closets and kitchens where you want light without losing privacy.",
    stock: 0,
  },
];

export const sampleEnquiries: Omit<Enquiry, "id">[] = [
  {
    firstName: "Ama",
    lastName: "Mensah",
    email: "ama.mensah@example.com",
    phone: "024 000 0000",
    enquiryType: "Buying a Property",
    additionalInfo:
      "Interested in Otumfuor Complex Annex. Please arrange a viewing this weekend.",
    status: "pending",
    createdAt: "2026-10-20T09:30:00.000Z",
  },
  {
    firstName: "Kwesi",
    lastName: "Boateng",
    email: "kwesi@example.com",
    phone: "020 000 0000",
    enquiryType: "Door quote",
    additionalInfo: "Airban Security Door — 2 units for a Spintex project.",
    status: "resolved",
    createdAt: "2026-10-12T14:10:00.000Z",
  },
];

const electricity = `I have heard people talk about their businesses hitting the rocks year on year due to the high cost of operations. From high taxes to the high cost of utilities and the never-ending saga from regulators. If a business will survive in Ghana, the owners must take a keen interest in minimizing their operational costs as far as electricity is concerned.

As of the end of December 2021, the cost of electricity in Ghana was hovering around 0.369 cedis per kWh for households and 0.796 cedis per kWh for businesses. Without paying attention to these numbers, it is difficult to sustain a successful business. How can a business owner cut down on electricity costs without compromising output?

## Understanding the energy sector

Before optimizing electricity, it helps to understand how the sector works in Ghana. The main sources of power are thermal and hydroelectricity, and the sector is regulated by government with some private participation. The Ministry of Energy formulates policy and monitors performance. It does not itself distribute power.

## Key players

Power generation sits with the Volta River Authority and Bui Power Authority, alongside licensed independent power producers. Distribution is handled by the Electricity Company of Ghana in the south and NEDCo in the north. Tariffs are the concern of the Public Utilities Regulatory Commission, and equipment standards sit with the Energy Commission. When you hire an electrical vendor, that vendor should be licensed.

## The way forward

Thermal and solar production are the practical path for businesses that need to keep operating when the grid is difficult. Solar still needs batteries, charge controllers, panels, and an inverter, plus quarterly maintenance. It is not a set-and-forget saving.

## Get the best out of electricity

These three practices have been used across banking, telecommunications, and retail, and they are how a business can cut electricity costs by a minimum of 25% in the first year.

## 1. Audit your power system

Most businesses run machines until they break. Faulty equipment leaks power. A certified provider should audit the system on a schedule, not only after a failure.

## 2. Monitor what you are paying for

Many bills are marked Estimated rather than Actual. If estimated bills run for more than two months, correct that with the distributor. You should know what was supplied.

## 3. Use what is needed, not what is supplied

A 14 sqm office for two people does not need an air conditioner driven down to 16 degrees. Excess cooling spends the bill and wears the unit. Use the capacity the room actually needs.

There is more that can be done to reach larger savings over three years, whether or not tariffs rise. Optimizing electricity is every director and manager's responsibility, not only the technical assistant. The success of the business depends on all.`;

const journey = `There is a name behind every brand. Who are the entrepreneurs behind Airban Homes Company Limited? What is their vision? Airban Homes has been operating in the real estate market for almost 7 years, earlier under a different name. We sat with Benjamin and Sandra for the interview below.

## Who is Ben Eddie Cudjoe?

Eddie Cudjoe, as he is affectionately known, is a building expert, entrepreneur and philanthropist. He is a building engineer specializing in construction, quantity surveying, and regulatory compliance. Eddie has professional certification in building and law and has worked in the construction industry for over ten years.

## Sandra, when did you discover your passion for real estate?

As part of my job in the bank, I had to sell the bank's lending products. One product gives financial independence in many ways: it brings passive income, serves as long-term security, and hedges against inflation. That was when the interest started. Most customers I met had little knowledge of the industry in Ghana, so when the opportunity came to join Airban Homes, I took it.

## What is the Airban Homes story?

We realized the stress people go through just to own a home. From documentation, to land acquisition, to building on site. We found an opportunity to be the bridge between prospective homeowners and reputable vendors.

We started by contacting a developer who had been trying to move properties for six years. He had a listing agreement with a broker and was not seeing results: a 15-unit townhouse, and only five sold. After due diligence and the paperwork, 8 of the remaining 10 units were off the market in 3 months. From that point, the work has been to keep that standard.

## What is your vision for the brand?

To be a preferred broker for anything home ownership.

## Why rebrand from Designs & More to Airban Homes?

We started as a refurbishment and maintenance company, then saw a larger need: home ownership, from financing through to the best deals in town.

## Why real estate?

There is a gap between regulated financial institutions and the property market. Buyers need someone to bring them up to speed on how to own a home without being taken for a ride.

## Why do business with Airban Homes?

Many realtors know little about construction and what actually goes into home ownership. At Airban Homes we are particular about every property we list. You can expect the listing to pass a standard due diligence test by a regulated financial institution.

Our core values guide every transaction: integrity, professionalism, and reliability.

Here at Airban Homes, we make home and property ownership easy. Call us for bookings and viewing. Thinking home ownership? Think Airban Homes.`;

export const articles: Article[] = [
  {
    slug: "optimizing-electricity-use-for-business-profitability",
    title: "Optimizing Electricity Use for Business Profitability",
    excerpt:
      "Learn how businesses can reduce electricity costs by up to 25% in the first year while maintaining operational efficiency in Ghana's challenging economic environment.",
    publishedOn: "August 12, 2025",
    body: electricity,
  },
  {
    slug: "the-airban-journey",
    title: "The Airban Journey",
    excerpt:
      "An exclusive interview with Benjamin Eddie Cudjoe and Sandra, the visionary founders behind Airban Homes, sharing their story, passion, and mission to revolutionize home ownership in Ghana.",
    publishedOn: "August 10, 2025",
    body: journey,
  },
];

export const leaders = [
  {
    name: "Benjamin Eddie Cudjoe",
    role: "Non Executive Director",
    photo: "/assets/eddie.png",
    bio: "Ben has ten (10) years of experience in building engineering and property management. He started his professional career as a building technologist and project manager with Krane Construction Ltd.",
  },
  {
    name: "Sandra Osei-Bonsu",
    role: "Chief Risk Officer",
    photo: "/assets/sandra.png",
    bio: "Sandra is responsible for identifying, analyzing and mitigating risk that may be associated with the company’s business operations. She also ensures that all properties scheduled for listing meet the firm’s standard.",
  },
  {
    name: "Dennis Owusu Ansah",
    role: "IT Advisor",
    photo: "/assets/dennis.jpeg",
    bio: "Dennis provides strategic guidance on technology and digital transformation. He advises the company on IT infrastructure, cybersecurity, and innovative solutions that support efficient operations and long-term growth.",
  },
];

export const faqs = [
  {
    question: "Should I buy or continue to rent?",
    answer:
      "The decision to buy or rent depends largely on your financial circumstances and how long you plan to stay. If you're staying for just a few years, renting may be better. However, home ownership can be an excellent investment that appreciates in value, helps build equity, and provides financial gains. If you can meet your financial obligations and are ready for property maintenance responsibilities, buying could be the best decision you'll ever make.",
  },
  {
    question: "Do I need a Real Estate Broker?",
    answer:
      "Absolutely. When buying a home, you need a professional to engage with developers and ask all the technical questions that many overlook or are unaware of. Choose a broker who understands the real estate market and will represent your best interests. A well-versed broker can help you get value from your purchase and avoid common pitfalls that first-time home buyers make.",
  },
  {
    question: "Who pays the Realtor fees?",
    answer:
      "In most cases, the seller pays the broker fees. Many buyers are uncomfortable with the thought of additional charges from broker fees. However, avoiding broker fees provides no real gain and could lead to future charges that could have been avoided if a certified professional had represented your interests before the purchase.",
  },
  {
    question: "Do I have the option to inspect the property?",
    answer:
      "Yes, before closing the deal, you have the option to inspect the property. You can check for wiring, plumbing, or maintenance defects, or even conduct advance pre-construction inspections. Always take the opportunity to inspect the property before purchasing. Your broker will advise you on the necessary inspections relevant to your desired property.",
  },
  {
    question: "How much do I need for a down payment?",
    answer:
      "For a mortgage, most lenders expect 20% to 40% for a down payment, depending on their requirements and the type and duration of the loan. As exciting as home ownership is, your first down payment could be discouraging if you're not adequately prepared. We advise that you prepare a budget, plan and save towards a down payment before approaching a realtor.",
  },
  {
    question: "How do I get the best mortgage?",
    answer:
      "We know researching mortgages can be time-consuming and confusing. Since you're here, we recommend consulting our team for advice on the best rates and mortgages in Ghana. Our experienced representatives can guide you through the process and help you find the most suitable mortgage option for your needs.",
  },
  {
    question: "Can I afford a mortgage?",
    answer:
      "We use your Debt-To-Income (DTI) ratio to determine affordability. You can afford a home if your total debt, including your mortgage, is up to 43% or less of your income before tax. For example, if your monthly income is GHS 8,000, then your total monthly debt, including your new house payment, shouldn't exceed GHS 3,440 per month.",
  },
];

export const articleCovers: Record<string, string> = {
  "optimizing-electricity-use-for-business-profitability": "/assets/ecg2.png",
  "the-airban-journey": "/assets/story2.png",
};
