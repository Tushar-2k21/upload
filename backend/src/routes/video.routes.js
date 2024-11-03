import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {deleteVideo, getAllVideos, getVideoById, uploadVideo, incrementViewCount, getRelatedVideos, getSearchResults, getSubscribedVideos} from "../controllers/video.controller.js"

const router = Router();
router.use(verifyJWT);
router.route("/upload").post(upload.fields(
    [
        {
            name: "video",
            maxCount: 1
        },
        {
            name: 'thumbnail',
            maxCount: 1
        }
       
    ]), uploadVideo)

router.route("/search").get(getSearchResults);

router.route("/:id").delete(deleteVideo)
router.route("/").get(getAllVideos)
router.route("/subscribedVideos").get(getSubscribedVideos);
router.route("/:id").get(getVideoById)
router.route("/incrementViewCount/:id").patch(incrementViewCount);
router.route("/related/:id").patch(getRelatedVideos);



export default router;