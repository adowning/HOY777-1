<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from 'vue-i18n';
import { type GetGameOriginalData } from "@/interface/navBar";
import { setLang } from "@/locale/index";
import { appBarStore } from "@/store/appBar";
import { loginBonusStore } from "@/store/loginBonus";
import { refferalStore } from "@/store/refferal";
import { mailStore } from "@/store/mail";
import { gameStore } from "@/store/game";
import { agentStore } from "@/store/agent";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_35 from "@/assets/public/svg/icon_public_35.svg";
import icon_public_36 from "@/assets/public/svg/icon_public_36.svg";
import icon_public_37 from "@/assets/public/svg/icon_public_37.svg";
import icon_public_38 from "@/assets/public/svg/icon_public_38.svg";
import icon_public_39 from "@/assets/public/svg/icon_public_39.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_41 from "@/assets/public/svg/icon_public_41.svg";
import icon_public_42 from "@/assets/public/svg/icon_public_42.svg";
import icon_public_43 from "@/assets/public/svg/icon_public_43.svg";
import icon_public_44 from "@/assets/public/svg/icon_public_44.svg";
import icon_public_45 from "@/assets/public/svg/icon_public_45.svg";
import icon_public_46 from "@/assets/public/svg/icon_public_46.svg";
import icon_public_47 from "@/assets/public/svg/icon_public_47.svg";
import icon_public_57 from "@/assets/public/svg/icon_public_57.svg";
import icon_public_95 from "@/assets/public/svg/icon_public_95.svg";
import icon_public_96 from "@/assets/public/svg/icon_public_96.svg";
import icon_public_114 from "@/assets/public/svg/icon_public_114.svg";
import icon_public_115 from "@/assets/public/svg/icon_public_115.svg";
import icon_public_116 from "@/assets/public/svg/icon_public_116.svg";
import icon_public_117 from "@/assets/public/svg/icon_public_117.svg";
import icon_public_118 from "@/assets/public/svg/icon_public_118.svg";
import icon_public_119 from "@/assets/public/svg/icon_public_119.svg";
import icon_public_120 from "@/assets/public/svg/icon_public_120.svg";
import icon_public_121 from "@/assets/public/svg/icon_public_121.svg";
import icon_public_122 from "@/assets/public/svg/icon_public_122.svg";
import icon_public_123 from "@/assets/public/svg/icon_public_123.svg";
import icon_public_124 from "@/assets/public/svg/icon_public_124.svg";
import icon_public_125 from "@/assets/public/svg/icon_public_125.svg";
import icon_public_126 from "@/assets/public/svg/icon_public_126.svg";
import icon_public_127 from "@/assets/public/svg/icon_public_127.svg";
import icon_public_128 from "@/assets/public/svg/icon_public_128.svg";
import icon_public_129 from "@/assets/public/svg/icon_public_129.svg";
import icon_public_130 from "@/assets/public/svg/icon_public_130.svg";
import icon_public_131 from "@/assets/public/svg/icon_public_131.svg";
import icon_public_132 from "@/assets/public/svg/icon_public_132.svg";
import icon_public_133 from "@/assets/public/svg/icon_public_133.svg";
import icon_public_134 from "@/assets/public/svg/icon_public_134.svg";
import icon_public_135 from "@/assets/public/svg/icon_public_135.svg";
import icon_public_136 from "@/assets/public/svg/icon_public_136.svg";
import icon_public_137 from "@/assets/public/svg/icon_public_137.svg";
import icon_public_138 from "@/assets/public/svg/icon_public_138.svg";
import icon_public_139 from "@/assets/public/svg/icon_public_139.svg";
import icon_public_140 from "@/assets/public/svg/icon_public_140.svg";
import icon_public_141 from "@/assets/public/svg/icon_public_141.svg";
import icon_public_142 from "@/assets/public/svg/icon_public_142.svg";
import icon_public_143 from "@/assets/public/svg/icon_public_143.svg";

import icon_public_144 from "@/assets/public/svg/icon_public_144.svg";
import icon_public_145 from "@/assets/public/svg/icon_public_145.svg";
import icon_public_146 from "@/assets/public/svg/icon_public_146.svg";
import icon_public_147 from "@/assets/public/svg/icon_public_147.svg";

const router = useRouter();
const { setNavBarToggle } = appBarStore();
const { setRightBarToggle } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setRouletteBonusDialogVisible } = loginBonusStore();
const { setLoginBonusDialogVisible } = loginBonusStore();
const { setRefferalDialogShow } = refferalStore();
const { setMailMenuShow } = mailStore();
const { setSearchGameDialogShow } = gameStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setGameFilterText } = gameStore();
const { dispatchGameCategories } = gameStore();
const { setAgentNavBarToggle } = agentStore();
const { setVipNavBarToggle } = vipStore();

