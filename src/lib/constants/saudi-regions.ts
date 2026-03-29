export interface SaudiRegion {
  id: string;
  nameAr: string;
  nameEn: string;
}

export const SAUDI_REGIONS: SaudiRegion[] = [
  { id: "riyadh", nameAr: "الرياض", nameEn: "Riyadh" },
  { id: "makkah", nameAr: "مكة المكرمة", nameEn: "Makkah" },
  { id: "madinah", nameAr: "المدينة المنورة", nameEn: "Madinah" },
  { id: "qassim", nameAr: "القصيم", nameEn: "Qassim" },
  { id: "eastern", nameAr: "المنطقة الشرقية", nameEn: "Eastern Province" },
  { id: "asir", nameAr: "عسير", nameEn: "Asir" },
  { id: "tabuk", nameAr: "تبوك", nameEn: "Tabuk" },
  { id: "hail", nameAr: "حائل", nameEn: "Hail" },
  {
    id: "northern-borders",
    nameAr: "الحدود الشمالية",
    nameEn: "Northern Borders",
  },
  { id: "jazan", nameAr: "جازان", nameEn: "Jazan" },
  { id: "najran", nameAr: "نجران", nameEn: "Najran" },
  { id: "baha", nameAr: "الباحة", nameEn: "Al-Baha" },
  { id: "jouf", nameAr: "الجوف", nameEn: "Al-Jouf" },
];
