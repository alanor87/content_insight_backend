import { Request, Response, NextFunction } from "express";
import path from "path";

function widget(req: Request, res: Response, next: NextFunction) {
  try {
    res.sendFile(path.join(process.cwd(), "build/public/widget/script.js"), {
      headers: { "content-type": "application/javascript" },
    });
  } catch (error: any) {
    next(error);
  }
}

export default widget;
