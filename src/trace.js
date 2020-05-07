class Trace {
    records = {};

    constructor(trace) {
        this.records = this.readRecords(trace);
    }

    readRecords(trace) {
        const records = {};

        for (let record of trace) {
            if (!(record.name in records))
                records[record.name] = [];
            records[record.name].push(record.data);
        }

        const rec = (x, i) => (
            x in records && (i ? records[x][0] : records[x])
        );

        return {
            header: rec('header', true),
            parisTraceroute: rec('paris_traceroute', true),
            stats: rec('stats', true),
            hostnames: rec('hostnames', true),
            asns: rec('asns', true),
            fixedAsns: rec('fixed_asns', true),
            nextHops: rec('next_hops'),
            nodeControl: rec('node_control'),
            classify: rec('classify'),
        };
    }

    ip2asn() {
        const asns = this.asns;
        const ip2asn = {};

        for (const nh of this.nextHops) {
            const src = nh['ip'];
            if (!(src in ip2asn))
                ip2asn[src] = src in asns ? asns[src] : '';

            for (const dst of nh['next_hops']) {
                if (!(dst in ip2asn))
                    ip2asn[dst] = dst in asns ? asns[dst] : '';
            }
        }

        return ip2asn;
    }

    graph() {
        const graph = {};
        for (const nh of this.nextHops)
            graph[nh['ip']] = nh['next_hops'];

        return graph;
    }

    get totalTime() {
        const finishTime = this.stats['finish_time'] / 1000;
        const initTime = this.stats['init_time'] / 1000;
        return finishTime - initTime;
    }

    get truePPS() {
        return this.stats['sent_packets'] / this.totalTime;
    }

    get header() {
        return this.records.header;
    }

    get parisTraceroute() {
        return this.records.parisTraceroute;
    }

    get stats() {
        return this.records.stats;
    }

    get hostnames() {
        return this.records.hostnames;
    }

    get asns() {
        return this.records.asns;
    }

    get fixedAsns() {
        return this.records.fixedAsns;
    }

    get nextHops() {
        return this.records.nextHops;
    }

    get nodeControl() {
        return this.records.nodeControl;
    }

    get classify() {
        return this.records.classify;
    }
}
