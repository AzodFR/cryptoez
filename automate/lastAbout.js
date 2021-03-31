module.exports = {
    name: "lastAbout",
    description: "get lastTweet of a symbol",
    execute(channel, args, twitter){
        twitter.get('search/tweets', {q: '$' + args[0], result_type: "recent", count: "1"}, function(error, tweets, response) {
            console.log("Start search tweet about $" + args[0]);
            let data = tweets.statuses;
            for (let tweet of data)
            {
                if (!tweet.text.startsWith("RT"))
                {
                        channel.messages.fetch({ limit: 20 }).then(messages => {
                        let reply = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
                        let lastMessage = messages.first();
                        if (lastMessage == undefined || !lastMessage.content.startsWith(reply))
                        {
                            var date = new Date(tweet.created_at);
                            var date_text = ' (' + no_one(date.getDate()) + ' ' + getMonth(date) + ' ' + date.getFullYear() + ' at ' + no_one(date.getHours()) + ':' + no_one(date.getMinutes()) + ')';
                            channel.send(reply + date_text);
                            return ;
                        }
                    }) 
                }
            }
         });
    }
}

function getMonth(date) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[date.getMonth()];
    return n;
}

function no_one(value)
{
    if (parseInt(value) < 9)
        return ('0' + value);
    return (value);
}