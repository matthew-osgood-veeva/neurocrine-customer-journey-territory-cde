import 'bootstrap';
import { defineCustomElement, h, watch } from 'vue';
import { CDE_NAME, CDE_PROPS } from './cde-config';
import { createPinia, setActivePinia } from 'pinia';
import { useAppStore } from './store/modules/appStore';
import { isOnline } from '@/lib/helper/commonUtils';
import { i18n, initI18n } from '@/i18n/setup';
import fontAwesomeCss from '@fortawesome/fontawesome-svg-core/styles.css?raw';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';
import mainCss from '@/assets/styles/main.css?raw';
import xPagesCss from '@/assets/styles/x-pages.css?raw';
import themeMobileCss from '@/assets/styles/themes/theme-mobile.css?raw';
import themeOnlineCss from '@/assets/styles/themes/theme-online.css?raw';
import App from './App.vue'

const bootstrapPatchedCss = bootstrapCss.replace(':root', ':host');

const MyComponentElement = defineCustomElement({
  styles: [
    // Inject styles into the shadow DOM
    bootstrapPatchedCss,
    bootstrapCss,
    fontAwesomeCss,
    mainCss,
    xPagesCss,
    themeMobileCss,
    themeOnlineCss
  ],
  props: {
    ...CDE_PROPS
  },
  render() {
    return h(App, this.$props)
  },
  configureApp(app) {
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
    // Creates i18n with default values and empty messages
    app.use(i18n);
  },
  setup(props) {
    const appStore = useAppStore();
    appStore.isOnline = isOnline();
    // Set i18n messages if available
    if(props.veevaMessages?.length){
      initI18n(props.userLanguageCode, props.veevaMessages);
    }
    appStore.saveData(props);
    watch(
      () => ({ ...props }),
      (newProps) => {
        appStore.saveData(newProps);
      },
      { deep: true, immediate: true }
    );
  }
})

// Register the custom element
window.customElements.define(CDE_NAME, MyComponentElement);