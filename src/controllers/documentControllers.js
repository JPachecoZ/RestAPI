const fetch = require("node-fetch")

const createSignRequest = async(req, res) => {

    const state = ["received", "sent"]
    console.log(">>>REQUEST BODY: ", req.body)
    console.log(">>>REQUEST HEADERS: ", req.headers)
    const rawParticipantData = req.body.participants
    console.log(">>>PARTICIPANTS: ", rawParticipantData)
    const mappedParticipants = rawParticipantData.map((participant, index) => {
        return {
            personByPersonId: {
                type: participant.type_text,
                documentType: 1,
                documentNumber: participant.documentnumber_text,
                firstname: participant.firstname_text,
                lastname: participant.lastname_text,
                email: participant.email_text,
                cellphone: participant.cellphone_text,
                enterpriseDocumentNumber: "",
                jobDescription: "",
            },
            orderParticipant: index + 1
        };
    });
    const dataToSend = {
        type: 1,
        subject: "FIRMA DE VENTA",
        workflowId: 324,
        participants: mappedParticipants,
        files: [
            {
                name: req.body.fileName,
                base64: req.body.fileEncoded
            }
        ]
    }
    console.log(">>>OBJETO STRING: ", JSON.stringify(dataToSend))

    try{
        console.log(">>>INICIANDO TRY:")
        const response = await fetch(`${process.env.SIGN_BASE_URL}${process.env.SIGN_CREATE_SIGN_REQUEST}`, {
            method: "POST",
            headers: {
                "Authorization": `${process.env.SIGN_AUTH_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        console.log(">>>RESPONSE: ", response)
        const data = await response.json()
        return res.status(200).json(data)
    } 
    catch(error){
        console.log(">>>ERROR: ", error)
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