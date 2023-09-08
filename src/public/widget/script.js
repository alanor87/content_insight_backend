(async () => {
  try {
    // Getting user settings from the data-attributes of the <script> tag.
    const scriptSettings = document.querySelector(
      "#clarify_bot_widget"
    )?.dataset; // Attributes name - lowercase.
    const projectId = scriptSettings.projectid; // projectid data.
    const userId = scriptSettings.userid; // projectid data.
    const backendURL = scriptSettings.backendurl; // backend address.
    const customStyles = await getWidgetStyles(); // custom style properties.

    // Creating shadow root div wrapper for styles isolation.
    const shadowRootWrapper = document.createElement("div");
    shadowRootWrapper.setAttribute("id", "clarify_bot_widget_wrapper");
    shadowRootWrapper.setAttribute(
      "style",
      "position: absolute; z-index: 10000;"
    );
    const shadowDOM = shadowRootWrapper.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    document.body.append(shadowRootWrapper);

    // Creating style tag for the shadowDOM inner styling.
    const styleTag = document.createElement("style");
    // Adding the animations keyframes.
    styleTag.innerHTML += `
    @keyframes shadowAnimation {
      0% {
        box-shadow: 0 0 10px 10px  ${
          customStyles?.widgetHeaderColor || "rgb(77, 23, 28)"
        };
        transform: scale(1);
      }
      50% {
        transform: scale(0.8);
      }
      100% {
        box-shadow: 0 0 30px 10px  ${
          customStyles?.widgetHeaderColor || "rgb(77, 23, 28)"
        };
        transform: scale(1);
      }
    }
    @keyframes animationInner {
      0% {
        box-shadow: inset 0 0 0 0  ${
          customStyles?.widgetHeaderColor || "rgb(77, 23, 28)"
        };
        transform: scale(0);
      }
      50% {
        box-shadow: inset 0 0 10px 10px  ${
          customStyles?.widgetBackgroundColor || "rgb(77, 23, 28)"
        };
      }
      100% {
        box-shadow: inset 0 0 20px 20px  ${
          customStyles?.widgetHeaderColor || "rgb(77, 23, 28)"
        };
        transform: scale(1);
      }
    }
    `;

    const elements = {
      chatPopup: {
        type: "div",
        class: "clarify_bot_chat_popup",
        style: `
      { 
           position: fixed;
           bottom: 10px;
           right: 10px;
           width: 330px;
           background-color: ${
             customStyles?.widgetBackgroundColor || "#f0f0f0"
           };
           border-style: solid;
           border-color: ${customStyles?.widgetBorderColor || "#f0f0f0"};
           border-radius: ${(customStyles?.widgetBorderRadius || "5") + "px"};
           border-width: ${(customStyles?.widgetBorderWidth || "0") + "px"};
           font-size: 14px;
           overflow: hidden;
           box-shadow: 2px 2px 5px 1px black;
         }

         .clarify_bot_chat_popup.closed {
          width: 60px;
          height: 30px;
         }
        `,
        children: {
          header: {
            type: "div",
            class: "clarify_bot_header",
            innerHTML: "Help",
            style: ` 
        {
          position: relative;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${
            customStyles?.widgetHeaderColor || "rgb(77, 23, 28)"
          };
          padding: 5px;
          font-family: system-ui, Arial, sans-serif;
          font-weight: bold;
          color: white;
        }`,
            children: {
              toggleButton: {
                type: "button",
                class: "clarify_bot_toggle-button",
                innerHTML: "_",
                title: "open / close",
                eventListeners: [
                  {
                    type: "click",
                    func: () => {
                      const toggleButtonRef = getElement(
                        ".clarify_bot_toggle-button"
                      );
                      const popupRef = getElement(
                        ".clarify_bot_chat_popup"
                      );
                      popupRef.classList.toggle("closed");
                      toggleButtonRef.style = popupRef.classList.contains(
                        "closed"
                      )
                        ? "width: 100%; opacity: 0"
                        : "";
                    },
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

            .clarify_bot_chat_popup.closed .clarify_bot_toggle-button{
              font-size: 2em;
             }
            `,
              },
            },
          },
          content: {
            type: "div",
            class: "clarify_bot_content",
            style: `
          {
           position: relative;
           display: flex;
           gap: 10px;
           flex-wrap: wrap;
           padding: 10px;
          }`,
            children: {
              inputWrapper: {
                type: "div",
                class: "clarify_bot_input_wrapper",
                style: ` 
              {
                display: flex;
                gap: 5px;
                width: 100%;
                border-radius: 5px;
                padding: 10px 12px;
                background-color: white;
                border: 1px solid grey;
              }
              .clarify_bot_input_wrapper button {
                border: none;
                background-color: transparent;
                padding: 0;
                cursor: pointer;
              }
              .clarify_bot_input_wrapper input {
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
                    class: "clarify_bot_question_input",
                    placeholder: "How can we help?",
                    style: `{background-color: transparent;}`,
                    eventListeners: [
                      { type: "keydown", func: sendQuestionRequest },
                    ],
                  },
                  clearButton: {
                    type: "button",
                    class: "clarify_bot_clear_button",
                    eventListeners: [
                      {
                        type: "click",
                        func: () => {
                          getElement(".clarify_bot_question_input").value =
                            "";
                          getElement(
                            ".clarify_bot_response_block"
                          ).innerHTML = "";
                          getElement(
                            ".clarify_bot_ask_button"
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
                class: "clarify_bot_ask_button",
                innerHTML: "Ask!",
                eventListeners: [{ type: "click", func: sendQuestionRequest }],
              },

              responseBlock: {
                type: "div",
                class: "clarify_bot_response_block",
                style: `
              {
                white-space: break-spaces;
                max-height: 300px;
                overflow-y: auto;
              }
              `,
              },

              spinner: {
                type: "div",
                class: "clarify_bot_spinner_backdrop",
                style: `
          {
            position: absolute;
            display: none;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            z-index: 4;
          }`,
                children: {
                  spinnerContainerWrapper: {
                    type: "div",
                    class: "clarify_bot_spinner_container_wrapper",
                    style: `
                     {
                       position: absolute;
                       top: 50%;
                       left: 50%;
                       transform: translate(-50%, -50%);
                     }`,
                    children: {
                      spinnerContainer: {
                        type: "div",
                        class: "clarify_bot_spinner_container",
                        style: `
                             {
                              width: 20px;
                              height: 20px;
                              border-radius: 50%;
                              background-color: ${
                                customStyles?.widgetHeaderColor ||
                                "rgb(77, 23, 28)"
                              };
                              animation-name: shadowAnimation;
                              animation-duration: 4s;
                              animation-direction: alternate;
                              animation-timing-function: ease-in-out;
                              animation-iteration-count: infinite;
                             }`,
                        children: {
                          spinnerInnerContainer: {
                            type: "div",
                            class: "clarify_bot_spinner_inner_container",
                            style: `
                                       {
                                        position: absolute;
                                        width: 20px;
                                        height: 20px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        border-radius: 50%;
                                        animation-name: animationInner;
                                        animation-duration: 4s;
                                        animation-iteration-count: infinite;
                                        animation-timing-function: ease-in-out;
                                        pointer-events: none;
                                       }`,
                          },
                        },
                      },
                      spinnerText: {
                        type: "span",
                        class: "clarify_bot_spinner_text",
                        style: `
                                   {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    font-weight: 600;
                                    transform: translate(-50%, -50%);
                                    white-space: nowrap;
                                    user-select: none;
                                   }`,
                        innerHTML: "thinking...",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    async function getWidgetStyles() {
      const widgetStyles = await fetch(backendURL + "/widget/getWidgetStyles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
      })
        .then((res) => res.json())
        .catch((e) =>
          console.error("%cCould not fetch widget styles : ", e.message)
        );

      return widgetStyles;
    }

    /** Query elements from inside of the shadowDOM. */
    function getElement(filter) {
      return shadowRootWrapper.shadowRoot.querySelector(filter);
    }

    /** Assembly of widget DOM. */
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

        // Appending children recursively.
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
      const question = getElement(".clarify_bot_question_input").value;
      if (!question) return;
      const completionsURL = backendURL + "/api/v1/getCompletion";
      getElement(".clarify_bot_spinner_backdrop").style.setProperty(
        "display",
        "flex"
      );
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

      getElement(".clarify_bot_ask_button").style.setProperty(
        "display",
        "none"
      );
      getElement(".clarify_bot_spinner_backdrop").style.setProperty(
        "display",
        "none"
      );
      getElement(".clarify_bot_response_block").textContent = response;
      console.log("question : ", question, "\n", "response : ", response);
    }

    function init() {
      if (!projectId) throw Error("Missing projectId.");
      if (!userId) throw Error("Missing userId.");
      if (!Boolean(new URL(backendURL))) throw Error("Incorrect backendURL.");

      shadowDOM.append(styleTag);
      shadowDOM.append(...assembleWidget(elements));
      console.log("%cclarify_bot script is loaded.", "color: green");
    }

    init();
  } catch (error) {
    console.error("clarify_bot script loading failed.", error);
  }
})();
