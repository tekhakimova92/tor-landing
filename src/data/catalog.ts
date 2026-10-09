// Демо-данные лендинга. Когда появится бэкенд, этот файл заменится запросами к API.
// Поле `image` — путь к фото в /public (например, "/images/stays/1.jpg"); пока фото нет, показывается градиент.

export type StayType = "yurt" | "guest" | "hotel" | "house" | "unique";
export type StayTag = "lake" | "mountain" | "nature";

export type Stay = {
  id: number;
  name: string;
  loc: string;
  region: string;
  type: StayType;
  tags: StayTag[];
  price: number;
  rating: number;
  reviews: number;
  cap: number;
  desc: string;
  amenities: string[];
  host: string;
  beds: string;
  bg: string;
  image?: string;
  gallery?: string[];
};

export const ALL_REGIONS = "Весь Кыргызстан";

export const TYPE_LABELS: Record<StayType, string> = {
  yurt: "Юрта",
  guest: "Гостевой дом",
  hotel: "Отель",
  house: "Дом",
  unique: "Уникальное жильё",
};

const stayBgs = [
  "linear-gradient(160deg,#9CC7DA,#4E8A8F)",
  "linear-gradient(160deg,#BFD9E8,#7FA27A)",
  "linear-gradient(160deg,#EADFC8,#A9BBA0)",
  "linear-gradient(160deg,#8EC1DD,#1F6F78)",
  "linear-gradient(160deg,#CFE3EA,#2E5B43)",
];

const rawStays: Omit<Stay, "bg">[] = [
  {
    id: 1,
    name: "Юрта у Иссык-Куля",
    loc: "Иссык-Куль, Чолпон-Ата",
    region: "Иссык-Куль",
    type: "yurt",
    tags: ["lake", "mountain"],
    price: 6500,
    rating: 4.96,
    reviews: 128,
    cap: 4,
    desc: "Тёплая юрта в десяти шагах от воды. Войлочные стены, печь, шырдаки на полу и завтрак от хозяйки. Вечером чай у костра, утром озеро в тумане.",
    amenities: ["Завтрак включён", "Печь и тёплые одеяла", "Костровая зона", "Вид на озеро", "Общая баня", "Парковка"],
    host: "Айгуль",
    beds: "2 большие кровати",
  },
  {
    id: 2,
    name: "Дом в ущелье Ала-Арча",
    loc: "Чуй, Ала-Арча",
    region: "Чуй",
    type: "house",
    tags: ["mountain", "nature"],
    price: 9800,
    rating: 4.91,
    reviews: 86,
    cap: 6,
    desc: "Деревянный дом у горной реки, в получасе от Бишкека. Терраса с видом на ледники, камин и кухня для большой компании.",
    amenities: ["Камин", "Терраса", "Полная кухня", "Wi-Fi", "Мангал", "Парковка"],
    host: "Эрлан",
    beds: "3 спальни",
  },
  {
    id: 3,
    name: "Гостевой дом в Караколе",
    loc: "Иссык-Куль, Каракол",
    region: "Иссык-Куль",
    type: "guest",
    tags: ["mountain"],
    price: 3800,
    rating: 4.88,
    reviews: 214,
    cap: 4,
    desc: "Семейный гостевой дом с садом и домашней кухней. Хозяева помогут с маршрутами к ущелью Джети-Огуз и горячим источникам.",
    amenities: ["Домашние ужины", "Сад", "Wi-Fi", "Трансфер", "Стирка", "Чай весь день"],
    host: "Назгуль",
    beds: "2 комнаты",
  },
  {
    id: 4,
    name: "Уютный дом у озера",
    loc: "Иссык-Куль, Бостери",
    region: "Иссык-Куль",
    type: "house",
    tags: ["lake", "nature"],
    price: 11200,
    rating: 4.93,
    reviews: 57,
    cap: 8,
    desc: "Просторный дом в двух минутах от пляжа. Большая гостиная, веранда и сад с яблонями.",
    amenities: ["Выход к пляжу", "Веранда", "Кондиционер", "Полная кухня", "Wi-Fi", "Детская зона"],
    host: "Бакыт",
    beds: "4 спальни",
  },
  {
    id: 5,
    name: "Юрта в горах Нарына",
    loc: "Нарын, Сон-Куль",
    region: "Нарын",
    type: "yurt",
    tags: ["mountain", "nature"],
    price: 5200,
    rating: 4.97,
    reviews: 142,
    cap: 5,
    desc: "Юрта на высокогорном пастбище среди табунов лошадей. Тишина, звёзды и кымыз от пастухов.",
    amenities: ["Три приёма пищи", "Верховая езда", "Печь", "Кымыз", "Общий туалет", "Трансфер"],
    host: "Мирлан",
    beds: "5 мест на полу",
  },
  {
    id: 6,
    name: "Отель Тянь-Шань",
    loc: "Бишкек, центр",
    region: "Чуй",
    type: "hotel",
    tags: [],
    price: 7400,
    rating: 4.72,
    reviews: 391,
    cap: 3,
    desc: "Современный отель рядом с площадью Ала-Тоо. Завтрак, фитнес и стойка для планирования поездок.",
    amenities: ["Завтрак", "Фитнес", "Wi-Fi", "Кондиционер", "Ресепшн 24/7", "Трансфер из аэропорта"],
    host: "Команда отеля",
    beds: "1 двуспальная",
  },
  {
    id: 7,
    name: "Эко-домик в Арсланбобе",
    loc: "Джалал-Абад, Арсланбоб",
    region: "Джалал-Абад",
    type: "unique",
    tags: ["nature"],
    price: 4600,
    rating: 4.89,
    reviews: 73,
    cap: 3,
    desc: "Деревянный домик среди ореховых лесов. Рядом водопады и тропы, на завтрак мёд и лепёшки из тандыра.",
    amenities: ["Завтрак", "Тандыр", "Лесные тропы", "Терраса", "Wi-Fi", "Парковка"],
    host: "Жылдыз",
    beds: "1 спальня",
  },
  {
    id: 8,
    name: "Гостевой дом в Оше",
    loc: "Ош, у Сулейман-Тоо",
    region: "Ош",
    type: "guest",
    tags: [],
    price: 3200,
    rating: 4.84,
    reviews: 167,
    cap: 5,
    desc: "Дом с внутренним двором в старой части города. Плов по утрам и вид на священную гору.",
    amenities: ["Двор с тапчаном", "Домашняя кухня", "Wi-Fi", "Кондиционер", "Стирка", "Экскурсии"],
    host: "Рахима",
    beds: "3 комнаты",
  },
  {
    id: 9,
    name: "Юрта над Таласом",
    loc: "Талас, Кара-Буура",
    region: "Талас",
    type: "yurt",
    tags: ["mountain", "nature"],
    price: 4800,
    rating: 4.9,
    reviews: 49,
    cap: 4,
    desc: "Юрта на зелёном склоне над долиной. Хозяева знакомят с традициями, готовят бешбармак на костре.",
    amenities: ["Ужин и завтрак", "Костёр", "Печь", "Прогулки", "Парковка", "Общая баня"],
    host: "Талгат",
    beds: "4 места",
  },
  {
    id: 10,
    name: "Шале в Баткене",
    loc: "Баткен, Сох",
    region: "Баткен",
    type: "unique",
    tags: ["mountain"],
    price: 8300,
    rating: 4.8,
    reviews: 22,
    cap: 4,
    desc: "Каменное шале в предгорьях. Закрытый двор, абрикосовый сад и тишина южных гор.",
    amenities: ["Сад", "Камин", "Wi-Fi", "Кухня", "Мангал", "Парковка"],
    host: "Дамира",
    beds: "2 спальни",
  },
];

