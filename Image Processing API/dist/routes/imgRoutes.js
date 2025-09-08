"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils/utils");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (filename == null)
        return res.status(400).send('Filename is required');
    if (width == null || width <= 0)
        return res.status(400).send('Invalid width');
    if (height == null || height <= 0)
        return res.status(400).send('Invalid height');
    const originalFile = path_1.default.join(__dirname, '../../images', filename + '.jpg');
    const thumbnailFile = path_1.default.join(__dirname, '../../thumbnails', `${filename}_${width}_${height}.jpg`);
    if (!fs_1.default.existsSync(originalFile))
        return res.status(404).send('File does not exist');
    try {
        if (!fs_1.default.existsSync(thumbnailFile)) {
            yield (0, utils_1.resizeImage)(originalFile, thumbnailFile, width, height);
        }
        res.sendFile(thumbnailFile);
    }
    catch (error) {
        res.status(500).send('Error processing image');
    }
}));
exports.default = router;
//# sourceMappingURL=imgRoutes.js.map