import { createI18n } from "vue-i18n";
import uz from "@/locales/uz.json";
import en from "@/locales/en.json";

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale"),
    messages: {
        en,
        uz,
    },
});

export default i18n;
