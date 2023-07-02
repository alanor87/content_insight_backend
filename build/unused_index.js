"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const string_decoder_1 = require("string_decoder");
const server = (0, http_1.createServer)((req, res) => {
    const decode = new string_decoder_1.StringDecoder("utf-8");
    let resourceContent;
    let buffer = "";
    req
        .on("data", (data) => {
        buffer += decode.write(data);
    })
        .on("end", () => {
        try {
            buffer += decode.end();
            res.setHeader("access-control-allow-origin", "*");
            const requestedResource = req.url.split("/").at(-1) || "index.html";
            switch (requestedResource) {
                case "":
                case "index.html": {
                    resourceContent = (0, fs_1.readFileSync)(path_1.default.join(process.cwd(), `./build/public/index.html`), { encoding: "utf-8" });
                    res.setHeader("content-type", "text/html");
                    break;
                }
                case "index.js": {
                    resourceContent = (0, fs_1.readFileSync)(path_1.default.join(process.cwd(), `./build/public/index.js`), { encoding: "utf-8" });
                    res.setHeader("content-type", "text/javascript");
                    break;
                }
                case "styles.css": {
                    resourceContent = (0, fs_1.readFileSync)(path_1.default.join(process.cwd(), `./build/public/styles.css`), { encoding: "utf-8" });
                    res.setHeader("content-type", "text/css");
                    break;
                }
                case "question": {
                    const { question } = JSON.parse(buffer);
                    // getRequestCompletion(question).then((response) => {
                    //   console.log("response : ", response);
                    //   res
                    //     .setHeader("content-type", "application/json")
                    //     .end(JSON.stringify({ response }));
                    // });
                    return;
                }
                default: {
                    res.writeHead(404).end();
                    return;
                }
            }
            res.writeHead(200);
            res.end(resourceContent);
        }
        catch (e) {
            res.writeHead(500);
            res.end("Server error.", e);
        }
    });
});
server.listen(3300, () => {
    console.log("Server is listening on port 3300");
});
