import { useAppStore } from '@/store/modules/appStore';

const THEME_CLASSES = {
  online: "theme-online",
  mobile: "theme-mobile",
};

export const detectDeviceTheme = () => {
  // eslint-disable-next-line
  const appStore = useAppStore();
  // return appStore.isOnline ? "online" : "mobile";
  // Force mobile theme
  // return 'mobile';
  return "online";
};

export const getThemeClass = () => {
  const theme = THEME_CLASSES[detectDeviceTheme()] ?? 'theme-mobile';
  console.log(`Theme applied: ${theme}`)
  return theme;
};