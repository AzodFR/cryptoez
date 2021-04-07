module.exports = {
    name: "search",
    alias: ["s"],
    description: "search the last tweet of the account",
    execute(message, args, twitter){

        if (args.lenght < 1) return;

        twitter.get('search/tweets', {q: '', from: `${args[0]}`,result_type: "recent"}, function(error, tweets, response) {
            let data = tweets.statuses
            for (let tweet of data)
            {
                if (!tweet.text.startsWith("RT") && tweet.in_reply_to_status_id == null)
                {
                    var date = new Date(tweet.created_at);
                    var date_text = date.toLocaleString();
                    let reply = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str} (${date_text})`
                    message.channel.send(reply)
                    console.log(tweet);
                    return;
                }
            }
         });
         
    }
}