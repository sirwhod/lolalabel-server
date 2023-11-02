import { sign, verify } from 'jsonwebtoken';

type TokenPayload = {
  id: string,
  iat: number,
  exp: number
}
const HASH_JSONWEBTOKEN = 'estaehahashdecriptografiadoappplataformaderotulosdalolacosmetics';

export function tokenGenerator(id: string) {

  const token = sign(
    {
      id
    }, 
    HASH_JSONWEBTOKEN,
    { expiresIn: '30d' }
  );
  
  return token;
}

export function tokenDecoder(authorization: string) {
  try {
    const decoded = verify(authorization, HASH_JSONWEBTOKEN);

    const { id } = decoded as TokenPayload;
  
    return id;
  } catch (e) {
    return e;
  }
}