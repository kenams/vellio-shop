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
  // ── Robot aspirateurs — Unsplash vérifiés (robot disque rond sur sol)
  robotVacuumMapping: [
    unsplash("1558618666-fcd25c85cd64"), // robot aspirateur rond sur parquet
    unsplash("1679678691170-7781f11f9d86"), // robot vacuum vue de dessus
    WIKI.robotMopping,
  ],
  robotVacuumSlim: [
    unsplash("1558618666-fcd25c85cd64"), // robot aspirateur
    unsplash("1583847268964-b28dc8f51f92"), // robot vacuum slim profil
    WIKI.robotVacuumTall,
  ],
  robotVacuumMop: [
    unsplash("1558618666-fcd25c85cd64"), // robot aspirateur
    WIKI.robotMopping,
    unsplash("1583847268964-b28dc8f51f92"), // robot vacuum
  ],

  // ── Smart home
  smartPlug: [
    WIKI.smartPlug,
    WIKI.smartPlugWemo,
    unsplash("1556761175-b413da4baf72"), // smart home device close-up
  ],
  smartBulb: [
    unsplash("1550985616-10810253b84d"), // ampoule led colorée
    unsplash("1565814636199-ae8133055c1c"), // ampoule connectée
    unsplash("1558618666-fcd25c85cd64"), // smart home
  ],
  diffuser: [
    unsplash("1600857062241-98e5dba7f5bf"), // diffuseur aromatique blanc
    unsplash("1527359443443-84a48aec73d2"), // diffuseur huiles essentielles
    unsplash("1584473457406-6240486418e9"), // aromathérapie diffuseur
  ],
  securityCamera: [
    unsplash("1557597774-9d273605dfa9"), // caméra surveillance intérieure
    unsplash("1580121441575-41bcb5c6b47c"), // caméra smart home
    unsplash("1544428571-6051a61f0756"), // caméra connectée
  ],
  starProjector: [
    unsplash("1534796636912-3b95b3ab5986"), // projecteur étoiles chambre
    unsplash("1580121441575-41bcb5c6b47c"), // smart home projector
    unsplash("1565814636199-ae8133055c1c"), // lumière ambient
  ],

  // ── Gadgets voiture
  backupCamera: [
    WIKI.backupCamera,
    WIKI.backupDisplay,
    unsplash("1494976388531-d1058494cdd8"), // intérieur voiture dashboard
  ],
  carPhoneHolder: [
    unsplash("1511919884226-fd3cad34687c"), // support téléphone voiture
    unsplash("1494976388531-d1058494cdd8"), // intérieur voiture
    unsplash("1558981806-ec527fa84c39"),     // accessoire voiture
  ],
  carCharger: [
    unsplash("1494976388531-d1058494cdd8"), // intérieur voiture dashboard
    unsplash("1511919884226-fd3cad34687c"), // intérieur voiture technologie
    unsplash("1558981806-ec527fa84c39"),     // accessoire auto
  ],
  carVacuum: [
    unsplash("1558981806-ec527fa84c39"),     // aspirateur voiture
    unsplash("1494976388531-d1058494cdd8"), // intérieur voiture
    unsplash("1511919884226-fd3cad34687c"), // dashboard voiture
  ],
  carOrganizer: [
    unsplash("1558981806-ec527fa84c39"),     // organisateur voiture
    unsplash("1494976388531-d1058494cdd8"), // intérieur auto
    unsplash("1511919884226-fd3cad34687c"), // accessoire auto
  ],
  dashcam: [
    unsplash("1511919884226-fd3cad34687c"), // tableau de bord voiture
    unsplash("1494976388531-d1058494cdd8"), // intérieur voiture
    unsplash("1558981806-ec527fa84c39"),     // gadget voiture
  ],
  // purificateur voiture : images d'intérieur voiture + petit appareil, PAS de voiture sport
  airPurifierCar: [
    unsplash("1494976388531-d1058494cdd8"), // intérieur voiture dashboard
    unsplash("1511919884226-fd3cad34687c"), // intérieur voiture technology
    unsplash("1558981806-ec527fa84c39"),     // accessoire voiture
  ],

  // ── Beauté / soin visage — URLs Unsplash vérifiées beauté
  faceMassager: [
    unsplash("1596462502278-27bfdc403348"), // cosmétiques / soin visage
    unsplash("1617897903246-719242758050"), // routine beauté
    unsplash("1549045783-5f2d8e8dff74"),    // spa skincare
  ],
  facialCleanser: [
    unsplash("1599305090598-fe179d501227"), // produits skincare
    unsplash("1487412947147-5cebf100ffc2"), // maquillage / soin
    unsplash("1616394584738-fc6e612e71b9"), // routine soin visage
  ],
  ledFaceMask: [
    unsplash("1616394584738-fc6e612e71b9"), // soin visage
    unsplash("1596462502278-27bfdc403348"), // cosmétiques
    unsplash("1617897903246-719242758050"), // beauté routine
  ],
  hairStraightener: [
    unsplash("1487412947147-5cebf100ffc2"), // coiffure cheveux beauté
    unsplash("1526045612212-70caf35c14df"), // lisseur cheveux
    unsplash("1522337360801-4f88e7a9e4d0"), // soin cheveux
  ],
  hairDryer: [
    unsplash("1487412947147-5cebf100ffc2"), // coiffure / cheveux
    unsplash("1617897903246-719242758050"), // routine beauté
    unsplash("1596462502278-27bfdc403348"), // soin
  ],
  epilator: [
    unsplash("1549045783-5f2d8e8dff74"),    // spa / soin corps
    unsplash("1616394584738-fc6e612e71b9"), // routine beauté
    unsplash("1599305090598-fe179d501227"), // skincare
  ],
  serum: [
    unsplash("1614790133872-46bc31b89e3b"), // sérum vitamine C flacon
    unsplash("1570172619644-dfd03ed5d881"), // produits skincare
    unsplash("1599305090598-fe179d501227"), // crème soin visage
  ],

  // ── Sport / fitness — Unsplash vérifiées sport
  massageGun: [
    unsplash("1612444080611-5ed7532d4c2f"), // pistolet massage musculaire
    unsplash("1571019613454-1cb2f99b2d8b"), // fitness récupération
    unsplash("1534438327276-14e5300c3a48"), // salle sport équipement
  ],
  massageGunAlt: [
    unsplash("1571019613454-1cb2f99b2d8b"), // sport fitness
    unsplash("1612444080611-5ed7532d4c2f"), // massage gun
    unsplash("1549060279-7e168fcee0c2"), // gym workout
  ],
  yogaMat: [
    unsplash("1544367567-0f2fcb009e0b"), // tapis yoga
    unsplash("1571019613454-1cb2f99b2d8b"), // yoga fitness
    unsplash("1593812816-2b4b307c6cb0"), // mat yoga méditation
  ],
  jumpRope: [
    unsplash("1549060279-7e168fcee0c2"), // corde à sauter
    unsplash("1571019613454-1cb2f99b2d8b"), // fitness cardio
    unsplash("1534438327276-14e5300c3a48"), // sport équipement
  ],
  resistanceBands: [
    unsplash("1584735935682-2f2b69dff9d2"), // bandes élastiques résistance
    unsplash("1571019613454-1cb2f99b2d8b"), // fitness home
    unsplash("1549060279-7e168fcee0c2"), // entraînement maison
  ],
  foamRoller: [
    unsplash("1517836357463-d25dfeac3438"), // foam roller récupération
    unsplash("1571019613454-1cb2f99b2d8b"), // sport récup
    unsplash("1534438327276-14e5300c3a48"), // fitness équipement
  ],
  workoutGloves: [
    unsplash("1583454110551-21f2fa2afe61"), // gants musculation
    unsplash("1534438327276-14e5300c3a48"), // gym équipement
    unsplash("1549060279-7e168fcee0c2"), // fitness training
  ],
  smartwatch: [
    unsplash("1544117519-31a4b719223d"), // montre connectée sport
    unsplash("1523275335684-37898b6baf30"), // smartwatch
    unsplash("1508685096489-7aacd43bd3b1"), // montre bracelet
  ],

  // ── Cuisine
  airFryer: [
    unsplash("1606787364406-a3cdf06c6d0c"), // friteuse air chaud
    unsplash("1585515320310-259814833e62"), // appareil cuisine
    unsplash("1556909114-f6e7ad7d3136"), // cuisine moderne
  ],
  foodProcessor: [
    unsplash("1585515320310-259814833e62"), // robot cuisine électrique
    unsplash("1556909114-f6e7ad7d3136"), // appareil culinaire
    unsplash("1495521821757-a1efb6729352"), // cuisine moderne
  ],
  portableBlender: [
    unsplash("1622597467836-f3e6dac3e61c"), // blender portable
    unsplash("1612544448445-b8232cff3b6c"), // smoothie blender
    unsplash("1571167366136-d6ab7af63580"), // blender électrique
  ],
  vegetableChopper: [
    unsplash("1553484771-371a816b2772"), // coupe-légumes cuisine
    unsplash("1495521821757-a1efb6729352"), // préparation culinaire
    unsplash("1581299894007-aaa50297cf16"), // cuisine légumes
  ],
  kitchenScale: [WIKI.kitchenScale, WIKI.kitchenScaleDevice, unsplash("1495521821757-a1efb6729352")],
  eggSlicer: [WIKI.eggSlicer, WIKI.eggSlicerOpen, unsplash("1495521821757-a1efb6729352")],
  juicer: [
    unsplash("1622597467836-f3e6dac3e61c"), // extracteur jus
    unsplash("1556909114-f6e7ad7d3136"), // centrifugeuse
    unsplash("1571167366136-d6ab7af63580"), // jus frais
  ],
  cakeMold: [
    unsplash("1558618666-fcd25c85cd64"), // moule gâteau pâtisserie
    unsplash("1495521821757-a1efb6729352"), // ustensiles cuisine
    unsplash("1556909114-f6e7ad7d3136"), // pâtisserie
  ],

  // ── Tech gadgets
  earbuds: [
    unsplash("1590658165737-15a047b7c97e"), // écouteurs sans fil TWS
    unsplash("1505740420928-5e560c06d30e"), // headphone gadget
    unsplash("1583394838336-acd977736f90"), // earbuds boitier
  ],
  earbudsAlt: [
    unsplash("1583394838336-acd977736f90"), // airpods case
    unsplash("1590658165737-15a047b7c97e"), // écouteurs bluetooth
    unsplash("1505740420928-5e560c06d30e"), // audio gear
  ],
  bluetoothSpeaker: [
    unsplash("1608043152269-423dbba4e7e1"), // enceinte bluetooth portable
    unsplash("1558618666-fcd25c85cd64"), // speaker audio
    unsplash("1512446816042-444d641267d4"), // portable speaker outdoor
  ],
  powerBank: [
    unsplash("1609091839311-d5365f9ff1c5"), // batterie externe portable
    unsplash("1593642632559-0c6d3fc62b89"), // power bank charge
    commons("https://upload.wikimedia.org/wikipedia/commons/8/83/2023_Powerbank_Green_Cell_PowerPlay_20_%283%29.jpg"),
  ],
  solarPowerBank: [
    unsplash("1609091839311-d5365f9ff1c5"), // batterie solaire externe
    unsplash("1592833159155-c62df1b65634"), // solar power gadget
    unsplash("1593642632559-0c6d3fc62b89"), // chargeur portable
  ],
  webcam: [
    unsplash("1526378800651-8438701bb3ff"), // webcam bureau
    unsplash("1593642632523-1d60af4b3029"), // setup télétravail
    unsplash("1519389950473-47ba0277781c"), // home office tech
  ],
  usbCHub: [
    unsplash("1593642632559-0c6d3fc62b89"), // hub USB-C tech
    unsplash("1519389950473-47ba0277781c"), // laptop accessories
    unsplash("1526378800651-8438701bb3ff"), // tech gadget desk
  ],
  wirelessCharger3In1: [
    unsplash("1609091839311-d5365f9ff1c5"), // chargeur sans fil
    unsplash("1593642632559-0c6d3fc62b89"), // charging station
    unsplash("1526378800651-8438701bb3ff"), // wireless charger
  ],

  // ── Bureau / productivité
  deskLamp: [
    WIKI.deskLamp,
    unsplash("1593642632523-1d60af4b3029"), // bureau lamp setup
    unsplash("1519389950473-47ba0277781c"), // desk productivité
  ],
  qiDeskLamp: [
    unsplash("1593642632523-1d60af4b3029"), // lampe bureau qi
    WIKI.deskLamp,
    unsplash("1519389950473-47ba0277781c"), // desk setup
  ],
  wristRest: [
    WIKI.wristRest,
    unsplash("1593642632523-1d60af4b3029"), // bureau ergonomique
    unsplash("1519389950473-47ba0277781c"), // desk accessories
  ],
  cableOrganizer: [
    unsplash("1593642632559-0c6d3fc62b89"), // câbles organisés
    unsplash("1519389950473-47ba0277781c"), // desk setup clean
    unsplash("1526378800651-8438701bb3ff"), // tech desk
  ],
  laptopStand: [
    unsplash("1593642632523-1d60af4b3029"), // support laptop bureau
    unsplash("1519389950473-47ba0277781c"), // laptop stand ergonomic
    unsplash("1526378800651-8438701bb3ff"), // desk productivity
  ],
  deskOrganizer: [
    unsplash("1484981138541-3d074aa97716"), // organisateur bureau
    unsplash("1519389950473-47ba0277781c"), // desk organizer
    unsplash("1593642632523-1d60af4b3029"), // bureau rangement
  ],
  whiteboard: [
    unsplash("1588196749597-9ff075ee6b5b"), // tableau blanc effaçable
    unsplash("1519389950473-47ba0277781c"), // bureau productivity
    unsplash("1484981138541-3d074aa97716"), // workspace
  ],

  // ── Enfant / famille
  babyNightLight: [
    unsplash("1566140967404-b8b3932483f5"), // veilleuse bébé chambre
    unsplash("1503454537195-1dcabb73ffb9"), // jouet enfant
    unsplash("1587654780291-39c9404d746b"), // chambre bébé
  ],
  babyMonitor: [
    unsplash("1503454537195-1dcabb73ffb9"), // baby monitor
    unsplash("1566140967404-b8b3932483f5"), // bébé chambre
    unsplash("1587654780291-39c9404d746b"), // sécurité bébé
  ],
  bubbleGun: [WIKI.bubbleGun, unsplash("1503454537195-1dcabb73ffb9"), unsplash("1566140967404-b8b3932483f5")],
  magneticBlocks: [
    unsplash("1596461404969-9ae70f2830c1"), // blocs construction magnétiques
    unsplash("1503454537195-1dcabb73ffb9"), // jouets enfant
    unsplash("1566140967404-b8b3932483f5"), // jeu construction
  ],
  diaperBag: [
    unsplash("1587654780291-39c9404d746b"), // sac à langer
    unsplash("1503454537195-1dcabb73ffb9"), // accessoire bébé
    unsplash("1566140967404-b8b3932483f5"), // famille bébé
  ],
  tireInflator: [
    unsplash("1558981806-ec527fa84c39"), // gonfleur pneu voiture
    unsplash("1494976388531-d1058494cdd8"), // accessoire auto
    unsplash("1511919884226-fd3cad34687c"), // gadget voiture
  ],
  obd2Scanner: [
    unsplash("1494976388531-d1058494cdd8"), // diagnostic voiture OBD
    unsplash("1511919884226-fd3cad34687c"), // tableau bord auto
    unsplash("1558981806-ec527fa84c39"), // gadget automobile
  ],
  trunkOrganizer: [
    unsplash("1558981806-ec527fa84c39"), // organisateur coffre voiture
    unsplash("1494976388531-d1058494cdd8"), // intérieur auto
    unsplash("1511919884226-fd3cad34687c"), // accessoire coffre
  ],
  gpstracker: [
    unsplash("1557597774-9d273605dfa9"), // GPS tracker device
    unsplash("1544428571-6051a61f0756"), // tracking device
    unsplash("1580121441575-41bcb5c6b47c"), // tech gadget
  ],
  smartThermostat: [
    unsplash("1556761175-b413da4baf72"), // thermostat connecté
    unsplash("1558618666-fcd25c85cd64"), // smart home device
    unsplash("1484101403633-562f891dc89a"), // maison connectée
  ],
  smartLock: [
    unsplash("1558618666-fcd25c85cd64"), // serrure connectée
    unsplash("1556761175-b413da4baf72"), // smart lock
    unsplash("1484101403633-562f891dc89a"), // sécurité maison
  ],
  airPurifierHepa: [
    unsplash("1600857062241-98e5dba7f5bf"), // purificateur air HEPA
    unsplash("1527359443443-84a48aec73d2"), // air purifier device
    unsplash("1558618666-fcd25c85cd64"), // smart home appliance
  ],
  videoDoorbell: [
    unsplash("1557597774-9d273605dfa9"), // sonnette vidéo connectée
    unsplash("1558618666-fcd25c85cd64"), // smart home security
    unsplash("1556761175-b413da4baf72"), // doorbell device
  ],
  coffeeMachine: [
    unsplash("1495474472287-4d71bcdd2085"), // machine à café
    unsplash("1514432574-6f6c1f8f7e70"), // espresso machine
    unsplash("1509042239860-f550ce710b93"), // coffee maker device
  ],
  electricKettle: [
    unsplash("1595434971317-85a51f823e8b"), // bouilloire électrique
    unsplash("1495474472287-4d71bcdd2085"), // appliance cuisine
    unsplash("1556909114-f6e7ad7d3136"), // cuisine gadget
  ],
  immersionBlender: [
    unsplash("1556909114-f6e7ad7d3136"), // mixeur plongeant
    unsplash("1585515320310-259814833e62"), // blender cuisine
    unsplash("1495521821757-a1efb6729352"), // appareil cuisine
  ],
  knifeSet: [
    unsplash("1592861956271-f1a7e8daa3b1"), // couteaux cuisine
    unsplash("1495521821757-a1efb6729352"), // ustensiles culinaires
    unsplash("1556909114-f6e7ad7d3136"), // cuisine professionnelle
  ],
  waffleMaker: [
    unsplash("1585515320310-259814833e62"), // gaufrier électrique
    unsplash("1556909114-f6e7ad7d3136"), // appareil cuisine gaufres
    unsplash("1495521821757-a1efb6729352"), // kitchen appliance
  ],
  exerciseBike: [
    unsplash("1534438327276-14e5300c3a48"), // vélo appartement
    unsplash("1571019613454-1cb2f99b2d8b"), // fitness indoor bike
    unsplash("1552674605-db6ffd4facb5"), // cardio training
  ],
  treadmill: [
    unsplash("1571019613454-1cb2f99b2d8b"), // tapis de course fitness
    unsplash("1534438327276-14e5300c3a48"), // treadmill gym
    unsplash("1552674605-db6ffd4facb5"), // running machine
  ],
  dumbbells: [
    unsplash("1583454110551-21f2fa2afe61"), // haltères musculation
    unsplash("1534438327276-14e5300c3a48"), // poids gym
    unsplash("1571019613454-1cb2f99b2d8b"), // fitness weights
  ],
  footSpa: [
    unsplash("1583854516502-8b3b59c4e682"), // bain de pieds spa
    unsplash("1587854692152-cbe660dbde88"), // foot massager
    unsplash("1549045783-5f2d8e8dff74"), // spa relaxation
  ],
  beardTrimmer: [
    unsplash("1503951914875-452162b0f3f1"), // tondeuse barbe
    unsplash("1517941823-815bea90d291"), // rasage barbe
    unsplash("1576091160550-2173dba999ef"), // homme barbe soin
  ],
  magnifyingMirror: [
    unsplash("1587854692152-cbe660dbde88"), // miroir lumineux
    unsplash("1596462502278-27bfdc403348"), // beauté miroir
    unsplash("1617897903246-719242758050"), // soin visage miroir
  ],
  jadeRoller: [
    unsplash("1614790133872-46bc31b89e3b"), // jade roller soin
    unsplash("1570172619644-dfd03ed5d881"), // soin visage naturel
    unsplash("1596462502278-27bfdc403348"), // cosmétique beauté
  ],
  selfTanner: [
    unsplash("1596462502278-27bfdc403348"), // autobronzant beauté
    unsplash("1617897903246-719242758050"), // soin corps
    unsplash("1549045783-5f2d8e8dff74"), // beauté spa
  ],
  iPadStylus: [
    unsplash("1561154464-062d233de9f9"), // stylet iPad tablette
    unsplash("1526378800651-8438701bb3ff"), // tech desk tablet
    unsplash("1593642632523-1d60af4b3029"), // productivité tablet
  ],
  ringLight: [
    unsplash("1561154464-062d233de9f9"), // ring light studio
    unsplash("1526378800651-8438701bb3ff"), // setup création contenu
    unsplash("1574715144611-609f29192975"), // lighting photo studio
  ],
  miniProjector: [
    unsplash("1574715144611-609f29192975"), // mini projecteur
    unsplash("1578662996442-48f60103fc96"), // home cinema
    unsplash("1526378800651-8438701bb3ff"), // tech gadget setup
  ],
  monitorArm: [
    unsplash("1593642632523-1d60af4b3029"), // bras moniteur bureau
    unsplash("1519389950473-47ba0277781c"), // setup desk monitor
    unsplash("1484981138541-3d074aa97716"), // productivité bureau
  ],
  deskPad: [
    unsplash("1593642632523-1d60af4b3029"), // tapis bureau gaming
    unsplash("1519389950473-47ba0277781c"), // desk pad setup
    unsplash("1484981138541-3d074aa97716"), // bureau workspace
  ],
  alarmClock: [
    unsplash("1508847154043-be5407e5f6b1"), // réveil LED bureau
    unsplash("1593642632523-1d60af4b3029"), // horloge bureau
    unsplash("1484981138541-3d074aa97716"), // desk clock
  ],
  ergonomicChair: [
    unsplash("1579389083046-e3df9c2b3325"), // chaise bureau ergonomique
    unsplash("1593642632523-1d60af4b3029"), // home office chair
    unsplash("1519389950473-47ba0277781c"), // bureau télétravail
  ],
  babyThermometer: [
    unsplash("1566140967404-b8b3932483f5"), // thermomètre bébé
    unsplash("1587654780291-39c9404d746b"), // santé bébé
    unsplash("1503454537195-1dcabb73ffb9"), // soin bébé
  ],
  kidsScooter: [
    unsplash("1596461404969-9ae70f2830c1"), // trottinette enfant
    unsplash("1503454537195-1dcabb73ffb9"), // jouet enfant outdoor
    unsplash("1547347298-4074fc3086f0"), // enfant activité
  ],
  inflatablePool: [
    unsplash("1596461404969-9ae70f2830c1"), // piscine gonflable enfant
    unsplash("1503454537195-1dcabb73ffb9"), // jeu eau enfant
    unsplash("1547347298-4074fc3086f0"), // été famille
  ],
  playTent: [
    unsplash("1503454537195-1dcabb73ffb9"), // tente jeu enfant
    unsplash("1566140967404-b8b3932483f5"), // chambre enfant jouet
    unsplash("1596461404969-9ae70f2830c1"), // indoor play enfant
  ],
  kidsHeadphones: [
    unsplash("1590658165737-15a047b7c97e"), // casque audio enfant
    unsplash("1503454537195-1dcabb73ffb9"), // kid headphone
    unsplash("1566140967404-b8b3932483f5"), // enfant musique
  ],

  // ── Nouveaux produits (session 2026-05-17)
  carDefroster: [
    unsplash("1494976388531-d1058494cdd8"), // intérieur voiture
    unsplash("1511919884226-fd3cad34687c"), // dashboard auto
    unsplash("1558981806-ec527fa84c39"),     // gadget voiture
  ],
  carSeatCushion: [
    unsplash("1511919884226-fd3cad34687c"), // intérieur voiture siège
    unsplash("1494976388531-d1058494cdd8"), // auto interior
    unsplash("1558981806-ec527fa84c39"),     // accessoire auto
  ],
  consoleOrganizer: [
    unsplash("1494976388531-d1058494cdd8"), // console centrale voiture
    unsplash("1511919884226-fd3cad34687c"), // car interior organizer
    unsplash("1558981806-ec527fa84c39"),     // car accessories
  ],
  batteryTester: [
    unsplash("1558981806-ec527fa84c39"),     // testeur batterie voiture
    unsplash("1494976388531-d1058494cdd8"), // car gadget
    unsplash("1511919884226-fd3cad34687c"), // auto diagnostic
  ],
  ledStringLights: [
    unsplash("1556761175-b413da4baf72"), // guirlande LED intérieur
    unsplash("1558618666-fcd25c85cd64"), // smart lighting
    unsplash("1484101403633-562f891dc89a"), // ambiance LED
  ],
  airQualitySensor: [
    unsplash("1600857062241-98e5dba7f5bf"), // capteur qualité air
    unsplash("1527359443443-84a48aec73d2"), // air sensor device
    unsplash("1558618666-fcd25c85cd64"), // smart home sensor
  ],
  weatherStation: [
    unsplash("1556761175-b413da4baf72"), // station météo connectée
    unsplash("1558618666-fcd25c85cd64"), // smart home device
    unsplash("1484101403633-562f891dc89a"), // home sensor
  ],
  ledFaucet: [
    unsplash("1556909114-f6e7ad7d3136"), // robinet LED cuisine
    unsplash("1495521821757-a1efb6729352"), // cuisine gadget
    unsplash("1585515320310-259814833e62"), // kitchen gadget
  ],
  pastaMachine: [
    unsplash("1495521821757-a1efb6729352"), // machine à pâtes
    unsplash("1556909114-f6e7ad7d3136"), // ustensile cuisine
    unsplash("1585515320310-259814833e62"), // kitchen tool
  ],
  toaster: [
    unsplash("1495474472287-4d71bcdd2085"), // grille-pain électrique
    unsplash("1556909114-f6e7ad7d3136"), // toaster cuisine
    unsplash("1585515320310-259814833e62"), // kitchen appliance
  ],
  meatThermometer: [
    unsplash("1556909114-f6e7ad7d3136"), // thermomètre cuisson
    unsplash("1495521821757-a1efb6729352"), // BBQ cuisine
    unsplash("1585515320310-259814833e62"), // cooking gadget
  ],
  cuttingBoard: [
    unsplash("1492545082-22644ab456eb"), // planche à découper bambou
    unsplash("1556909114-f6e7ad7d3136"), // ustensile cuisine bois
    unsplash("1495521821757-a1efb6729352"), // cutting board
  ],
  battleRope: [
    unsplash("1534438327276-14e5300c3a48"), // battle rope gym
    unsplash("1571019613454-1cb2f99b2d8b"), // fitness training intense
    unsplash("1552674605-db6ffd4facb5"), // gym equipment
  ],
  pullUpBar: [
    unsplash("1534438327276-14e5300c3a48"), // barre traction porte
    unsplash("1583454110551-21f2fa2afe61"), // musculation barre
    unsplash("1571019613454-1cb2f99b2d8b"), // workout pull up
  ],
  boxingGloves: [
    unsplash("1583454110551-21f2fa2afe61"), // gants boxe
    unsplash("1534438327276-14e5300c3a48"), // boxing sport
    unsplash("1571019613454-1cb2f99b2d8b"), // combat sport
  ],
  sleepMask: [
    unsplash("1587854692152-cbe660dbde88"), // masque sommeil yeux
    unsplash("1549045783-5f2d8e8dff74"), // spa relaxation
    unsplash("1596462502278-27bfdc403348"), // bien-être soin
  ],
  digitalNotebook: [
    unsplash("1561154464-062d233de9f9"), // carnet numérique tablet
    unsplash("1593642632523-1d60af4b3029"), // desk productivity notebook
    unsplash("1519389950473-47ba0277781c"), // digital work setup
  ],
  gimbal: [
    unsplash("1574715144611-609f29192975"), // gimbal stabilisateur
    unsplash("1526378800651-8438701bb3ff"), // creator content gear
    unsplash("1561154464-062d233de9f9"), // smartphone video tech
  ],
  footrest: [
    unsplash("1593642632523-1d60af4b3029"), // repose-pied bureau
    unsplash("1519389950473-47ba0277781c"), // ergonomie bureau
    unsplash("1484981138541-3d074aa97716"), // desk ergonomic
  ],
  pianokids: [
    unsplash("1596461404969-9ae70f2830c1"), // piano électronique enfant
    unsplash("1503454537195-1dcabb73ffb9"), // jouet musical enfant
    unsplash("1566140967404-b8b3932483f5"), // instrument kid
  ],
  microscopeKids: [
    unsplash("1596461404969-9ae70f2830c1"), // microscope enfant éducatif
    unsplash("1503454537195-1dcabb73ffb9"), // science jouet kid
    unsplash("1547347298-4074fc3086f0"), // éducatif enfant
  ],
  kidsGpsBackpack: [
    unsplash("1503454537195-1dcabb73ffb9"), // sac GPS enfant
    unsplash("1566140967404-b8b3932483f5"), // sac dos enfant
    unsplash("1547347298-4074fc3086f0"), // family security kid
  ],
  walkieTalkie: [
    unsplash("1557597774-9d273605dfa9"), // walkie talkie communication
    unsplash("1503454537195-1dcabb73ffb9"), // jouet radio enfant
    unsplash("1547347298-4074fc3086f0"), // outdoor kids
  ],
  lightDrawingTablet: [
    unsplash("1561154464-062d233de9f9"), // tablette dessin lumineuse
    unsplash("1596461404969-9ae70f2830c1"), // tablet créatif enfant
    unsplash("1503454537195-1dcabb73ffb9"), // art kid creative
  ],
};

