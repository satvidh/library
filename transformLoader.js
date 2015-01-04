var transformLoader;

transformLoader = {
    /**
     * Use the configureCommander function to configure a commander for an option that will
     * create parameters compatible with the transformLoader.loadTransforms
     * @param  {object} commander   An instance of commander (require('commander'))
     * @param  {string} option      The option that the client program's command line will use
     *                              to load these transforms. For example, '-t --transform'
     * @param  {string} description The description of the options.
     * @return {object}             The commander instance passed into this function.
     */
    configureCommander: function (commander) {
        var transform;
        transform = function (option, description) {
            var collector,
                initialcollection,
                path;
            path = require('path');
            option += ' [module,name]';
            initialcollection = {modules: [], names: []};
            collector = function (value, collection) {
                var withoutExtension,
                    module,
                    name;
                value = value.split(',');
                module = value[0];
                name = value[1];
                withoutExtension = path.join(path.dirname(module), path.basename(module, '.js'));
                collection.modules.push(withoutExtension);
                collection.names.push(name);
                return collection;
            };
            commander.option(option, description, collector, initialcollection);
            return commander;
        };
        commander['transform'] = transform;
        return commander;
    }
};

module.exports = transformLoader;