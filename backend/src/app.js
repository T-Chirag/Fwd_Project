import Express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = Express();

app.use(cors()); // Enable CORS to allow requests from different origins

app.use(Express.static("public"))

app.use(cookieParser())

// Apply middleware
app.use(bodyParser.json()); // Parse JSON payloads in incoming requests

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads







export {app}