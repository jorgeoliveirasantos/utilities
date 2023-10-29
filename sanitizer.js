const Sanitizer = {
    Clean: (inputText) => {
        return inputText.replace(/[<>#$%(){}"&|;:/*-+?!]/g, x => {
            return '&#' + x.charCodeAt(0) + ';';
        });
    },
    Original: (sanitizedText) => {
        return sanitizedText.replace(/&#(\d+);/g, (match, code) => {
            return String.fromCharCode(code);
        });
    },
}
