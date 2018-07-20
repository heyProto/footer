import React from 'react';
import { render, hydrate } from 'react-dom';
import Card from './src/js/card.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toFooter = function() {
    this.cardType = 'FooterCard';
}

ProtoGraph.Card.toFooter.prototype.init = function(options) {
    this.options = options;
}

ProtoGraph.Card.toFooter.prototype.getData = function(data) {
    return this.containerInstance.exportData();
}

ProtoGraph.Card.toFooter.prototype.renderLaptop = function(data) {
    this.mode = 'laptop';
    this.render();
}


ProtoGraph.Card.toFooter.prototype.renderScreenshot = function(data) {
    this.mode = 'screenshot';
    this.render();
}

ProtoGraph.Card.toFooter.prototype.render = function() {
    if(this.options.isFromSSR){
        hydrate(
            <Card
                mode={this.mode || "col3"}
                dataJSON={this.options.initialState.dataJSON}
            />,
            this.options.selector
        );
    } else {
        render(
            <Card
                dataURL = { this.options.data_url }
                schemaURL = { this.options.schema_url }
                siteConfigs = { this.options.site_configs }
                siteConfigURL = { this.options.site_config_url }
                mode = { this.mode || "col3"}
                ref = {
                    (e) => {
                        this.containerInstance = this.containerInstance || e;
                    }
                }
            />,
            this.options.selector
        );
    }
}