const { t } = useI18n();
const casinoOpen = ref<Array<string>>(['']);
const sportOpen = ref<Array<string>>(['']);
const language = ref<string>('English');
const drawer = ref<boolean>(true);
const languageMenu = ref<boolean>(false);
const originalMenu = ref<boolean>(false);
const navDrawer = ref<any>(null);
const casinoIconColor = ref<string>("#7782AA");
const originalIconColor = ref<string>("#7782AA")
const recentlyIconColor = ref<string>("#7782AA")
const favoriteIconColor = ref<string>("#7782AA")
const hotIconColor = ref<string>("#7782AA")
const providerIconColor = ref<string>("#7782AA")
const slotIconColor = ref<string>("#7782AA")
const liveIconColor = ref<string>("#7782AA")
const sportIconColor = ref<string>("#7782AA")
const promotionIconColor = ref<string>("#7782AA")
const vipIconColor = ref<string>("#7782AA")
const affiliateIconColor = ref<string>("#7782AA")
const blogIconColor = ref<string>("#7782AA")
const supportIconColor = ref<string>("#7782AA")
const languageIconColor = ref<string>("#7782AA")
const activeItem = ref<string>("");
const navItem = ref<string>("");
const soundCheckBox = ref<boolean>(false);
const onCheckboxColor = ref<string>("#ffffff");
const offCheckboxColor = ref<string>("#7782AA");
const sportMenuIconColor = ref<string>("#7782AA");
const eSportMenuIconColor = ref<string>("#7782AA");
const sportMenu = ref<boolean>(false);
const eSportMenu = ref<boolean>(false);

const sportGames = ref<Array<any>>([
  {
    name: t("navBar.sport_sub_menu.text_14"),
    icon: icon_public_121,
    query: "/american-football-16"
  },
  {
    name: t("navBar.sport_sub_menu.text_15"),
    icon: icon_public_122,
    query: "/badminton-31"
  },
  {
    name: t("navBar.sport_sub_menu.text_16"),
    icon: icon_public_123,
    query: "/baseball-3"
  },
  {
    name: t("navBar.sport_sub_menu.text_17"),
    icon: icon_public_124,
    query: "/?liveSport=basketball-2"
  },
  {
    name: t("navBar.sport_sub_menu.text_18"),
    icon: icon_public_125,
    query: "/cricket-21"
  },
  {
    name: t("navBar.sport_sub_menu.text_19"),
    icon: icon_public_126,
    query: "/cycling-17"
  },
  {
    name: t("navBar.sport_sub_menu.text_20"),
    icon: icon_public_127,
    query: "/darts-22"
  },
  {
    name: t("navBar.sport_sub_menu.text_21"),
    icon: icon_public_128,
    query: "/formula-1-40"
  },
  {
    name: t("navBar.sport_sub_menu.text_22"),
    icon: icon_public_129,
    query: "/futsal-29"
  },
  {
    name: t("navBar.sport_sub_menu.text_23"),
    icon: icon_public_130,
    query: "/golf-9"
  },
  {
    name: t("navBar.sport_sub_menu.text_24"),
    icon: icon_public_131,
    query: "/handball-6"
  },
  {
    name: t("navBar.sport_sub_menu.text_25"),
    icon: icon_public_132,
    query: "/ice-hockey-4"
  },
  {
    name: t("navBar.sport_sub_menu.text_26"),
    icon: icon_public_133,
    query: "/ebaseball/mlb-20-2128614497890471950"
  },
  {
    name: t("navBar.sport_sub_menu.text_27"),
    icon: icon_public_134,
    query: "/mma-117"
  },
  {
    name: t("navBar.sport_sub_menu.text_28"),
    icon: icon_public_135,
    query: "/american-football/usa/nfl-1666080012467572736"
  },
  {
    name: t("navBar.sport_sub_menu.text_29"),
    icon: icon_public_136,
    query: "/motorcycle-racing-190"
  },
  {
    name: t("navBar.sport_sub_menu.text_30"),
    icon: icon_public_137,
    query: ""
  },
  {
    name: t("navBar.sport_sub_menu.text_31"),
    icon: icon_public_138,
    query: "/rugby-12"
  },
  {
    name: t("navBar.sport_sub_menu.text_32"),
    icon: icon_public_139,
    query: "/snooker-19"
  },
  {
    name: t("navBar.sport_sub_menu.text_33"),
    icon: icon_public_140,
    query: "/table-tennis-20"
  },
  {
    name: t("navBar.sport_sub_menu.text_34"),
    icon: icon_public_141,
    query: "/?liveSport=tennis-5"
  },
  {
    name: t("navBar.sport_sub_menu.text_35"),
    icon: icon_public_142,
    query: "/volleyball-23"
  },
  {
    name: t("navBar.sport_sub_menu.text_36"),
    icon: icon_public_143,
    query: "/waterpolo-26"
  },
])

const eSportGames = ref<Array<any>>([
  {
    name: t("navBar.sport_sub_menu.text_37"),
    icon: icon_public_144,
    query: "/counter-strike-109"
  },
  {
    name: t("navBar.sport_sub_menu.text_38"),
    icon: icon_public_145,
    query: "/dota-2-111"
  },
  {
    name: t("navBar.sport_sub_menu.text_39"),
    icon: icon_public_146,
    query: ""
  },
  {
    name: t("navBar.sport_sub_menu.text_40"),
    icon: icon_public_147,
    query: "/league-of-legends-110"
  },
])

