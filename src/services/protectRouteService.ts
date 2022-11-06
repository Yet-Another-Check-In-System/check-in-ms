import { Request } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { ExportedUser } from '../interfaces/IUser';

/**
 * Extracts token from request
 * @param req
 * @returns
 */
export const extractBearerToken = async (req: Request): Promise<boolean> => {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
        return false;
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type.toLowerCase() !== 'bearer') {
        return false;
    }

    req.Token = token;
    return true;
};

/**
 * Validate the bearer token
 * @param token Bearer token
 * @returns
 */
export const validateToken = async (
    token: string
): Promise<ExportedUser | null> => {
    const secret = process.env.JWT_SECRET;
    logger.debug(`JWT_SECRET: ${secret}`);

    if (!secret) {
        logger.crit('Could not validate token due to JWT_SECRET not being set');
        throw new Error('Could not validate token due to an error');
    }

    try {
        const result = jwt.verify(token, secret, {
            audience: 'yacis:checkin',
            issuer: 'yacis:auth'
        });

        const user = result as ExportedUser;

        return user;
    } catch (err) {
        return null;
    }
};
