(function () {
    'use strict';

    angular
        .module('app')
        .factory('UpdateMetaService', UpdateMetaService);

    UpdateMetaService.$inject = ['$rootScope'];
    function UpdateMetaService($rootScope) {
        let service = {};
        service.setTitle = setTitle;
        service.setMetaName = setMetaName;
        service.setMetaProperty = setMetaProperty;
        service.setMetaItemProp = setMetaItemProp;

        return service;

        function setTitle(title) {
            document.title = title || 'LastRound TV';
        }

        /**
         * 
         * @param {*} metaobject { description:'Contact',keyword:'Contact Us'}
         * 
         */
        function setMetaName(metaobject) {
            if (!metaobject)
                return;
            for (const key in metaobject) {
                if (metaobject.hasOwnProperty(key)) {
                    const meta = metaobject[key];
                    let el = window.document.querySelector('meta[name="' + key + '"]');
                    if (el)
                        window.document.querySelector('meta[name="' + key + '"]').setAttribute("content", meta);
                    else {
                        var newMetaNode = document.createElement('meta');
                        newMetaNode.name = key;
                        newMetaNode.content = meta;
                        document.getElementsByTagName('head')[0].appendChild(newMetaNode);
                    }
                }
            }
        }
        /**
         * 
         * @param {*} metaobject { description:'Contact',keyword:'Contact Us'}
         * 
         */
        function setMetaProperty(metaobject) {
            if (!metaobject)
                return;
            for (const key in metaobject) {
                if (metaobject.hasOwnProperty(key)) {
                    const meta = metaobject[key];
                    let el = window.document.querySelector('meta[property="' + key + '"]');
                    if (el)
                        window.document.querySelector('meta[property="' + key + '"]').setAttribute("content", meta);
                    else {
                        var newMetaNode = document.createElement('meta');
                        newMetaNode.setAttribute('property', key);
                        newMetaNode.content = meta;
                        document.getElementsByTagName('head')[0].appendChild(newMetaNode);
                    }
                }
            }
        }
        function setMetaItemProp(metaobject) {
            if (!metaobject)
                return;
            for (const key in metaobject) {
                if (metaobject.hasOwnProperty(key)) {
                    const meta = metaobject[key];
                    let el = window.document.querySelector('meta[itemprop="' + key + '"]');
                    if (el)
                        window.document.querySelector('meta[itemprop="' + key + '"]').setAttribute("content", meta);
                    else {
                        var newMetaNode = document.createElement('meta');
                        newMetaNode.setAttribute('itemprop', key);
                        newMetaNode.content = meta;
                        document.getElementsByTagName('head')[0].appendChild(newMetaNode);
                    }
                }
            }
        }
    }
})();
