const axios = require('axios');

module.exports = {
    name: 'ai',
    description: 'Interact with GPT4 Turbo',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');
        const uid = event.senderID;

        if (!input) {
            return api.sendMessage('Please enter a prompt.', event.threadID, event.messageID);
        }

        api.sendMessage('Processing your request...', event.threadID, event.messageID);

        try {
            const response = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o-pro?q=${encodeURIComponent(input)}uid=${uid}`);
            const result = response.data.result.reply;

            if (!result) {
                throw new Error('No valid response received from the API.');
            }

            api.sendMessage(
                `🤖 AI Response\n━━━━━━━━━━━━━━━━━━━\n${result}`,
                event.threadID,
                event.messageID
            );
        } catch (error) {
            api.sendMessage(`An error occurred: ${error.message}`, event.threadID, event.messageID);
        }
    },
};