// mobile version name
const mobileWidth = ref(window.innerWidth);
const name = computed(() => {
  if (mobileWidth.value < 600) {
    return 'sm';
  } else if (mobileWidth.value < 960) {
    return 'md';
  } else if (mobileWidth.value < 1264) {
    return 'lg';
  } else {
    return 'xl';
  }
});
const width = computed(() => mobileWidth.value);

window.addEventListener('resize', () => {
  mobileWidth.value = window.innerWidth;
});

const { setLanguage } = gameStore();

const mobileVersion = computed(() => {
  return name.value
});

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value
})

const navBarToggle = computed(() => {
  const { getNavBarToggle } = storeToRefs(appBarStore());
  return getNavBarToggle.value
})

const loginBonusDialog = computed(() => {
  const { getLoginBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getLoginBonusDialogVisible.value;
})

const rouletteBonusDialog = computed(() => {
  const { getRouletteBonusDialogVisible } = storeToRefs(loginBonusStore());
  return getRouletteBonusDialogVisible.value;
})

const originalGames = computed(() => {
  const { getOriginalGames } = storeToRefs(gameStore());
  return getOriginalGames.value
})

// language array
const langItems = ref<Array<any>>([
  {
    id: 'en',
    value: t('navBar.language.english'),
  },
  {
    id: 'pt',
    value: t('navBar.language.portuguese'),
  },
  {
    id: 'es',
    value: t('navBar.language.espanola')
  }
])

// game original data array
const gameOriginalItems = ref<Array<GetGameOriginalData>>([
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlots"
  },
  {
    icon: new URL("@/assets/public/svg/icon_public_21.svg", import.meta.url).href,
    name: "SlotsSlotsSlots"
  }
])

watch(drawer, (newValue: boolean) => {
  setNavBarToggle(newValue);
  setMailMenuShow(newValue);
  if (!newValue && !rouletteBonusDialog.value) {
    setMainBlurEffectShow(false);
    setOverlayScrimShow(false);
  }
  if (newValue) {
    setMainBlurEffectShow(true);
    setOverlayScrimShow(true);
  }
})

watch(navBarToggle, (newValue) => {
  drawer.value = newValue;
  if (mobileWidth.value < 600 && newValue) {
    setRightBarToggle(false);
  }
  if (mobileWidth.value < 600) {
    setSearchGameDialogShow(newValue);
  }
})

watch(casinoOpen, (value) => {
  if (value.length == 1) {
    casinoIconColor.value = "#7782AA";
    recentlyIconColor.value = "#7782AA"
    favoriteIconColor.value = "#7782AA"
    slotIconColor.value = "#7782AA"
    liveIconColor.value = "#7782AA"
    activeItem.value = "";
  } else {
    casinoIconColor.value = "#FFFFFF";
    sportIconColor.value = "#7782AA"
    promotionIconColor.value = "#7782AA"
    navItem.value = "";
    sportOpen.value = [""];
  }
})

watch(sportOpen, (value) => {
  if (value.length == 1) {
    activeItem.value = "";
  } else {
    sportIconColor.value = "#FFFFFF";
    casinoIconColor.value = "#7782AA"
    promotionIconColor.value = "#7782AA"
    navItem.value = "";
    casinoOpen.value = [""];
  }
})

watch(originalMenu, (value) => {
  if (value) {
    originalIconColor.value = "#FFFFFF";
    recentlyIconColor.value = "#7782AA"
    favoriteIconColor.value = "#7782AA"
    slotIconColor.value = "#7782AA"
    liveIconColor.value = "#7782AA"
    activeItem.value = "";
  } else {
    originalIconColor.value = "#7782AA"
  }
})

watch(languageMenu, (value) => {
  if (value) {
    languageIconColor.value = "#FFFFFF";
  } else {
    languageIconColor.value = "#7782AA"
  }
})

watch(soundCheckBox, (value: boolean) => {
  if (value) {
    onCheckboxColor.value = "#7782AA";
    offCheckboxColor.value = "#ffffff";
  } else {
    onCheckboxColor.value = "#ffffff";
    offCheckboxColor.value = "#7782AA";
  }
}, { deep: true });

const onIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', onCheckboxColor.value)
  }
  return el
}

const offIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute('fill', offCheckboxColor.value)
  }
  return el
}

const handleLanguageDropdown = (item: any) => {
  language.value = item.value;
  switch (item.id) {
    case 'en':
      setLang("en");
      setLanguage('en');
      break;
    case 'pt':
      setLang("pt");
      setLanguage('pt');
      break;
    case 'es':
      setLang("es");
      setLanguage('es');
      break;
  }
}

const languageText = () => {
  const item = localStorage.getItem('lang');
  switch (item) {
    case 'en':
      language.value = t('navBar.language.english');
      break;
    case 'pt':
      language.value = t('navBar.language.portuguese');
      break;
    case 'es':
      language.value = t('navBar.language.espanola');
      break;
  }
}

