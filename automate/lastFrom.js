module.exports = {
    name: "lastFrom",
    description: "get lastTweet of account",
    execute(channel, args, twitter){
        console.log("Start search tweet from @" + args[0]);
        twitter.get('search/tweets', {q: '', from: `${args[0]}`,result_type: "recent"}, function(error, tweets, response) {
            let data = tweets.statuses;
            for (let tweet of data)
            {
                if (!tweet.text.startsWith("RT") && tweet.in_reply_to_status_id == null)
                {
                    channel.messages.fetch({ limit: 1 }).then(messages => {
                        let reply = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
                        let lastMessage = messages.first();
                        if (lastMessage != undefined && lastMessage.content.startsWith(reply))
                        {
                            return;
                        }
                        else
                        {
                            var date = new Date(tweet.created_at);
                            var date_text = ' (' + date.toLocaleString() + ')';
                            channel.send(reply + date_text);
                        }
                    }) 
                    return;
                }
            }
         });
    }
}