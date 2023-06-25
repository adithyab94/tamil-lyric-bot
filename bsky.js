import * as dotenv from 'dotenv'
import blue from '@atproto/api';
import fs from 'fs';
import readline from 'readline';

dotenv.config()
const { BskyAgent } = blue;

const generateRandomLyricsPost = async () => {
    const fileStream = fs.createReadStream('lyricsonly.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lines = [];

    for await (const line of rl) {
        // Each line in the CSV file becomes a separate item in the lines array.
        lines.push(line);
    }

    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    
    // Truncate the string to 250 characters if it's longer.
    const postText = randomLine.length > 250 ? randomLine.substring(0, 250) : randomLine;
    
    console.log("Post:"+postText);
    
    //now that we have the post, lets post it to bluesky
    const {RichText} = blue;
    const agent = new BskyAgent({ service: 'https://bsky.social/' })
    await agent.login({identifier: process.env.BLUESKY_BOT_EMAIL, password: process.env.BLUESKY_BOT_PASSWORD})
    const rt = new RichText({text: postText })
    const postRecord = {
        $type: 'app.bsky.feed.post',
        text: rt.text,
        facets: rt.facets,
        createdAt: new Date().toISOString()
    }
    await agent.post(postRecord)
};

generateRandomLyricsPost();