export const STAYS: Stay[] = rawStays.map((s, i) => ({ ...s, bg: stayBgs[i % stayBgs.length] }));

export const getStay = (id: number) => STAYS.find((s) => s.id === id);

const regionBgs = [
  "linear-gradient(160deg,#7FB5C9,#1F6F78)",
  "linear-gradient(160deg,#BFD9E8,#7FA27A)",
  "linear-gradient(160deg,#E8C27A,#A9BBA0)",
  "linear-gradient(160deg,#8FB07F,#2E5B43)",
  "linear-gradient(160deg,#CFE3EA,#8FB07F)",
  "linear-gradient(160deg,#EADFC8,#7FA27A)",
  "linear-gradient(160deg,#D9B8A0,#7FA27A)",
];

export type Region = { name: string; text: string; bg: string; image?: string };

export const REGIONS: Region[] = [
  ["Иссык-Куль", "Горы встречаются с бескрайним голубым озером."],
  ["Нарын", "Высокие горы, чистый воздух и настоящее чувство свободы."],
  ["Ош", "Древний город, базар и священная гора в центре."],
  ["Джалал-Абад", "Ореховые леса, водопады и тёплые долины юга."],
  ["Чуй", "Зелёная долина у подножия Ала-Тоо, рядом со столицей."],
  ["Талас", "Тихий край эпоса о Манасе и мягких холмов."],
  ["Баткен", "Абрикосовые сады и скалистые ущелья на границе гор."],
].map(([name, text], i) => ({ name, text, bg: regionBgs[i] }));

export type CategoryId = "all" | "mountain" | "yurt" | "issyk" | "nature" | "guest" | "hotel" | "house" | "unique";

export const CATEGORIES: { id: CategoryId; label: string; bg: string; image?: string }[] = [
  { id: "all", label: "Всё", bg: "#A9BBA0" },
  { id: "mountain", label: "Горы", bg: "#BFD9E8" },
  { id: "yurt", label: "Юрты", bg: "#E8C27A" },
  { id: "issyk", label: "Иссык-Куль", bg: "#7FB5C9" },
  { id: "nature", label: "Природа", bg: "#8FB07F" },
  { id: "guest", label: "Гостевые дома", bg: "#EADFC8" },
  { id: "hotel", label: "Отели", bg: "#CFE3EA" },
  { id: "house", label: "Дома и коттеджи", bg: "#C9B48B" },
  { id: "unique", label: "Уникальное жильё", bg: "#D9B8A0" },
];

export const TYPE_FILTERS: { id: StayType | "all"; label: string }[] = [
  { id: "all", label: "Любой" },
  { id: "yurt", label: "Юрта" },
  { id: "guest", label: "Гостевой дом" },
  { id: "hotel", label: "Отель" },
  { id: "house", label: "Дом" },
  { id: "unique", label: "Уникальное" },
];

export const EXPERIENCES = [
  ["Катание на лошадях", 2500],
  ["Походы в горы", 3000],
  ["Национальная кухня", 1800],
  ["Охота с беркутом", 4500],
  ["Мастер-классы", 1500],
  ["Горячие источники", 1200],
  ["Прогулки по ущельям", 2000],
  ["Ночёвка в юрте", 5200],
  ["Поездки к озёрам", 2800],
].map(([name, price], i) => ({
  name: name as string,
  price: price as number,
  bg: regionBgs[i % regionBgs.length],
  image: undefined as string | undefined,
}));

export const HOSPITALITY_VALUES = [
  "Настоящие хозяева",
  "Домашняя кухня",
  "Традиции",
  "Тепло",
  "Безопасность",
  "Местный колорит",
];

export const PRICE_MIN = 2000;
export const PRICE_MAX = 15000;
export const SERVICE_FEE = 0.08;
export const MAX_GUESTS = 10;
