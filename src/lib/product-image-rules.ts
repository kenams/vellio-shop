export interface ProductImageInput {
  slug?: string | null;
  name?: string | null;
  categorySlug?: string | null;
  photoKeyword?: string | null;
}

const PEXELS_PARAMS = "auto=compress&cs=tinysrgb&w=900&h=900&fit=crop";

function pexels(id: string, ext = "jpeg", filename = `pexels-photo-${id}`): string {
  return `https://images.pexels.com/photos/${id}/${filename}.${ext}?${PEXELS_PARAMS}`;
}

function unsplash(id: string): string {
  return `https://images.unsplash.com/photo-${id}?w=900&q=80&fit=crop&crop=entropy`;
}

function commons(url: string): string {
  return url.replace(/\?utm_.+$/, "");
}

function unique(urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))].slice(0, 3);
}

const WIKI = {
  robotMopping: commons("https://upload.wikimedia.org/wikipedia/commons/2/21/Mopping_vacuum_cleaner_robotic.jpg"),
  robotVacuumTall: commons("https://upload.wikimedia.org/wikipedia/commons/d/d4/Robot_Vacuum_2016_%2831606445890%29.jpg"),
  smartPlug: commons("https://upload.wikimedia.org/wikipedia/commons/d/da/Smart-plug.jpg"),
  smartPlugWemo: commons("https://upload.wikimedia.org/wikipedia/commons/1/10/Wemo_Mini_Smart_Plug_%283750%29.jpg"),
  backupCamera: commons("https://upload.wikimedia.org/wikipedia/commons/4/4c/Lexus_backup_camera1.jpg"),
  backupDisplay: commons("https://upload.wikimedia.org/wikipedia/commons/6/61/2017_Honda_Ridgeline_RTL-backup_camera_displayed_in_color_audio_system.jpg"),
  kitchenScale: commons("https://upload.wikimedia.org/wikipedia/commons/4/4f/Escali_digital_kitchen_scale.jpg"),
  kitchenScaleDevice: commons("https://upload.wikimedia.org/wikipedia/commons/b/b4/Digital_kitchen_scale_KE_901-0329.jpg"),
  deskLamp: commons("https://upload.wikimedia.org/wikipedia/commons/0/06/Dekala_Arches%E2%84%A2_Smart_Lamp.jpg"),
  wristRest: commons("https://upload.wikimedia.org/wikipedia/commons/3/31/Ergonomic_mouse_pad_wrist_pillow.jpg"),
  bubbleGun: commons("https://upload.wikimedia.org/wikipedia/commons/b/b7/Soap_bubble_shoter._%284845777113%29.jpg"),
  eggSlicer: commons("https://upload.wikimedia.org/wikipedia/commons/c/cd/Egg_Slicer.jpg"),
  eggSlicerOpen: commons("https://upload.wikimedia.org/wikipedia/commons/c/c0/Cooked_Boiled_Egg_Slice_Cutter_%2814811024733%29.jpg"),
};

