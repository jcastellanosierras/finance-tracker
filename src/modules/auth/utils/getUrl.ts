// export const getURL = () => {
//   const isProduction = import.meta.env.PROD;
//   const vercelURL = import.meta.env.VITE_VERCEL_URL; // URL generada en los entornos de Vercel (autoestablecida).
//   const productionURL = import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL; // URL configurada para producción.

//   if (isProduction) {
//     // Si estás en producción o en preview.
//     if (vercelURL) {
//       // En un entorno de preview, Vercel establece VITE_VERCEL_URL.
//       return `https://${vercelURL}`;
//     }
//     // Si no es preview, debe ser producción.
//     return `https://${productionURL}`;
//   }

//   // Si no es producción, estás en desarrollo.
//   const devURL = 'http://localhost:5173/';

//   // Normaliza la URL.
//   return devURL.endsWith('/') ? devURL : `${devURL}/`;
// };


export const getURL = () => {
  let url =
    import.meta.env.VITE_VERCEL_URL ??
    import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL ??
    'http://localhost:5173/'
    
  url = url.startsWith('http') ? url : `https://${url}`
  url = url.endsWith('/') ? url : `${url}/`

  return url
}
