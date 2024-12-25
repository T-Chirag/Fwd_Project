import Express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app = Express();

app.use(cors()); // Enable CORS to allow requests from different origins

app.use(Express.static("public"))

app.use(cookieParser())

// Apply middleware
app.use(bodyParser.json()); // Parse JSON payloads in incoming requests

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads


//routes
import userRoutes from "../routes/userRoutes.js"


//routes declaration
app.use("/users", userRoutes)





export {app}