const IMAGE_SETS = {
  robotVacuumMapping: [pexels("844874"), pexels("10567507"), WIKI.robotMopping],
  robotVacuumSlim: [pexels("10567507"), pexels("6856823"), WIKI.robotVacuumTall],
  robotVacuumMop: [pexels("11879434"), WIKI.robotMopping, pexels("844874")],
  smartPlug: [pexels("4148576"), WIKI.smartPlug, WIKI.smartPlugWemo],
  backupCamera: [WIKI.backupCamera, WIKI.backupDisplay, pexels("13836509")],
  faceMassager: [pexels("3735620"), pexels("9774558"), pexels("7208708")],
  facialCleanser: [pexels("8740315"), pexels("6476121"), pexels("9775357")],
  ledFaceMask: [pexels("7216285"), pexels("7216286"), pexels("3989779")],
  hairStraightener: [pexels("15874639"), pexels("8468144"), pexels("15874638")],
  hairDryer: [pexels("7518702"), pexels("973406"), pexels("32641724")],
  epilator: [pexels("14438392"), pexels("35103882"), pexels("6476121")],
  massageGun: [pexels("11372642"), pexels("6389881"), pexels("5327481")],
  massageGunAlt: [pexels("6389881"), pexels("11372617"), pexels("5240677")],
  earbuds: [pexels("3585797"), pexels("14694340"), pexels("10104406")],
  earbudsAlt: [pexels("14694340"), pexels("3585797"), pexels("8534088")],
  smartwatch: [pexels("4679246"), pexels("10339115"), pexels("15228782")],
  starProjector: [pexels("1150988"), unsplash("1534796636912-3b95b3ab5986"), pexels("7505145")],
  babyNightLight: [pexels("29461832"), pexels("31888425"), pexels("27176373")],
  babyMonitor: [pexels("4356989"), pexels("6849514"), pexels("36777938")],
  bubbleGun: [pexels("26976718"), WIKI.bubbleGun, pexels("36808378")],
  portableBlender: [pexels("27861734"), pexels("7460165"), pexels("28100422")],
  foodProcessor: [pexels("7525008"), pexels("30238393"), pexels("7460165")],
  vegetableChopper: [pexels("30238393"), pexels("37261913"), pexels("37261919")],
  kitchenScale: [pexels("10009678"), WIKI.kitchenScale, pexels("6303718")],
  eggSlicer: [pexels("10074027"), WIKI.eggSlicer, WIKI.eggSlicerOpen],
  airFryer: [pexels("29461935"), pexels("35285814"), pexels("32928224")],
  juicer: [pexels("5946802"), pexels("8679405"), pexels("30487655")],
  cakeMold: [pexels("5953766"), pexels("8109320"), pexels("7234419")],
  powerBank: [pexels("3921704"), pexels("10104321"), commons("https://upload.wikimedia.org/wikipedia/commons/8/83/2023_Powerbank_Green_Cell_PowerPlay_20_%283%29.jpg")],
  solarPowerBank: [pexels("518530"), pexels("9799717"), pexels("3921704")],
  securityCamera: [pexels("33104381"), pexels("28940577"), pexels("27934755")],
  airPurifierCar: [pexels("17130096", "png"), pexels("31726758"), unsplash("1492144534655-ae79c964c9d7")],
  deskLamp: [pexels("29283981"), WIKI.deskLamp, pexels("10736999")],
  qiDeskLamp: [pexels("10736999"), WIKI.deskLamp, pexels("7742584")],
  wristRest: [pexels("17479949"), WIKI.wristRest, pexels("35471654")],
  cableOrganizer: [pexels("31886525"), pexels("34929057"), pexels("4339335")],
  carPhoneHolder: [pexels("13536013"), pexels("33488", "jpg", "navigation-car-drive-road"), pexels("20329591")],
  carCharger: [pexels("7742563", "png"), pexels("33488", "jpg", "navigation-car-drive-road"), unsplash("1494976388531-d1058494cdd8")],
  carVacuum: [pexels("5233264"), pexels("4120479"), pexels("12167650")],
  carOrganizer: [pexels("30563011"), pexels("9582574"), pexels("9462680")],
  dashcam: [pexels("13836509"), pexels("9318443"), pexels("30520122")],
  smartBulb: [pexels("28940512"), pexels("18136105"), pexels("22491144")],
  diffuser: [pexels("6914655"), pexels("6914656"), pexels("11001974")],
  serum: [pexels("28255125"), pexels("7262902"), pexels("3757657")],
  bluetoothSpeaker: [pexels("5511714"), pexels("374067"), pexels("12021852")],
  webcam: [pexels("7172701"), pexels("16547328"), pexels("15977090")],
  usbCHub: [pexels("30708285"), pexels("4195398"), pexels("10104321")],
  wirelessCharger3In1: [pexels("9741343"), pexels("12877873"), pexels("10736999")],
  laptopStand: [pexels("10321966"), pexels("14458078"), pexels("6045222")],
  deskOrganizer: [pexels("33344612"), pexels("5994734"), pexels("30563011")],
  whiteboard: [pexels("7654493"), pexels("17724738"), pexels("9301741")],
  yogaMat: [pexels("4587699"), pexels("9943223"), unsplash("1544367567-0f2fcb009e0b")],
  jumpRope: [pexels("4920419"), pexels("8032841"), pexels("6339602")],
  resistanceBands: [pexels("6667512"), pexels("6516207"), pexels("6516206")],
  foamRoller: [pexels("6207519"), pexels("4587694"), pexels("4587699")],
  workoutGloves: [pexels("7697774"), pexels("30246209"), pexels("6293099")],
  magneticBlocks: [pexels("7104382"), pexels("8770575"), pexels("7301355")],
  diaperBag: [pexels("9462680"), pexels("36777938"), pexels("31122087")],
};

