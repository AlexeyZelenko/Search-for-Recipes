import axios from 'axios';

const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY;

interface TranslateParams {
    auth_key: string;
    text: string;
    target_lang: string;
}

export const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (!DEEPL_API_KEY) {
        console.warn('DeepL API key is missing. Skipping translation.');
        return text;
    }

    try {
        console.log(`Translating text: "${text}" to ${targetLang}`);

        // Определяем параметры перевода с явным типом
        const params: TranslateParams = {
            auth_key: DEEPL_API_KEY,
            text: text,
            target_lang: targetLang,
        };

        const response = await axios.post('https://api-free.deepl.com/v2/translate',
            null,
            {
                params: params,
            });

        if (response.data.translations && response.data.translations.length > 0) {
            const translation = response.data.translations[0].text;
            console.log(`Translation result: "${translation}"`);
            return translation;
        } else {
            console.warn('No translations found in the response.');
            return text;
        }
    } catch (error) {
        console.error('Error in translation:', error);
        return text; // Return original text if translation fails
    }
};


export const getLanguages = () => {
    return [
        { code: 'EN', name: 'English' },
        { code: 'DE', name: 'German' },
        { code: 'FR', name: 'French' },
        { code: 'ES', name: 'Spanish' },
        { code: 'IT', name: 'Italian' },
        { code: 'JA', name: 'Japanese' },
        { code: 'NL', name: 'Dutch' },
        { code: 'PL', name: 'Polish' },
        { code: 'PT', name: 'Portuguese' },
        { code: 'RU', name: 'Russian' },
        { code: 'ZH', name: 'Chinese (simplified)' },
        { code: 'UK', name: 'Ukrainian' },
    ];
};