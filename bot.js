const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', () => {
  console.log(`✅ ログイン完了: ${client.user.tag}`);

  const sendMessage = (label) => {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      channel.send(`📸 ${label}の撮影タイムだよ！忘れずにパシャリしてね〜✨`);
    } else {
      console.log('❗ チャンネルが見つからなかったよ！');
    }
  };

  const schedules = [
    { cron: '0 0 * * *', label: '深夜0時' },
    { cron: '0 6 * * *', label: '朝6時' },
    { cron: '0 12 * * *', label: '昼12時' },
    { cron: '0 18 * * *', label: '夕方6時' },
  ];

  schedules.forEach(({ cron: time, label }) => {
    cron.schedule(time, () => sendMessage(label), { timezone: "Asia/Tokyo" });
  });
});

client.login(TOKEN);
