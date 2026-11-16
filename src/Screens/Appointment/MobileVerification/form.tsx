// import { useState } from "react";
// import { FormInput } from "@/CustomComponents/FormInput";
// import { H2 } from "@/CustomComponents/H2";
// import { UserLogin, VerifyUserLogin } from "@/Service/Auth/Login";
// import toast from "react-hot-toast";
// import { ExtractErrorPayload } from "@/utils/ExtractErrorMsg";
// import { useAppointmentStore } from "../store/appointment";
// import { useShallow } from "zustand/react/shallow";
// export const MobileVerificationForm = () => {
//   const { moveToNextStage, addAppointmentDate } = useAppointmentStore(
//     useShallow((store) => ({
//       moveToNextStage: store.moveToNextStage,
//       addAppointmentDate: store.addAppointmentDate,
//     })),
//   );

//   const [formData, setFormData] = useState({
//     patientMobile: "",
//     patientOTP: "",
//   });

//   const [isOtpSent, setIsOtpSent] = useState(false);

//   const handleChange = (data: {
//     key: string;
//     value: string | File | File[] | null;
//   }) => {
//     setFormData((prev) => ({ ...prev, [data.key]: String(data.value ?? "") }));
//   };

//   const handleSendOtp = () => {
//     if (formData.patientMobile.length < 10) return;

//     console.log("toast");
//     toast.promise(UserLogin(formData.patientMobile.toString()), {
//       success: () => {
//         setIsOtpSent(true);
//         return "OTP Send Successfully";
//       },
//       error: (err) => ExtractErrorPayload(err).message,
//       loading: "Sending OTP",
//     });
//   };

//   const handleVerifyAndSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     toast.promise(VerifyUserLogin(Number(formData.patientOTP)), {
//       loading: "Submitting otp....",
//       success: () => {
//         addAppointmentDate({patientMobile:Number(formData.patientMobile)})
//         moveToNextStage();
//         return "OTP Verified Successfully";
//       },
//       error: (err) => ExtractErrorPayload(err).message,
//     });

//     // Submit payload after OTP verification logic
//   };

//   return (
//     <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
//       <H2 text="Phone Verification" />
//       <p className="mt-2 text-sm text-gray-500">
//         Enter your mobile number to receive a verification code for your
//         appointment booking.
//       </p>

//       <form
//         onSubmit={handleVerifyAndSubmit}
//         className="mt-6  flex flex-col gap-4"
//       >
//         {/* Mobile Input Field */}
//         <div>
//           <div className="flex-col md:flex-row flex gap-2 items-center justify-between">
//             <div className="flex-1 w-full ">
//               <FormInput
//                 name="patientMobile"
//                 label="Mobile Number"
//                 inputType="text"
//                 value={formData.patientMobile}
//                 placeHolder="Enter mobile number"
//                 changeHandler={handleChange}
//               />
//             </div>
//             {!isOtpSent && (
//               <div className="flex  flex-1 justify-center  w-full md:w-1/3 items-end pt-4">
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   disabled={formData.patientMobile.length < 10}
//                   className="self-end rounded-lg bg-blue-600  px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
//                 >
//                   Send OTP
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* OTP Field (Renders when OTP is requested) */}
//         {isOtpSent && (
//           <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
//             <FormInput
//               name="patientOTP"
//               label="OTP Code"
//               inputType="text"
//               value={formData.patientOTP}
//               placeHolder="Enter 6-digit OTP"
//               changeHandler={handleChange}
//             />

//             <div className="flex items-center justify-between text-xs">
//               <span className="text-gray-400">
//                 OTP sent to {formData.patientMobile}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setIsOtpSent(false)}
//                 className="font-medium text-blue-600 hover:underline"
//               >
//                 Change Number
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={!formData.patientOTP}
//               className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
//             >
//               Verify & Proceed
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };


