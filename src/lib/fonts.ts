import { Geist, Roboto, Satisfy } from 'next/font/google'


const geist = Geist({
  subsets: ['latin'],
})
 


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
    geist
}

