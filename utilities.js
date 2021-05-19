const utils = {};

utils.getCurrentTime = () => {
    'use strict';
    let now = new Date();
    return now.getHours() + ":"
        + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) + ":"
        + (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
};

utils.waitForTag = (interval, attempts) => {
    'use strict';
    return new Promise((resolve, reject) => {
        let count = 0;
        let checkTag = () => {
            if (typeof lpTag !== 'undefined') {
                resolve(true);
            } else if (count++ < attempts) {
                setTimeout(checkTag, interval);
            } else {
                reject('tag not found');
            }
        };
        checkTag();
    });
};

/* waitForTag template

utils.waitForTag(1000, 10)
    .then(() => {
        // code here
    })
    .catch(e => {console.error(e);})

*/

utils.waitForSDEGet = (interval, attempts) => {
    'use strict';
    return new Promise((resolve, reject) => {
        let count = 0;
        let checkTag = () => {
            if (lpTag && lpTag.sdes && typeof lpTag.sdes.get !== 'undefined') {
                resolve(true);
            } else if (count++ < attempts) {
                setTimeout(checkTag, interval);
            } else {
                reject('tag not found');
            }
        };
        checkTag();
    });
};

utils.getQueryStringParams = () => {
    let obj = {},
        search = /([^&=]+)=?([^&]*)/g,
        decode = (s) => {return decodeURIComponent(s.replace(/\+/g, " "))};
    while (match = search.exec(window.location.search.substring(1))) obj[decode(match[1])] = decode(match[2]);
	return obj
};


