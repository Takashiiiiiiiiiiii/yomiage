const fs = require('fs');
const { execFileSync } = require('child_process');
const chokidar = require('chokidar');
const Encoding = require('encoding-japanese');

module.exports = class {
    constructor(log) {
        this.log = log.child({ module: 'softalk' });

        this.log.debug('ð Softalkãæ¢ãã¦ãã¾ã...');

        if (fs.existsSync('./softalk/SofTalk.exe')) {
            this.log.debug('â Softalkãè¦ã¤ããã¾ããï¼');
        } else {
            this.log.fatal('ð¥ Softalkã®å®è¡ãã¡ã¤ã«ãè¦ã¤ããã¾ããã§ãã. æ­£ããSoftalkãéç½®ããã¦ããç¢ºèªãã¦ãã ãã. è©³ããã¯å¬å¼ãµã¤ãããè¦§ãã ãã: https://damare.m86.work/');
            process.exit(1);
        }
    }

    toString(bytes) {
        return Encoding.convert(bytes, {
        from: 'SJIS',
        to: 'UNICODE',
        type: 'string',
        });
    }

    async createVoice(message) {
        this.log.debug("ð¤ Softalkã§é³å£°ãçæãã¾ã:", message);

        execFileSync("./softalk/SofTalk.exe", ["/NM:å¥³æ§01", `/R:${__dirname}\\voice.wav`, "/T:0", "/X:1", "/V:100", `/W:${message}`], { encoding: "Shift_JIS" }, (error, stdout, stderr) => {
            log.debug("execfile çµäº")
            if (error) {
                log.error("An error occurred while running Softalk.\n" + toString(stderr));
                if (readMessages.length) {
                    canReadMessage = true;
                } else {
                    softalk();
                }
                return;
            }
        })

        let waitVoiceCreate = new Promise((resolve, reject) => {
            let watcher = chokidar.watch('./voice.wav');

            watcher.on('add', (path) => {
                this.log.debug("ð chokidarãé³å£°ãã¡ã¤ã«ãè¦ã¤ãã¾ãã:", path);
                watcher.close();
                resolve();
            });
        })

        await waitVoiceCreate;
        this.log.debug("â çæå¦çãå®äºãã¾ãã");

        return;
    }
}