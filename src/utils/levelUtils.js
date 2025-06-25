// src/utils/levelUtils.js

export function seviyeBelirle(puan) {
  if (puan <= 30) return "Ponçik";
  if (puan <= 50) return "Kopyacı";
  if (puan <= 70) return "Gözü Kara";
  return "Çakal";
}
