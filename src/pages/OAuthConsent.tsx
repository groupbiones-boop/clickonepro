import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

// Local typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthClient = { name?: string; client_name?: string; redirect_uris?: string[] };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult = { data: AuthorizationDetails | null; error: { message: string } | null };
type SupaAuthOAuth = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
const oauth = (supabase.auth as unknown as { oauth: SupaAuthOAuth }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Parâmetro authorization_id ausente na URL.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Servidor de autorização não retornou uma URL de redirecionamento.");
      return;
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Não foi possível carregar esta autorização</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const clientName = details.client?.name ?? details.client?.client_name ?? "um aplicativo";
  const scopes = details.scopes ?? (details.scope ? details.scope.split(/\s+/).filter(Boolean) : []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-accent/20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <ShieldCheck className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle>Conectar {clientName} à sua conta</CardTitle>
          <CardDescription>
            Isso permite que {clientName} use as ferramentas deste aplicativo como você.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {scopes.length > 0 && (
            <div className="text-sm">
              <p className="font-medium mb-1">Permissões solicitadas:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                {scopes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Isso não substitui as permissões do aplicativo nem as políticas de segurança do backend.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => decide(true)} disabled={busy} className="flex-1">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Aprovar"}
            </Button>
            <Button onClick={() => decide(false)} disabled={busy} variant="outline" className="flex-1">
              Cancelar conexão
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthConsent;
