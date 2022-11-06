import logger from '../utils/logger';
import prisma from '../utils/prismaHandler';

export const checkInToSite = async () => {
    try {
        logger.debug('Check in user to the site');
    } catch (err: unknown) {
        logger.error('Unknown error');
    }
};

export const checkOutFromSite = async () => {
    try {
        logger.debug('Check out user from the site');
    } catch (err: unknown) {
        logger.error('Unknown error');
    }
};
