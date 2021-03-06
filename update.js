const axios = require("axios")

module.exports = async function(bunyan, packageJson) {
    let log = bunyan.child({ module: 'update' });

    log.info("đ ă˘ăăăăźăăç˘şčŞăăŚăăžă...")

    try { 
        let res = await axios.get("https://api.github.com/repos/Chipsnet/damare/releases/latest")

        if (res.data.tag_name === `v${packageJson.version}`) {
            log.info("â ăăźă¸ă§ăłăŻćć°ă§ăďź")
        } else {
            log.info("=================================================\n"+
                    "đŚ ă˘ăăăăźăăăăăžăďź\n"+
                    `çžĺ¨ăŽăăźă¸ă§ăł: v${packageJson.version} ćć°ăŽăăźă¸ă§ăł: ${res.data.tag_name}\n`+
                    "ă˘ăăăăźăćšćł https://docs.damare.m86.work/guide/update\n"+
                    "=================================================\n")
        }
    } catch (error) {
        log.error("đ¤ ă˘ăăăăźăăŽç˘şčŞăŤĺ¤ąćăăžăă")
        log.error(error)
    }
}