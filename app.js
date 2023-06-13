const { Telegraf, Markup, Extra } = require('telegraf');
const bot = new Telegraf("5968831223:AAFTa-rVqTh1WVlzHjACyiowir3flSZg9YE");
const { discover, SCENES } = require('wikari');

async function discoverBulbs() {
  const bulbs = await discover({});
  return bulbs;
}

async function turnOn() {
  const bulbs = await discover({});
  const bulb = bulbs[bulbIndex];
  await bulb.turn(true);
}

async function turnOff() {
  const bulbs = await discover({});
  const bulb = bulbs[bulbIndex];
  await bulb.turn(false);
}

bot.command("turnon", async (ctx) => {
  const bulbs = await discoverBulbs();
  const bulbList = bulbs.map((bulb, index) => `${index + 1}. ${bulb.address}`).join('\n');
  const message = `Welcome! Select a bulb from the list below to get started:\n${bulbList}`;
  ctx.reply(message, Markup.keyboard(bulbs.map((_, index) => `Bulb ${index + 1}`)).resize().oneTime().extra());
});

bot.hears(/^Bulb \d+$/, async (ctx) => {
  const bulbs = await discoverBulbs();
  const bulbIndex = parseInt(ctx.match[0].split(' ')[1]) - 1;
  const selectedBulb = bulbs[bulbIndex];

  // Perform actions with the selected bulb
  // Example: Turn on the bulb
  await selectedBulb.turn(true);

  ctx.reply(`You selected Bulb ${bulbIndex + 1} (${selectedBulb.name}). Bulb turned on!`);
});

bot.command('discover', async (ctx) => {
  const bulbs = await discoverBulbs();
  console.log(bulbs);
  const bulbList = bulbs.map((bulb, index) => `${index + 1}. ${bulb.address}`).join('\n');
  const message = `Discovered bulbs:\n${bulbList}`;
  ctx.reply(message);
});

bot.launch();
