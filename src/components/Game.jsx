import React, { useState } from "react";
import { stratejiKarakter } from "../utils/gameLogic";
import { seviyeBelirle } from "../utils/levelUtils";

const karakterler = ["cakal", "poncik", "kopyaci", "gozuKara"];
const TUR_SAYISI = 10;

function Game({ playerName }) {
  const [aktifKarakterIndex, setAktifKarakterIndex] = useState(0); // Şu an hangi karaktere karşı oynuyorsun
  const [tur, setTur] = useState(1); // Aktif karakterle kaçıncı turdasın
  const [puanlar, setPuanlar] = useState({}); // Her karakter için puanlar
  const [oncekiHamleler, setOncekiHamleler] = useState({ oyuncu: [], rakip: [] }); // Hamle geçmişi (sadece aktif karakter için)
const [bitis, setBitis] = useState(false);

const aktifKarakter = karakterler[aktifKarakterIndex];

function handleHamle(hamleKullanici) {
    // Rakip karakterin hamlesini hesapla (aktif karakterin algoritması, tur ve oyuncunun önceki hamleleri temelinde)
    const rakipHamle = stratejiKarakter(aktifKarakter, tur, oncekiHamleler.oyuncu);

    // Puan hesapla
    let puan = 0;
    if (hamleKullanici === "h" && rakipHamle === "i") puan = 3;
    else if (hamleKullanici === "i" && rakipHamle === "h") puan = 0;
    else if (hamleKullanici === "i" && rakipHamle === "i") puan = 2;
    else if (hamleKullanici === "h" && rakipHamle === "h") puan = 1;

    // Hamleleri güncelle
    setOncekiHamleler((prev) => ({
    oyuncu: [...prev.oyuncu, hamleKullanici],
    rakip: [...prev.rakip, rakipHamle],
    }));

    // Puanı güncelle
    setPuanlar((prev) => ({
    ...prev,
    [aktifKarakter]: (prev[aktifKarakter] || 0) + puan,
    }));

    // Tur ilerlet
    if (tur < TUR_SAYISI) {
    setTur(tur + 1);
    } else {
      // Sonraki karaktere geç
    if (aktifKarakterIndex < karakterler.length - 1) {
        setAktifKarakterIndex(aktifKarakterIndex + 1);
        setTur(1);
        setOncekiHamleler({ oyuncu: [], rakip: [] });
    } else {
        // Tüm karakterler bitti
        setBitis(true);
    }
    }
}

if (bitis) {
    const toplamPuan = Object.values(puanlar).reduce((a, b) => a + b, 0);
    return (
    <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Oyun Bitti! Tebrikler, {playerName}</h2>
        <p className="mt-2">
        Toplam Puan: <span className="font-semibold">{toplamPuan}</span>
        </p>
        <p className="text-lg mt-2">
        Seviyen: <span className="text-green-600 font-semibold">{seviyeBelirle(toplamPuan)}</span>
        </p>
        <ul className="mt-4 text-left">
        {karakterler.map((k) => (
            <li key={k} className="capitalize">
        {k}: {puanlar[k] || 0} puan
            </li>
        ))}
        </ul>
    </div>
    );
}

return (
    <div className="max-w-xl mx-auto p-6 text-center">
    <p className="mb-4">
        Tur {tur} / {TUR_SAYISI}
    </p>
    <div className="flex justify-center gap-4 mb-6">
        <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => handleHamle("i")}
        >
        İş birliği
        </button>
        <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => handleHamle("h")}
        >
        Hile yap
        </button>
    </div>
    </div>
  );
}

export default Game;