window.addEventListener('scroll', function () {
  originalMenu.value = false;
  languageMenu.value = false;
});

const navDrawerScroll = () => {
  originalMenu.value = false;
  languageMenu.value = false;
}

const handleEnterGame = async (id: number, name: string) => {
  let replaceName = name.replace(/ /g, "-");
  if (mobileWidth.value < 600) {
    setMailMenuShow(true);
  }
  router.push(`/game/${id}/${replaceName}`);
};

const casinoIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", casinoIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", casinoIconColor.value);
    }
  }
  return el;
};

const originalIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", originalIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", originalIconColor.value);
    }
  }
  return el;
};

const recentlyIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", recentlyIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", recentlyIconColor.value);
    }
  }
  return el;
};

const favoriteIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", favoriteIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", favoriteIconColor.value);
    }
  }
  return el;
};

const slotIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", slotIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", slotIconColor.value);
    }
  }
  return el;
};

const liveIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", liveIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", liveIconColor.value);
    }
  }
  return el;
};

const sportIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", sportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", sportIconColor.value);
    }
  }
  return el;
};

const vipIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", vipIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", vipIconColor.value);
    }
  }
  return el;
};

const promotionIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", promotionIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", promotionIconColor.value);
    }
  }
  return el;
};

const affiliateIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", affiliateIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", affiliateIconColor.value);
    }
  }
  return el;
};

const blogIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", blogIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", blogIconColor.value);
    }
  }
  return el;
};

const supportIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", supportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", supportIconColor.value);
    }
  }
  return el;
};

const languageIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", languageIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", languageIconColor.value);
    }
  }
  return el;
};

const hotIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", hotIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", hotIconColor.value);
    }
  }
  return el;
};

const providerIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", providerIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", providerIconColor.value);
    }
  }
  return el;
};

watch(sportMenu, (value) => {
  sportMenuIconColor.value = value ? "#ffffff" : "#7782AA";
})

const sportMenuIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", sportMenuIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", sportMenuIconColor.value);
    }
  }
  return el;
};

watch(eSportMenu, (value) => {
  eSportMenuIconColor.value = value ? "#ffffff" : "#7782AA";
})

const eSportMenuIconTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", eSportMenuIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", eSportMenuIconColor.value);
    }
  }
  return el;
};

const handleSportGame = (sport_game_query: string) => {
  router.push({ name: "Sports", query: { "bt-path": sport_game_query } })
}

const openLoginBonusDialog = () => {
  setLoginBonusDialogVisible(true);
  setNavBarToggle(false);
  setOverlayScrimShow(true);
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
}

const openRouletteBonusDialog = () => {
  setRouletteBonusDialogVisible(true);
  setNavBarToggle(false);
  setOverlayScrimShow(true);
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
}
const openRefferalDialogShow = () => {
  setOverlayScrimShow(false);
  setRefferalDialogShow(true)
  setNavBarToggle(false);
}

const handleGameFilter = (filterText: string) => {
  // let tempFilterText: string = "";
  // switch (filterText) {
  //   case t('navBar.casino_sub_menu.recently_played'):
  //     setGameFilterText("history");
  //     tempFilterText = "history";
  //     activeItem.value = t('navBar.casino_sub_menu.recently_played');
  //     recentlyIconColor.value = "#FFFFFF"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.hot_text'):
  //     // setGameFilterText("history");
  //     tempFilterText = "history";
  //     activeItem.value = t('navBar.casino_sub_menu.hot_text');
  //     hotIconColor.value = "#FFFFFF"
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.favorites'):
  //     setGameFilterText("favorite");
  //     tempFilterText = "favorite";
  //     activeItem.value = t('navBar.casino_sub_menu.favorites');
  //     favoriteIconColor.value = "#FFFFFF"
  //     recentlyIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.slots'):
  //     setGameFilterText("slot");
  //     tempFilterText = "slot";
  //     activeItem.value = t('navBar.casino_sub_menu.slots');
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#FFFFFF"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.live_casino'):
  //     setGameFilterText("live");
  //     tempFilterText = "live";
  //     activeItem.value = t('navBar.casino_sub_menu.live_casino');
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#FFFFFF"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#7782AA"
  //     break;
  //   case t('navBar.casino_sub_menu.provider_text'):
  //     // setGameFilterText("live");
  //     tempFilterText = "live";
  //     activeItem.value = t('navBar.casino_sub_menu.provider_text');
  //     recentlyIconColor.value = "#7782AA"
  //     favoriteIconColor.value = "#7782AA"
  //     slotIconColor.value = "#7782AA"
  //     liveIconColor.value = "#7782AA"
  //     hotIconColor.value = "#7782AA"
  //     providerIconColor.value = "#FFFFFF"
  //     break;
  // }
  // router.push({ name: "Dashboard", query: { filter: tempFilterText } });
  router.push({ name: "Dashboard", query: { filter: filterText } });
  setNavBarToggle(false);
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
}

