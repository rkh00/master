var kommuneList = [
  { nummer: "0301", navn: "Oslo" },
  { nummer: "1101", navn: "Eigersund" },
  { nummer: "1103", navn: "Stavanger" },
  { nummer: "1106", navn: "Haugesund" },
  { nummer: "1108", navn: "Sandnes" },
  { nummer: "1111", navn: "Sokndal" },
  { nummer: "1112", navn: "Lund" },
  { nummer: "1114", navn: "Bjerkreim" },
  { nummer: "1119", navn: "Hå" },
  { nummer: "1120", navn: "Klepp" },
  { nummer: "1121", navn: "Time" },
  { nummer: "1122", navn: "Gjesdal" },
  { nummer: "1124", navn: "Sola" },
  { nummer: "1127", navn: "Randaberg" },
  { nummer: "1130", navn: "Strand" },
  { nummer: "1133", navn: "Hjelmeland" },
  { nummer: "1134", navn: "Suldal" },
  { nummer: "1135", navn: "Sauda" },
  { nummer: "1144", navn: "Kvitsøy" },
  { nummer: "1145", navn: "Bokn" },
  { nummer: "1146", navn: "Tysvær" },
  { nummer: "1149", navn: "Karmøy" },
  { nummer: "1151", navn: "Utsira" },
  { nummer: "1160", navn: "Vindafjord" },
  { nummer: "1505", navn: "Kristiansund" },
  { nummer: "1506", navn: "Molde" },
  { nummer: "1508", navn: "Ålesund" },
  { nummer: "1511", navn: "Vanylven" },
  { nummer: "1514", navn: "Sande" },
  { nummer: "1515", navn: "Herøy (Møre og Romsdal)" },
  { nummer: "1516", navn: "Ulstein" },
  { nummer: "1517", navn: "Hareid" },
  { nummer: "1520", navn: "Ørsta" },
  { nummer: "1525", navn: "Stranda" },
  { nummer: "1528", navn: "Sykkylven" },
  { nummer: "1531", navn: "Sula" },
  { nummer: "1532", navn: "Giske" },
  { nummer: "1535", navn: "Vestnes" },
  { nummer: "1539", navn: "Rauma" },
  { nummer: "1547", navn: "Aukra" },
  { nummer: "1554", navn: "Averøy" },
  { nummer: "1557", navn: "Gjemnes" },
  { nummer: "1560", navn: "Tingvoll" },
  { nummer: "1563", navn: "Sunndal" },
  { nummer: "1566", navn: "Surnadal" },
  { nummer: "1573", navn: "Smøla" },
  { nummer: "1576", navn: "Aure" },
  { nummer: "1577", navn: "Volda" },
  { nummer: "1578", navn: "Fjord" },
  { nummer: "1579", navn: "Hustadvika" },
  { nummer: "1580", navn: "Haram" },
  { nummer: "1804", navn: "Bodø" },
  { nummer: "1806", navn: "Narvik" },
  { nummer: "1811", navn: "Bindal" },
  { nummer: "1812", navn: "Sømna" },
  { nummer: "1813", navn: "Brønnøy" },
  { nummer: "1815", navn: "Vega" },
  { nummer: "1816", navn: "Vevelstad" },
  { nummer: "1818", navn: "Herøy (Nordland)" },
  { nummer: "1820", navn: "Alstahaug" },
  { nummer: "1822", navn: "Leirfjord" },
  { nummer: "1824", navn: "Vefsn" },
  { nummer: "1825", navn: "Grane" },
  { nummer: "1826", navn: "Hattfjelldal" },
  { nummer: "1827", navn: "Dønna" },
  { nummer: "1828", navn: "Nesna" },
  { nummer: "1832", navn: "Hemnes" },
  { nummer: "1833", navn: "Rana" },
  { nummer: "1834", navn: "Lurøy" },
  { nummer: "1835", navn: "Træna" },
  { nummer: "1836", navn: "Rødøy" },
  { nummer: "1837", navn: "Meløy" },
  { nummer: "1838", navn: "Gildeskål" },
  { nummer: "1839", navn: "Beiarn" },
  { nummer: "1840", navn: "Saltdal" },
  { nummer: "1841", navn: "Fauske - Fuosko" },
  { nummer: "1845", navn: "Sørfold" },
  { nummer: "1848", navn: "Steigen" },
  { nummer: "1851", navn: "Lødingen" },
  { nummer: "1853", navn: "Evenes" },
  { nummer: "1856", navn: "Røst" },
  { nummer: "1857", navn: "Værøy" },
  { nummer: "1859", navn: "Flakstad" },
  { nummer: "1860", navn: "Vestvågøy" },
  { nummer: "1865", navn: "Vågan" },
  { nummer: "1866", navn: "Hadsel" },
  { nummer: "1867", navn: "Bø" },
  { nummer: "1868", navn: "Øksnes" },
  { nummer: "1870", navn: "Sortland - Suortá" },
  { nummer: "1871", navn: "Andøy" },
  { nummer: "1874", navn: "Moskenes" },
  { nummer: "1875", navn: "Hamarøy" },
  { nummer: "3101", navn: "Halden" },
  { nummer: "3103", navn: "Moss" },
  { nummer: "3105", navn: "Sarpsborg" },
  { nummer: "3107", navn: "Fredrikstad" },
  { nummer: "3110", navn: "Hvaler" },
  { nummer: "3112", navn: "Råde" },
  { nummer: "3114", navn: "Våler" },
  { nummer: "3116", navn: "Skiptvet" },
  { nummer: "3118", navn: "Indre Østfold" },
  { nummer: "3120", navn: "Rakkestad" },
  { nummer: "3122", navn: "Marker" },
  { nummer: "3124", navn: "Aremark" },
  { nummer: "3201", navn: "Bærum" },
  { nummer: "3203", navn: "Asker" },
  { nummer: "3205", navn: "Lillestrøm" },
  { nummer: "3207", navn: "Nordre Follo" },
  { nummer: "3209", navn: "Ullensaker" },
  { nummer: "3212", navn: "Nesodden" },
  { nummer: "3214", navn: "Frogn" },
  { nummer: "3216", navn: "Vestby" },
  { nummer: "3218", navn: "Ås" },
  { nummer: "3220", navn: "Enebakk" },
  { nummer: "3222", navn: "Lørenskog" },
  { nummer: "3224", navn: "Rælingen" },
  { nummer: "3226", navn: "Aurskog-Høland" },
  { nummer: "3228", navn: "Nes" },
  { nummer: "3230", navn: "Gjerdrum" },
  { nummer: "3232", navn: "Nittedal" },
  { nummer: "3234", navn: "Lunner" },
  { nummer: "3236", navn: "Jevnaker" },
  { nummer: "3238", navn: "Nannestad" },
  { nummer: "3240", navn: "Eidsvoll" },
  { nummer: "3242", navn: "Hurdal" },
  { nummer: "3301", navn: "Drammen" },
  { nummer: "3303", navn: "Kongsberg" },
  { nummer: "3305", navn: "Ringerike" },
  { nummer: "3310", navn: "Hole" },
  { nummer: "3312", navn: "Lier" },
  { nummer: "3314", navn: "Øvre Eiker" },
  { nummer: "3316", navn: "Modum" },
  { nummer: "3318", navn: "Krødsherad" },
  { nummer: "3320", navn: "Flå" },
  { nummer: "3322", navn: "Nesbyen" },
  { nummer: "3324", navn: "Gol" },
  { nummer: "3326", navn: "Hemsedal" },
  { nummer: "3328", navn: "Ål" },
  { nummer: "3330", navn: "Hol" },
  { nummer: "3332", navn: "Sigdal" },
  { nummer: "3334", navn: "Flesberg" },
  { nummer: "3336", navn: "Rollag" },
  { nummer: "3338", navn: "Nore og Uvdal" },
  { nummer: "3401", navn: "Kongsvinger" },
  { nummer: "3403", navn: "Hamar" },
  { nummer: "3405", navn: "Lillehammer" },
  { nummer: "3407", navn: "Gjøvik" },
  { nummer: "3411", navn: "Ringsaker" },
  { nummer: "3412", navn: "Løten" },
  { nummer: "3413", navn: "Stange" },
  { nummer: "3414", navn: "Nord-Odal" },
  { nummer: "3415", navn: "Sør-Odal" },
  { nummer: "3416", navn: "Eidskog" },
  { nummer: "3417", navn: "Grue" },
  { nummer: "3418", navn: "Åsnes" },
  { nummer: "3419", navn: "Våler (Innlandet)" },
  { nummer: "3420", navn: "Elverum" },
  { nummer: "3421", navn: "Trysil" },
  { nummer: "3422", navn: "Åmot" },
  { nummer: "3423", navn: "Stor-Elvdal" },
  { nummer: "3424", navn: "Rendalen" },
  { nummer: "3425", navn: "Engerdal" },
  { nummer: "3426", navn: "Tolga" },
  { nummer: "3427", navn: "Tynset" },
  { nummer: "3428", navn: "Alvdal" },
  { nummer: "3429", navn: "Folldal" },
  { nummer: "3430", navn: "Os" },
  { nummer: "3431", navn: "Dovre" },
  { nummer: "3432", navn: "Lesja" },
  { nummer: "3433", navn: "Skjåk" },
  { nummer: "3434", navn: "Lom" },
  { nummer: "3435", navn: "Vågå" },
  { nummer: "3436", navn: "Nord-Fron" },
  { nummer: "3437", navn: "Sel" },
  { nummer: "3438", navn: "Sør-Fron" },
  { nummer: "3439", navn: "Ringebu" },
  { nummer: "3440", navn: "Øyer" },
  { nummer: "3441", navn: "Gausdal" },
  { nummer: "3442", navn: "Østre Toten" },
  { nummer: "3443", navn: "Vestre Toten" },
  { nummer: "3446", navn: "Gran" },
  { nummer: "3447", navn: "Søndre Land" },
  { nummer: "3448", navn: "Nordre Land" },
  { nummer: "3449", navn: "Sør-Aurdal" },
  { nummer: "3450", navn: "Etnedal" },
  { nummer: "3451", navn: "Nord-Aurdal" },
  { nummer: "3452", navn: "Vestre Slidre" },
  { nummer: "3453", navn: "Øystre Slidre" },
  { nummer: "3454", navn: "Vang" },
  { nummer: "3901", navn: "Horten" },
  { nummer: "3903", navn: "Holmestrand" },
  { nummer: "3905", navn: "Tønsberg" },
  { nummer: "3907", navn: "Sandefjord" },
  { nummer: "3909", navn: "Larvik" },
  { nummer: "3911", navn: "Færder" },
  { nummer: "4001", navn: "Porsgrunn" },
  { nummer: "4003", navn: "Skien" },
  { nummer: "4005", navn: "Notodden" },
  { nummer: "4010", navn: "Siljan" },
  { nummer: "4012", navn: "Bamble" },
  { nummer: "4014", navn: "Kragerø" },
  { nummer: "4016", navn: "Drangedal" },
  { nummer: "4018", navn: "Nome" },
  { nummer: "4020", navn: "Midt-Telemark" },
  { nummer: "4022", navn: "Seljord" },
  { nummer: "4024", navn: "Hjartdal" },
  { nummer: "4026", navn: "Tinn" },
  { nummer: "4028", navn: "Kviteseid" },
  { nummer: "4030", navn: "Nissedal" },
  { nummer: "4032", navn: "Fyresdal" },
  { nummer: "4034", navn: "Tokke" },
  { nummer: "4036", navn: "Vinje" },
  { nummer: "4201", navn: "Risør" },
  { nummer: "4202", navn: "Grimstad" },
  { nummer: "4203", navn: "Arendal" },
  { nummer: "4204", navn: "Kristiansand" },
  { nummer: "4205", navn: "Lindesnes" },
  { nummer: "4206", navn: "Farsund" },
  { nummer: "4207", navn: "Flekkefjord" },
  { nummer: "4211", navn: "Gjerstad" },
  { nummer: "4212", navn: "Vegårshei" },
  { nummer: "4213", navn: "Tvedestrand" },
  { nummer: "4214", navn: "Froland" },
  { nummer: "4215", navn: "Lillesand" },
  { nummer: "4216", navn: "Birkenes" },
  { nummer: "4217", navn: "Åmli" },
  { nummer: "4218", navn: "Iveland" },
  { nummer: "4219", navn: "Evje og Hornnes" },
  { nummer: "4220", navn: "Bygland" },
  { nummer: "4221", navn: "Valle" },
  { nummer: "4222", navn: "Bykle" },
  { nummer: "4223", navn: "Vennesla" },
  { nummer: "4224", navn: "Åseral" },
  { nummer: "4225", navn: "Lyngdal" },
  { nummer: "4226", navn: "Hægebostad" },
  { nummer: "4227", navn: "Kvinesdal" },
  { nummer: "4228", navn: "Sirdal" },
  { nummer: "4601", navn: "Bergen" },
  { nummer: "4602", navn: "Kinn" },
  { nummer: "4611", navn: "Etne" },
  { nummer: "4612", navn: "Sveio" },
  { nummer: "4613", navn: "Bømlo" },
  { nummer: "4614", navn: "Stord" },
  { nummer: "4615", navn: "Fitjar" },
  { nummer: "4616", navn: "Tysnes" },
  { nummer: "4617", navn: "Kvinnherad" },
  { nummer: "4618", navn: "Ullensvang" },
  { nummer: "4619", navn: "Eidfjord" },
  { nummer: "4620", navn: "Ulvik" },
  { nummer: "4621", navn: "Voss" },
  { nummer: "4622", navn: "Kvam" },
  { nummer: "4623", navn: "Samnanger" },
  { nummer: "4624", navn: "Bjørnafjorden" },
  { nummer: "4625", navn: "Austevoll" },
  { nummer: "4626", navn: "Øygarden" },
  { nummer: "4627", navn: "Askøy" },
  { nummer: "4628", navn: "Vaksdal" },
  { nummer: "4629", navn: "Modalen" },
  { nummer: "4630", navn: "Osterøy" },
  { nummer: "4631", navn: "Alver" },
  { nummer: "4632", navn: "Austrheim" },
  { nummer: "4633", navn: "Fedje" },
  { nummer: "4634", navn: "Masfjorden" },
  { nummer: "4635", navn: "Gulen" },
  { nummer: "4636", navn: "Solund" },
  { nummer: "4637", navn: "Hyllestad" },
  { nummer: "4638", navn: "Høyanger" },
  { nummer: "4639", navn: "Vik" },
  { nummer: "4640", navn: "Sogndal" },
  { nummer: "4641", navn: "Aurland" },
  { nummer: "4642", navn: "Lærdal" },
  { nummer: "4643", navn: "Årdal" },
  { nummer: "4644", navn: "Luster" },
  { nummer: "4645", navn: "Askvoll" },
  { nummer: "4646", navn: "Fjaler" },
  { nummer: "4647", navn: "Sunnfjord" },
  { nummer: "4648", navn: "Bremanger" },
  { nummer: "4649", navn: "Stad" },
  { nummer: "4650", navn: "Gloppen" },
  { nummer: "4651", navn: "Stryn" },
  { nummer: "5001", navn: "Trondheim" },
  { nummer: "5006", navn: "Steinkjer" },
  { nummer: "5007", navn: "Namsos" },
  { nummer: "5014", navn: "Frøya" },
  { nummer: "5020", navn: "Osen" },
  { nummer: "5021", navn: "Oppdal" },
  { nummer: "5022", navn: "Rennebu" },
  { nummer: "5025", navn: "Røros" },
  { nummer: "5026", navn: "Holtålen" },
  { nummer: "5027", navn: "Midtre Gauldal" },
  { nummer: "5028", navn: "Melhus" },
  { nummer: "5029", navn: "Skaun" },
  { nummer: "5031", navn: "Malvik" },
  { nummer: "5032", navn: "Selbu" },
  { nummer: "5033", navn: "Tydal" },
  { nummer: "5034", navn: "Meråker" },
  { nummer: "5035", navn: "Stjørdal" },
  { nummer: "5036", navn: "Frosta" },
  { nummer: "5037", navn: "Levanger" },
  { nummer: "5038", navn: "Verdal" },
  { nummer: "5041", navn: "Snåase - Snåsa" },
  { nummer: "5042", navn: "Lierne" },
  { nummer: "5043", navn: "Raarvihke - Røyrvik" },
  { nummer: "5044", navn: "Namsskogan" },
  { nummer: "5045", navn: "Grong" },
  { nummer: "5046", navn: "Høylandet" },
  { nummer: "5047", navn: "Overhalla" },
  { nummer: "5049", navn: "Flatanger" },
  { nummer: "5052", navn: "Leka" },
  { nummer: "5053", navn: "Inderøy" },
  { nummer: "5054", navn: "Indre Fosen" },
  { nummer: "5055", navn: "Heim" },
  { nummer: "5056", navn: "Hitra" },
  { nummer: "5057", navn: "Ørland" },
  { nummer: "5058", navn: "Åfjord" },
  { nummer: "5059", navn: "Orkland" },
  { nummer: "5060", navn: "Nærøysund" },
  { nummer: "5061", navn: "Rindal" },
  { nummer: "5501", navn: "Tromsø" },
  { nummer: "5503", navn: "Harstad" },
  { nummer: "5510", navn: "Kvæfjord" },
  { nummer: "5512", navn: "Tjeldsund" },
  { nummer: "5514", navn: "Ibestad" },
  { nummer: "5516", navn: "Gratangen" },
  { nummer: "5518", navn: "Loabák - Lavangen" },
  { nummer: "5520", navn: "Bardu" },
  { nummer: "5522", navn: "Salangen" },
  { nummer: "5524", navn: "Målselv" },
  { nummer: "5526", navn: "Sørreisa" },
  { nummer: "5528", navn: "Dyrøy" },
  { nummer: "5530", navn: "Senja" },
  { nummer: "5532", navn: "Balsfjord" },
  { nummer: "5534", navn: "Karlsøy" },
  { nummer: "5536", navn: "Lyngen" },
  { nummer: "5538", navn: "Storfjord - Omasvuotna - Omasvuono" },
  { nummer: "5540", navn: "Gáivuotna - Kåfjord - Kaivuono" },
  { nummer: "5542", navn: "Skjervøy" },
  { nummer: "5544", navn: "Nordreisa" },
  { nummer: "5546", navn: "Kvænangen" },
  { nummer: "5601", navn: "Alta" },
  { nummer: "5603", navn: "Hammerfest" },
  { nummer: "5605", navn: "Sør-Varanger" },
  { nummer: "5607", navn: "Vadsø" },
  { nummer: "5610", navn: "Kárásjohka - Karasjok" },
  { nummer: "5612", navn: "Guovdageaidnu - Kautokeino" },
  { nummer: "5614", navn: "Loppa" },
  { nummer: "5616", navn: "Hasvik" },
  { nummer: "5618", navn: "Måsøy" },
  { nummer: "5620", navn: "Nordkapp" },
  { nummer: "5622", navn: "Porsanger - Porsángu - Porsanki " },
  { nummer: "5624", navn: "Lebesby" },
  { nummer: "5626", navn: "Gamvik" },
  { nummer: "5628", navn: "Deatnu-Tana" },
  { nummer: "5630", navn: "Berlevåg" },
  { nummer: "5632", navn: "Båtsfjord" },
  { nummer: "5634", navn: "Vardø" },
  { nummer: "5636", navn: "Unjárga-Nesseby" },
];
