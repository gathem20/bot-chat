let icon = document.getElementById("icon");
let body = document.body;
icon.onclick = () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "/dark theme icon/sun.png";
  } else {
    icon.src = "/dark theme icon/moon.png";
  }
};

const Api_key = "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";
const chatToggle = document.querySelector(".chat-box");
const sendBtn = document.querySelector(".chat-input #send-btn");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chat-box");
const chat_Bot_toggle = document.querySelector(".chat-bot-toggle");
let userMessage;
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");

  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.classList.add("chat", className);
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};
const generateResponse = (incominChatLi) => {
  const Api_Url = "https://api.openai.com/v1/chat/completions";
  const messageElement = incominChatLi.querySelector("p");
  const requsetOption = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${Api_key}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };
  fetch(Api_Url, requsetOption)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      messageElement.textContent =
        "Ops! something went wrong. please try again.";
      console.log(error);
    })
    .finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
};
const handleChat = () => {
  userMessage = chatInput.value.trim();
  chatInput.value = "";
  if (!userMessage) return;
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  chatBox.scrollTo(0, chatBox.scrollHeight);
  chatInput.vlaue = "";
  setTimeout(() => {
    const incominChatLi = createChatLi("Typing..", "incoming");
    chatBox.scrollTo(0, chatBox.scrollHeight);
    chatBox.appendChild(incominChatLi);
    generateResponse(incominChatLi);
  }, 600);
};

// closeBtn.addEventListener("click", () =>
//   document.body.classList.remove("show-chatbot")
// );
// chat_Bot_toggle.addEventListener("click", () =>
//   document.body.classList.toggle("show-chatbot")
// );

sendBtn.addEventListener("click", handleChat);