import { useState, useEffect } from "react";
import { FormInput } from "@/CustomComponents/FormInput";
import { H2 } from "@/CustomComponents/H2";
import toast from "react-hot-toast";
import { useAppointmentStore } from "../store/appointment";
import { useShallow } from "zustand/react/shallow";
import {
  Fingerprint,
  Smartphone,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

type AuthMode = "fingerprint" | "temp-code" | "recovery";
type AuthStatus = "idle" | "scanning" | "captured" | "error";

// Helper: Convert ArrayBuffer to Base64URL string so you can inspect & send as JSON later
const bufferToBase64URL = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const MobileVerificationForm = () => {
  const { moveToNextStage, addAppointmentDate } = useAppointmentStore(
    useShallow((store) => ({
      moveToNextStage: store.moveToNextStage,
      addAppointmentDate: store.addAppointmentDate,
    }))
  );

  const [mode, setMode] = useState<AuthMode>("fingerprint");
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [biometricSupported, setBiometricSupported] = useState<boolean>(true);
  const [recoveryMethod, setRecoveryMethod] = useState<"code" | "otp">("code");
  const [capturedPayload, setCapturedPayload] = useState<Record<string, any> | null>(null);

  const [formData, setFormData] = useState({
    patientMobile: "",
    tempCode: "",
    recoveryCode: "",
    recoveryOtp: "",
  });

  // Check if the device has a fingerprint sensor / platform authenticator
  useEffect(() => {
    const checkBiometrics = async () => {
      if (
        typeof window !== "undefined" &&
        window.PublicKeyCredential &&
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable
      ) {
        const available =
          await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setBiometricSupported(available);
      } else {
        setBiometricSupported(false);
      }
    };
    checkBiometrics();
  }, []);

  const handleChange = (data: {
    key: string;
    value: string | File | File[] | null;
  }) => {
    setFormData((prev) => ({ ...prev, [data.key]: String(data.value ?? "") }));
    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  // Triggers the native OS Fingerprint Prompt and captures the credential object
  const handleTriggerFingerprint = async () => {
    if (formData.patientMobile.length < 10) {
      setStatus("error");
      setStatusMessage("Please enter a valid 10-digit mobile number first.");
      return;
    }

    setStatus("scanning");
    setStatusMessage("Touch your fingerprint sensor when prompted...");
    setCapturedPayload(null);

    try {
      // Generate a local 32-byte random challenge (later this comes from your backend)
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Encode mobile number as user ID bytes
      const userId = new TextEncoder().encode(formData.patientMobile);

      // Trigger the native WebAuthn biometric creation prompt
      const credential = (await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: "AlShifa Healthcare",
            id: window.location.hostname, // Must match current domain (works on localhost & HTTPS)
          },
          user: {
            id: userId,
            name: formData.patientMobile,
            displayName: `Patient (${formData.patientMobile})`,
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },   // ES256 (standard mobile secure enclave)
            { type: "public-key", alg: -257 }, // RS256 fallback
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform", // Forces built-in fingerprint/FaceID (no USB keys)
            userVerification: "required",        // Forces fingerprint/biometric check
            residentKey: "preferred",
          },
          timeout: 60000,
          attestation: "none",
        },
      })) as PublicKeyCredential | null;

      if (!credential) {
        throw new DOMException("No credential returned", "NotAllowedError");
      }

      const response = credential.response as AuthenticatorAttestationResponse;

      // Extract & serialize all WebAuthn data ready for your future backend API
      const extractedData = {
        mobile: formData.patientMobile,
        credentialId: credential.id,
        rawId: bufferToBase64URL(credential.rawId),
        type: credential.type,
        authenticatorAttachment: credential.authenticatorAttachment,
        clientDataJSON: bufferToBase64URL(response.clientDataJSON),
        attestationObject: bufferToBase64URL(response.attestationObject),
        transports: response.getTransports ? response.getTransports() : [],
      };

      console.log("Captured WebAuthn Fingerprint Credential:", extractedData);

      setCapturedPayload(extractedData);
      setStatus("captured");
      setStatusMessage("Fingerprint verified & cryptographic key captured!");
      toast.success("Fingerprint captured successfully!");
    } catch (err: any) {
      console.error("WebAuthn Error:", err);
      setStatus("error");

      if (err?.name === "NotAllowedError") {
        setStatusMessage(
          "Fingerprint prompt was canceled or timed out. Tap below to try again."
        );
      } else if (err?.name === "SecurityError") {
        setStatusMessage(
          "WebAuthn requires HTTPS or localhost. Check your current URL origin."
        );
      } else if (err?.name === "NotSupportedError" || err?.name === "ConstraintError") {
        setStatusMessage(
          "No fingerprint sensor or screen lock detected on this device."
        );
      } else {
        setStatusMessage(err?.message || "Failed to capture fingerprint.");
      }
    }
  };

  const handleProceedAfterCapture = () => {
    addAppointmentDate({ patientMobile: Number(formData.patientMobile) });
    moveToNextStage();
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <H2
          text={
            mode === "fingerprint"
              ? "Biometric Verification"
              : mode === "temp-code"
              ? "Temporary Device Access"
              : "Account Recovery"
          }
        />
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          Passkey Ready
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {mode === "fingerprint" &&
          "Enter your mobile number and scan your fingerprint to verify your identity instantly."}
        {mode === "temp-code" &&
          "Booking from another phone? Enter the 6-digit temporary code generated on your primary phone."}
        {mode === "recovery" &&
          "Lost your primary phone? Use your 10-digit recovery code or backup OTP."}
      </p>

      {/* Mobile Number Input */}
      <div className="mt-5">
        <FormInput
          name="patientMobile"
          label="Mobile Number"
          inputType="tel"
          value={formData.patientMobile}
          placeHolder="Enter 10-digit mobile number"
          changeHandler={handleChange}
        />
      </div>

      {/* MODE 1: FINGERPRINT AUTH */}
      {mode === "fingerprint" && (
        <div className="mt-6 flex flex-col items-center">
          <div
            className={`w-full rounded-xl border p-5 text-center transition-all ${
              status === "scanning"
                ? "border-blue-300 bg-blue-50/60"
                : status === "captured"
                ? "border-emerald-300 bg-emerald-50/50"
                : status === "error"
                ? "border-red-200 bg-red-50/50"
                : "border-gray-200 bg-gray-50/60"
            }`}
          >
            {/* Status Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100">
              {status === "scanning" ? (
                <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              ) : status === "captured" ? (
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              ) : status === "error" ? (
                <AlertCircle className="h-7 w-7 text-red-500" />
              ) : (
                <Fingerprint className="h-7 w-7 text-blue-600" />
              )}
            </div>

            <p className="mt-3 text-sm font-medium text-gray-800">
              {status === "idle" && "Ready for Fingerprint Scan"}
              {status === "scanning" && "Waiting for Sensor..."}
              {status === "captured" && "Fingerprint Captured"}
              {status === "error" && "Scan Interrupted"}
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              {statusMessage ||
                "Your fingerprint stays securely inside your phone. Only a cryptographic key is generated."}
            </p>

            {/* Preview of Captured WebAuthn Data */}
            {capturedPayload && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-white p-3 text-left text-[11px] text-gray-600">
                <div className="mb-1 flex items-center justify-between font-semibold text-emerald-700">
                  <span>Captured Credential Info</span>
                  <span>{capturedPayload.authenticatorAttachment || "platform"}</span>
                </div>
                <p className="truncate font-mono">
                  <strong>ID:</strong> {capturedPayload.credentialId}
                </p>
                <p className="truncate font-mono">
                  <strong>Type:</strong> {capturedPayload.type}
                </p>
                <p className="truncate font-mono">
                  <strong>Attestation:</strong>{" "}
                  {capturedPayload.attestationObject.slice(0, 32)}...
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {status === "captured" ? (
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleProceedAfterCapture}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Continue to Next Step →
                </button>
                <button
                  type="button"
                  onClick={handleTriggerFingerprint}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Scan Again
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleTriggerFingerprint}
                disabled={
                  formData.patientMobile.length < 10 ||
                  status === "scanning" ||
                  !biometricSupported
                }
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                <Fingerprint className="h-4 w-4" />
                {!biometricSupported
                  ? "Biometrics Not Supported on Device"
                  : status === "error"
                  ? "Try Fingerprint Again"
                  : "Scan Fingerprint"}
              </button>
            )}
          </div>

          {/* Secondary Fallback Links */}
          <div className="mt-5 flex w-full flex-col gap-2 border-t border-gray-100 pt-4 text-xs">
            <button
              type="button"
              onClick={() => {
                setMode("temp-code");
                setStatus("idle");
                setStatusMessage("");
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              <span className="flex items-center gap-2 font-medium">
                <Smartphone className="h-4 w-4 text-gray-400" />
                Using another phone? Enter temporary code
              </span>
              <span className="text-blue-600">→</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("recovery");
                setStatus("idle");
                setStatusMessage("");
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              <span className="flex items-center gap-2 font-medium">
                <KeyRound className="h-4 w-4 text-gray-400" />
                Lost your phone? Recover account
              </span>
              <span className="text-blue-600">→</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: TEMPORARY DEVICE CODE (UI READY) */}
      {mode === "temp-code" && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-xs text-blue-800">
            <strong>How to get a code:</strong> Open your account on your
            primary phone → <em>Security</em> → <em>Add Temporary Device</em> →
            Scan fingerprint.
          </div>

          <FormInput
            name="tempCode"
            label="6-Digit Temporary Access Code"
            inputType="text"
            value={formData.tempCode}
            placeHolder="e.g. 849201"
            changeHandler={handleChange}
          />

          <button
            type="button"
            onClick={() => toast("Temporary code endpoint will connect here")}
            disabled={
              formData.patientMobile.length < 10 || formData.tempCode.length < 6
            }
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
          >
            Grant Temporary Access & Proceed
          </button>

          <button
            type="button"
            onClick={() => setMode("fingerprint")}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Fingerprint Verification
          </button>
        </div>
      )}

      {/* MODE 3: LOST PHONE RECOVERY (UI READY) */}
      {mode === "recovery" && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setRecoveryMethod("code")}
              className={`rounded-md py-2 transition-all ${
                recoveryMethod === "code"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              10-Digit Recovery Code
            </button>
            <button
              type="button"
              onClick={() => setRecoveryMethod("otp")}
              className={`rounded-md py-2 transition-all ${
                recoveryMethod === "otp"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Backup Email / SMS OTP
            </button>
          </div>

          {recoveryMethod === "code" ? (
            <FormInput
              name="recoveryCode"
              label="10-Digit Recovery Code"
              inputType="text"
              value={formData.recoveryCode}
              placeHolder="Enter your 10-digit backup code"
              changeHandler={handleChange}
            />
          ) : (
            <FormInput
              name="recoveryOtp"
              label="Backup OTP"
              inputType="text"
              value={formData.recoveryOtp}
              placeHolder="Enter OTP sent to registered email/phone"
              changeHandler={handleChange}
            />
          )}

          <button
            type="button"
            onClick={() => toast("Recovery verification endpoint will connect here")}
            disabled={
              formData.patientMobile.length < 10 ||
              (recoveryMethod === "code"
                ? formData.recoveryCode.length < 10
                : formData.recoveryOtp.length < 6)
            }
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
          >
            Verify & Link New Phone
          </button>

          <button
            type="button"
            onClick={() => setMode("fingerprint")}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Fingerprint Verification
          </button>
        </div>
      )}
    </div>
  );
};
