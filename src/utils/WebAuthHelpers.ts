
/* ═════════════════════════ WebAuthn helpers (framework-free) ═════════════════════════ */
export const toB64 = (b: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
export const fromB64 = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), (c) => c.charCodeAt(0)).buffer;


/** Shape your server must return for login challenges */
export interface AuthOptions {
  challengeId: string;
  challenge: string; // base64url
  rpId: string;
}

/** Shape your server must return for registration challenges */
export interface RegisterOptions {
  challengeId: string;
  challenge: string; // base64url
  rp: { name: string; id: string };
  user: { id: string; name: string; displayName: string }; // id is base64url
}

export const passkey = {
  async login<T>(getOptions: () => Promise<AuthOptions>, verify: (p: object) => Promise<T>) {
    const o = await getOptions();
    const c = (await navigator.credentials.get({
      // Empty allowCredentials → phone lists saved passkeys, so no username/phone is needed
      publicKey: { challenge: fromB64(o.challenge), rpId: o.rpId, userVerification: "required", timeout: 60000 },
    })) as PublicKeyCredential | null;
    if (!c) throw new DOMException("", "NotAllowedError");
    const r = c.response as AuthenticatorAssertionResponse;
    return verify({
      challengeId: o.challengeId, id: c.id, rawId: toB64(c.rawId), type: c.type,
      response: {
        clientDataJSON: toB64(r.clientDataJSON), authenticatorData: toB64(r.authenticatorData),
        signature: toB64(r.signature), userHandle: r.userHandle ? toB64(r.userHandle) : null,
      },
    });
  },
  async register<T>(getOptions: () => Promise<RegisterOptions>, verify: (p: object) => Promise<T>) {
    const o = await getOptions();
    const c = (await navigator.credentials.create({
      publicKey: {
        challenge: fromB64(o.challenge), rp: o.rp, timeout: 60000, attestation: "none",
        user: { id: fromB64(o.user.id), name: o.user.name, displayName: o.user.displayName },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
        // platform = built-in fingerprint only; resident key = login without typing an ID
        authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required", residentKey: "required" },
      },
    })) as PublicKeyCredential | null;
    if (!c) throw new DOMException("", "NotAllowedError");
    const r = c.response as AuthenticatorAttestationResponse;
    return verify({
      challengeId: o.challengeId, id: c.id, rawId: toB64(c.rawId), type: c.type,
      response: { clientDataJSON: toB64(r.clientDataJSON), attestationObject: toB64(r.attestationObject), transports: r.getTransports?.() ?? [] },
    });
  },
};
