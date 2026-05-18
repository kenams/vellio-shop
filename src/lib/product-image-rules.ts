export interface ProductImageInput {
  slug?: string | null;
  name?: string | null;
  categorySlug?: string | null;
  photoKeyword?: string | null;
}

function unsplash(id: string, crop = "entropy"): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80&crop=${crop}`;
}

function commons(url: string): string {
  return url.replace(/\?utm_.+$/, "");
}

function unique(urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))].slice(0, 3);
}

const WIKI = {
  robotMopping: unsplash("1583847268964-b28dc8f51f92"),
  robotVacuumTall: unsplash("1679678691170-7781f11f9d86"),
  smartPlug: unsplash("1558618666-fcd25c85cd64"),
  smartPlugWemo: unsplash("1484101403633-562f891dc89a"),
  backupCamera: unsplash("1511919884226-fd3cad34687c"),
  backupDisplay: unsplash("1558981806-ec527fa84c39"),
  kitchenScale: unsplash("1495474472287-4d71bcdd2085"),
  kitchenScaleDevice: unsplash("1585515320310-259814833e62"),
  deskLamp: unsplash("1526378800651-8438701bb3ff"),
  wristRest: unsplash("1484981138541-3d074aa97716"),
  bubbleGun: unsplash("1596461404969-9ae70f2830c1"),
  eggSlicer: unsplash("1495474472287-4d71bcdd2085"),
  eggSlicerOpen: unsplash("1556909114-f6e7ad7d3136"),
};

// ─────────────────────────────────────────────────────────────
// IMAGE SETS — pools thématiques réutilisés par les RULES
// ─────────────────────────────────────────────────────────────
const IMAGE_SETS = {
  // ── Robot aspirateurs
  robotVacuumMapping: [
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1679678691170-7781f11f9d86"),
    WIKI.robotMopping,
  ],
  robotVacuumSlim: [
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1583847268964-b28dc8f51f92"),
    WIKI.robotVacuumTall,
  ],
  robotVacuumMop: [
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1679678691170-7781f11f9d86"),
    unsplash("1583847268964-b28dc8f51f92"),
  ],

  // ── Smart home
  smartPlug: [
    WIKI.smartPlug,
    WIKI.smartPlugWemo,
    unsplash("1556761175-b413da4baf72"),
  ],
  smartBulb: [
    unsplash("1550985616-10810253b84d"),
    unsplash("1565814636199-ae8133055c1c"),
    unsplash("1558618666-fcd25c85cd64"),
  ],
  diffuser: [
    unsplash("1600857062241-98e5dba7f5bf"),
    unsplash("1527359443443-84a48aec73d2"),
    unsplash("1584473457406-6240486418e9"),
  ],
  securityCamera: [
    unsplash("1557597774-9d273605dfa9"),
    unsplash("1580121441575-41bcb5c6b47c"),
    unsplash("1544428571-6051a61f0756"),
  ],
  starProjector: [
    unsplash("1534796636912-3b95b3ab5986"),
    unsplash("1580121441575-41bcb5c6b47c"),
    unsplash("1565814636199-ae8133055c1c"),
  ],

  // ── Gadgets voiture
  backupCamera: [
    WIKI.backupCamera,
    WIKI.backupDisplay,
    unsplash("1494976388531-d1058494cdd8"),
  ],
  carPhoneHolder: [
    unsplash("1511919884226-fd3cad34687c"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  carCharger: [
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1511919884226-fd3cad34687c"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  carVacuum: [
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1511919884226-fd3cad34687c"),
  ],
  carOrganizer: [
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1511919884226-fd3cad34687c"),
  ],
  dashcam: [
    unsplash("1511919884226-fd3cad34687c"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  airPurifierCar: [
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1511919884226-fd3cad34687c"),
    unsplash("1558981806-ec527fa84c39"),
  ],

  // ── Beauté
  faceMassager: [
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1617897903246-719242758050"),
    unsplash("1549045783-5f2d8e8dff74"),
  ],
  facialCleanser: [
    unsplash("1599305090598-fe179d501227"),
    unsplash("1487412947147-5cebf100ffc2"),
    unsplash("1616394584738-fc6e612e71b9"),
  ],
  ledFaceMask: [
    unsplash("1616394584738-fc6e612e71b9"),
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1617897903246-719242758050"),
  ],
  hairStraightener: [
    unsplash("1487412947147-5cebf100ffc2"),
    unsplash("1526045612212-70caf35c14df"),
    unsplash("1522337360801-4f88e7a9e4d0"),
  ],
  hairDryer: [
    unsplash("1487412947147-5cebf100ffc2"),
    unsplash("1617897903246-719242758050"),
    unsplash("1596462502278-27bfdc403348"),
  ],
  epilator: [
    unsplash("1549045783-5f2d8e8dff74"),
    unsplash("1616394584738-fc6e612e71b9"),
    unsplash("1599305090598-fe179d501227"),
  ],
  serum: [
    unsplash("1614790133872-46bc31b89e3b"),
    unsplash("1570172619644-dfd03ed5d881"),
    unsplash("1599305090598-fe179d501227"),
  ],

  // ── Sport
  massageGun: [
    unsplash("1612444080611-5ed7532d4c2f"),
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1534438327276-14e5300c3a48"),
  ],
  massageGunAlt: [
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1612444080611-5ed7532d4c2f"),
    unsplash("1549060279-7e168fcee0c2"),
  ],
  yogaMat: [
    unsplash("1544367567-0f2fcb009e0b"),
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1593812816-2b4b307c6cb0"),
  ],
  jumpRope: [
    unsplash("1549060279-7e168fcee0c2"),
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1534438327276-14e5300c3a48"),
  ],
  resistanceBands: [
    unsplash("1584735935682-2f2b69dff9d2"),
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1549060279-7e168fcee0c2"),
  ],
  foamRoller: [
    unsplash("1517836357463-d25dfeac3438"),
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1534438327276-14e5300c3a48"),
  ],
  workoutGloves: [
    unsplash("1583454110551-21f2fa2afe61"),
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1549060279-7e168fcee0c2"),
  ],
  smartwatch: [
    unsplash("1544117519-31a4b719223d"),
    unsplash("1523275335684-37898b6baf30"),
    unsplash("1508685096489-7aacd43bd3b1"),
  ],

  // ── Cuisine
  airFryer: [
    unsplash("1606787364406-a3cdf06c6d0c"),
    unsplash("1585515320310-259814833e62"),
    unsplash("1556909114-f6e7ad7d3136"),
  ],
  foodProcessor: [
    unsplash("1585515320310-259814833e62"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1495521821757-a1efb6729352"),
  ],
  portableBlender: [
    unsplash("1622597467836-f3e6dac3e61c"),
    unsplash("1612544448445-b8232cff3b6c"),
    unsplash("1571167366136-d6ab7af63580"),
  ],
  vegetableChopper: [
    unsplash("1553484771-371a816b2772"),
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1581299894007-aaa50297cf16"),
  ],
  kitchenScale: [WIKI.kitchenScale, WIKI.kitchenScaleDevice, unsplash("1495521821757-a1efb6729352")],
  eggSlicer: [WIKI.eggSlicer, WIKI.eggSlicerOpen, unsplash("1495521821757-a1efb6729352")],
  juicer: [
    unsplash("1622597467836-f3e6dac3e61c"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1571167366136-d6ab7af63580"),
  ],
  cakeMold: [
    unsplash("1490645935967-10de6ba17061"),
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1556909114-f6e7ad7d3136"),
  ],

  // ── Tech gadgets
  earbuds: [
    unsplash("1590658165737-15a047b7c97e"),
    unsplash("1505740420928-5e560c06d30e"),
    unsplash("1583394838336-acd977736f90"),
  ],
  earbudsAlt: [
    unsplash("1583394838336-acd977736f90"),
    unsplash("1590658165737-15a047b7c97e"),
    unsplash("1505740420928-5e560c06d30e"),
  ],
  bluetoothSpeaker: [
    unsplash("1608043152269-423dbba4e7e1"),
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1512446816042-444d641267d4"),
  ],
  powerBank: [
    unsplash("1609091839311-d5365f9ff1c5"),
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  solarPowerBank: [
    unsplash("1609091839311-d5365f9ff1c5"),
    unsplash("1592833159155-c62df1b65634"),
    unsplash("1593642632559-0c6d3fc62b89"),
  ],
  webcam: [
    unsplash("1526378800651-8438701bb3ff"),
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  usbCHub: [
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  wirelessCharger3In1: [
    unsplash("1609091839311-d5365f9ff1c5"),
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1526378800651-8438701bb3ff"),
  ],

  // ── Bureau
  deskLamp: [
    WIKI.deskLamp,
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  qiDeskLamp: [
    unsplash("1593642632523-1d60af4b3029"),
    WIKI.deskLamp,
    unsplash("1519389950473-47ba0277781c"),
  ],
  wristRest: [
    WIKI.wristRest,
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  cableOrganizer: [
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  laptopStand: [
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  deskOrganizer: [
    unsplash("1484981138541-3d074aa97716"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1593642632523-1d60af4b3029"),
  ],
  whiteboard: [
    unsplash("1588196749597-9ff075ee6b5b"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1484981138541-3d074aa97716"),
  ],

  // ── Enfant / famille
  babyNightLight: [
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1587654780291-39c9404d746b"),
  ],
  babyMonitor: [
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1587654780291-39c9404d746b"),
  ],
  bubbleGun: [WIKI.bubbleGun, unsplash("1503454537195-1dcabb73ffb9"), unsplash("1566140967404-b8b3932483f5")],
  magneticBlocks: [
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
  ],
  diaperBag: [
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
  ],
  tireInflator: [
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1511919884226-fd3cad34687c"),
  ],
  obd2Scanner: [
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1511919884226-fd3cad34687c"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  trunkOrganizer: [
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1511919884226-fd3cad34687c"),
  ],
  gpstracker: [
    unsplash("1557597774-9d273605dfa9"),
    unsplash("1544428571-6051a61f0756"),
    unsplash("1580121441575-41bcb5c6b47c"),
  ],
  smartThermostat: [
    unsplash("1556761175-b413da4baf72"),
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1484101403633-562f891dc89a"),
  ],
  smartLock: [
    unsplash("1558618147-6d2a5a96d6a1"),
    unsplash("1556761175-b413da4baf72"),
    unsplash("1484101403633-562f891dc89a"),
  ],
  airPurifierHepa: [
    unsplash("1600857062241-98e5dba7f5bf"),
    unsplash("1527359443443-84a48aec73d2"),
    unsplash("1558618666-fcd25c85cd64"),
  ],
  videoDoorbell: [
    unsplash("1484507523-c64b8f7be5a4"),
    unsplash("1557597774-9d273605dfa9"),
    unsplash("1556761175-b413da4baf72"),
  ],
  coffeeMachine: [
    unsplash("1495474472287-4d71bcdd2085"),
    unsplash("1514432574-6f6c1f8f7e70"),
    unsplash("1509042239860-f550ce710b93"),
  ],
  electricKettle: [
    unsplash("1595434971317-85a51f823e8b"),
    unsplash("1495474472287-4d71bcdd2085"),
    unsplash("1556909114-f6e7ad7d3136"),
  ],
  immersionBlender: [
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1585515320310-259814833e62"),
    unsplash("1495521821757-a1efb6729352"),
  ],
  knifeSet: [
    unsplash("1592861956271-f1a7e8daa3b1"),
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1556909114-f6e7ad7d3136"),
  ],
  waffleMaker: [
    unsplash("1585515320310-259814833e62"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1495521821757-a1efb6729352"),
  ],
  exerciseBike: [
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1552674605-db6ffd4facb5"),
  ],
  treadmill: [
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1552674605-db6ffd4facb5"),
  ],
  dumbbells: [
    unsplash("1583454110551-21f2fa2afe61"),
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1571019613454-1cb2f99b2d8b"),
  ],
  footSpa: [
    unsplash("1583854516502-8b3b59c4e682"),
    unsplash("1587854692152-cbe660dbde88"),
    unsplash("1549045783-5f2d8e8dff74"),
  ],
  beardTrimmer: [
    unsplash("1503951914875-452162b0f3f1"),
    unsplash("1517941823-815bea90d291"),
    unsplash("1576091160550-2173dba999ef"),
  ],
  magnifyingMirror: [
    unsplash("1587854692152-cbe660dbde88"),
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1617897903246-719242758050"),
  ],
  jadeRoller: [
    unsplash("1614790133872-46bc31b89e3b"),
    unsplash("1570172619644-dfd03ed5d881"),
    unsplash("1596462502278-27bfdc403348"),
  ],
  selfTanner: [
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1617897903246-719242758050"),
    unsplash("1549045783-5f2d8e8dff74"),
  ],
  iPadStylus: [
    unsplash("1561154464-062d233de9f9"),
    unsplash("1526378800651-8438701bb3ff"),
    unsplash("1593642632523-1d60af4b3029"),
  ],
  ringLight: [
    unsplash("1561154464-062d233de9f9"),
    unsplash("1526378800651-8438701bb3ff"),
    unsplash("1574715144611-609f29192975"),
  ],
  miniProjector: [
    unsplash("1574715144611-609f29192975", "top"),
    unsplash("1578662996442-48f60103fc96"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  monitorArm: [
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1484981138541-3d074aa97716"),
  ],
  deskPad: [
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1484981138541-3d074aa97716"),
  ],
  alarmClock: [
    unsplash("1508847154043-be5407e5f6b1"),
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1484981138541-3d074aa97716"),
  ],
  ergonomicChair: [
    unsplash("1579389083046-e3df9c2b3325"),
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  babyThermometer: [
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1503454537195-1dcabb73ffb9"),
  ],
  kidsScooter: [
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  inflatablePool: [
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  playTent: [
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1596461404969-9ae70f2830c1"),
  ],
  kidsHeadphones: [
    unsplash("1590658165737-15a047b7c97e"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
  ],
  carDefroster: [
    unsplash("1520031338-f1bcb2c8fef2"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  carSeatCushion: [
    unsplash("1541443131174-557a49d97df5"),
    unsplash("1511919884226-fd3cad34687c"),
    unsplash("1494976388531-d1058494cdd8"),
  ],
  consoleOrganizer: [
    unsplash("1549924231-8263a751ab4a"),
    unsplash("1503376780353-7e6692767b70"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  batteryTester: [
    unsplash("1583254577374-c39b609e2e98"),
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1511919884226-fd3cad34687c"),
  ],
  ledStringLights: [
    unsplash("1556761175-b413da4baf72"),
    unsplash("1526170347566-59ef37c85c32"),
    unsplash("1484101403633-562f891dc89a"),
  ],
  airQualitySensor: [
    unsplash("1600857062241-98e5dba7f5bf"),
    unsplash("1527359443443-84a48aec73d2"),
    unsplash("1558618666-fcd25c85cd64"),
  ],
  weatherStation: [
    unsplash("1556761175-b413da4baf72"),
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1484101403633-562f891dc89a"),
  ],
  ledFaucet: [
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1585515320310-259814833e62"),
  ],
  pastaMachine: [
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1585515320310-259814833e62"),
  ],
  toaster: [
    unsplash("1495474472287-4d71bcdd2085"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1585515320310-259814833e62"),
  ],
  meatThermometer: [
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1585515320310-259814833e62"),
  ],
  cuttingBoard: [
    unsplash("1492545082-22644ab456eb"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1495521821757-a1efb6729352"),
  ],
  battleRope: [
    unsplash("1576678927484-cc907957088c"),
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1571019613454-1cb2f99b2d8b"),
  ],
  pullUpBar: [
    unsplash("1571902943202-507ec2618e8f"),
    unsplash("1583454110551-21f2fa2afe61"),
    unsplash("1534438327276-14e5300c3a48"),
  ],
  boxingGloves: [
    unsplash("1583454110551-21f2fa2afe61"),
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1571019613454-1cb2f99b2d8b"),
  ],
  sleepMask: [
    unsplash("1587854692152-cbe660dbde88"),
    unsplash("1549045783-5f2d8e8dff74"),
    unsplash("1596462502278-27bfdc403348"),
  ],
  digitalNotebook: [
    unsplash("1561154464-062d233de9f9"),
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  gimbal: [
    unsplash("1574715144611-609f29192975"),
    unsplash("1526378800651-8438701bb3ff"),
    unsplash("1561154464-062d233de9f9"),
  ],
  footrest: [
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1484981138541-3d074aa97716"),
  ],
  pianokids: [
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
  ],
  microscopeKids: [
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  kidsGpsBackpack: [
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  walkieTalkie: [
    unsplash("1557597774-9d273605dfa9"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  lightDrawingTablet: [
    unsplash("1561154464-062d233de9f9"),
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1503454537195-1dcabb73ffb9"),
  ],
  elliptical: [
    unsplash("1571019614099-8c8f44f90b3c"),
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1552674605-db6ffd4facb5"),
  ],
  magneticBike: [
    unsplash("1571902943202-507ec2618e8f"),
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1571019613454-1cb2f99b2d8b"),
  ],
  usbFlashDrive: [
    unsplash("1518770660439-4636190af475"),
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  magneticCable: [
    unsplash("1601972418-e44573d39aa5"),
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  // Lampes bureau variantes (7 variantes avec IDs différents)
  deskLampV1: [
    WIKI.deskLamp,
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1579389083046-e3df9c2b3325"),
  ],
  deskLampV2: [
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1484981138541-3d074aa97716"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  deskLampV3: [
    unsplash("1484981138541-3d074aa97716"),
    WIKI.deskLamp,
    unsplash("1593642632523-1d60af4b3029"),
  ],
  deskLampV4: [
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1593642632523-1d60af4b3029"),
    WIKI.deskLamp,
  ],
  deskLampV5: [
    unsplash("1579389083046-e3df9c2b3325"),
    unsplash("1484981138541-3d074aa97716"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  // Chaises bureau variantes (3)
  ergonomicChairV2: [
    unsplash("1579389083046-e3df9c2b3325"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1593642632523-1d60af4b3029"),
  ],
  ergonomicChairV3: [
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1579389083046-e3df9c2b3325"),
    unsplash("1484981138541-3d074aa97716"),
  ],
  // Bras moniteur variantes (2)
  monitorArmV2: [
    unsplash("1484981138541-3d074aa97716"),
    unsplash("1593642632523-1d60af4b3029"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  // Gaming desk pad variantes (2)
  deskPadV2: [
    unsplash("1484981138541-3d074aa97716"),
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1593642632559-0c6d3fc62b89"),
  ],
  // Smartwatch variantes
  smartwatchV2: [
    unsplash("1523275335684-37898b6baf30"),
    unsplash("1544117519-31a4b719223d"),
    unsplash("1508685096489-7aacd43bd3b1"),
  ],
  smartwatchV3: [
    unsplash("1508685096489-7aacd43bd3b1"),
    unsplash("1544117519-31a4b719223d"),
    unsplash("1523275335684-37898b6baf30"),
  ],
  smartwatchV4: [
    unsplash("1571902943202-507ec2618e8f"),
    unsplash("1544117519-31a4b719223d"),
    unsplash("1523275335684-37898b6baf30"),
  ],
  // Massage gun variantes
  massageGunV3: [
    unsplash("1534438327276-14e5300c3a48"),
    unsplash("1612444080611-5ed7532d4c2f"),
    unsplash("1571019613454-1cb2f99b2d8b"),
  ],
  // Foam roller variantes
  foamRollerV2: [
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1517836357463-d25dfeac3438"),
    unsplash("1549060279-7e168fcee0c2"),
  ],
  // Resistance bands variantes
  resistanceBandsV2: [
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1584735935682-2f2b69dff9d2"),
    unsplash("1534438327276-14e5300c3a48"),
  ],
  // Tapis de course variantes
  treadmillV2: [
    unsplash("1552674605-db6ffd4facb5"),
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1534438327276-14e5300c3a48"),
  ],
  // Dumbbells variantes
  dumbbellsV2: [
    unsplash("1571019613454-1cb2f99b2d8b"),
    unsplash("1583454110551-21f2fa2afe61"),
    unsplash("1552674605-db6ffd4facb5"),
  ],
  // Écouteurs ANC variantes
  earbudsANC2: [
    unsplash("1505740420928-5e560c06d30e"),
    unsplash("1583394838336-acd977736f90"),
    unsplash("1590658165737-15a047b7c97e"),
  ],
  // Enceinte bluetooth variante EN
  bluetoothSpeakerEN: [
    unsplash("1512446816042-444d641267d4"),
    unsplash("1608043152269-423dbba4e7e1"),
    unsplash("1558618666-fcd25c85cd64"),
  ],
  // Webcam variante 2
  webcamV2: [
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1526378800651-8438701bb3ff"),
    unsplash("1593642632523-1d60af4b3029"),
  ],
  // Hub USB-C variante 2
  usbCHubV2: [
    unsplash("1519389950473-47ba0277781c"),
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1518770660439-4636190af475"),
  ],
  // Stylus iPad variante 2
  iPadStylusV2: [
    unsplash("1526378800651-8438701bb3ff"),
    unsplash("1561154464-062d233de9f9"),
    unsplash("1593642632523-1d60af4b3029"),
  ],
  // Jade roller variante 2
  jadeRollerV2: [
    unsplash("1570172619644-dfd03ed5d881"),
    unsplash("1614790133872-46bc31b89e3b"),
    unsplash("1599305090598-fe179d501227"),
  ],
  // Face massager variantes
  faceMassagerV2: [
    unsplash("1617897903246-719242758050"),
    unsplash("1549045783-5f2d8e8dff74"),
    unsplash("1596462502278-27bfdc403348"),
  ],
  faceMassagerV3: [
    unsplash("1549045783-5f2d8e8dff74"),
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1614790133872-46bc31b89e3b"),
  ],
  // Facial cleanser variantes
  facialCleanserV2: [
    unsplash("1487412947147-5cebf100ffc2"),
    unsplash("1616394584738-fc6e612e71b9"),
    unsplash("1570172619644-dfd03ed5d881"),
  ],
  facialCleanserV3: [
    unsplash("1616394584738-fc6e612e71b9"),
    unsplash("1599305090598-fe179d501227"),
    unsplash("1487412947147-5cebf100ffc2"),
  ],
  // LED face mask variante 2
  ledFaceMaskV2: [
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1614790133872-46bc31b89e3b"),
    unsplash("1616394584738-fc6e612e71b9"),
  ],
  // Self tanner variante 2
  selfTannerV2: [
    unsplash("1617897903246-719242758050"),
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1522337360826-9d459de31f3b"),
  ],
  // Hair dryer variante
  hairDryerV2: [
    unsplash("1596462502278-27bfdc403348"),
    unsplash("1522337360826-9d459de31f3b"),
    unsplash("1487412947147-5cebf100ffc2"),
  ],
  // Baby monitor variantes
  babyMonitorV2: [
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1503454537195-1dcabb73ffb9"),
  ],
  babyMonitorV3: [
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1566140967404-b8b3932483f5"),
  ],
  // Veilleuse bébé variantes
  babyNightLightV2: [
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1566140967404-b8b3932483f5"),
  ],
  babyNightLightV3: [
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1596461404969-9ae70f2830c1"),
  ],
  // Jouets éducatifs variantes
  educationalToyV2: [
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  educationalToyV3: [
    unsplash("1547347298-4074fc3086f0"),
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1503454537195-1dcabb73ffb9"),
  ],
  // Tente variante 2
  playTentV2: [
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  // Serrure connectée variante 2
  smartLockV2: [
    unsplash("1586375300773-8384279e4bcd"),
    unsplash("1484101403633-562f891dc89a"),
    unsplash("1556761175-b413da4baf72"),
  ],
  // Robot cuiseur variantes
  foodProcessorV2: [
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1495474472287-4d71bcdd2085"),
    unsplash("1585515320310-259814833e62"),
  ],
  foodProcessorV3: [
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1585515320310-259814833e62"),
    unsplash("1553484771-371a816b2772"),
  ],
  foodProcessorV4: [
    unsplash("1464454709131-ffd692591ee5"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1495521821757-a1efb6729352"),
  ],
  foodProcessorV5: [
    unsplash("1490645935967-10de6ba17061"),
    unsplash("1585515320310-259814833e62"),
    unsplash("1495474472287-4d71bcdd2085"),
  ],
  // Air fryer variante 2
  airFryerV2: [
    unsplash("1585515320310-259814833e62"),
    unsplash("1495474472287-4d71bcdd2085"),
    unsplash("1606787364406-a3cdf06c6d0c"),
  ],
  // Juicer variantes
  juicerV2: [
    unsplash("1571167366136-d6ab7af63580"),
    unsplash("1622597467836-f3e6dac3e61c"),
    unsplash("1495521821757-a1efb6729352"),
  ],
  juicerV3: [
    unsplash("1553484771-371a816b2772"),
    unsplash("1622597467836-f3e6dac3e61c"),
    unsplash("1556909114-f6e7ad7d3136"),
  ],
  juicerV4: [
    unsplash("1464454709131-ffd692591ee5"),
    unsplash("1571167366136-d6ab7af63580"),
    unsplash("1495521821757-a1efb6729352"),
  ],
  // Couteaux variante 2
  knifeSetV2: [
    unsplash("1557301747-31994abf4ee8"),
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1464454709131-ffd692591ee5"),
  ],
  // Mixeur plongeant variante 2
  immersionBlenderV2: [
    unsplash("1585515320310-259814833e62"),
    unsplash("1622597467836-f3e6dac3e61c"),
    unsplash("1556909114-f6e7ad7d3136"),
  ],
  // Machine à pâtes variante 2
  pastaMachineV2: [
    unsplash("1464454709131-ffd692591ee5"),
    unsplash("1495521821757-a1efb6729352"),
    unsplash("1492545082-22644ab456eb"),
  ],
  // Bouilloire variante 2
  electricKettleV2: [
    unsplash("1556909114-f6e7ad7d3136"),
    unsplash("1595434971317-85a51f823e8b"),
    unsplash("1495474472287-4d71bcdd2085"),
  ],
  // Camera recul variante 2
  backupCameraV2: [
    unsplash("1503376780353-7e6692767b70"),
    WIKI.backupCamera,
    unsplash("1494976388531-d1058494cdd8"),
  ],
  // Support téléphone magnétique variante
  carPhoneHolderV2: [
    unsplash("1568605116-4e46de4e5fd7"),
    unsplash("1511919884226-fd3cad34687c"),
    unsplash("1494976388531-d1058494cdd8"),
  ],
  carPhoneHolderV3: [
    unsplash("1565849904461-e3eb83bfb4d0"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  // Chargeur voiture variantes
  carChargerV2: [
    unsplash("1503376780353-7e6692767b70"),
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1511919884226-fd3cad34687c"),
  ],
  // GPS tracker voiture variantes
  gpstrackerV2: [
    unsplash("1544620218-2b31e7c76c92"),
    unsplash("1557597774-9d273605dfa9"),
    unsplash("1544428571-6051a61f0756"),
  ],
  // Aspirateur voiture variante 2
  carVacuumV2: [
    unsplash("1571939838871-f61e7b19aa93"),
    unsplash("1494976388531-d1058494cdd8"),
    unsplash("1558981806-ec527fa84c39"),
  ],
  // Compresseur air variante
  tireInflatorV2: [
    unsplash("1544620218-2b31e7c76c92"),
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1494976388531-d1058494cdd8"),
  ],
};

// ─────────────────────────────────────────────────────────────
// SLUG_IMAGES — mapping exhaustif slug → images uniques
// ─────────────────────────────────────────────────────────────
const SLUG_IMAGES: Record<string, string[]> = {

  // ════════════════════════════════
  // AUTO (26 produits)
  // ════════════════════════════════
  "15w-fast-wireless-car-charger": IMAGE_SETS.wirelessCharger3In1,
  "4g-gps-tracker-magnetic-car-alarm": IMAGE_SETS.gpstrackerV2,
  "alarme-voiture-gps-tracker-4g-magnetique": IMAGE_SETS.gpstracker,
  "aspirateur-voiture-portable-12v-6000pa": IMAGE_SETS.carVacuumV2,
  "back-seat-car-organizer-multi-pocket": [unsplash("1511919884226-fd3cad34687c"), unsplash("1494976388531-d1058494cdd8"), unsplash("1503376780353-7e6692767b70")],
  "camera-route-horizon-170": IMAGE_SETS.dashcam,
  "camera-de-recul-sans-fil-hd-150-etanche": IMAGE_SETS.backupCamera,
  "camera-de-recul-sans-fil-hd-1080p": IMAGE_SETS.backupCameraV2,
  "car-phone-holder-magnetic-dashboard": IMAGE_SETS.carPhoneHolder,
  "chargeur-voiture-sans-fil-15w-charge-rapide": IMAGE_SETS.carCharger,
  "chargeur-voiture-gan-65w-usb-c-usb-a": IMAGE_SETS.carChargerV2,
  "compresseur-air-portable-numerique-150-psi-usb-c": IMAGE_SETS.tireInflatorV2,
  "coussin-siege-voiture-memoire-de-forme-coccyx": IMAGE_SETS.carSeatCushion,
  "cable-obd2-bluetooth-diagnostic-moteur-elm327": IMAGE_SETS.obd2Scanner,
  "degivreur-pare-brise-electrique-12v-300w": IMAGE_SETS.carDefroster,
  "foldable-waterproof-car-trunk-organizer": IMAGE_SETS.trunkOrganizer,
  "magnetic-car-phone-holder-360-rotation": IMAGE_SETS.carPhoneHolderV2,
  "memory-foam-car-seat-cushion-coccyx-orthopedic": [
    unsplash("1541443131174-557a49d97df5"),
    unsplash("1549924231-8263a751ab4a"),
    unsplash("1511919884226-fd3cad34687c"),
  ],
  "organisateur-coffre-voiture-pliable-impermeable": [
    unsplash("1503376780353-7e6692767b70"),
    unsplash("1558981806-ec527fa84c39"),
    unsplash("1494976388531-d1058494cdd8"),
  ],
  "organisateur-console-centrale-accoudoir-premium": IMAGE_SETS.consoleOrganizer,
  "organisateur-siege-arriere-voiture-multipoches": IMAGE_SETS.carOrganizer,
  "portable-car-vacuum-cleaner-12v-6000pa": IMAGE_SETS.carVacuum,
  "purificateur-d-air-voiture-hepa-ioniseur": IMAGE_SETS.airPurifierCar,
  "support-telephone-voiture-magnetique": IMAGE_SETS.carPhoneHolder,
  "support-telephone-voiture-magnetique-360": IMAGE_SETS.carPhoneHolderV3,
  "testeur-batterie-voiture-digital-12-24v-professionnel": IMAGE_SETS.batteryTester,

  // ════════════════════════════════
  // MAISON CONNECTÉE (31 produits)
  // ════════════════════════════════
  "aspirateur-robot-ultra-plat-wifi": IMAGE_SETS.robotVacuumSlim,
  "robot-aspirateur-cartographie-laser-2700pa": IMAGE_SETS.robotVacuumMapping,
  "robot-aspirateur-laveur-programmable": IMAGE_SETS.robotVacuumMop,
  "prise-connectee-wifi-consommation": IMAGE_SETS.smartPlug,
  "prise-connectee-wifi-compteur-d-energie": [
    unsplash("1484101403633-562f891dc89a"),
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1556761175-b413da4baf72"),
  ],
  "wifi-smart-plug-with-energy-monitor": [
    unsplash("1556761175-b413da4baf72"),
    unsplash("1558618666-fcd25c85cd64"),
    unsplash("1484101403633-562f891dc89a"),
  ],
  "camera-surveillance-interieure-wifi-360-2k": IMAGE_SETS.securityCamera,
  "indoor-wifi-security-camera-360-2k": [
    unsplash("1580121441575-41bcb5c6b47c"),
    unsplash("1557597774-9d273605dfa9"),
    unsplash("1544428571-6051a61f0756"),
  ],
  "projecteur-led-etoiles-aurores-boreales": IMAGE_SETS.starProjector,
  "diffuseur-huiles-essentielles-ultrason-500ml": IMAGE_SETS.diffuser,
  "500ml-ultrasonic-essential-oil-diffuser": [
    unsplash("1527359443443-84a48aec73d2"),
    unsplash("1600857062241-98e5dba7f5bf"),
    unsplash("1584473457406-6240486418e9"),
  ],
  "ampoule-led-connectee-wifi-rgb-e27-10w": IMAGE_SETS.smartBulb,
  "serrure-connectee-bluetooth-code-fingerprint-sans-cle": IMAGE_SETS.smartLock,
  "serrure-connectee-empreinte-digitale-code-wifi": IMAGE_SETS.smartLockV2,
  "thermostat-connecte-programmable-wifi": IMAGE_SETS.smartThermostat,
  "sonnette-video-wifi-hd-detection-mouvement": IMAGE_SETS.videoDoorbell,
  "purificateur-air-hepa-h13-wifi-silencieux": IMAGE_SETS.airPurifierHepa,
  "guirlande-led-intelligente-wifi-16m-multicolore": IMAGE_SETS.ledStringLights,
  "guirlande-led-connectee-twinkly-20m": [
    unsplash("1526170347566-59ef37c85c32"),
    unsplash("1556761175-b413da4baf72"),
    unsplash("1484101403633-562f891dc89a"),
  ],
  "multiprise-connectee-wifi-4-prises-4-usb": [
    WIKI.smartPlugWemo,
    unsplash("1556761175-b413da4baf72"),
    WIKI.smartPlug,
  ],
  "multiprise-intelligente-6-prises-wifi-surveillance": [
    unsplash("1556761175-b413da4baf72"),
    WIKI.smartPlug,
    unsplash("1484101403633-562f891dc89a"),
  ],
  "capteur-qualite-air-interieur-co2-pm2-5": IMAGE_SETS.airQualitySensor,
  "station-meteo-connectee-ecran-couleur": IMAGE_SETS.weatherStation,
  "veilleuse-bebe-musicale-projecteur-etoiles": IMAGE_SETS.babyNightLight,
  "veilleuse-bebe-capteur-pleur-berceuse": IMAGE_SETS.babyNightLightV2,
  "veilleuse-bebe-tactile-rgb-minuterie": IMAGE_SETS.babyNightLightV3,
  "babyphone-video-wifi-5-pouces-infrarouge": [unsplash("1566140967404-b8b3932483f5"), unsplash("1596461404969-9ae70f2830c1"), unsplash("1587654780291-39c9404d746b")],
  "babyphone-video-wifi-hd-panoramique": IMAGE_SETS.babyMonitorV2,
  "babyphone-camera-360-detection-mouvement": IMAGE_SETS.babyMonitorV3,

  // ════════════════════════════════
  // TECH / ÉLECTRONIQUE (25 produits)
  // ════════════════════════════════
  "ecouteurs-sans-fil-bluetooth-anc-40h-autonomie": IMAGE_SETS.earbuds,
  "ecouteurs-sans-fil-anc-40h": IMAGE_SETS.earbudsAlt,
  "ecouteurs-tws-anc-pro-50h-charge-rapide": IMAGE_SETS.earbudsANC2,
  "enceinte-bluetooth-portable-waterproof-360-20w": IMAGE_SETS.bluetoothSpeaker,
  "20w-waterproof-360-portable-bluetooth-speaker": IMAGE_SETS.bluetoothSpeakerEN,
  "powerbank-20000mah-charge-rapide-usb-c-65w": IMAGE_SETS.powerBank,
  "batterie-externe-solaire-30000mah": IMAGE_SETS.solarPowerBank,
  "chargeur-sans-fil-3-en-1-iphone-watch-airpods": IMAGE_SETS.wirelessCharger3In1,
  "hub-usb-c-9-en-1-4k-hdmi-ethernet-sd": IMAGE_SETS.usbCHub,
  "hub-usb-c-12-en-1-dual-hdmi-ethernet-pd-100w": IMAGE_SETS.usbCHubV2,
  "webcam-full-hd-1080p-microphone-annulation-bruit": IMAGE_SETS.webcam,
  "webcam-4k-autofocus-ia-eclairage-annulaire": IMAGE_SETS.webcamV2,
  "stabilisateur-gimbal-smartphone-3-axes": IMAGE_SETS.gimbal,
  "mini-projecteur-4k-android-wifi-bluetooth": IMAGE_SETS.miniProjector,
  "stylus-ipad-palm-rejection-tilt-1ms": IMAGE_SETS.iPadStylus,
  "stylet-ipad-compatible-toutes-generations": IMAGE_SETS.iPadStylusV2,
  "carnet-numerique-reutilisable-smart-notebook": IMAGE_SETS.digitalNotebook,
  "lampe-anneau-led-ring-light-tiktok-26cm": IMAGE_SETS.ringLight,
  "cle-usb-256go-usb-3-2-metal-etanche": IMAGE_SETS.usbFlashDrive,
  "flash-drive-512go-usb-c-dual-connector": [
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1518770660439-4636190af475"),
    unsplash("1526378800651-8438701bb3ff"),
  ],
  "cable-magnetique-3-en-1-usb-c-lightning-micro": IMAGE_SETS.magneticCable,
  "cable-magnetique-charge-rapide-100w-usb-c": [
    unsplash("1593642632559-0c6d3fc62b89"),
    unsplash("1601972418-e44573d39aa5"),
    unsplash("1519389950473-47ba0277781c"),
  ],
  "chargeur-solaire-pliable-100w-panneau-usb-c": [
    unsplash("1592833159155-c62df1b65634"),
    unsplash("1609091839311-d5365f9ff1c5"),
    unsplash("1593642632559-0c6d3fc62b89"),
  ],
  "batterie-externe-magsafe-10000mah-charge-rapide": [
    unsplash("1609091839311-d5365f9ff1c5"),
    unsplash("1601972418-e44573d39aa5"),
    unsplash("1593642632559-0c6d3fc62b89"),
  ],
  "ecouteurs-gaming-rgb-surround-7-1": [
    unsplash("1505740420928-5e560c06d30e"),
    unsplash("1590658165737-15a047b7c97e"),
    unsplash("1583394838336-acd977736f90"),
  ],

  // ════════════════════════════════
  // BEAUTÉ (24 produits)
  // ════════════════════════════════
  "masseur-visage-ultrason-led": IMAGE_SETS.faceMassager,
  "masseur-visage-micro-courant-lifting-ems": IMAGE_SETS.faceMassagerV2,
  "masseur-visage-radiofrequence-anti-age": IMAGE_SETS.faceMassagerV3,
  "nettoyant-visage-electrique-silicone-ultrason": IMAGE_SETS.facialCleanser,
  "brosse-nettoyante-visage-sonique-etanche": IMAGE_SETS.facialCleanserV2,
  "brosse-nettoyante-visage-pores-profonds": IMAGE_SETS.facialCleanserV3,
  "masque-led-visage-7-couleurs-phototherapie": IMAGE_SETS.ledFaceMask,
  "masque-led-anti-age-infra-rouge-photobiomodulation": IMAGE_SETS.ledFaceMaskV2,
  "brosse-lissante-ionique": IMAGE_SETS.hairStraightener,
  "seche-cheveux-ionique-2200w-diffuseur-inclus": IMAGE_SETS.hairDryer,
  "seche-cheveux-supersonic-1600w-ionique": IMAGE_SETS.hairDryerV2,
  "lisseur-vapeur-titane-230c-plaques-larges": [
    unsplash("1526045612212-70caf35c14df"),
    unsplash("1487412947147-5cebf100ffc2"),
    unsplash("1522337360801-4f88e7a9e4d0"),
  ],
  "epilateur-electrique-corps-visage-etanche-ipx6": IMAGE_SETS.epilator,
  "serum-vitamine-c-20-acide-hyaluronique": [unsplash("1599305090598-fe179d501227"), unsplash("1570172619644-dfd03ed5d881"), unsplash("1614790133872-46bc31b89e3b")],
  "jade-roller-gua-sha-set-quartz-rose": IMAGE_SETS.jadeRoller,
  "jade-roller-obsidienne-anti-cernes": IMAGE_SETS.jadeRollerV2,
  "masque-sommeil-3d-contour-yeux-memoire": IMAGE_SETS.sleepMask,
  "miroir-led-grossissant-10x-eclairage-tri-couleur": IMAGE_SETS.magnifyingMirror,
  "tondeuse-multifonction-barbe-sourcils-nez": IMAGE_SETS.beardTrimmer,
  "tondeuse-precision-corps-tete-rasage": [
    unsplash("1517941823-815bea90d291"),
    unsplash("1503951914875-452162b0f3f1"),
    unsplash("1576091160550-2173dba999ef"),
  ],
  "autobronzant-spray-mousse-naturelle-bronzage": IMAGE_SETS.selfTanner,
  "autobronzant-progressif-corps-visage-spf20": IMAGE_SETS.selfTannerV2,
  "bain-pieds-spa-bouillonnant-chaleur-massage": IMAGE_SETS.footSpa,
  "fond-de-teint-pinceau-kabuki-set-maquillage": [
    unsplash("1522337360826-9d459de31f3b"),
    unsplash("1503951914875-452162b0f3f1"),
    unsplash("1596462502278-27bfdc403348"),
  ],

  // ════════════════════════════════
  // SPORT (24 produits)
  // ════════════════════════════════
  "pistolet-massage-musculaire-30-vitesses-3200rpm": IMAGE_SETS.massageGun,
  "pistolet-massage-musculaire-percussif": [unsplash("1612444080611-5ed7532d4c2f"), unsplash("1571019613454-1cb2f99b2d8b"), unsplash("1549060279-7e168fcee0c2")],
  "massage-gun-mini-pocket-6-vitesses-silencieux": IMAGE_SETS.massageGunV3,
  "tapis-yoga-antiderapant-premium-6mm": IMAGE_SETS.yogaMat,
  "corde-a-sauter-numerique-compteur-calories": IMAGE_SETS.jumpRope,
  "bandes-elastiques-resistance-set-5-niveaux": IMAGE_SETS.resistanceBands,
  "bandes-resistance-pro-set-6-niveaux-poignees": IMAGE_SETS.resistanceBandsV2,
  "foam-roller-massage-recuperation-33cm-vibrant": IMAGE_SETS.foamRoller,
  "33cm-vibrating-foam-roller-massage-recovery": [unsplash("1517836357463-d25dfeac3438"), unsplash("1534438327276-14e5300c3a48"), unsplash("1549060279-7e168fcee0c2")],
  "gants-de-musculation-antiderapants-avec-poignets": IMAGE_SETS.workoutGloves,
  "montre-connectee-sport-gps": IMAGE_SETS.smartwatch,
  "montre-gps-sport-multisport-cardiaque": IMAGE_SETS.smartwatchV2,
  "montre-connectee-ultra-sport-titanium": IMAGE_SETS.smartwatchV3,
  "smartwatch-ultra-amoled-gps-dual-band": IMAGE_SETS.smartwatchV4,
  "velo-appartement-magnetique-silencieux-lcd": IMAGE_SETS.exerciseBike,
  "velo-elliptique-compact-pliable-silencieux": IMAGE_SETS.elliptical,
  "velo-appartement-smart-bluetooth-appli": IMAGE_SETS.magneticBike,
  "tapis-de-course-pliable-motorise-12km-h": IMAGE_SETS.treadmill,
  "tapis-course-motorise-inclinaison-auto": IMAGE_SETS.treadmillV2,
  "halteres-reglables-20kg-paire-rack": IMAGE_SETS.dumbbells,
  "halteres-hexagonaux-caoutchouc-5kg-20kg": IMAGE_SETS.dumbbellsV2,
  "battle-rope-15m-antiderapante-gym": IMAGE_SETS.battleRope,
  "barre-traction-porte-reglable-sans-vis": IMAGE_SETS.pullUpBar,
  "gants-boxe-cuir-12oz-muay-thai": IMAGE_SETS.boxingGloves,

  // ════════════════════════════════
  // CUISINE (27 produits)
  // ════════════════════════════════
  "blender-portable-usb-600ml": IMAGE_SETS.portableBlender,
  "robot-cuisine-multifonction-compact": IMAGE_SETS.foodProcessor,
  "robot-cuisine-multifonction-1500w-8-en-1": [unsplash("1585515320310-259814833e62"), unsplash("1495474472287-4d71bcdd2085"), unsplash("1556909114-f6e7ad7d3136")],
  "robot-cuiseur-vapeur-10-en-1-6l-programmable": IMAGE_SETS.foodProcessorV3,
  "robot-patissier-stand-mixer-5l-1000w": IMAGE_SETS.foodProcessorV4,
  "robot-cuiseur-multifonction-chauffant-8l": IMAGE_SETS.foodProcessorV5,
  "coupe-legumes-electrique-12-en-1": IMAGE_SETS.vegetableChopper,
  "pese-aliments-digital-usb": IMAGE_SETS.kitchenScale,
  "trancheuse-oeufs-multifonction-inox": IMAGE_SETS.eggSlicer,
  "friteuse-a-air-chaud-5l-numerique-ecran-tactile": IMAGE_SETS.airFryer,
  "compact-air-fryer-2-5l-digital": [unsplash("1606787364406-a3cdf06c6d0c"), unsplash("1495474472287-4d71bcdd2085"), unsplash("1556909114-f6e7ad7d3136")],
  "centrifugeuse-a-froid-150w-jus-frais": IMAGE_SETS.juicer,
  "extracteur-jus-centrifuge-1000w-anti-bouchage": IMAGE_SETS.juicerV2,
  "slow-juicer-vertical-200w-large-bouche": IMAGE_SETS.juicerV3,
  "centrifugeuse-agrumes-electrique-inox": IMAGE_SETS.juicerV4,
  "moule-a-gateau-silicone-set-6-pieces-antiadhesif": IMAGE_SETS.cakeMold,
  "couteaux-cuisine-set-5-pieces-acier-inox": IMAGE_SETS.knifeSet,
  "bloc-couteaux-ceramique-6-pieces-ergonomique": IMAGE_SETS.knifeSetV2,
  "mixeur-plongeant-800w-acier-inox-turbo": IMAGE_SETS.immersionBlender,
  "mixeur-plongeant-sans-fil-rechargeable": IMAGE_SETS.immersionBlenderV2,
  "machine-pates-automatique-laminoir-6-formes": IMAGE_SETS.pastaMachine,
  "machine-a-pates-manuelle-inox-9-epaisseurs": IMAGE_SETS.pastaMachineV2,
  "bouilloire-electrique-temperature-variable-1-7l": IMAGE_SETS.electricKettle,
  "bouilloire-inox-1l-360-rapide-silencieuse": IMAGE_SETS.electricKettleV2,
  "thermometre-cuisson-numerique-sonde-bbq": IMAGE_SETS.meatThermometer,
  "robinet-cuisine-led-tactile-cascade-inox": IMAGE_SETS.ledFaucet,
  "planche-decouper-bambou-rainures-jus": IMAGE_SETS.cuttingBoard,

  // ════════════════════════════════
  // ENFANTS (21 produits)
  // ════════════════════════════════
  "jeu-construction-magnetique-3d-120-pieces": IMAGE_SETS.magneticBlocks,
  "blocs-construction-magnetiques-couleurs-60p": IMAGE_SETS.educationalToyV2,
  "set-construction-magnetique-educatif-240p": IMAGE_SETS.educationalToyV3,
  "sac-a-langer-impermeable-multi-compartiments": IMAGE_SETS.diaperBag,
  "sac-a-langer-backpack-usb-isotherme": [
    unsplash("1503454537195-1dcabb73ffb9"),
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1547347298-4074fc3086f0"),
  ],
  "pistolet-bulles-electrique-3000": IMAGE_SETS.bubbleGun,
  "tente-tipi-enfant-interieur-exterieur": IMAGE_SETS.playTent,
  "chateau-tente-enfant-indoor-tunnel-balles": IMAGE_SETS.playTentV2,
  "piano-electronique-educatif-61-touches-enfant": IMAGE_SETS.pianokids,
  "microscope-educatif-enfant-300x-1200x-led": IMAGE_SETS.microscopeKids,
  "walkie-talkie-enfant-8km-rechargeable-usb": IMAGE_SETS.walkieTalkie,
  "tablette-dessin-lumineuse-a4-enfant-artiste": IMAGE_SETS.lightDrawingTablet,
  "sac-gps-enfant-traceur-appel-sos-4g": IMAGE_SETS.kidsGpsBackpack,
  "casque-enfant-volume-limite-85db-wifi": IMAGE_SETS.kidsHeadphones,
  "trottinette-enfant-3-roues-pliable-led": IMAGE_SETS.kidsScooter,
  "piscine-gonflable-enfant-famille-350cm": IMAGE_SETS.inflatablePool,
  "thermometre-bebe-frontal-infrarouge-2s": IMAGE_SETS.babyThermometer,
  "thermometre-tympan-bebe-medical-grade": [
    unsplash("1587654780291-39c9404d746b"),
    unsplash("1566140967404-b8b3932483f5"),
    unsplash("1503454537195-1dcabb73ffb9"),
  ],
  "tableau-dessin-magnetique-effacable-enfant": [
    unsplash("1561154464-062d233de9f9"),
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1566140967404-b8b3932483f5"),
  ],
  "robot-educatif-enfant-codage-debutant": [
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1547347298-4074fc3086f0"),
    unsplash("1503454537195-1dcabb73ffb9"),
  ],
  "telescope-debutant-enfant-astronomie-70mm": [
    unsplash("1534796636912-3b95b3ab5986"),
    unsplash("1596461404969-9ae70f2830c1"),
    unsplash("1547347298-4074fc3086f0"),
  ],

  // ════════════════════════════════
  // BUREAU (20 produits)
  // ════════════════════════════════
  "lampe-bureau-led-chargeur-qi": [unsplash("1519389950473-47ba0277781c"), unsplash("1593642632523-1d60af4b3029"), unsplash("1526378800651-8438701bb3ff")],
  "lampe-de-bureau-led-sans-fil-rechargeable": IMAGE_SETS.deskLamp,
  "wireless-led-desk-lamp-usb-rechargeable": IMAGE_SETS.deskLampV1,
  "lampe-bureau-led-bras-articulee-clamp-usb": IMAGE_SETS.deskLampV2,
  "lampe-bureau-rechargeable-tactile-5-modes": IMAGE_SETS.deskLampV3,
  "lampe-architecte-led-clamp-dimmer-usb-c": IMAGE_SETS.deskLampV4,
  "lampe-de-bureau-gaming-rgb-bras-double": IMAGE_SETS.deskLampV5,
  "chaise-bureau-ergonomique-lombaire-accoudoirs": IMAGE_SETS.ergonomicChair,
  "chaise-gaming-ergonomique-cuir-pu-reglable": IMAGE_SETS.ergonomicChairV2,
  "chaise-bureau-mesh-ultra-confort-24h": IMAGE_SETS.ergonomicChairV3,
  "bras-moniteur-simple-reglable-vesa-75-100": IMAGE_SETS.monitorArm,
  "bras-moniteur-double-ecran-gas-spring": IMAGE_SETS.monitorArmV2,
  "tapis-bureau-gaming-xl-900x400mm": IMAGE_SETS.deskPad,
  "desk-pad-cuir-pu-xl-sous-main-bureau": IMAGE_SETS.deskPadV2,
  "repose-poignets-ergonomique-tapis-xl": IMAGE_SETS.wristRest,
  "organiseur-cables-magnetique-10": IMAGE_SETS.cableOrganizer,
  "support-ordinateur-portable-reglable-ergonomique": IMAGE_SETS.laptopStand,
  "organisateur-bureau-rotatif-360-bambou": IMAGE_SETS.deskOrganizer,
  "tableau-blanc-magnetique-effacable-60x90cm": IMAGE_SETS.whiteboard,
  "repose-pied-bureau-ergonomique-hauteur-reglable": IMAGE_SETS.footrest,
  "spray-bronzant-autobronzant-corps-200ml-bio": [unsplash("1549045783-5f2d8e8dff74"), unsplash("1617897903246-719242758050"), unsplash("1596462502278-27bfdc403348")],
  "ecouteurs-sans-fil-reduction-bruit-active-focus-travail": [unsplash("1583394838336-acd977736f90"), unsplash("1505740420928-5e560c06d30e"), unsplash("1590658165737-15a047b7c97e")],
  "lampe-bureau-led-sans-fil-rechargeable-tactile": [unsplash("1519389950473-47ba0277781c"), unsplash("1593642632523-1d60af4b3029"), unsplash("1484981138541-3d074aa97716")],
  "foldable-kids-play-tent-castle-indoor-outdoor": [unsplash("1596461404969-9ae70f2830c1"), unsplash("1566140967404-b8b3932483f5"), unsplash("1547347298-4074fc3086f0")],
  "kids-headphones-volume-limited-85db-foldable": [unsplash("1566140967404-b8b3932483f5"), unsplash("1503454537195-1dcabb73ffb9"), unsplash("1587654780291-39c9404d746b")],
  "trottinette-enfant-3-roues-reglable-2-6-ans-led": [unsplash("1547347298-4074fc3086f0"), unsplash("1503454537195-1dcabb73ffb9"), unsplash("1596461404969-9ae70f2830c1")],
  "chargeur-voiture-gan-65w": [unsplash("1558981806-ec527fa84c39"), unsplash("1511919884226-fd3cad34687c"), unsplash("1494976388531-d1058494cdd8")],
  "multiprise-connectee-wifi-4-prises-4-usb-surge": [unsplash("1556761175-b413da4baf72"), unsplash("1558618666-fcd25c85cd64"), unsplash("1484101403633-562f891dc89a")],
  "wifi-smart-programmable-touchscreen-thermostat": [unsplash("1484101403633-562f891dc89a"), unsplash("1558618666-fcd25c85cd64"), unsplash("1556761175-b413da4baf72")],
  "laser-mapping-robot-vacuum-2700pa": [unsplash("1558618666-fcd25c85cd64"), unsplash("1679678691170-7781f11f9d86"), unsplash("1583847268964-b28dc8f51f92")],
  "memory-foam-keyboard-mouse-wrist-rest-set": [unsplash("1484981138541-3d074aa97716"), unsplash("1593642632523-1d60af4b3029"), unsplash("1519389950473-47ba0277781c")],
  "repose-poignets-clavier-souris-memoire-forme": [unsplash("1484981138541-3d074aa97716"), unsplash("1593642632523-1d60af4b3029"), unsplash("1519389950473-47ba0277781c")],
  "wifi-smart-power-strip-4-outlets-4-usb-surge": [unsplash("1550985616-10810253b84d"), unsplash("1558618666-fcd25c85cd64"), unsplash("1556761175-b413da4baf72")],
  "gps-triathlon-watch-5atm-swimming-running-cycling": [unsplash("1544117519-31a4b719223d"), unsplash("1508685096489-7aacd43bd3b1"), unsplash("1523275335684-37898b6baf30")],
  "precision-eyebrow-trimmer-waterproof-rechargeable-led": [unsplash("1570172619644-dfd03ed5d881"), unsplash("1617897903246-719242758050"), unsplash("1549045783-5f2d8e8dff74")],
  "26cm-led-ring-light-tripod-selfie-tiktok-3-modes": [unsplash("1574715144611-609f29192975"), unsplash("1526378800651-8438701bb3ff"), unsplash("1561154464-062d233de9f9")],
  "lampe-anneau-led-26cm-trepied-selfie-tiktok-3-modes": [unsplash("1574715144611-609f29192975"), unsplash("1526378800651-8438701bb3ff"), unsplash("1561154464-062d233de9f9")],
  "lampe-bureau-led-10w-usb-c-rechargeable-clip": [unsplash("1593642632523-1d60af4b3029"), unsplash("1526378800651-8438701bb3ff"), unsplash("1519389950473-47ba0277781c")],
};

// ─────────────────────────────────────────────────────────────
// RULES — fallback par pattern regex si slug absent
// ─────────────────────────────────────────────────────────────
const RULES: Array<{ pattern: RegExp; images: string[] }> = [
  { pattern: /camera.*recul|backup.*camera|reversing.*camera/, images: IMAGE_SETS.backupCamera },
  { pattern: /support.*telephone.*voiture|magnetic.*car.*phone|car.*phone.*holder/, images: IMAGE_SETS.carPhoneHolder },
  { pattern: /chargeur.*voiture|car.*charger|wireless.*car.*charger/, images: IMAGE_SETS.carCharger },
  { pattern: /aspirateur.*voiture|car.*vacuum/, images: IMAGE_SETS.carVacuum },
  { pattern: /organisateur.*siege|seat.*back.*organizer|back.*seat.*organizer/, images: IMAGE_SETS.carOrganizer },
  { pattern: /dashcam|camera.*tableau|dashboard.*camera|camera.*route/, images: IMAGE_SETS.dashcam },
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
  { pattern: /nettoyant.*visage|face.*cleanser|facial.*cleansing|brosse.*nettoyante/, images: IMAGE_SETS.facialCleanser },
  { pattern: /masque.*led|led.*face.*mask/, images: IMAGE_SETS.ledFaceMask },
  { pattern: /seche.*cheveux|hair.*dryer/, images: IMAGE_SETS.hairDryer },
  { pattern: /masseur.*visage|face.*massager|micro.*current/, images: IMAGE_SETS.faceMassager },
  { pattern: /brosse.*lissante|hair.*straightener|straightening.*brush|lisseur/, images: IMAGE_SETS.hairStraightener },
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
  { pattern: /montre.*connect|smartwatch|fitness.*watch|gps.*sport.*watch/, images: IMAGE_SETS.smartwatch },
  { pattern: /compresseur.*air|gonfleur|tire.*inflator|air.*compressor/, images: IMAGE_SETS.tireInflator },
  { pattern: /obd2|diagnostic.*voiture|car.*diagnostic|elm327/, images: IMAGE_SETS.obd2Scanner },
  { pattern: /organisateur.*coffre|trunk.*organizer|boot.*organizer/, images: IMAGE_SETS.trunkOrganizer },
  { pattern: /gps.*tracker|traceur.*gps|tracker.*voiture/, images: IMAGE_SETS.gpstracker },
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
  { pattern: /elliptique|elliptical/, images: IMAGE_SETS.elliptical },
  { pattern: /tapis.*course|treadmill|tapis.*roulant/, images: IMAGE_SETS.treadmill },
  { pattern: /haltere|dumbbell|poids.*musculation/, images: IMAGE_SETS.dumbbells },
  { pattern: /bain.*pied|foot.*spa|foot.*massager/, images: IMAGE_SETS.footSpa },
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
  { pattern: /planche.*bambou|cutting.*board.*bamboo|bamboo.*board|planche.*decouper/, images: IMAGE_SETS.cuttingBoard },
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
  { pattern: /cle.*usb|flash.*drive|usb.*drive/, images: IMAGE_SETS.usbFlashDrive },
  { pattern: /cable.*magnetique|magnetic.*cable/, images: IMAGE_SETS.magneticCable },
  { pattern: /gimbal|stabilisateur/, images: IMAGE_SETS.gimbal },
];

function searchable(input: ProductImageInput): string {
  return [input.slug, input.name, input.photoKeyword, input.categorySlug]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function getCuratedProductImages(input: ProductImageInput): string[] {
  const slug = input.slug || "";
  const slugImages = SLUG_IMAGES[slug];
  if (slugImages) return unique(slugImages);

  const haystack = searchable(input);
  const rule = RULES.find((candidate) => candidate.pattern.test(haystack));
  return rule ? unique(rule.images) : [];
}
