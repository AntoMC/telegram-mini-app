const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async (req, res) => {
    if (req.method === 'POST') {
        const { text, chat_id } = req.body;
        try {
            // El truco mágico: Enviamos el texto envuelto en <blockquote>
            await bot.telegram.sendMessage(chat_id, `<blockquote>${text}</blockquote>`, {
                parse_mode: 'HTML'
            });
            res.status(200).send('Mensaje enviado');
        } catch (e) {
            res.status(500).send(e.message);
        }
    } else {
        res.status(200).send('Servidor vivo 🚀');
    }
};