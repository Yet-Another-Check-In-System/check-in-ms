import { NextFunction, Request, Response } from 'express';
import {
    extractBearerToken,
    validateToken
} from '../services/protectRouteService';
import logger from '../utils/logger';
import * as responses from '../utils/responses';

const protectRoute = () => {
    const middleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // Make sure that there is Bearer token
            const tokenFound = await extractBearerToken(req);

            if (!tokenFound || !req.Token) {
                logger.debug('No authorization provided');
                return responses.unauthorized(
                    req,
                    res,
                    'Incorrect authorization header'
                );
            }

            // Validate that token
            const user = await validateToken(req.Token);

            if (!user) {
                logger.debug('Token not valid');
                return responses.unauthorized(
                    req,
                    res,
                    'Access token is not valid'
                );
            }

            req.User = user;

            next();
        } catch (err) {
            logger.error(`Error while checking token: ${err}`);
            next(err);
        }
    };

    return middleware;
};

export default protectRoute;
