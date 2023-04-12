const fetch = require("node-fetch")
const documentSchema = require("../models/document")

const createSignRequest = async(req, res) => {

    //RECEIVE INFORMATION FROM BUBBLE AND LOG IT
    console.log(">>>REQUEST BODY: ", req.body)
    console.log(">>>REQUEST HEADERS: ", req.headers)

    const documentData = {...req.body}
    // try {
    //     const documentExist = await documentSchema.findOne({bubble_id: documentData.bubble_id})
    //     if (documentExist) throw new Error('Document already exists')

    //     const newDocument = new documentSchema({...documentData, state: "received"})
    //     newDocument.save()
    // } catch (error) {
    //     res.json({ error: error.message })
    // }

    //CREATE REQUEST FOR IOFE
    const rawParticipantData = documentData.participants
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
        workflowId: 367,
        participants: mappedParticipants,
        files: [
            {
                name: documentData.fileName,
                base64: documentData.fileEncoded
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

const receiveSignedDocument = async(req, res) => {
    console.log(req.body)
}

module.exports = {
    createSignRequest,
    getWorkflows,
    receiveSignedDocument
}

