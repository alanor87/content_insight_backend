(() => {
  try {
    // Getting user settings from the data-attributes of the <script> tag.
    const scriptSettings = document.querySelector(
      "#content_insight_widget"
    )?.dataset; // Attributes name - lowercase.
    const projectId = scriptSettings.projectid; // projectid data.
    const userId = scriptSettings.userid; // projectid data.
    const completionsURL = scriptSettings.completionsurl; // backend address.
    const customStyles = getCustomStyles(scriptSettings.customstyles); // custom style properties.

    // Creating shadow root div wrapper for styles isolation.
    const shadowRootWrapper = document.createElement("div");
    shadowRootWrapper.setAttribute("id", "content_insight_widget_wrapper");
    const shadowDOM = shadowRootWrapper.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    document.body.append(shadowRootWrapper);

    // Creating style tag for the shadowDOM inner styling.
    const styleTag = document.createElement("style");

    const elements = {
      chatPopup: {
        type: "div",
        class: "content_insight_chat_popup",
        style: `
      { 
           position: fixed;
           bottom: 10px;
           right: 10px;
           width: 330px;
           border-radius: ${customStyles?.borderRadius || "10px"};
           font-size: 14px;
           overflow: hidden;
           box-shadow: 2px 2px 5px 1px black;
         }
         .content_insight_chat_popup.closed {
          width: 30px;
          height: 25px;
         }`,
        children: {
          header: {
            type: "div",
            class: "content_insight_header",
            innerHTML: "Help",
            style: ` 
        {
          position: relative;
          display: flex;
          justify-content: center;
          background-color: ${customStyles?.headerColor || "rgb(77, 23, 28)"};
          padding: 5px;
          font-family: system-ui, Arial, sans-serif;
          font-weight: bold;
          color: white;
        }`,
            children: {
              toggleButton: {
                type: "button",
                class: "content_insight_toggle-button",
                innerHTML: "_",
                title: "open / close",
                eventListeners: [
                  {
                    type: "click",
                    func: () =>
                      getElement(
                        ".content_insight_chat_popup"
                      ).classList.toggle("closed"),
                  },
                ],
                style: `
            {
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              padding: 0 11px;
              color: white;
              background-color: transparent;
              border: none;
              cursor: pointer;
            }
            `,
              },
            },
          },
          content: {
            type: "div",
            class: "content_insight_content",
            style: `
          {
           display: flex;
           gap: 10px;
           flex-wrap: wrap;
           padding: 10px;
          }`,
            children: {
              inputWrapper: {
                type: "div",
                class: "content_insight_input_wrapper",
                style: ` 
              {
                display: flex;
                gap: 5px;
                width: 100%;
                border-radius: 5px;
                padding: 10px 12px;
                background-color: ${
                  customStyles?.inputBackgroundColor || "white"
                };
                border: 1px solid grey;
              }
              .content_insight_input_wrapper button {
                border: none;
                background-color: transparent;
                padding: 0;
                cursor: pointer;
              }
              .content_insight_input_wrapper input {
                flex-grow: 1;
                border: none;
                outline: none;
              }`,
                children: {
                  svgQuestion: {
                    type: "svg",
                    namespaceURI: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    focusable: "false",
                    children: {
                      circle: {
                        type: "circle",
                        namespaceURI: "http://www.w3.org/2000/svg",
                        cx: "6",
                        cy: "6",
                        r: "5.5",
                        fill: "none",
                        stroke: "black",
                      },
                      path: {
                        type: "path",
                        namespaceURI: "http://www.w3.org/2000/svg",
                        stroke: "black",
                        "stroke-linecap": "round",
                        d: "M15 15l-5-5",
                      },
                    },
                  },
                  questionInput: {
                    type: "input",
                    class: "content_insight_question_input",
                    placeholder: "How can we help?",
                    style: `{background-color: transparent;}`,
                    eventListeners: [
                      { type: "keydown", func: sendQuestionRequest },
                    ],
                  },
                  clearButton: {
                    type: "button",
                    class: "content_insight_clear_button",
                    eventListeners: [
                      {
                        type: "click",
                        func: () => {
                          getElement(".content_insight_question_input").value =
                            "";
                          getElement(
                            ".content_insight_response_block"
                          ).innerHTML = "";
                          getElement(
                            ".content_insight_ask_button"
                          ).style.setProperty("display", "block");
                        },
                      },
                    ],
                    children: {
                      icon: {
                        type: "svg",
                        namespaceURI: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        focusable: "false",
                        children: {
                          path: {
                            type: "path",
                            namespaceURI: "http://www.w3.org/2000/svg",
                            stroke: "black",
                            "stroke-linecap": "round",
                            d: "M3 13L13 3m0 10L3 3",
                          },
                        },
                      },
                    },
                  },
                },
              },

              askButton: {
                type: "button",
                title: "Send question request",
                class: "content_insight_ask_button",
                innerHTML: "Ask!",
                eventListeners: [{ type: "click", func: sendQuestionRequest }],
              },

              responseBlock: {
                type: "div",
                class: "content_insight_response_block",
                style: `
              {
                white-space: break-spaces;
              }
              `,
              },
            },
          },
        },
      },
    };

    /** Extraction of custom styles from the script user settings. */
    function getCustomStyles(stylesObject) {
      try {
        return JSON.parse(stylesObject.replaceAll("'", '"'));
      } catch (e) {
        return "";
      }
    }

    /** Querying elements from inside of the shadowDOM. */
    function getElement(filter) {
      return shadowRootWrapper.shadowRoot.querySelector(filter);
    }

    /** Assembling widget DOM. */
    function assembleWidget(elementsList) {
      const elements = Object.entries(elementsList).map(([_, value]) => {
        const {
          type,
          style,
          innerHTML,
          namespaceURI,
          eventListeners,
          children,
          ...attributes
        } = value;

        // Creating DOM element. *NS methods - for SVG and its children.
        const element = namespaceURI
          ? document.createElementNS(namespaceURI, type)
          : document.createElement(type);

        // Setting DOM element attributes. *NS methods - for SVG and its children.
        Object.entries(attributes).forEach(([attrName, attrValue]) => {
          namespaceURI
            ? element.setAttributeNS(null, attrName, attrValue)
            : element.setAttribute(attrName, attrValue);
        });

        // Attaching event listeners.
        if (eventListeners) {
          eventListeners.forEach((listener) => {
            element.addEventListener(listener.type, listener.func);
          });
        }

        if (innerHTML) element.innerHTML = innerHTML;

        // Adding to style declaration string.
        if (style)
          styleTag.innerHTML += `
          .${attributes.class} ${style}
          `;

        // Appending children
        if (children) element.append(...assembleWidget(children));

        return element;
      });

      return elements;
    }

    async function sendQuestionRequest(e) {
      // Need these for correct work in shadowDOM.
      if (e.key === "Backspace" || e.key === "Delete") {
        e.stopPropagation();
      }
      if (e.key && e.key !== "Enter") return;
      const question = getElement(".content_insight_question_input").value;
      if (!question) return;

      const { response } = await fetch(completionsURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          projectId,
          question,
        }),
      }).then((res) => res.json());

      getElement(".content_insight_ask_button").style.setProperty(
        "display",
        "none"
      );
      getElement(".content_insight_response_block").textContent = response;
      console.log("question : ", question, "\n", "response : ", response);
    }

    function init() {
      if (!projectId) throw Error("Missing projectId.");
      if (!userId) throw Error("Missing userId.");
      if (!Boolean(new URL(completionsURL)))
        throw Error("Incorrect completionsURL.");

      shadowDOM.append(styleTag);
      shadowDOM.append(...assembleWidget(elements));
      console.log("%ccontent_insight script is loaded.", "color: green");
    }

    init();
  } catch (error) {
    console.error("content_insight script loading failed.", error);
  }
})();
