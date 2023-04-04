const createSignRequest = async(req, res) => {

}

const getWorkflows = async(req, res) => {
    try{
    const response = await fetch(`${process.env.SIGN_BASE_URL}${process.env.SIGN_WORKFLOW_ENDPOINT}`,
    {headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlZXh0ZXJubzMiLCJpYXQiOjE2ODA2MTIwNjgsImV4cCI6MTY4MTQ3NjA2OH0.xqdhN5eGJRoPpmX8LAurELM06DIO-X6dSyBKnfofnDlijpCc9ZSx-ZDH3Al_99JGDKjWMdrBr7V9sdbcvXDe1A"
    }})
    const data = await response.json()
        return data._embedded.workflows
    }
    catch(error){
        return error
    }
}