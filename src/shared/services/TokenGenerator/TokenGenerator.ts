
export function generateAccessToken() {
   // Generate a random string of length 20
   const token = Math.random().toString(36).substring(2, 30);
   return token;
}
