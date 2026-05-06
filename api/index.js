const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Metemos el HTML directamente en una constante para evitar errores de lectura en Vercel
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <style>
        body { background: var(--tg-theme-bg-color, #ffffff); color: var(--tg-theme-text-color, #000000); font-family: sans-serif; padding: 20px; display: flex; flex-direction: column; align-items: center; }
        textarea { width: 100%; height: 120px; border-radius: 12px; border: 1px solid #ddd; padding: 12px; box-sizing: border-box; font-size: 16px; margin-bottom: 15px; resize: none; }
        button { width: 100%; padding: 15px; background: #248bcf; color: white; border: none; border-radius: 12px; font-weight: bold; font-size: 16px; cursor: pointer; }
        h3 { margin-top: 0; }
    </style>
</head>
<body>
    <h3>Crear Cita Real</h3>
    <textarea id="text" placeholder="Escribe aquí tu cita..."></textarea>
    <button onclick="sendQuote()">Enviar a la conversación</button>

    <script>
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.ready();

        async function sendQuote() {
            const text = document.getElementById('text').value;
            if (!text.trim()) return;

            // Intentamos obtener el ID del chat. 
            // Nota: En Mini Apps de enlace directo, a veces solo tenemos el user_id.
            const chat_id = tg.initDataUnsafe.chat?.id || tg.initDataUnsafe.user?.id;

            if (!chat_id) {
                alert('No se pudo detectar el chat. Intenta abrir la app desde el menú del bot.');
                return;
            }

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, chat_id })
                });
                
                if (response.ok) {
                    tg.close();
                } else {
                    alert('Error al enviar: ' + response.statusText);
                }
            } catch (e) {
                alert('Error de conexión');
            }
        }
    </script>
</body>
</html>
`;

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { text, chat_id } = req.body;
        try {
            // El parse_mode HTML permite usar <blockquote> para la cita real
            await bot.telegram.sendMessage(chat_id, `<blockquote>${text}</blockquote>`, {
                parse_mode: 'HTML'
            });
            res.status(200).json({ status: 'ok' });
        } catch (e) {
            console.error('Error enviando mensaje:', e);
            res.status(500).json({ error: e.message });
        }
    } else {
        // Servimos el HTML directamente
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlContent);
    }
};