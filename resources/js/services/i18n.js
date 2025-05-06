import { createI18n } from "vue-i18n";
import uz from "@/locales/uz.json";
import en from "@/locales/en.json";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem("locale") || "uz",
    fallbackLocale: "uz",
    messages: {
        en,
        uz,
    },
});

export default i18n;