const handleNavbarItem = (navbarText: string) => {
  casinoOpen.value = [''];
  navItem.value = navbarText
  switch (navbarText) {
    case t('navBar.sport'):
      goGameBetBy();
      sportIconColor.value = "#FFFFFF"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      break;
    case t('navBar.menu_item_1.promotions'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#FFFFFF"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      break;
    case t('navBar.menu_item_1.vip_club'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#FFFFFF"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      setVipNavBarToggle('1');
      setNavBarToggle(false);
      setMainBlurEffectShow(false);
      setOverlayScrimShow(false);
      break;
    case t('navBar.menu_item_1.affiliate'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#FFFFFF"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#7782AA"
      setAgentNavBarToggle(true);
      setNavBarToggle(false);
      setMainBlurEffectShow(false);
      setOverlayScrimShow(false);
      setTimeout(() => {
        setMailMenuShow(false);
        setMailMenuShow(true);
      }, 200)
      break;
    case t('navBar.menu_item_1.blog'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#FFFFFF"
      supportIconColor.value = "#7782AA"
      break;
    case t('navBar.live_support'):
      sportIconColor.value = "#7782AA"
      promotionIconColor.value = "#7782AA"
      vipIconColor.value = "#7782AA"
      affiliateIconColor.value = "#7782AA"
      blogIconColor.value = "#7782AA"
      supportIconColor.value = "#FFFFFF"
      break;
  }
}

const goGameBetBy = () => {
  router.push({ name: "Sports" });
}

const casinoMenuList = ref<Array<any>>([]);

const gameCategories = computed(() => {
  const { getGameCategories } = storeToRefs(gameStore());
  return getGameCategories.value;
});

onMounted(async () => {
  drawer.value = mobileWidth.value < 1280 ? false : true;
  languageText();
  await dispatchGameCategories('?type=casino');
  casinoMenuList.value = gameCategories.value
})
</script>

<template>
  <div
    class="nav-background pb-16"
    v-if="drawer"
  >
    <template v-slot:prepend>
      <div
        class="m-casino-toggle"
        :class="refferalAppBarShow ? 'mt-8' : ''"
        style="height: 56px; visibility: hidden"
      >
        <input type="checkbox" id="m-casino-toggle" />
        <label for="m-casino-toggle">
          <div class="casino">
            <img src="@/assets/public/svg/icon_public_34.svg" />
            <p>{{ t("navBar.casino") }}</p>
          </div>
          <div class="sport">
            <img src="@/assets/public/svg/icon_public_40.svg" />
            <p>{{ t("navBar.sport") }}</p>
          </div>
        </label>
      </div>
    </template>
    <div class="m-nav-drawer-content" @scroll="navDrawerScroll">
      <!-- <div class="m-space-between">
        <div>
          <img src="@/assets/public/svg/icon_public_1001.svg" width="18" />
          <span class="card-title">{{ t("navBar.rewards_center") }}</span>
        </div>
        <div>
          <img src="@/assets/public/svg/icon_public_501.svg" width="18" />
        </div>
      </div> -->
      <div class="m-vip-login-bonus mt-6" @click="openLoginBonusDialog">
        <img src="@/assets/public/image/img_public_1.png" class="m-vip-login-bonus-img" />
        <div class="m-vip-login-bonus-text">
          <p class="text-700-10 white">{{ t("navBar.login_bonus_text") }}</p>
          <p class="text-400-8 white" style="line-height: 6px">
            {{ t("navBar.unlock_text") }}
          </p>
        </div>
        <img src="@/assets/public/image/img_ci_7.png" class="m-vip-login-bonus-img-1" />
      </div>
      <!--<div class="m-lucky-wheel mt-4" @click="openRouletteBonusDialog">
        <img src="@/assets/public/image/img_public_2.png" class="m-lucky-wheel-img" />
        <div class="m-vip-login-bonus-text">
          <p class="text-700-10 white">{{ t("navBar.lucky_wheel_text") }}</p>
          <p class="text-400-8 white" style="line-height: 6px">
            {{ t("navBar.unlock_text") }}
          </p>
        </div>
      </div>-->
      <div class="m-refer-earn mt-4" @click="openRefferalDialogShow">
        <img src="@/assets/public/svg/img_public_20.svg" width="184" />
        <img src="@/assets/public/image/img_public_6.png" width="48" class="m-earn-img" />
        <p class="text-700-12 white m-refer-earn-text">
          {{ t("navBar.refer_earn_text") }}
        </p>
      </div>
      <div v-model:opened="casinoOpen">
        <div value="Casino">
          <template v-slot:activator="{ props }">
            <div
              class="m-user-item1 m-nav-menu white"
              v-bind="props"
              link
              value="casino"
              :height="40"
              style="
                margin-bottom: -16px !important;
                margin-top: -8px !important;
                padding-left: 10px;
              "
            >
              <template v-slot:prepend>
                <inline-svg
                  :src="icon_public_34"
                  width="16"
                  :transform-source="casinoIconTransform"
                ></inline-svg>
              </template>
              <div
                class="ml-2"
                :class="casinoOpen.length == 1 ? 'gray' : 'white'"
              >
                {{ t("navBar.casino") }}
              </div>
            </div>
          </template>
          <div color="#15161C" theme="dark" class="mt-6" style="border-radius: 0px">
            <div>
              <div
                v-for="(item, index) in casinoMenuList"
                class="m-casino-sub-img m-nav-sub-menu"
                :value="item.slug"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleGameFilter(item.slug)"
              >
                <template v-slot:prepend>
                  <inline-svg :src="item.image" width="16"></inline-svg>
                </template>
                <div
                  class="ml-2"
                  :class="activeItem == item.name ? 'white' : 'gray'"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-model:opened="sportOpen" class="mb-2">
        <div value="Sport">
          <template v-slot:activator="{ props }">
            <div
              class="m-user-item1 m-nav-menu white"
              v-bind="props"
              link
              value="sport"
              :height="40"
              style="
                margin-bottom: -16px !important;
                margin-top: -8px !important;
                padding-left: 10px;
              "
            >
              <template v-slot:prepend>
                <inline-svg
                  :src="icon_public_40"
                  width="16"
                  :transform-source="sportIconTransform"
                ></inline-svg>
              </template>
              <div
                class="ml-2"
                :class="sportOpen.length == 1 ? 'gray' : 'white'"
              >
                {{ t("navBar.sport") }}
              </div>
            </div>
          </template>
          <div color="#15161C" theme="dark" class="mt-6" style="border-radius: 0px">
            <div>
              <div
                class="m-casino-sub-img m-nav-sub-menu"
                value="my_bet"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_114" width="16"></inline-svg>
                </template>
                <div
                  class="ml-2"
                  :class="
                    activeItem == t('navBar.sport_sub_menu.text_1') ? 'white' : 'gray'
                  "
                >
                  {{ t("navBar.sport_sub_menu.text_1") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu"
                value="popular"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_95" width="16"></inline-svg>
                </template>
                <div class="ml-2 white">
                  {{ t("navBar.sport_sub_menu.text_2") }}
                </div>
              </div>

              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="
                  handleSportGame('/soccer/brazil/brasileiro-serie-a-1666079971237564416')
                "
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_116" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_3") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/spain/laliga-1666080196081618944')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_117" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_4") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="
                  handleSportGame('/soccer/england/premier-league-1666080041827700736')
                "
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_118" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_5") }}
                </div>
              </div>

              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="
                  handleSportGame(
                    '/soccer/international-clubs/uefa-champions-league-1666080270903808000'
                  )
                "
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_6") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/italy/serie-a-1666080211319525376')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_7") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/germany/bundesliga-1666080125223047168')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_8") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer/france/ligue-1-1666080025423777792')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_9") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/soccer-1')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_119" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_10") }}
                </div>
              </div>
              <div
                class="m-casino-sub-img m-nav-sub-menu ml-2"
                value="sport_1"
                style="margin-bottom: -4px !important; margin-top: -4px !important"
                @click="handleSportGame('/fifa-300')"
              >
                <template v-slot:prepend>
                  <inline-svg :src="icon_public_120" width="16"></inline-svg>
                </template>
                <div class="ml-1 gray">
                  {{ t("navBar.sport_sub_menu.text_11") }}
                </div>
              </div>

              <div
                location="center"
                offset="10"
                class="m-original-dropdown"
                v-model:model-value="sportMenu"
                transition="slide-x-transition"
              >
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    class="m-casino-sub-img m-nav-sub-menu"
                    :append-icon="sportMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                    value="sports"
                    style="margin-bottom: -4px !important; margin-top: -4px !important"
                  >
                    <template v-slot:prepend>
                      <inline-svg
                        :src="icon_public_40"
                        width="16"
                        :transform-source="sportMenuIconTransform"
                      ></inline-svg>
                    </template>
                    <div class="ml-2" :class="sportMenu ? 'white' : 'gray'">
                      {{ t("navBar.sport_sub_menu.text_12") }}
                    </div>
                  </div>
                </template>
                <div
                  theme="dark"
                  bg-color="#15161C"
                  width="166"
                  class="ml-6"
                  style="border-radius: 8px; height: 400px; overflow-y: auto"
                >
                  <div
                    v-for="(item, i) in sportGames"
                    :key="i"
                    :value="item.name"
                    class="m-avatar-img m-nav-sub-menu"
                    :prepend-avatar="item.icon"
                    :title="item.name"
                    style="font-size: 11px !important; font-weight: 500 !important"
                    @click="handleSportGame(item.query)"
                  >
                  </div>
                </div>
              </div>
              <div
                location="center"
                offset="10"
                class="m-original-dropdown"
                v-model:model-value="eSportMenu"
                transition="slide-x-transition"
              >
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    class="m-casino-sub-img m-nav-sub-menu"
                    :append-icon="eSportMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                    value="esports"
                    style="margin-bottom: -4px !important; margin-top: -4px !important"
                  >
                    <template v-slot:prepend>
                      <inline-svg
                        :src="icon_public_115"
                        width="16"
                        :transform-source="eSportMenuIconTransform"
                      ></inline-svg>
                    </template>
                    <div
                      class="ml-2"
                      :class="eSportMenu ? 'white' : 'gray'"
                    >
                      {{ t("navBar.sport_sub_menu.text_13") }}
                    </div>
                  </div>
                </template>
                <div theme="dark" bg-color="#15161C" width="166" class="ml-6">
                  <div
                    v-for="(item, i) in eSportGames"
                    :key="i"
                    :value="item.name"
                    class="m-avatar-img m-nav-sub-menu"
                    :prepend-avatar="item.icon"
                    :title="item.name"
                    style="font-size: 11px !important; font-weight: 500 !important"
                    @click="handleSportGame(item.query)"
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="divider" />
      <div>
        <div
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -4px !important;
            margin-top: -8px !important;
            padding-left: 10px;
          "
          router
          :to="{ name: 'Promo' }"
          @click="handleNavbarItem(t('navBar.menu_item_1.promotions'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_41"
              width="16"
              :transform-source="promotionIconTransform"
            ></inline-svg>
          </template>
          <div
            class="ml-2"
            :class="navItem == t('navBar.menu_item_1.promotions') ? 'white' : 'gray'"
          >
            {{ t("navBar.menu_item_1.promotions") }}
          </div>
        </div>
        <div
          class="m-vip-club m-nav-menu"
          style="
            margin-bottom: -4px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.menu_item_1.vip_club'))"
        >
          <!-- router
          :to="{ name: 'VIP' }" -->
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_42"
              width="16"
              :transform-source="vipIconTransform"
            ></inline-svg>
          </template>
          <div class="ml-2">
            {{ t("navBar.menu_item_1.vip_club") }}
          </div>
        </div>
        <div
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -4px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.menu_item_1.affiliate'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_43"
              width="16"
              :transform-source="affiliateIconTransform"
            ></inline-svg>
          </template>
          <div
            class="ml-2"
            :class="navItem == t('navBar.menu_item_1.affiliate') ? 'white' : 'gray'"
          >
            {{ t("navBar.menu_item_1.affiliate") }}
          </div>
        </div>
        <div
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -8px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.menu_item_1.blog'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_44"
              width="16"
              :transform-source="blogIconTransform"
            ></inline-svg>
          </template>
          <div
            class="ml-2"
            :class="navItem == t('navBar.menu_item_1.blog') ? 'white' : 'gray'"
          >
            {{ t("navBar.menu_item_1.blog") }}
          </div>
        </div>
      </div>
      <hr class="divider" />
      <div>
        <div
          class="m-avatar-img m-user-item1 m-nav-menu"
          style="
            margin-bottom: -8px !important;
            margin-top: -4px !important;
            padding-left: 10px;
          "
          @click="handleNavbarItem(t('navBar.live_support'))"
        >
          <template v-slot:prepend>
            <inline-svg
              :src="icon_public_45"
              width="16"
              :transform-source="supportIconTransform"
            ></inline-svg>
          </template>
          <div
            class="ml-2"
            :class="navItem == t('navBar.live_support') ? 'white' : 'gray'"
          >
            {{ t("navBar.live_support") }}
          </div>
        </div>
      </div>
      <div>
        <div
          location="center"
          offset="16"
          class="m-language-dropdown m-user-item1"
          v-model:model-value="languageMenu"
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ props }">
            <div color="#15161C" theme="dark" class="mx-2 m-language-item" height="40">
              <div
                v-bind="props"
                class="m-casino-sub-img m-nav-menu"
                :append-icon="languageMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
              >
                <template v-slot:prepend>
                  <inline-svg
                    :src="icon_public_57"
                    width="16"
                    :transform-source="languageIconTransform"
                  ></inline-svg>
                </template>
                <div class="ml-2" :class="languageMenu ? 'white' : 'gray'">
                  {{ language }}
                </div>
              </div>
            </div>
          </template>
          <div theme="dark" bg-color="#15161C" width="166" class="text-center pt-0">
            <div
              :title="t('navBar.language.title')"
              class="m-avatar-img m-nav-sub-menu"
            ></div>
            <hr
              style="margin: auto; width: 134px; border: 1px solid black !important"
              class="mb-2"
            />
            <div
              v-for="(item, i) in langItems"
              :key="i"
              :value="item"
              class="m-avatar-img m-nav-sub-menu"
              @click="handleLanguageDropdown(item)"
              :class="language == item.value ? 'nav-lang-selected-item' : ''"
            >
              <div>{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-theme-toggle">
        <input type="checkbox" id="m-theme-toggle" v-model="soundCheckBox" />
        <label for="m-theme-toggle">
          <div class="dark">
            <inline-svg
              :src="icon_public_46"
              width="16"
              :transform-source="onIconTransform"
            ></inline-svg>
            <p class="text-700-10 ml-1">{{ t("navBar.sound_mode.on") }}</p>
          </div>
          <div class="light">
            <inline-svg
              :src="icon_public_47"
              width="16"
              :transform-source="offIconTransform"
            ></inline-svg>
            <p class="text-700-10 ml-1">{{ t("navBar.sound_mode.off") }}</p>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-space-between {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  margin-top: 20px;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
      font-size: 10px;
      font-weight: 700;
    }
  }
}

