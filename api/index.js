const { Telegraf } = require('telegraf');

// SUSTITUYE 'TU_BOT_TOKEN' por tu token real si no usas variables de entorno
const bot = new Telegraf(process.env.BOT_TOKEN || '8520167343:AAEFrsWdXOZfxRhwkqsQ7Cp7V_K-D7y8Q7U');

const maps = {
    script: { a: "𝓪", b: "𝓫", c: "𝓬", d: "𝓭", e: "𝓮", f: "𝓯", g: "𝓰", h: "𝓱", i: "𝓲", j: "𝓳", k: "𝓴", l: "𝓵", m: "𝓶", n: "𝓷", o: "𝓸", p: "𝓹", q: "𝓺", r: "𝓻", s: "𝓼", t: "𝓽", u: "𝓾", v: "𝓿", w: "𝔀", x: "𝔁", y: "𝔂", z: "𝔃", A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔", F: "𝓕", G: "𝓖", H: "𝓗", I: "𝓘", J: "𝓙", K: "𝓚", L: "𝓛", M: "𝓜", N: "𝓝", O: "𝓞", P: "𝓟", Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣", U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧", Y: "𝓨", Z: "𝓩" },
    gothic: { a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷", A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ" },
    bubbles_dark: { a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘", j: "🅙", k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡", s: "🅢", t: "🅣", u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩", A: "🅐", B: "🅑", C: "🅒", D: "🅓", E: "🅔", F: "🅕", G: "🅖", H: "🅗", I: "🅘", J: "🅙", K: "🅚", L: "🅛", M: "🅜", N: "🅝", O: "🅞", P: "🅟", Q: "🅠", R: "🅡", S: "🅢", T: "🅣", U: "🅤", V: "🅥", W: "🅦", X: "🅧", Y: "🅨", Z: "🅩" },
    smallcaps: { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" }
};

// Función para limpiar caracteres que rompen el HTML de Telegram
const escapeHTML = (str) => str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

const stylize = (text, type) => text.split('').map(char => (maps[type] && maps[type][char]) || (maps[type] && maps[type][char.toLowerCase()]) || char).join('');

bot.on('inline_query', async (ctx) => {
    try {
        const query = ctx.inlineQuery.query;
        if (!query) return;

        let text = query;
        let preferredOption = null;

        // Lógica de procesamiento LKeyboard
        if (query.startsWith('LKeyboard ')) {
            const parts = query.split(' ');
            if (parts.length >= 2) {
                const command = parts[1];
                text = parts.slice(2).join(' ');
                if (command.startsWith('q')) preferredOption = '3';
                if (command.startsWith('s')) preferredOption = '4';
            }
        }

        if (!text.trim()) return;

        const safeText = escapeHTML(text);

        let results = [
            { type: 'article', id: '1', title: '👻 SPOILER (Oculto)', description: text, input_message_content: { message_text: `<tg-spoiler>${safeText}</tg-spoiler>`, parse_mode: 'HTML' } },
            { type: 'article', id: '2', title: '✍️ Subrayado Real', description: text, input_message_content: { message_text: `<u>${safeText}</u>`, parse_mode: 'HTML' } },
            { type: 'article', id: '3', title: '📌 Cita de Bloque', description: text, input_message_content: { message_text: `<blockquote>${safeText}</blockquote>`, parse_mode: 'HTML' } },
            { type: 'article', id: '4', title: '💎 Estilo Elegante', description: stylize(text, 'script'), input_message_content: { message_text: stylize(text, 'script') } },
            { type: 'article', id: '5', title: '🕸 Estilo Gótico', description: stylize(text, 'gothic'), input_message_content: { message_text: stylize(text, 'gothic') } },
            { type: 'article', id: '6', title: '⚫ Burbujas Negras', description: stylize(text, 'bubbles_dark'), input_message_content: { message_text: stylize(text, 'bubbles_dark') } },
            { type: 'article', id: '7', title: '🏢 SMALL CAPS', description: stylize(text, 'smallcaps'), input_message_content: { message_text: stylize(text, 'smallcaps') } }
        ];

        if (preferredOption) {
            results.sort((a, b) => a.id === preferredOption ? -1 : b.id === preferredOption ? 1 : 0);
        }

        return await ctx.answerInlineQuery(results, { cache_time: 1 });
    } catch (err) {
        console.error("Error procesando Inline Query:", err);
    }
});

// --- INICIO DEL BOT ---

// Si estás en Vercel/Producción
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await bot.handleUpdate(req.body);
            res.status(200).send('OK');
        } catch (e) {
            console.error(e);
            res.status(500).send('Error');
        }
    } else {
        res.status(200).send('LKeyboard Bot v2.1 🚀');
    }
};

// Si estás probando en tu PC (Modo Local)
if (require.main === module || !process.env.VERCEL) {
    bot.launch()
        .then(() => console.log("✅ LKeyboard Bot corriendo en modo local"))
        .catch(err => console.error("❌ Fallo al iniciar el bot:", err));
}

// Cierre limpio
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
