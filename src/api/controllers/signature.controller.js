import * as signatureService from '../../services/signature.service.js';

export async function verifySignatureController(req, res, next) {
    const { message, signature } = req.body;

    if (!message || !signature) {
        return res.status(400).json({ error: 'Missing message or signature in request body.' });
    }

    try {
        const result = await signatureService.verify(message, signature);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}