.m-vip-login-bonus {
  position: relative;
  margin: 0px 14px;
  width: 164px;
  height: 32px;
  background: #009b3a;
  box-shadow: 0px 4px 0px 0px #0e5e50;
  border-radius: 4px;
}

.m-vip-login-bonus-text {
  position: absolute;
  left: 60px;
  top: 2px;
}

.m-refer-earn {
  position: relative;
}

.m-refer-earn-text {
  position: absolute;
  top: 20px;
  left: 72px;
}

.m-earn-img {
  position: absolute;
  top: 0px;
  left: 16px;
}

.m-vip-login-bonus-img {
  width: 38px;
  height: 38px;
  position: absolute;
  left: 17px;
  bottom: 2px;
}

.m-lucky-wheel-img {
  width: 46px;
  height: 46px;
  position: absolute;
  left: 11px;
  bottom: -2px;
}

.m-vip-login-bonus-img-1 {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 7px;
  top: -5px;
}

.m-lucky-wheel {
  position: relative;
  margin: 0px 14px;
  width: 164px;
  height: 32px;
  border-radius: 4px;
  background: #f9bc01;
  box-shadow: 0px -4px 0px 0px #d99504 inset;
}

.nav-lang-selected-item {
  border: 1px solid #00b25c;
  margin: 5px;
  border-radius: 14px;
}

