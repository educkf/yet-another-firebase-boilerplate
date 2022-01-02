Object.defineProperty(Object.prototype, 'planify', {
    value: function (value) {
        if (value) {
            return JSON.parse(JSON.stringify(value))
        }
        return JSON.parse(JSON.stringify(this));
    }
});
