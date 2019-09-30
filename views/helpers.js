const helpers = {
    // allow any section to be defined in hbs using {{{_sections.section_name}}}
    // this can then be fulfilled using {{#section 'css'}}Section html{{/section}}
    section: function(name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
};


module.exports.helpers = helpers;