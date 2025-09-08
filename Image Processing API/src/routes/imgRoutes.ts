import express from 'express';
import { Response, Request } from 'express';
import fs from 'fs';
import { resizeImage } from '../utils/utils';
import path from 'path';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (filename == null)       // Input validations
        return res.status(400).send('Filename is required');
    if (width == null || width <= 0)
        return res.status(400).send('Invalid width');
    if (height == null || height <= 0)
        return res.status(400).send('Invalid height');

    const originalFile = path.join(__dirname, '../../images', filename + '.jpg');
    const thumbnailFile = path.join(__dirname, '../../thumbnails', `${filename}_${width}_${height}.jpg`);

    if (!fs.existsSync(originalFile))
        return res.status(404).send('File does not exist');

    try {
        if (!fs.existsSync(thumbnailFile)) {            // Caching already prossed pictures
            await resizeImage(originalFile, thumbnailFile, width, height);
        }
        res.sendFile(thumbnailFile);
    } 
    catch (error) {
        res.status(500).send('Error processing image');
    }
})

export default router;
