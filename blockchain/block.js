const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, lastHash, hash, data) {
        // help us find unique attributes for any instance.
        // this is the `block`
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block ----------------------
            Timestamp:  ${this.timestamp}
            Last Hash:  ${this.lastHash}
            Hash:       ${this.hash}
            Data:       ${this.data}`;
    }

    // we can call `static` without making a block instance.
    static genesis() {
        return new this('Genesis time', '-------', 'f1rst-h4sh', [])
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data)

        return new this(timestamp, lastHash, hash, data)
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }

    static blockHash(block) {
        const {
            timestamp,
            lastHash,
            data
        } = block
        return Block.hash(timestamp, lastHash, data)
    }

}

module.exports = Block