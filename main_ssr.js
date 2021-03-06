import React from 'react'
import { renderToString } from 'react-dom/server'
import Footer from './src/js/card.jsx'

global.window = {};

// function renderWithMode(mode) {
//     switch (mode) {
//         case "col7":
//             return "x.renderCol7()";
//         case "col4":
//             return "x.renderCol4()";
//         case "col3":
//             return "x.renderCol3()";
//         default:
//             return "x.renderCol4()";
//     }
// }

// function getScriptString(mode, dataJSON, selector, site_configs) {
//     return `<script>
//             var x = new ProtoGraph.Card.toFooter(),
//                 params = {
//                     "selector": document.querySelector('${selector}'),
//                     "isFromSSR": true,
//                     "initialState": ${JSON.stringify(dataJSON)},
//                     "site_configs": ${JSON.stringify(site_configs)}
//                 };
//             x.init(params);
//             ${renderWithMode(mode)}
//         </script>
//     `
// }

function render(initialState) {
    let content = renderToString(
        <Footer
            dataJSON={initialState.dataJSON}
            mode={"laptop"}
            renderingSSR={true}
        />
    );

    return { content, initialState };
}

module.exports = {
    render: render,
    // getScriptString: getScriptString,
    instance: 'toFooter'
}