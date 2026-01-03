import { useEffect, useState } from "react";
import { Smartphone, Share, Plus, MoreVertical, Download, Check, Apple, Chrome, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { QRCodeSVG } from "qrcode.react";

type DeviceType = "ios" | "android" | "desktop";

const Instalar = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Get current URL for QR Code
    setCurrentUrl(window.location.href);

    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType("ios");
    } else if (/android/.test(userAgent)) {
      setDeviceType("android");
    } else {
      setDeviceType("desktop");
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  const iosSteps = [
    {
      icon: <Chrome className="h-8 w-8 text-primary" />,
      title: "Abra no Safari",
      description: "Certifique-se de que está usando o navegador Safari no seu iPhone ou iPad."
    },
    {
      icon: <Share className="h-8 w-8 text-primary" />,
      title: "Toque em Compartilhar",
      description: "Na barra inferior do Safari, toque no ícone de compartilhar (quadrado com seta para cima)."
    },
    {
      icon: <Plus className="h-8 w-8 text-primary" />,
      title: "Adicionar à Tela de Início",
      description: "Role para baixo e toque em \"Adicionar à Tela de Início\"."
    },
    {
      icon: <Check className="h-8 w-8 text-primary" />,
      title: "Confirme",
      description: "Toque em \"Adicionar\" no canto superior direito. O app aparecerá na sua tela inicial!"
    }
  ];

  const androidSteps = [
    {
      icon: <Chrome className="h-8 w-8 text-primary" />,
      title: "Abra no Chrome",
      description: "Use o navegador Google Chrome para acessar o site."
    },
    {
      icon: <MoreVertical className="h-8 w-8 text-primary" />,
      title: "Menu do Chrome",
      description: "Toque nos três pontos (⋮) no canto superior direito do Chrome."
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "Instalar App",
      description: "Toque em \"Instalar app\" ou \"Adicionar à tela inicial\"."
    },
    {
      icon: <Check className="h-8 w-8 text-primary" />,
      title: "Confirme",
      description: "Toque em \"Instalar\" na janela que aparecer. O app será adicionado à sua tela inicial!"
    }
  ];

  const StepsList = ({ steps }: { steps: typeof iosSteps }) => (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-start gap-4 p-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center relative">
                  {step.icon}
                  <span className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isInstalled) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-4">App Instalado!</h1>
              <p className="text-muted-foreground">
                O ClickOne AI já está instalado no seu dispositivo. 
                Você pode encontrá-lo na sua tela inicial.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Smartphone className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Instale o ClickOne AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Tenha acesso rápido ao app direto da sua tela inicial, 
              sem precisar baixar na loja de aplicativos.
            </p>
          </div>

          {/* Device Detection Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
              {deviceType === "ios" ? (
                <>
                  <Apple className="h-5 w-5" />
                  <span className="text-sm font-medium">Detectamos que você está no iPhone/iPad</span>
                </>
              ) : deviceType === "android" ? (
                <>
                  <Smartphone className="h-5 w-5" />
                  <span className="text-sm font-medium">Detectamos que você está no Android</span>
                </>
              ) : (
                <>
                  <QrCode className="h-5 w-5" />
                  <span className="text-sm font-medium">Escaneie o QR Code ou veja as instruções abaixo</span>
                </>
              )}
            </div>
          </div>

          {/* Install Button (Android with prompt) */}
          {deviceType === "android" && deferredPrompt && (
            <div className="mb-8 flex justify-center">
              <Button size="lg" onClick={handleInstallClick} className="gap-2">
                <Download className="h-5 w-5" />
                Instalar Agora
              </Button>
            </div>
          )}

          {/* Mobile: Show only relevant steps */}
          {deviceType !== "desktop" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">
                Siga os passos abaixo:
              </h2>
              <StepsList steps={deviceType === "ios" ? iosSteps : androidSteps} />
            </div>
          )}

          {/* Desktop: Show QR Code and Tabs */}
          {deviceType === "desktop" && (
            <div className="space-y-8">
              {/* QR Code Section */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="bg-white p-4 rounded-xl shadow-sm">
                        <QRCodeSVG 
                          value={currentUrl} 
                          size={160}
                          level="H"
                          includeMargin={false}
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">
                        Escaneie com seu celular
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Aponte a câmera do seu celular para o QR Code acima 
                        para abrir esta página diretamente no seu dispositivo móvel.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Apple className="h-4 w-4" />
                          <span>iPhone: Use a câmera</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Android: Google Lens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs with Instructions */}
              <div>
                <h2 className="text-xl font-semibold text-center mb-6">
                  Instruções de Instalação
                </h2>
                <Tabs defaultValue="ios" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="ios" className="gap-2">
                      <Apple className="h-4 w-4" />
                      iPhone / iPad
                    </TabsTrigger>
                    <TabsTrigger value="android" className="gap-2">
                      <Smartphone className="h-4 w-4" />
                      Android
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="ios">
                    <StepsList steps={iosSteps} />
                  </TabsContent>
                  <TabsContent value="android">
                    <StepsList steps={androidSteps} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-center mb-6">
              Vantagens do App
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Acesso Rápido", desc: "Abra direto da tela inicial" },
                { title: "Tela Cheia", desc: "Sem barra do navegador" },
                { title: "Funciona Offline", desc: "Carrega mesmo sem internet" }
              ].map((benefit, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Instalar;
