import { Dua } from "../types";

export const MOCK_DUAS: Dua[] = [
  {
    id: "dua-1",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْZِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allāhumma innī a'ūdhu bika minal-hammi wal-ḥazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa ḍala'id-dayni wa ghalabatir-rijāl",
    translation: "Ô Allah, je cherche protection auprès de Toi contre l'anxiété et la tristesse, l'incapacité et la paresse, l'avarice et la lâcheté, le fardeau de la dette et la domination des hommes.",
    source: "Al-Bukhari",
    hadithStatus: "Sahih",
    recommendedMoment: "Matin et soir",
    repetition: "3 fois",
    categoryIds: ["anxiete", "tristesse", "difficulte-financiere", "matin", "soir"]
  },
  {
    id: "dua-2",
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "Lā ilāha illā Anta, subḥānaka innī kuntu minaẓ-ẓālimīn",
    translation: "Il n'y a de divinité que Toi ! Pureté à Toi ! J'ai été parmi les injustes.",
    source: "At-Tirmidhi",
    hadithStatus: "Sahih",
    recommendedMoment: "En cas d'épreuve ou de tristesse",
    categoryIds: ["epreuve", "tristesse", "repentir"]
  },
  {
    id: "dua-3",
    arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
    transliteration: "Bismika Rabbī waḍa'tu janbī, wa bika arfa'uh, fa-in amsakta nafsī far-ḥamhā, wa in arsaltahā fa-ḥfaẓhā bimā taḥfaẓu bihi 'ibādakaṣ-ṣāliḥīn",
    translation: "C'est en Ton nom, mon Seigneur, que je pose mon flanc et c'est par Toi que je le relève. Si Tu reprends mon âme, fais-lui miséricorde, et si Tu la renvoies, préserve-la comme Tu préserves Tes serviteurs vertueux.",
    source: "Al-Bukhari & Muslim",
    hadithStatus: "Sahih",
    recommendedMoment: "Avant de dormir",
    categoryIds: ["sommeil", "protection"]
  },
  {
    id: "dua-4",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allāhumma a'innī 'alā dhikrika wa shukrika wa ḥusni 'ibādatik",
    translation: "Ô Allah, aide-moi à me souvenir de Toi, à Te remercier et à T'adorer de la meilleure manière.",
    source: "Abu Dawud, An-Nasa'i",
    hadithStatus: "Sahih",
    recommendedMoment: "Après chaque prière obligatoire",
    repetition: "1 fois",
    categoryIds: ["gratitude", "demande-generale"]
  },
  {
    id: "dua-5",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
    transliteration: "Al-ḥamdu lillāhilla dhī bi-ni'matihi tatimmuṣ-ṣāliḥāt",
    translation: "Louange à Allah par la grâce de Qui les bonnes actions se réalisent.",
    source: "Ibn Majah",
    hadithStatus: "Sahih",
    recommendedMoment: "En cas de bonne nouvelle ou de joie",
    repetition: "1 fois",
    categoryIds: ["gratitude", "bonheur", "joie"]
  },
  {
    id: "dua-6",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
    transliteration: "Lā ilāha illā-l-Lāhu-l-'Aẓīmu-l-Ḥalīm, lā ilāha illā-l-Lāhu Rabbu-l-'Arshi-l-'Aẓīm, lā ilāha illā-l-Lāhu Rabbu-s-samāwāti wa Rabbu-l-arḍi wa Rabbu-l-'Arshi-l-Karīm",
    translation: "Il n'y a de divinité d'adorée qu'Allah, l'Immense, le Clément. Il n'y a de divinité d'adorée qu'Allah, le Seigneur du Trône Immense. Il n'y a de divinité d'adorée qu'Allah, le Seigneur des cieux, le Seigneur de la terre et le Seigneur du Noble Trône.",
    source: "Al-Bukhari & Muslim",
    hadithStatus: "Sahih",
    recommendedMoment: "En cas de stress intense ou de détresse",
    repetition: "1 fois",
    categoryIds: ["stress", "apaisement", "peur", "crainte", "epreuve"]
  },
  {
    id: "dua-7",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration: "Allāhumma Rabba-n-nās, adhhibi-l-ba's, ishfihi wa Anta-sh-Shāfī, lā shifā'a illā shifā'uk, shifā'an lā yughādiru saqamā",
    translation: "Ô Allah, Seigneur des hommes, fais disparaître le mal. Guéris-le, car Tu es le Guérisseur. Il n'y a de guérison que la Tienne, une guérison qui ne laisse aucune trace de maladie.",
    source: "Al-Bukhari & Muslim",
    hadithStatus: "Sahih",
    recommendedMoment: "En visitant un malade ou pour soi-même",
    repetition: "1 fois",
    categoryIds: ["maladie", "epreuve", "protection"]
  },
  {
    id: "dua-8",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "A'ūdhu bi-kalimāti-l-Lāhi-t-tāmmati min kulli shayṭānin wa hāmmah, wa min kulli 'aynin lāmmah",
    translation: "Je cherche protection par les paroles parfaites d'Allah contre tout démon, tout animal venimeux et contre tout mauvais œil.",
    source: "Al-Bukhari",
    hadithStatus: "Sahih",
    recommendedMoment: "Matin et soir, ou pour protéger les enfants",
    repetition: "3 fois",
    categoryIds: ["protection", "mauvais-oeil", "sorcellerie", "jalousie", "peur", "envie", "matin", "soir"]
  },
  {
    id: "dua-9",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Ḥasbuna-l-Lāhu wa ni'ma-l-Wakīl",
    translation: "Allah nous suffit, et Il est le meilleur Garant.",
    source: "Al-Bukhari (Coran 3:173)",
    hadithStatus: "Sahih",
    recommendedMoment: "Face à une injustice ou une difficulté",
    repetition: "Autant de fois que possible",
    categoryIds: ["injustice", "peur", "epreuve", "demande-generale"]
  },
  {
    id: "dua-10",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاك",
    transliteration: "Allāhumma-kfini bi-ḥalālika 'an ḥarāmik, wa aghninī bi-faḍlika 'amman siwāk",
    translation: "Ô Allah, accorde-moi de Tes biens licites pour m'éviter de recourir à ce qui est illicite, et par Ta grâce, enrichis-moi afin que je n'aie besoin de nul autre que Toi.",
    source: "At-Tirmidhi",
    hadithStatus: "Sahih",
    recommendedMoment: "Après les prières ou en période de besoin financier",
    repetition: "1 fois",
    categoryIds: ["difficulte-financiere", "pauvrete", "richesse"]
  },
  {
    id: "dua-11",
    arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنْتَ خَيْرُ الْوَارِثِينَ",
    transliteration: "Rabbi lā tadharnī fardan wa Anta khayru-l-wārithīn",
    translation: "Mon Seigneur, ne me laisse pas seul (sans descendance), alors que Tu es le meilleur des héritiers.",
    source: "Coran (21:89)",
    hadithStatus: "Sahih",
    recommendedMoment: "Pendant les prosternations ou aux moments d'exaucement",
    repetition: "1 fois",
    categoryIds: ["infertilite", "epreuve", "demande-generale"]
  },
  {
    id: "dua-12",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    transliteration: "Yā Ḥayyu yā Qayyūmu bi-raḥmatika astaghīth, aṣliḥ lī sha'nī kullaha, wa lā takilnī ilā nafsī ṭarfata 'ayn",
    translation: "Ô Vivant, Ô Subsistant par Toi-même, c'est par Ta miséricorde que j'appelle au secours. Améliore ma situation dans sa totalité et ne me confie pas à moi-même ne serait-ce que le temps d'un clin d'œil.",
    source: "An-Nasa'i",
    hadithStatus: "Sahih",
    recommendedMoment: "Matin et soir",
    repetition: "1 fois",
    categoryIds: ["mal-etre", "apaisement", "tristesse", "anxiete", "bonheur", "matin", "soir"]
  },
  {
    id: "dua-13",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'ūdhu bi-kalimāti-l-Lāhi-t-tāmmāti min sharri mā khalaq",
    translation: "Je cherche protection par les paroles parfaites d'Allah contre le mal de ce qu'Il a créé.",
    source: "Muslim",
    hadithStatus: "Sahih",
    recommendedMoment: "Matin et soir, ou en faisant halte dans un lieu",
    repetition: "3 fois",
    categoryIds: ["protection", "mauvais-oeil", "peur", "epreuve", "matin", "soir"]
  },
  {
    id: "dua-14",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allāhumma Anta Rabbī lā ilāha illā Anta, khalaqtanī wa anā 'abduk, wa anā 'alā 'ahdika wa wa'dika ma-staṭa't, a'ūdhu bika min sharri mā ṣana't, abū'u laka bi-ni'matika 'alayya wa abū'u laka bi-dhanbī fa-ghfir lī, fa-innahu lā yaghfiru-dh-dhunūba illā Anta",
    translation: "Ô Allah, Tu es mon Seigneur, il n'y a de divinité que Toi. Tu m'as créé et je suis Ton serviteur. Je suis fidèle à Ton pacte et à Ta promesse autant que je le puis. Je cherche protection auprès de Toi contre le mal de mes actions. Je reconnais Tes bienfaits sur moi et je reconnais mon péché. Pardonne-moi donc, car nul autre que Toi ne pardonne les péchés.",
    source: "Al-Bukhari",
    hadithStatus: "Sahih",
    recommendedMoment: "Matin et soir",
    repetition: "1 fois",
    categoryIds: ["repentir", "demande-generale", "apaisement", "matin", "soir"]
  },
  {
    id: "dua-15",
    arabic: "بِسْمِ اللَّهِ (ثَلَاثًا)، أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سَبْعَ مَرَّاتٍ)",
    transliteration: "Bismillāh (3 fois), A'ūdhu billāhi wa qudratihi min sharri mā ajidu wa uḥādhir (7 fois)",
    translation: "Au nom d'Allah (3 fois). Je cherche refuge auprès d'Allah et de Sa puissance contre le mal de ce que je ressens et que je redoute (7 fois).",
    source: "Muslim",
    hadithStatus: "Sahih",
    recommendedMoment: "En posant la main sur la zone douloureuse",
    repetition: "1 fois",
    categoryIds: ["maladie", "epreuve", "protection"]
  },
  {
    id: "dua-16",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli shay'in qadīr",
    translation: "Nous sommes au matin et le règne appartient à Allah, louange à Allah. Il n'y a pas de divinité en dehors d'Allah unique, sans associé. À Lui la royauté et la louange, et Il est Tout-Puissant.",
    source: "Muslim",
    hadithStatus: "Sahih",
    recommendedMoment: "Le matin",
    repetition: "1 fois",
    categoryIds: ["matin", "protection", "apaisement"]
  },
  {
    id: "dua-17",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsaynā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli shay'in qadīr",
    translation: "Nous sommes au soir et le règne appartient à Allah, louange à Allah. Il n'y a pas de divinité en dehors d'Allah unique, sans associé. À Lui la royauté et la louange, et Il est Tout-Puissant.",
    source: "Muslim",
    hadithStatus: "Sahih",
    recommendedMoment: "Le soir",
    repetition: "1 fois",
    categoryIds: ["soir", "protection", "apaisement"]
  },
  {
    id: "dua-18",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    transliteration: "Allāhumma bismika amūtu wa aḥyā",
    translation: "Ô Allah, c'est en Ton nom que je meurs et que je vis.",
    source: "Al-Bukhari",
    hadithStatus: "Sahih",
    recommendedMoment: "Avant de s'endormir",
    repetition: "1 fois",
    categoryIds: ["sommeil", "protection"]
  },
  {
    id: "dua-19",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    transliteration: "Allāhumma qinī 'adhābaka yawma tab'athu 'ibādak",
    translation: "Ô Allah, préserve-moi de Ton châtiment le jour où Tu ressusciteras Tes serviteurs.",
    source: "Abu Dawud & At-Tirmidhi",
    hadithStatus: "Sahih",
    recommendedMoment: "Avant de dormir",
    repetition: "3 fois",
    categoryIds: ["sommeil", "protection"]
  },
  {
    id: "dua-20",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillāhille dhī lā yaḍurru ma'as mihi shay'un fil-arḍi wa lā fis-samā'i wa Huwas-Samī'ul-'Alīm",
    translation: "Au nom d'Allah, tel qu'en Compagnie de Son Nom rien ne peut nuire sur terre ni dans le ciel, et Il est l'Audient, l'Omniscient.",
    source: "Abu Dawud & At-Tirmidhi",
    hadithStatus: "Sahih",
    recommendedMoment: "Matin et soir",
    repetition: "3 fois",
    categoryIds: ["matin", "soir", "protection"]
  }
];
