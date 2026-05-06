module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const body = req.body;
        
        // Si recibimos una consulta inline de Telegram
        if (body.inline_query) {
            const queryId = body.inline_query.id;
            const queryText = body.inline_query.query || "Escribe algo...";
            
            const results = [{
                type: 'article',
                id: '1',
                title: 'ENVIAR CITA REAL',
                description: queryText,
                input_message_content: {
                    message_text: `<blockquote>${queryText}</blockquote>`,
                    parse_mode: 'HTML'
                }
            }];

            // Respondemos a Telegram usando su API directamente
            const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/answerInlineQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inline_query_id: queryId,
                    results: results,
                    cache_time: 0
                })
            });
            
            console.log('Respuesta de Telegram:', await response.json());
        }
        res.status(200).send('OK');
    } else {
        res.status(200).send("Servidor Activo 🚀");
    }
};