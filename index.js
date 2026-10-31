const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('message', async (ctx) => {
  const msg = ctx.message;

  if (!msg) return;

  const text = msg.text || msg.caption || '';

  const hasLink =
    (msg.entities || []).some(e =>
      ['url', 'text_link'].includes(e.type)
    ) ||
    (msg.caption_entities || []).some(e =>
      ['url', 'text_link'].includes(e.type)
    ) ||
    /https?:\/\/|www\.|t\.me\/|telegram\.me\/|[a-z0-9-]+\.(com|net|org|sa|io|me|co)/i.test(text);

  if (hasLink) {
    try {
      await ctx.deleteMessage();
    } catch (error) {
      console.log('Could not delete message:', error.message);
    }
  }
});

bot.launch();

console.log('Wafi Bot is running');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
