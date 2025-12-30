const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

module.exports = function(eleventyConfig) {
    
    // WICHTIG: Das hier sorgt dafür, dass deine Bilder mit hochgeladen werden
    eleventyConfig.addPassthroughCopy("assets");

    // Filter für Rich Text
    eleventyConfig.addFilter("richText", (value) => {
        if (value) {
            return documentToHtmlString(value);
        }
        return "";
    });

    // Filter für das Datum
    eleventyConfig.addFilter("readableDate", (dateObj) => {
       if (dateObj) {
           const date = new Date(dateObj);
           return date.toLocaleDateString("de-DE", {
               day: "2-digit",
               month: "2-digit",
               year: "numeric"
           });
       }
       return "";
    });

    return {
        dir: {
            input: ".",
            output: "_site",
            data: "_data"
        }
    };
};