.m-nav-background {
  background: #1d2027;
}

// casino and sport toggle switch
.m-casino-toggle {
  label {
    width: 100%;
    height: 34px;
    position: relative;
    display: block;
    background: #15161c;
    border-radius: 20px !important;
    box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
      inset 0px -5px 15px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: 0.3s;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
    }

    .casino {
      left: 14px;
      transition: 0.3s;
      color: black;

      img {
        width: 16px;
        // height: 24px;
        margin-right: 4px;
      }

      p {
        font-size: 10px;
      }
    }

    .sport {
      left: calc(50% + 10px);
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 16px;
        margin-right: 4px;
      }

      p {
        font-size: 10px;
      }
    }
  }

  label:after {
    content: "";
    width: 50%;
    height: 30px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #009b3a;
    border-radius: 18px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked + label:after {
    left: 100%;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 100px;
  }

  input:checked + label .casino {
    color: #7782aa;
  }

  input:checked + label .sport {
    color: black;
  }
}

.m-card-title {
  color: #d99504;
  font-weight: 700;
  font-size: 12px;
}

.m-more-font {
  font-weight: 500;
  font-size: 10px;
  color: #7782aa;
}

.m-right-btn {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 6px;
  right: 0px;
}

.m-img-width {
  width: 100%;
  margin-top: 4px;
}

