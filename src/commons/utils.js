
"use strict"



const utils = { }




utils.shannonEntropy = (len, base) => {
	return Math.floor(len * Math.log2(base))
}





module.exports = utils
