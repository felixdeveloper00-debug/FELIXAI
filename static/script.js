async function sendMessage() {

    const input = document.getElementById("message");
    const message = input.value.trim();

    if (!message) return;

    const chat = document.getElementById("chat");

    // Mensagem do usuário
    chat.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Resposta da IA
        chat.innerHTML += `
            <div class="ai-message">
                ${data.response}
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        chat.innerHTML += `
            <div class="ai-message">
                ❌ Erro ao conectar com o Ollama.
            </div>
        `;

        console.error(error);
    }
}

// Enviar com Enter
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("message");

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            sendMessage();
        }

    });

});
