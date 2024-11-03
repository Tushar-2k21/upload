import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const allowedOrigins = [process.env.CORS_ORIGIN, 'upload-1-5q0t.onrender.com'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(cookieParser())
// built-in middleware for parsing JSON bodies
app.use(express.json({limit: "10kb"}))

app.use(express.urlencoded({extended: true, limit: '10kb'}))

app.use(express.static("public"))

//routes import
import userRouter from './routes/user.routes.js'
import videoRouter from './routes/video.routes.js'
import playlistRouter from './routes/playlist.routes.js'
import commentRouter from './routes/comment.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import likeRouter from './routes/like.routes.js'
import notificationRouter from './routes/notification.routes.js'
import authRouter from './routes/auth.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/auth', authRouter);
export {app}
