const PROXY_CONFIG = [
    {
        context: [
            "/login",
            "/posts",
        ],
        target: "http://localhost:1337",
        secure: false
    }
]
 
module.exports = PROXY_CONFIG;