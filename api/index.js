const { Telegraf } = require('telegraf');
const http = require('http');

// 1. CONFIGURACIÓN DEL BOT
const bot = new Telegraf('8520167343:AAEFrsWdXOZfxRhwkqsQ7Cp7V_K-D7y8Q7U');

bot.on('inline_query', async (ctx) => {
    try {
        const query = ctx.inlineQuery.query || '';
        const match = query.match(/^(?:LKeyboard\s+)?q\s+(.+)$/i);
        
        if (match) {
            const textToQuote = match[1].trim();
            return await ctx.answerInlineQuery([
                {
                    type: 'article',
                    id: 'quote_' + Math.random().toString(36).substr(2, 9),
                    title: 'Enviar como Cita',
                    description: textToQuote,
                    thumb_url: 'https://img.icons8.com/color/96/quote-left.png',
                    input_message_content: {
                        message_text: `<blockquote>${textToQuote}</blockquote>`,
                        parse_mode: 'HTML'
                    }
                }
            ], { cache_time: 1 });
        }
    } catch (e) {
        console.error('Error:', e);
    }
    return ctx.answerInlineQuery([]);
});

// 2. SERVIDOR HTTP (Necesario para Render)
// Esto evita errores de "Port timeout" y ayuda a mantenerlo despierto
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('LKeyboard Bot is Alive!\n');
});

// Render asigna un puerto automáticamente en process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en puerto ${PORT}`);
});

// 3. INICIO DEL BOT
bot.launch().then(() => {
    console.log('🚀 Bot de Telegram iniciado con Long Polling');
});

// Manejo de cierre limpio
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));