import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from "./languages/en.json";
import de from "./languages/de.json";

i18n.fallbacks = true;
i18n.translations = {de, en};
i18n.locale = Localization.locale;
i18n.defaultLocale = 'en';

export default i18n;
