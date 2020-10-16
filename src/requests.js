const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.status === 200) {
        const data = await response.json() // runs after await fetch( is complete) parses info
        return data.puzzle // allows us access to "puzzle" in app.js
    } else {
        throw new Error('Unable to get puzzle!')
    }
}

const getCurrentCountry = async () => { // combine two asynchronous functions
    const location = await getLocation() // finds host location info 1st
    const country = await getCountry(location.country) // from location info, find the code for country name
    return country // returns full country name
}

const getCountry = async (countryCode) => {
    const response = await fetch('//restcountries.eu/rest/v2/all')
        if (response.status === 200) { // response.status is important
            const data = await response.json()
            return data.find((country) => country.alpha2Code === countryCode)
        } else {
            throw new Error('Unable to fetch country')
        }
}

const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=1660e26dc8ef1d')

        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to get location')
        }
}

export {getPuzzle as default}