const SLUG_IMAGES: Record<string, string[]> = {
  "aspirateur-robot-ultra-plat-wifi": IMAGE_SETS.robotVacuumSlim,
  "robot-aspirateur-cartographie-laser-2700pa": IMAGE_SETS.robotVacuumMapping,
  "robot-aspirateur-laveur-programmable": IMAGE_SETS.robotVacuumMop,
  "prise-connectee-wifi-consommation": IMAGE_SETS.smartPlug,
  "camera-recul-sans-fil-hd": IMAGE_SETS.backupCamera,
  "masseur-visage-ultrason-led": IMAGE_SETS.faceMassager,
  "brosse-lissante-ionique": IMAGE_SETS.hairStraightener,
  "pistolet-massage-musculaire-30-vitesses-3200rpm": IMAGE_SETS.massageGun,
  "pistolet-massage-musculaire-percussif": IMAGE_SETS.massageGunAlt,
  "ecouteurs-sans-fil-bluetooth-anc-40h-autonomie": IMAGE_SETS.earbuds,
  "ecouteurs-sans-fil-anc-40h": IMAGE_SETS.earbudsAlt,
  "montre-connectee-sport-gps": IMAGE_SETS.smartwatch,
  "serum-vitamine-c-20-acide-hyaluronique": IMAGE_SETS.serum,
  "projecteur-led-etoiles-aurores-boreales": IMAGE_SETS.starProjector,
  "veilleuse-bebe-capteur-pleur-berceuse": IMAGE_SETS.babyNightLight,
  "pistolet-bulles-electrique-3000": IMAGE_SETS.bubbleGun,
  "blender-portable-usb-600ml": IMAGE_SETS.portableBlender,
  "robot-cuisine-multifonction-compact": IMAGE_SETS.foodProcessor,
  "coupe-legumes-electrique-12-en-1": IMAGE_SETS.vegetableChopper,
  "pese-aliments-digital-usb": IMAGE_SETS.kitchenScale,
  "trancheuse-oeufs-multifonction-inox": IMAGE_SETS.eggSlicer,
  "powerbank-20000mah-charge-rapide-usb-c-65w": IMAGE_SETS.powerBank,
  "batterie-externe-solaire-30000mah": IMAGE_SETS.solarPowerBank,
  "camera-surveillance-interieure-wifi-360-2k": IMAGE_SETS.securityCamera,
  "purificateur-air-voiture-hepa": IMAGE_SETS.airPurifierCar,
  "lampe-bureau-led-chargeur-qi": IMAGE_SETS.qiDeskLamp,
  "lampe-de-bureau-led-sans-fil-rechargeable": IMAGE_SETS.deskLamp,
  "repose-poignets-ergonomique-tapis-xl": IMAGE_SETS.wristRest,
  "organiseur-cables-magnetique-10": IMAGE_SETS.cableOrganizer,
  "support-telephone-voiture-magnetique": IMAGE_SETS.carPhoneHolder,
  "chargeur-voiture-gan-65w": IMAGE_SETS.carCharger,
  "corde-a-sauter-numerique-compteur-calories": IMAGE_SETS.jumpRope,
  "wifi-smart-plug-with-energy-monitor": [pexels("28117696"), pexels("4148576"), pexels("28940512")],
  "car-phone-holder-magnetic-dashboard": [pexels("33488", "jpg", "navigation-car-drive-road"), pexels("13536013"), pexels("20329591")],
  "wireless-led-desk-lamp-usb-rechargeable": [pexels("823841"), pexels("7439757"), pexels("29283981")],
  "20w-waterproof-360-portable-bluetooth-speaker": [pexels("374067"), pexels("5511714"), pexels("12021852")],
};

