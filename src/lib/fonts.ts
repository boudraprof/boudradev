import { Geist, Roboto, Satisfy } from 'next/font/google'


const geist = Geist({
  subsets: ['latin'],
})
 

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],   // Required subset
  weight: ['400', '500', '700'], // Optional weights
  display: 'swap',      // Optional: good for performance
});

const roboto = Satisfy({
  subsets: ['latin'],   // Required subset
  weight: ['400', '500', '700'], // Optional weights
  display: 'swap',      // Optional: good for performance
});



export {
    satisfy,
    roboto,
    geist
}

//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