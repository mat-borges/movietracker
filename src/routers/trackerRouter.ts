import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/wishlist", (req: Request, res: Response) => res.sendStatus(501));
router.post("/wishlist/:id", (req: Request, res: Response) => res.sendStatus(501));
router.delete("/wishlist/:id", (req: Request, res: Response) => res.sendStatus(501));

export default router;
