import React from "react";
import { Markup } from 'interweave';

const bodyStyle = {
    color: '#1e314f',
    fontFamily: 'Arial, Helvetica, sans-serif'
};

// Container for markdown download
class HTMLContainer extends React.Component {

    render() {
        return (
            <html lang="en">

                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>Markdown Viewer</title>
                </head>

                <body style={bodyStyle}>
                    <Markup content={this.props.content} />
                </body>

            </html>
        );
    }
}

export default HTMLContainer;