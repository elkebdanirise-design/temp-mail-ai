import { motion } from 'framer-motion';

export const FastestEmailSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))',
            border: '1px solid hsl(var(--glass-border))',
          }}
        >
          <h2 
            className="text-xl md:text-2xl font-bold tracking-tight mb-6 text-center italic"
            style={{ color: '#FFFFFF' }}
          >
            𝙏𝙝𝙚 𝙁𝙖𝙨𝙩𝙚𝙨𝙩 𝘿𝙞𝙨𝙥𝙤𝙨𝙖𝙗𝙡𝙚 𝙀𝙢𝙖𝙞𝙡 𝙤𝙛 2026
          </h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="leading-relaxed mb-4" style={{ color: 'hsl(200 12% 50%)' }}>
              Temp Mail AI represents the next generation of disposable email technology. Built with a focus on 
              speed, security, and simplicity, our service generates temporary email addresses instantly, 
              allowing you to maintain your privacy without sacrificing convenience.
            </p>
            
            <p className="leading-relaxed mb-4" style={{ color: 'hsl(200 12% 50%)' }}>
              Whether you're signing up for a new service, testing an application, or simply want to avoid 
              spam in your primary inbox, Temp Mail AI provides a seamless solution. Our real-time message 
              delivery ensures you never miss important verification emails, while our clean interface 
              makes managing your temporary inbox effortless.
            </p>

            <p className="leading-relaxed" style={{ color: 'hsl(200 12% 50%)' }}>
              Unlike traditional email providers, Temp Mail AI requires no personal information. No phone 
              number verification, no identity documents, no strings attached. Just pure, anonymous 
              email functionality when you need it most.
            </p>
          </div>

          <div className="mt-8 pt-8" style={{ borderTop: '1px solid hsl(var(--aurora-magenta) / 0.1)' }}>
            <h3 
              className="text-sm font-semibold mb-4 uppercase"
              style={{
                letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, hsl(0 0% 75%) 0%, hsl(0 0% 90%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Common Use Cases
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" style={{ color: 'hsl(200 12% 50%)' }}>
              {[
                'Free trial signups without spam',
                'Online shopping with privacy',
                'Testing email workflows',
                'Avoiding newsletter spam',
                'Anonymous account creation',
                'Protecting your real identity',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'hsl(var(--aurora-orange))' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