const SLUG_IMAGES: Record<string, string[]> = {
  // ── Robot aspirateurs
  "aspirateur-robot-ultra-plat-wifi": IMAGE_SETS.robotVacuumSlim,
  "robot-aspirateur-cartographie-laser-2700pa": IMAGE_SETS.robotVacuumMapping,
  "robot-aspirateur-laveur-programmable": IMAGE_SETS.robotVacuumMop,

  // ── Maison connectée
  "prise-connectee-wifi-consommation": IMAGE_SETS.smartPlug,
  "prise-connectee-wifi-compteur-d-energie": IMAGE_SETS.smartPlug,
  "camera-surveillance-interieure-wifi-360-2k": IMAGE_SETS.securityCamera,
  "projecteur-led-etoiles-aurores-boreales": IMAGE_SETS.starProjector,
  "diffuseur-huiles-essentielles-ultrason-500ml": IMAGE_SETS.diffuser,
  "500ml-ultrasonic-essential-oil-diffuser": IMAGE_SETS.diffuser,
  "ampoule-led-connectee-wifi-rgb-e27-10w": IMAGE_SETS.smartBulb,

  // ── Gadgets voiture
  "camera-recul-sans-fil-hd": IMAGE_SETS.backupCamera,
  "support-telephone-voiture-magnetique": IMAGE_SETS.carPhoneHolder,
  "chargeur-voiture-gan-65w": IMAGE_SETS.carCharger,
  "purificateur-air-voiture-hepa": IMAGE_SETS.airPurifierCar,
  "organisateur-siège-arriere-voiture-multipoches": IMAGE_SETS.carOrganizer,

  // ── Beauté / soin visage — corrigés avec Unsplash beauté vérifiées
  "masseur-visage-ultrason-led": IMAGE_SETS.faceMassager,
  "masseur-visage-micro-courant-lifting-ems": IMAGE_SETS.faceMassager,
  "nettoyant-visage-electrique-silicone-ultrason": IMAGE_SETS.facialCleanser,
  "masque-led-visage-7-couleurs-phototherapie": IMAGE_SETS.ledFaceMask,
  "brosse-lissante-ionique": IMAGE_SETS.hairStraightener,
  "seche-cheveux-ionique-2200w-diffuseur-inclus": IMAGE_SETS.hairDryer,
  "epilateur-electrique-corps-visage-etanche-ipx6": IMAGE_SETS.epilator,
  "serum-vitamine-c-20-acide-hyaluronique": IMAGE_SETS.serum,

  // ── Sport / fitness
  "pistolet-massage-musculaire-30-vitesses-3200rpm": IMAGE_SETS.massageGun,
  "pistolet-massage-musculaire-percussif": IMAGE_SETS.massageGunAlt,
  "tapis-yoga-antiderapant-premium-6mm": IMAGE_SETS.yogaMat,
  "corde-a-sauter-numerique-compteur-calories": IMAGE_SETS.jumpRope,
  "bandes-elastiques-resistance-set-5-niveaux": IMAGE_SETS.resistanceBands,
  "foam-roller-massage-recuperation-33cm-vibrant": IMAGE_SETS.foamRoller,
  "gants-de-musculation-antiderapants-avec-poignets": IMAGE_SETS.workoutGloves,
  "montre-connectee-sport-gps": IMAGE_SETS.smartwatch,

  // ── Cuisine
  "blender-portable-usb-600ml": IMAGE_SETS.portableBlender,
  "robot-cuisine-multifonction-compact": IMAGE_SETS.foodProcessor,
  "robot-cuisine-multifonction-1500w-8-en-1": IMAGE_SETS.foodProcessor,
  "coupe-legumes-electrique-12-en-1": IMAGE_SETS.vegetableChopper,
  "pese-aliments-digital-usb": IMAGE_SETS.kitchenScale,
  "trancheuse-oeufs-multifonction-inox": IMAGE_SETS.eggSlicer,
  "friteuse-a-air-chaud-5l-numerique-ecran-tactile": IMAGE_SETS.airFryer,
  "centrifugeuse-a-froid-150w-jus-frais": IMAGE_SETS.juicer,
  "moule-a-gateau-silicone-set-6-pieces-antiadhesif": IMAGE_SETS.cakeMold,

  // ── Tech gadgets
  "ecouteurs-sans-fil-bluetooth-anc-40h-autonomie": IMAGE_SETS.earbuds,
  "ecouteurs-sans-fil-anc-40h": IMAGE_SETS.earbudsAlt,
  "enceinte-bluetooth-portable-waterproof-360-20w": IMAGE_SETS.bluetoothSpeaker,
  "powerbank-20000mah-charge-rapide-usb-c-65w": IMAGE_SETS.powerBank,
  "batterie-externe-solaire-30000mah": IMAGE_SETS.solarPowerBank,
  "hub-usb-c-9-en-1-4k-hdmi-ethernet-sd": IMAGE_SETS.usbCHub,
  "chargeur-sans-fil-3-en-1-iphone-watch-airpods": IMAGE_SETS.wirelessCharger3In1,
  "webcam-full-hd-1080p-microphone-annulation-bruit": IMAGE_SETS.webcam,

  // ── Bureau / productivité
  "lampe-bureau-led-chargeur-qi": IMAGE_SETS.qiDeskLamp,
  "lampe-de-bureau-led-sans-fil-rechargeable": IMAGE_SETS.deskLamp,
  "repose-poignets-ergonomique-tapis-xl": IMAGE_SETS.wristRest,
  "organiseur-cables-magnetique-10": IMAGE_SETS.cableOrganizer,
  "support-ordinateur-portable-reglable-ergonomique": IMAGE_SETS.laptopStand,
  "organisateur-bureau-rotatif-360-bambou": IMAGE_SETS.deskOrganizer,
  "tableau-blanc-magnetique-effacable-60x90cm": IMAGE_SETS.whiteboard,

  // ── Enfant / famille
  "veilleuse-bebe-musicale-projecteur-etoiles": IMAGE_SETS.babyNightLight,
  "veilleuse-bebe-capteur-pleur-berceuse": IMAGE_SETS.babyNightLight,
  "babyphone-video-wifi-5-pouces-infrarouge": IMAGE_SETS.babyMonitor,
  "jeu-construction-magnetique-3d-120-pieces": IMAGE_SETS.magneticBlocks,
  "sac-a-langer-impermeable-multi-compartiments": IMAGE_SETS.diaperBag,
  "pistolet-bulles-electrique-3000": IMAGE_SETS.bubbleGun,

  // ── EN slugs
  "wifi-smart-plug-with-energy-monitor": IMAGE_SETS.smartPlug,
  "car-phone-holder-magnetic-dashboard": IMAGE_SETS.carPhoneHolder,
  "wireless-led-desk-lamp-usb-rechargeable": IMAGE_SETS.deskLamp,
  "20w-waterproof-360-portable-bluetooth-speaker": IMAGE_SETS.bluetoothSpeaker,
  "indoor-wifi-security-camera-360-2k": IMAGE_SETS.securityCamera,
  "compact-air-fryer-2-5l-digital": IMAGE_SETS.airFryer,
  "33cm-vibrating-foam-roller-massage-recovery": IMAGE_SETS.foamRoller,
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
  { pattern: /compresseur.*air|gonfleur|tire.*inflator|air.*compressor/, images: IMAGE_SETS.tireInflator },
  { pattern: /obd2|diagnostic.*voiture|car.*diagnostic|elm327/, images: IMAGE_SETS.obd2Scanner },
  { pattern: /organisateur.*coffre|trunk.*organizer|boot.*organizer/, images: IMAGE_SETS.trunkOrganizer },
  { pattern: /gps.*tracker|traceur.*gps|tracker.*voiture/, images: IMAGE_SETS.gpstracker },
  { pattern: /essuie.*glace|wiper.*blade|balai.*essui/, images: IMAGE_SETS.dashcam },
  { pattern: /thermostat.*connect|smart.*thermostat|programmable.*thermostat/, images: IMAGE_SETS.smartThermostat },
  { pattern: /serrure.*connect|smart.*lock|verrou.*connect|door.*lock/, images: IMAGE_SETS.smartLock },
  { pattern: /purificateur.*air|air.*purifier|hepa.*purifier/, images: IMAGE_SETS.airPurifierHepa },
  { pattern: /sonnette.*video|video.*doorbell|ring.*doorbell/, images: IMAGE_SETS.videoDoorbell },
  { pattern: /multiprise.*connect|smart.*power.*strip/, images: IMAGE_SETS.smartPlug },
  { pattern: /machine.*cafe|coffee.*machine|espresso.*machine|capsule.*coffee/, images: IMAGE_SETS.coffeeMachine },
  { pattern: /bouilloire|electric.*kettle|temperature.*kettle/, images: IMAGE_SETS.electricKettle },
  { pattern: /mixeur.*plongeant|immersion.*blender|hand.*blender/, images: IMAGE_SETS.immersionBlender },
  { pattern: /couteaux|knife.*set|cuisine.*knife|knives/, images: IMAGE_SETS.knifeSet },
  { pattern: /gaufrier|waffle.*maker|croque.*monsieur.*machine/, images: IMAGE_SETS.waffleMaker },
  { pattern: /velo.*appartement|exercise.*bike|stationary.*bike|indoor.*cycle/, images: IMAGE_SETS.exerciseBike },
  { pattern: /tapis.*course|treadmill|tapis.*roulant/, images: IMAGE_SETS.treadmill },
  { pattern: /haltere|dumbbell|poids.*musculation/, images: IMAGE_SETS.dumbbells },
  { pattern: /bain.*pied|foot.*spa|foot.*massager/, images: IMAGE_SETS.footSpa },
  { pattern: /lisseur.*vapeur|steam.*straightener|brosse.*lissante/, images: IMAGE_SETS.hairStraightener },
  { pattern: /tondeuse.*barbe|beard.*trimmer|rasage.*precision/, images: IMAGE_SETS.beardTrimmer },
  { pattern: /miroir.*lumineux|led.*mirror|magnifying.*mirror|grossissant/, images: IMAGE_SETS.magnifyingMirror },
  { pattern: /jade.*roller|rouleau.*jade|gua.*sha/, images: IMAGE_SETS.jadeRoller },
  { pattern: /autobronzant|self.*tanning|bronzant.*spray/, images: IMAGE_SETS.selfTanner },
  { pattern: /stylet|stylus.*ipad|apple.*pencil.*compatible/, images: IMAGE_SETS.iPadStylus },
  { pattern: /ring.*light|lampe.*anneau|selfie.*light|studio.*light/, images: IMAGE_SETS.ringLight },
  { pattern: /mini.*projecteur|portable.*projector|home.*cinema.*projector/, images: IMAGE_SETS.miniProjector },
  { pattern: /bras.*moniteur|monitor.*arm|ecran.*bras/, images: IMAGE_SETS.monitorArm },
  { pattern: /tapis.*bureau.*gaming|gaming.*desk.*pad|desk.*pad/, images: IMAGE_SETS.deskPad },
  { pattern: /reveil.*led|alarm.*clock.*led|horloge.*led/, images: IMAGE_SETS.alarmClock },
  { pattern: /chaise.*bureau.*ergonomique|ergonomic.*chair|office.*chair/, images: IMAGE_SETS.ergonomicChair },
  { pattern: /thermometre.*bebe|baby.*thermometer|frontal.*infrarouge/, images: IMAGE_SETS.babyThermometer },
  { pattern: /trottinette.*enfant|kids.*scooter|enfant.*trottinette/, images: IMAGE_SETS.kidsScooter },
  { pattern: /piscine.*gonflable|inflatable.*pool/, images: IMAGE_SETS.inflatablePool },
  { pattern: /tente.*enfant|kids.*tent|play.*tent|chateau.*tente/, images: IMAGE_SETS.playTent },
  { pattern: /casque.*enfant|kids.*headphone|casque.*volume.*limite/, images: IMAGE_SETS.kidsHeadphones },

  // ── Nouveaux produits
  { pattern: /degivreur|defroster|antigivre|pare.*brise.*chauf/, images: IMAGE_SETS.carDefroster },
  { pattern: /coussin.*siege|seat.*cushion|coussin.*voiture|car.*cushion/, images: IMAGE_SETS.carSeatCushion },
  { pattern: /console.*centrale|center.*console|accoudoir.*organis/, images: IMAGE_SETS.consoleOrganizer },
  { pattern: /testeur.*batterie|battery.*tester|voltmetre.*voiture/, images: IMAGE_SETS.batteryTester },
  { pattern: /guirlande.*led|led.*string|led.*strip.*light|guirlande.*lumineuse/, images: IMAGE_SETS.ledStringLights },
  { pattern: /capteur.*air|air.*quality|qualite.*air|co2.*sensor|moniteur.*air/, images: IMAGE_SETS.airQualitySensor },
  { pattern: /station.*meteo|weather.*station|meteo.*connect/, images: IMAGE_SETS.weatherStation },
  { pattern: /robinet.*led|led.*faucet|robinet.*tactile|waterfall.*faucet/, images: IMAGE_SETS.ledFaucet },
  { pattern: /machine.*pates|pasta.*machine|pasta.*maker/, images: IMAGE_SETS.pastaMachine },
  { pattern: /grille.*pain|toaster|toast.*machine/, images: IMAGE_SETS.toaster },
  { pattern: /thermometre.*cuisson|meat.*thermometer|bbq.*thermometer|sonde.*cuisson/, images: IMAGE_SETS.meatThermometer },
  { pattern: /planche.*bambou|cutting.*board.*bamboo|bamboo.*board/, images: IMAGE_SETS.cuttingBoard },
  { pattern: /battle.*rope|corde.*traction|combat.*rope/, images: IMAGE_SETS.battleRope },
  { pattern: /barre.*traction|pull.*up.*bar|barre.*porte/, images: IMAGE_SETS.pullUpBar },
  { pattern: /gants.*boxe|boxing.*gloves|gants.*kick|gant.*muay/, images: IMAGE_SETS.boxingGloves },
  { pattern: /masque.*sommeil|sleep.*mask|masque.*nuit|eye.*mask/, images: IMAGE_SETS.sleepMask },
  { pattern: /carnet.*numerique|smart.*notebook|digital.*notebook|rocketbook/, images: IMAGE_SETS.digitalNotebook },
  { pattern: /gimbal|stabilisateur.*smartphone|stabilizer.*camera/, images: IMAGE_SETS.gimbal },
  { pattern: /repose.*pied|footrest|appui.*pied.*bureau/, images: IMAGE_SETS.footrest },
  { pattern: /piano.*enfant|electronic.*piano.*kid|clavier.*enfant|keyboard.*kids/, images: IMAGE_SETS.pianokids },
  { pattern: /microscope.*enfant|kids.*microscope|microscope.*educatif/, images: IMAGE_SETS.microscopeKids },
  { pattern: /sac.*gps.*enfant|gps.*backpack.*kid|sac.*dos.*tracker/, images: IMAGE_SETS.kidsGpsBackpack },
  { pattern: /walkie.*talkie|talkie.*walkie|radio.*enfant|radio.*bidirect/, images: IMAGE_SETS.walkieTalkie },
  { pattern: /tablette.*dessin.*lumineuse|light.*drawing.*tablet|lightboard.*enfant/, images: IMAGE_SETS.lightDrawingTablet },
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
