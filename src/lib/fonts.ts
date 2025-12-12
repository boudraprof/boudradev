import { Geist, Roboto, Satisfy,  Noto_Kufi_Arabic } from 'next/font/google'


const geist = Geist({
  subsets: ['latin'],
})
 
const kufi = Noto_Kufi_Arabic({subsets: ['latin', 'arabic'], weight: ['400']})

const roboto = Roboto({
  subsets: ['latin'],  
  weight: ['400', '500', '700'], 
  display: 'swap',     
});

const satisfy = Satisfy({
  subsets: ['latin'],  
  weight: ['400'],
  
});



export {
    satisfy,
    roboto,
    geist,
    kufi
}

