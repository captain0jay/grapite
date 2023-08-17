const funcMap = require('../Extra/funcmap');

const makeget = async (req, res)=>{
    try{
        const {apiname:requestAPINAME,modal:requestMODAL} = req.params
        
        if (!(requestMODAL in funcMap)) {
            return res.status(400).json({ error: "Invalid apiname" });
        }else{
            const requestBody = req.body;
            let responseHere = await funcMap[requestMODAL](requestMODAL,requestBody);
            console.log("responsehere:",responseHere)
            res.status(200).json({responseHere});
        }
    }
    catch{
        res.status(500).json({ "msg": "error" })
    }
}

module.exports = { makeget }