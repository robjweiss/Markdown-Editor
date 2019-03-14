import React from "react";
import { Markup } from 'interweave';
import HTMLContainer from "./HTMLContainer"
import ReactDOMServer from 'react-dom/server';
const showdown = require("showdown");
const converter = new showdown.Converter();

class Markdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            value: '',
            html: '',
            htmlURL: '',
            markdownURL:  '',
            urlsHidden: true
        };

        this.titleChange = this.titleChange.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    titleChange(event) {
        this.setState({ title: event.target.value });
    }

    valueChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // Blob and URL for markdown
        let markdownBlob = new Blob([this.state.value], {type: 'text/markdown'});
        markdownBlob.name = "test.md";
        let markdownURL = URL.createObjectURL(markdownBlob);
        this.setState({ markdownURL: markdownURL });

        // Parse markdown to HTML
        let html = converter.makeHtml(this.state.value);
        this.setState({ html: html });

        // Blob and URL for HTML
        let validHTML = ReactDOMServer.renderToString(<HTMLContainer content={html} />);
        let htmlBlob = new Blob(["<!doctype html>" + validHTML], {type: 'text/html'});
        let htmlURL = URL.createObjectURL(htmlBlob);
        this.setState({ htmlURL: htmlURL });

        // Show URLs for the blobs
        this.setState({ urlsHidden: false });

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-title">Title</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-title" value={this.state.title} onChange={this.titleChange} />
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <textarea class="form-control" rows="5" placeholder="# Write some markdown here" value={this.state.value} onChange={this.valueChange} />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <Markup content={this.state.html} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <a href={this.state.markdownURL} download={this.state.title + ".md"} hidden={this.state.urlsHidden}>Download Markdown</a>
                    </div>
                    <div className="col-md-6">
                        <a href={this.state.htmlURL} download={this.state.title + ".html"} hidden={this.state.urlsHidden}>Download HTML</a>
                    </div>
                </div>
            </div>


        );
    }
}

export default Markdown;