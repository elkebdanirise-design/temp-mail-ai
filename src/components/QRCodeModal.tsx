import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, QrCode } from 'lucide-react';
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm p-6"
          >
            <div className="glass-panel p-6 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Scan QR Code</h3>
                  <p className="text-xs text-muted-foreground">Scan to get email on mobile</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-white rounded-xl">
                  <QRCodeSVG
                    id="qr-code"
                    value={email || ''}
                    size={200}
                    level="H"
                    includeMargin={false}
                    fgColor="#000000"
                    bgColor="#ffffff"
                  />
                </div>

                <p className="text-sm text-muted-foreground text-center font-mono break-all">
                  {email}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="border-border hover:border-primary/50 hover:bg-primary/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
