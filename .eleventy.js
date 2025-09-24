const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

module.exports = function(eleventyConfig) {

    // Dieser Filter ist nötig, damit formatierter Text aus Contentful korrekt als HTML angezeigt wird.
    eleventyConfig.addFilter("richText", (value) => {
        return documentToHtmlString(value);
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

    // Dieser Filter macht aus Namen URL-freundliche Strings (z.B. "Jacob Jahns" -> "jacob-jahns").
    eleventyConfig.addFilter("slug", (str) => {
        return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    });

    return {
        dir: {
            input: ".",
            output: "_site",
            data: "_data"
        }
    };
};