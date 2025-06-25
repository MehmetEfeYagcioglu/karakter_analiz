
/**
 * Karakterin bu turda yapacağı hamleyi belirler
 * @param {string} karakter - karakter adı
 * @param {number} tur - kaçıncı turda olduğunu belirtir
 * @param {Array} rakipHamleler - rakibin önceki hamlelerini tutar
 * @returns {string} - 'i' veya 'h'
 */
export function stratejiKarakter(karakter, tur, rakipHamleler) {
switch (karakter) {
    case 'poncik':
    return 'i';

    case 'cakal':
    return 'h';

    case 'kopyaci':
    return tur === 1 ? 'i' : rakipHamleler[tur - 2] || 'i';

    case 'gozuKara': {
const hileTuru = rakipHamleler.findIndex(h => h === 'h');
if (tur === 1) return 'i';
if (hileTuru === -1) return 'i';
  if (tur > hileTuru + 1) return 'h'; // hile yaptıktan sonraki turdan itibaren hep hile
return 'i';
}


    default:
    return 'i';
}
}
