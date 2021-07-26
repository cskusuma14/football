const handleError = (error) => {
    return error.response.data.message
}

module.exports = {
    handleError
}