export interface JwtPayload {
    user_id: string;
    session_id: string;
    version: number;
    is_keyholder: boolean;
}