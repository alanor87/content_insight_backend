const refs = {
  chatPopup: document.querySelector(".chat-popup"),
  questionInput: document.querySelector("#question_input"),
  askButton: document.querySelector("#ask_button"),
  clearButton: document.querySelector("#clear_button"),
  responseBlock: document.querySelector("#response_block"),
  toggleButton: document.querySelector(".toggle-button"),
};

function togglePopup() {
  refs.chatPopup.classList.toggle("closed");
}

function clearSearch() {
  refs.questionInput.value = "";
  refs.responseBlock.textContent = "";
  refs.askButton.style.setProperty("display", "block");
}

async function sendQuestionRequest(e) {
  if (e.key && e.key !== "Enter") return;
  const question = refs.questionInput.value;
  if (!question) return;

  const { response } = await fetch("http://localhost:3300/api/v1/getResponse", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ projectId: '64a1979a92cd32814066373f', question }),
  }).then((res) => res.json());

  refs.askButton.style.setProperty("display", "none");
  refs.responseBlock.textContent = response;
  console.log("question : ", question, "\n", "response : ", response);
}

function eventListenersInit() {
  refs.questionInput.addEventListener("keyup", sendQuestionRequest);
  refs.askButton.addEventListener("click", sendQuestionRequest);
  refs.clearButton.addEventListener("click", clearSearch);
  refs.toggleButton.addEventListener("click", togglePopup);
}

function init() {
  eventListenersInit();
}

init();