.m-spin-img-width {
  width: 100%;
  margin-top: 4px;
}

.m-earn-free-img {
  width: 100%;
}

.m-avatar-img {
  min-height: 40px !important;
}

.m-vip-club {
  min-height: 40px !important;
}

.m-casino-sub-img {
  min-height: 40px !important;
}

.divider {
  width: 122px;
  margin: auto;
}

.m-language-item {
  border-radius: 8px;
  background: var(--text-box-1211-f-31, #15161c);

  /* Text Box */
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

// dark and light toggle switch
.m-theme-toggle {
  height: 50px;

  label {
    width: 164px;
    height: 32px;
    position: relative;
    display: block;
    background: #15161c;
    border-radius: 18px !important;
    cursor: pointer;
    transition: 0.3s;
    margin: auto;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
    }

    .dark {
      left: 20px;
      transition: 0.3s;
      color: white;

      img {
        width: 16px;
        height: 16px;
      }
    }

    .light {
      left: 98px;
      transition: 0.3s;
      color: #7782aa;

      img {
        width: 16px;
      }
    }
  }

  label:after {
    content: "";
    width: 80px;
    height: 28px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #23262f;
    border-radius: 18px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  input:checked + label:after {
    left: 162px;
    transform: translateX(-100%);
  }

  label:active:after {
    width: 80px;
  }

  input:checked + label .dark {
    color: #7782aa;
  }

  input:checked + label .light {
    color: white;
  }
}

.m-original-dropdown {
}

.m-navbar-free-money-img-position {
  position: absolute;
  left: 14px;
  top: 0px;
}

.m-navbar-free-money-text-position {
  position: absolute;
  left: 50px;
  top: 10px;
}

.m-navbar-task-img-position {
  position: absolute;
  left: 6px;
  top: -6px;
}

.m-navbar-task-text-position {
  position: absolute;
  left: 48px;
  top: 2px;
}

.m-navbar-unlock-text-left-position {
  position: absolute;
  left: 48px;
  top: 20px;
  font-size: 12px;
}

.m-navbar-spin-img-position {
  position: absolute;
  left: 4px;
  top: 2px;
}

.m-navbar-spin-text-position {
  position: absolute;
  left: 48px;
  top: 2px;
}

.m-navbar-unlock-text-right-position {
  position: absolute;
  left: 48px;
  top: 20px;
  font-size: 12px;
}
</style>

