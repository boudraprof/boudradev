import React from 'react'
import {motion} from 'framer-motion'
import { useMessages } from 'next-intl';

const Footer = () => {
      const messages = useMessages();
  const footerTitle = messages.footer.title
  return (
    <footer>
         <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-slate-800"
        >
          <p className="text-slate-500">
            © {new Date().getFullYear()} {footerTitle}
          </p>
        </motion.div>
    </footer>
  )
}

export default Footer