const RULES: Array<{ pattern: RegExp; images: string[] }> = [
  { pattern: /camera.*recul|backup.*camera|reversing.*camera/, images: IMAGE_SETS.backupCamera },
  { pattern: /support.*telephone.*voiture|magnetic.*car.*phone|car.*phone.*holder/, images: IMAGE_SETS.carPhoneHolder },
  { pattern: /chargeur.*voiture|car.*charger|wireless.*car.*charger/, images: IMAGE_SETS.carCharger },
  { pattern: /aspirateur.*voiture|car.*vacuum/, images: IMAGE_SETS.carVacuum },
  { pattern: /organisateur.*siege|seat.*back.*organizer|back.*seat.*organizer/, images: IMAGE_SETS.carOrganizer },
  { pattern: /dashcam|camera.*tableau|dashboard.*camera/, images: IMAGE_SETS.dashcam },
  { pattern: /purificateur.*air.*voiture|car.*air.*purifier/, images: IMAGE_SETS.airPurifierCar },
  { pattern: /prise.*connect|smart.*plug/, images: IMAGE_SETS.smartPlug },
  { pattern: /robot.*aspirateur|aspirateur.*robot|robot.*vacuum/, images: IMAGE_SETS.robotVacuumMapping },
  { pattern: /camera.*surveillance|security.*camera|indoor.*camera/, images: IMAGE_SETS.securityCamera },
  { pattern: /ampoule|smart.*bulb|led.*bulb/, images: IMAGE_SETS.smartBulb },
  { pattern: /diffuseur|essential.*oil.*diffuser|aromatherapy/, images: IMAGE_SETS.diffuser },
  { pattern: /projecteur.*etoiles|galaxy.*projector|star.*projector/, images: IMAGE_SETS.starProjector },
  { pattern: /veilleuse.*bebe|baby.*night.*light|nursery.*night.*light/, images: IMAGE_SETS.babyNightLight },
  { pattern: /babyphone|baby.*monitor/, images: IMAGE_SETS.babyMonitor },
  { pattern: /jeu.*construction.*magnetique|magnetic.*building.*blocks/, images: IMAGE_SETS.magneticBlocks },
  { pattern: /sac.*langer|diaper.*bag/, images: IMAGE_SETS.diaperBag },
  { pattern: /friteuse|air.*fryer/, images: IMAGE_SETS.airFryer },
  { pattern: /robot.*cuisine|food.*processor/, images: IMAGE_SETS.foodProcessor },
  { pattern: /balance|pese.*aliment|kitchen.*scale/, images: IMAGE_SETS.kitchenScale },
  { pattern: /centrifugeuse|slow.*juicer|juicer/, images: IMAGE_SETS.juicer },
  { pattern: /moule.*gateau|silicone.*cake.*mold|cake.*mold/, images: IMAGE_SETS.cakeMold },
  { pattern: /coupe.*legume|vegetable.*chopper|electric.*chopper/, images: IMAGE_SETS.vegetableChopper },
  { pattern: /trancheuse.*oeuf|egg.*slicer/, images: IMAGE_SETS.eggSlicer },
  { pattern: /pistolet.*massage|massage.*gun|percussion.*massage/, images: IMAGE_SETS.massageGun },
  { pattern: /tapis.*yoga|yoga.*mat/, images: IMAGE_SETS.yogaMat },
  { pattern: /corde.*sauter|jump.*rope|skipping.*rope/, images: IMAGE_SETS.jumpRope },
  { pattern: /bande.*resistance|resistance.*band/, images: IMAGE_SETS.resistanceBands },
  { pattern: /foam.*roller|rouleau.*massage/, images: IMAGE_SETS.foamRoller },
  { pattern: /gant.*musculation|weightlifting.*gloves|workout.*gloves/, images: IMAGE_SETS.workoutGloves },
  { pattern: /nettoyant.*visage|face.*cleanser|facial.*cleansing/, images: IMAGE_SETS.facialCleanser },
  { pattern: /masque.*led|led.*face.*mask/, images: IMAGE_SETS.ledFaceMask },
  { pattern: /seche.*cheveux|hair.*dryer/, images: IMAGE_SETS.hairDryer },
  { pattern: /masseur.*visage|face.*massager|micro.*current/, images: IMAGE_SETS.faceMassager },
  { pattern: /brosse.*lissante|hair.*straightener|straightening.*brush/, images: IMAGE_SETS.hairStraightener },
  { pattern: /epilateur|epilator|hair.*removal/, images: IMAGE_SETS.epilator },
  { pattern: /serum|vitamin.*c|hyaluronic/, images: IMAGE_SETS.serum },
  { pattern: /ecouteur|earbuds|wireless.*earphone/, images: IMAGE_SETS.earbuds },
  { pattern: /enceinte.*bluetooth|bluetooth.*speaker/, images: IMAGE_SETS.bluetoothSpeaker },
  { pattern: /powerbank|power.*bank|batterie.*externe/, images: IMAGE_SETS.powerBank },
  { pattern: /solaire|solar.*power.*bank|solar.*charger/, images: IMAGE_SETS.solarPowerBank },
  { pattern: /webcam|video.*call.*camera/, images: IMAGE_SETS.webcam },
  { pattern: /hub.*usb|usb-c.*hub|usb.*c.*hub/, images: IMAGE_SETS.usbCHub },
  { pattern: /chargeur.*sans.*fil.*3|3.*in.*1.*wireless|apple.*watch.*airpods/, images: IMAGE_SETS.wirelessCharger3In1 },
  { pattern: /lampe.*bureau.*chargeur|desk.*lamp.*charger/, images: IMAGE_SETS.qiDeskLamp },
  { pattern: /lampe.*bureau|desk.*lamp/, images: IMAGE_SETS.deskLamp },
  { pattern: /support.*ordinateur|laptop.*stand/, images: IMAGE_SETS.laptopStand },
  { pattern: /organisateur.*bureau|desk.*organizer/, images: IMAGE_SETS.deskOrganizer },
  { pattern: /repose.*poignet|wrist.*rest/, images: IMAGE_SETS.wristRest },
  { pattern: /organiseur.*cable|cable.*organizer|cable.*management/, images: IMAGE_SETS.cableOrganizer },
  { pattern: /tableau.*blanc|whiteboard/, images: IMAGE_SETS.whiteboard },
  { pattern: /montre.*connect|smartwatch|fitness.*watch/, images: IMAGE_SETS.smartwatch },
];

function searchable(input: ProductImageInput): string {
  return [input.slug, input.name, input.photoKeyword, input.categorySlug]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getCuratedProductImages(input: ProductImageInput): string[] {
  const slug = input.slug || "";
  const slugImages = SLUG_IMAGES[slug];
  if (slugImages) return unique(slugImages);

  const haystack = searchable(input);
  const rule = RULES.find((candidate) => candidate.pattern.test(haystack));
  return rule ? unique(rule.images) : [];
}
