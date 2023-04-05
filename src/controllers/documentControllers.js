const jsonData = require('./test.json')

const createSignRequest = async(req, res) => {
    console.log(">>>REQUEST BODY: ", req.body)
    console.log(">>>REQUEST HEADERS: ", req.headers)
    const rawParticipantData = req.body.participants.split(',')
    console.log(">>>PARTICIPANTS: ", rawParticipantData)
    const dataToSend = {
        type: 1,
        subject: "FIRMA DE VENTA",
        workflowId: 324,
        participants: [
            {
                personByPersonId: {
                    type: 1,
                    documentType: rawParticipantData[0],
                    documentNumber: rawParticipantData[1],
                    firstname: rawParticipantData[2],
                    lastname: rawParticipantData[3],
                    email: rawParticipantData[4],
                    cellphone: rawParticipantData[5],
                },
                orderParticipant: 1
            }
        ],
        files: [
            {
                name: req.body.fileName,
                base64: req.body.file
            }
        ]
    }
    console.log(">>>OBJETO STRING: ", JSON.stringify(dataToSend))

    try{
        const response = await fetch(`${process.env.SIGN_BASE_URL}${process.env.SIGN_CREATE_SIGN_REQUEST}`, {
            method: "POST",
            headers: {
                "Authorization": `${process.env.SIGN_AUTH_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
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