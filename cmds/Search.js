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
                if (!tweet.text.startsWith("RT"))
                {
                    var date = new Date(tweet.created_at);
                   var date_text = no_one(date.getDate()) + ' ' + getMonth(date) + ' ' + date.getFullYear() + ' at ' + no_one(date.getHours()) + ':' + no_one(date.getMinutes());
                    let reply = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str} (${date_text})`
                    message.channel.send(reply)
                    return;
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