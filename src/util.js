class Util {
    static inArray(s, arr) {
        return !(arr.indexOf(s) === -1);
    }

    static padZero(s, n) {
        s = String(s);
        while (s.length < (n || 2)) s = '0' + s;
        return s;
    }

    static ts2human(ts) {
        const d = new Date(ts);

        const date = [
            d.getFullYear(),
            Util.padZero(d.getMonth() + 1),
            Util.padZero(d.getDate()),
        ];

        const time = [
            Util.padZero(d.getHours()),
            Util.padZero(d.getMinutes()),
            Util.padZero(d.getSeconds()),
        ];

        return date.join('-') + ' ' + time.join('-') + ' Z';
    }
}
