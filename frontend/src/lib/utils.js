export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
// src/lib/utils.js



export const getLanguageFlag = (language) => {
    switch (language.toLowerCase()) {
        case "english": return "🇬🇧"; // or 🇺🇸
        case "spanish": return "🇪🇸";
        case "french": return "🇫🇷";
        case "german": return "🇩🇪";
        case "italian": return "🇮🇹";
        case "portuguese": return "🇵🇹";
        case "chinese": return "🇨🇳";
        case "japanese": return "🇯🇵";
        case "korean": return "🇰🇷";
        case "arabic": return "🇦🇪"; // or other relevant flag
        case "russian": return "🇷🇺";
        case "hindi": return "🇮🇳";
        case "bengali": return "🇧🇩";
        case "punjabi": return "🇵🇰";
        case "urdu": return "🇵🇰";
        case "turkish": return "🇹🇷";
        case "vietnamese": return "🇻🇳";
        case "thai": return "🇹🇭";
        case "indonesian": return "🇮🇩";
        case "dutch": return "🇳🇱";
        case "swedish": return "🇸🇪";
        case "norwegian": return "🇳🇴";
        case "danish": return "🇩🇰";
        case "finnish": return "🇫🇮";
        case "greek": return "🇬🇷";
        case "hebrew": return "🇮🇱";
        case "polish": return "🇵🇱";
        case "romanian": return "🇷🇴";
        case "ukrainian": return "🇺🇦";
        case "czech": return "🇨🇿";
        case "slovak": return "🇸🇰";
        case "hungarian": return "🇭🇺";
        case "bulgarian": return "🇧🇬";
        case "croatian": return "🇭🇷";
        case "serbian": return "🇷🇸";
        case "swahili": return "🇰🇪"; // or other relevant flag
        case "amharic": return "🇪🇹";
        case "yoruba": return "🇳🇬";
        case "igbo": return "🇳🇬";
        case "hausa": return "🇳🇪";
        default: return "🌐"; // Generic globe icon for unknown languages
    }
};