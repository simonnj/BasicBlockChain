const SHA256 = require('crypto-js/sha256')


class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createFirstBlock()];
    }
    createFirstBlock(){
        return new Block(0, "26/09/2020", "FirstBlock", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlockToChain(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValidity(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}


let VCoin = new Blockchain();
VCoin.addBlockToChain(new Block(1, "27/09/2020", {amount: 15}));
VCoin.addBlockToChain(new Block(2, "28/09/2020", {amount: 42}));

console.log('chain valid?' + VCoin.checkValidity());

VCoin.chain[1].data = {amount: 420};

console.log('chain valid?' + VCoin.checkValidity());

//console.log(JSON.stringify(VCoin, null, 4));