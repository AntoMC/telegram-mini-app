const { Telegraf } = require('telegraf');

// SUSTITUYE TU TOKEN AQUÍ
const bot = new Telegraf('8520167343:AAEFrsWdXOZfxRhwkqsQ7Cp7V_K-D7y8Q7U');

bot.on('inline_query', async (ctx) => {
    try {
        const query = ctx.inlineQuery.query || '';
        console.log('Query recibida:', query); // Esto aparecerá en los logs de Vercel

        // Buscamos "LKeyboard q <texto>" o simplemente "q <texto>"
        // La expresión regular es más flexible
        const match = query.match(/^(?:LKeyboard\s+)?q\s+(.+)$/i);
        
        if (match) {
            const textToQuote = match[1].trim();
            if (textToQuote.length === 0) return ctx.answerInlineQuery([]);

            return await ctx.answerInlineQuery([
                {
                    type: 'article',
                    id: 'q_' + Math.random().toString(36).substr(2, 9), // ID único aleatorio
                    title: 'Enviar como Cita',
                    description: textToQuote,
                    thumb_url: 'https://img.icons8.com/color/96/quote-left.png',
                    input_message_content: {
                        message_text: `<blockquote>${textToQuote}</blockquote>`,
                        parse_mode: 'HTML'
                    }
                }
            ], { 
                cache_time: 1, // Evita que se quede guardado mucho tiempo para poder probar rápido
                is_personal: true 
            });
        }
    } catch (error) {
        console.error('Error procesando inline query:', error);
    }
    // Si no hay match o hay error, respondemos vacío para que deje de cargar
    return ctx.answerInlineQuery([]);
});

// Manejador para Vercel
module.exports = async (req, res) => {
    // Si entras desde el navegador (GET)
    if (req.method === 'GET') {
        return res.status(200).send('🚀 LKeyboard Bot está funcionando correctamente!');
    }

    // Si Telegram envía datos (POST)
    try {
        if (req.body && req.body.update_id) {
            await bot.handleUpdate(req.body);
        }
        res.status(200).send('OK');
    } catch (err) {
        console.error('Error en el Webhook:', err);
        // Enviamos 200 aunque haya error para que Telegram no reintente fallos de código
        res.status(200).send('Error interno pero recibido');
    }
};