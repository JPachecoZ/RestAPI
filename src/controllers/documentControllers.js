const jsonData = require('./test.json')

const createSignRequest = async(req, res) => {
    console.log(">>>REQUEST BODY: ", req.body)
    console.log(">>>REQUEST HEADERS: ", req.headers)
    try{
        const response = await fetch(`${process.env.SIGN_BASE_URL}${process.env.SIGN_CREATE_SIGN_REQUEST}`, {
            method: "POST",
            headers: {
                "Authorization": `${process.env.SIGN_AUTH_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        const data = await response.json()
        return res.status(200).json(data)
    } 
    catch(error){
        return res.status(500).json(error)
    }
}

const getWorkflows = async(req, res) => {
    try{
    const response = await fetch(`${process.env.SIGN_BASE_URL}${process.env.SIGN_WORKFLOW_ENDPOINT}`,
    {headers: {
        "Authorization": `${process.env.SIGN_AUTH_KEY}`
    }})
    const data = await response.json()
        return data._embedded.workflows
    }
    catch(error){
        return error
    }
}

module.exports = {
    createSignRequest,
    getWorkflows
}