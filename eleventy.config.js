const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

module.exports = function(eleventyConfig) {
    
    // DIESER TEIL IST ENTSCHEIDEND
    // Er definiert, was der richText-Filter tun soll.
    eleventyConfig.addFilter("richText", (value) => {
        if (value) {
            return documentToHtmlString(value);
        }
        return "";
    });

    // Dieser Filter formatiert das Datum schöner.
    eleventyConfig.addFilter("readableDate", (dateObj) => {
       const date = new Date(dateObj);
       return date.toLocaleDateString("de-DE", {
           day: "2-digit",
           month: "2-digit",
           year: "numeric"
       });
    });

    return {
        dir: {
            input: ".",
            output: "_site",
            data: "_data"
        }
    };
};