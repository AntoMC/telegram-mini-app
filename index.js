const { Telegraf } = require('telegraf');
const http = require('http');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Diccionarios de transformación Unicode
const styles = {
    bold: (t) => t.replace(/[a-zA-Z]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + (c <= 'Z' ? 120211 : 120205))),
    italic: (t) => t.replace(/[a-zA-Z]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + (c <= 'Z' ? 120263 : 120257))),
    mono: (t) => t.replace(/[a-zA-Z0-9]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + 120407)),
    script: (t) => t.replace(/[a-zA-Z]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + (c <= 'Z' ? 119951 : 119945)))
};

bot.on('inline_query', async (ctx) => {
    try {
        const query = ctx.inlineQuery.query || '';
        if (query.length === 0) return ctx.answerInlineQuery([]);

        // Limpiamos el prefijo si viene del teclado
        const text = query.replace(/^(LKeyboard\s+)?[qs]\s+/i, '').trim();
        if (text.length === 0) return ctx.answerInlineQuery([]);

        const results = [
            {
                type: 'article',
                id: 'q_' + Math.random().toString(36).substr(2, 5),
                title: '💬 Enviar como Cita',
                description: text,
                input_message_content: { message_text: `<blockquote>${text}</blockquote>`, parse_mode: 'HTML' }
            },
            {
                type: 'article',
                id: 'b_' + Math.random().toString(36).substr(2, 5),
                title: 'Bold (Negrita)',
                description: styles.bold(text),
                input_message_content: { message_text: styles.bold(text) }
            },
            {
                type: 'article',
                id: 'i_' + Math.random().toString(36).substr(2, 5),
                title: 'Italic (Cursiva)',
                description: styles.italic(text),
                input_message_content: { message_text: styles.italic(text) }
            },
            {
                type: 'article',
                id: 's_' + Math.random().toString(36).substr(2, 5),
                title: 'Script (Elegante)',
                description: styles.script(text),
                input_message_content: { message_text: styles.script(text) }
            },
            {
                type: 'article',
                id: 'm_' + Math.random().toString(36).substr(2, 5),
                title: 'Monoespaciado',
                description: styles.mono(text),
                input_message_content: { message_text: styles.mono(text) }
            }
        ];

        return await ctx.answerInlineQuery(results, { cache_time: 1 });
    } catch (e) {
        console.error('Error:', e);
    }
    return ctx.answerInlineQuery([]);
});

http.createServer((req, res) => {
    res.write('Bot is running');
    res.end();
}).listen(process.env.PORT || 3000);

bot.launch();