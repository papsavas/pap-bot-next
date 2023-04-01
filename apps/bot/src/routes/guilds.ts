import { Router } from "express";

const route = "/guilds";

const guildsRouter = Router();

guildsRouter.get(route, (req, res) => {
    const client = req.app.locals.client
    if (!client || !client.isReady()) return res.sendStatus(500);
    return res
        .status(200)
        .json(client.guilds.cache)
        .end();
})

export default guildsRouter;
