import { ExportedUser } from '../../interfaces/IUser';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
    namespace Express {
        export interface Request {
            UserId?: string;
            User?: ExportedUser;
            Token?: string;
        }
    }
}
