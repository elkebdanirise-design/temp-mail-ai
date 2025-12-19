import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, QrCode, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';

interface QRCodeModalProps {
  email: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal = ({ email, isOpen, onClose }: QRCodeModalProps) => {
  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'aura-mail-qr.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm p-4"
          >
            <div className="relative bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl shadow-primary/20">
              {/* Decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-cyan-500/20 to-primary/20 rounded-3xl blur-xl opacity-50" />
              
              {/* Content */}
              <div className="relative">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-2 -top-2 rounded-full bg-background/80 border border-white/10 hover:bg-destructive/20 hover:border-destructive/30"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/30">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      Scan QR Code
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </h3>
                    <p className="text-xs text-muted-foreground">Instant mobile access</p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-4">
                  <div className="p-5 bg-white rounded-2xl shadow-lg shadow-black/20">
                    <QRCodeSVG
                      id="qr-code"
                      value={email || ''}
                      size={180}
                      level="H"
                      includeMargin={false}
                      fgColor="#000000"
                      bgColor="#ffffff"
                    />
                  </div>

                  <div className="px-4 py-2 bg-background/50 rounded-xl border border-white/5">
                    <p className="text-sm text-muted-foreground text-center font-mono break-all">
                      {email}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
