import { readFileSync } from "fs";
import { createServer } from "http";
import path from "path";
import { StringDecoder } from "string_decoder";

import { getCompletion } from "./api";

const server = createServer((req, res) => {
  const decode = new StringDecoder("utf-8");
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

        const requestedResource = req.url!.split("/").at(-1) || "index.html";

        switch (requestedResource) {
          case "":
          case "index.html": {
            resourceContent = readFileSync(
              path.join(process.cwd(), `./build/public/index.html`),
              { encoding: "utf-8" }
            );
            res.setHeader("content-type", "text/html");
            break;
          }
          case "index.js": {
            resourceContent = readFileSync(
              path.join(process.cwd(), `./build/public/index.js`),
              { encoding: "utf-8" }
            );
            res.setHeader("content-type", "text/javascript");
            break;
          }
          case "styles.css": {
            resourceContent = readFileSync(
              path.join(process.cwd(), `./build/public/styles.css`),
              { encoding: "utf-8" }
            );
            res.setHeader("content-type", "text/css");
            break;
          }
          case "question": {
            const { question } = JSON.parse(buffer);
            // getCompletion(question).then((response) => {
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
      } catch (e: any) {
        res.writeHead(500);
        res.end("Server error.", e);
      }
    });
});

server.listen(3300, () => {
  console.log("Server is listening on port 3300");
});
