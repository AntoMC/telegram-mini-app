const { Telegraf } = require('telegraf');
const http = require('http');

// Render necesita que el bot lea el Token desde las variables de entorno
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query || '';
    const match = query.match(/^(?:LKeyboard\s+)?q\s+(.+)$/i);
    
    if (match) {
        const textToQuote = match[1].trim();
        return await ctx.answerInlineQuery([
            {
                type: 'article',
                id: 'q_' + Math.random().toString(36).substr(2, 9),
                title: 'Enviar como Cita',
                input_message_content: {
                    message_text: `<blockquote>${textToQuote}</blockquote>`,
                    parse_mode: 'HTML'
                }
            }
        ], { cache_time: 1 });
    }
    return ctx.answerInlineQuery([]);
});

// Servidor básico para que Render no dé error
http.createServer((req, res) => {
    res.write('Bot is running');
    res.end();
}).listen(process.env.PORT || 3000);

bot.launch();