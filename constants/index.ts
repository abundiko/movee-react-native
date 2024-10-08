import Constants from 'expo-constants'
export { Colors, ThemeColors } from "./Colors";
export { cls } from "./cls";
export { AppTheme } from "./AppTheme";

export const isRunningInExpoGo = Constants.appOwnership === 'expo'

export const BACKEND_HOST = process.env.EXPO_PUBLIC_WEBSITE_URL ?? "https://movee.vercel.app/api/v2"
export const APP_VERSION = process.env.VERSION ?? "1.0.003"

export const MOVIE_TYPES = [
  {title: "Movies and Series", value: ""},
  {title: "Movies", value: "movie"},
  {title: "Series", value: "series"},
]

export const GENRES = [
  { title: "Any Genre", value: "" },
  { title: "Action", value: "Action" },
  { title: "Adventure", value: "Adventure" },
  { title: "Animation", value: "Animation" },
  { title: "Biography", value: "Biography" },
  { title: "Comedy", value: "Comedy" },
  { title: "Crime", value: "Crime" },
  { title: "Dance", value: "Dance" },
  { title: "Documentary", value: "Documentary" },
  { title: "Drama", value: "Drama" },
  { title: "Famil", value: "Famil" },
  { title: "Family", value: "Family" },
  { title: "Fantasy", value: "Fantasy" },
  { title: "Game-Show", value: "Game-Show" },
  { title: "History", value: "History" },
  { title: "Horror", value: "Horror" },
  { title: "Kids", value: "Kids" },
  { title: "Legal", value: "Legal" },
  { title: "Life", value: "Life" },
  { title: "Medical", value: "Medical" },
  { title: "Music", value: "Music" },
  { title: "Musical", value: "Musical" },
  { title: "Mystery", value: "Mystery" },
  { title: "Politics", value: "Politics" },
  { title: "Reality", value: "Reality" },
  { title: "Reality-TV", value: "Reality-TV" },
  { title: "Romance", value: "Romance" },
  { title: "Sci-Fi", value: "Sci-Fi" },
  { title: "Short", value: "Short" },
  { title: "Soap", value: "Soap" },
  { title: "Sport", value: "Sport" },
  { title: "Supernatural", value: "Supernatural" },
  { title: "Suspense", value: "Suspense" },
  { title: "Talk", value: "Talk" },
  { title: "Talk-Show", value: "Talk-Show" },
  { title: "Thriler", value: "Thriler" },
  { title: "Thriller", value: "Thriller" },
  { title: "War", value: "War" },
  { title: "Western", value: "Western" }
];


export const COUNTRIES = [
  { "Any Country": "" },
  { "Albania": "ALB" }, { "Angola": "AGO" }, { "Argentina": "ARG" },
  { "Australia": "AUS" }, { "Austria": "AUT" }, { "Bahamas": "BHS" },
  { "Bangladesh": "BGD" }, { "Belarus": "BLR" }, { "Belgium": "BEL" },
  { "Brazil": "BRA" }, { "Brunei": "BRN" }, { "Bulgaria": "BGR" },
  { "Cambodia": "KHM" }, { "Cameroon": "CMR" }, { "Canada": "CAN" },
  { "Chile": "CHL" }, { "China": "CHN" }, { "Colombia": "COL" },
  { "Croatia": "HRV" }, { "Cuba": "CUB" }, { "Cyprus": "CYP" },
  { "Czech Republic": "CZE" }, { "Denmark": "DNK" }, { "Dominican Republic": "DOM" },
  { "Egypt": "EGY" }, { "Estonia": "EST" }, { "Eswatini": "SWZ" },
  { "Finland": "FIN" }, { "France": "FRA" }, { "Germany": "DEU" },
  { "Ghana": "GHA" }, { "Greece": "GRC" }, { "Guadeloupe": "GLP" },
  { "Hong Kong": "HKG" }, { "Hungary": "HUN" }, { "Iceland": "ISL" },
  { "India": "IND" }, { "Indonesia": "IDN" }, { "Iran": "IRN" },
  { "Ireland": "IRL" }, { "Israel": "ISR" }, { "Italy": "ITA" },
  { "Japan": "JPN" }, { "Jordan": "JOR" }, { "Kazakhstan": "KAZ" },
  { "Kenya": "KEN" }, { "Kuwait": "KWT" }, { "Latvia": "LVA" },
  { "Lebanon": "LBN" }, { "Lithuania": "LTU" }, { "Luxembourg": "LUX" },
  { "Malawi": "MWI" }, { "Malaysia": "MYS" }, { "Malta": "MLT" },
  { "Mauritius": "MUS" }, { "Mexico": "MEX" }, { "Mongolia": "MNG" },
  { "Morocco": "MAR" }, { "Mozambique": "MOZ" }, { "Netherlands": "NLD" },
  { "New Zealand": "NZL" }, { "Nigeria": "NGA" }, { "Norway": "NOR" },
  { "Oman": "OMN" }, { "Pakistan": "PAK" }, { "Panama": "PAN" },
  { "Paraguay": "PRY" }, { "Peru": "PER" }, { "Philippines": "PHL" },
  { "Poland": "POL" }, { "Portugal": "PRT" }, { "Qatar": "QAT" },
  { "Romania": "ROU" }, { "Russia": "RUS" }, { "Rwanda": "RWA" },
  { "Saudi Arabia": "SAU" }, { "Senegal": "SEN" }, { "Serbia": "SRB" },
  { "Singapore": "SGP" }, { "Slovakia": "SVK" }, { "Slovenia": "SVN" },
  { "South Africa": "ZAF" }, { "South Korea": "KOR" }, { "Spain": "ESP" },
  { "Sri Lanka": "LKA" }, { "Sudan": "SDN" }, { "Sweden": "SWE" },
  { "Switzerland": "CHE" }, { "Syria": "SYR" }, { "Taiwan": "TWN" },
  { "Tanzania": "TZA" }, { "Thailand": "THA" }, { "Tunisia": "TUN" },
  { "Turkey": "TUR" }, { "Uganda": "UGA" }, { "Ukraine": "UKR" },
  { "United Arab Emirates": "ARE" }, { "United Kingdom": "GBR" },
  { "United States": "USA" }, { "Uruguay": "URY" }, { "Uzbekistan": "UZB" },
  { "Venezuela": "VEN" }, { "Vietnam": "VNM" }, { "Zambia": "ZMB" },
  { "Zimbabwe": "ZWE" }
].map(i => ({
  title: Object.keys(i)[0],
  value: Object.values(i)[0],
}));
