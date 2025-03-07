const jackRoute = (req, res) => {
    res.send("Jack Frost");
}

const santaRoute = (req, res) => {
    res.send("Santa Klaus");
}

const toothRoute = (req, res) => {
    res.send("Tooth Fairy");
}

const easterRoute = (req, res) => {
    res.send("Easter Bunny");
}

const sandRoute = (req, res) => {
    res.send("Sandman");
}

module.exports = {
    jackRoute,
    santaRoute,
    toothRoute,
    easterRoute,
    sandRoute
};