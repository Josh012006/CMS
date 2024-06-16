import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const userToken = req.cookies['user']; // Accéder au cookie 'user' dans req.cookies

    if (userToken) {
        // Si le cookie 'user' existe, vous pouvez effectuer des vérifications supplémentaires ici
        next(); // Passez au middleware suivant ou à la route suivante
    } else {
        res.redirect('/login'); // Redirigez vers la page de connexion si le cookie 'user' n'est pas présent
    }
}
