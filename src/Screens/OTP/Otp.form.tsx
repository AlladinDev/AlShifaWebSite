import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
    title?: string;
    otpChannelTitle?: string;
    otpSentTo: string;

    loading?: boolean;
    resendDelay?: number;
    handleBack: () => void;
    handleOtpSubmit: (otp: string) => void;
    handleResendCode: () => void;
    handleContactSupport: () => void;
};

export function InputOTPForm({
    title = "Verify Your Account",
    otpSentTo,
    handleBack,
    loading = false,
    resendDelay = 12,
    handleOtpSubmit,
    handleResendCode,
    handleContactSupport,
}: Props) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(resendDelay);

    useEffect(() => {
        if (!timer) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const resendOtp = () => {
        if (timer) return;
        handleResendCode();
        setTimer(resendDelay);
    };

    const verifyOtp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit verification code.");
            return;
        }

        setError("");
        handleOtpSubmit(otp);
    };

    return (
        <Card className="mx-auto w-full max-w-md shadow-xl">
            <form onSubmit={verifyOtp}>
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-2xl font-semibold tracking-tight">
                        {title}
                    </CardTitle>

                    <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
                        We've sent a{" "}
                        <span className="font-medium text-foreground">
                            6-digit verification code
                        </span>{" "}
                        to your{" "}
                        <span className="capitalize">
                            {otpSentTo.toLowerCase()}
                        </span>
                    </p>
                </CardHeader>

                <CardContent className="">
                    <div className="flex items-center justify-between">
                       
                        <Button
                            type="button"
                            variant="ghost"
                            className="mx-auto"
                            size="sm"
                            disabled={timer > 0}
                            onClick={resendOtp}
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${timer ? "animate-spin" : ""
                                    }`}
                            />

                            {timer ? `Resend in ${timer}s` : "Resend Code"}
                        </Button>
                    </div>

                    <div className="p-2 rounded-full flex justify-center items-center ">

                        <InputOTP
                            value={otp}

                            onChange={(value) => {
                                setOtp(value);

                                if (error) setError("");
                            }}

                            maxLength={6}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot className="border-2 p-4 border-gray-500" index={0} />
                                <InputOTPSlot className="border-2  p-4 border-gray-500" index={1} />
                                <InputOTPSlot className="border-2  p-4 border-gray-500" index={2} />
                            </InputOTPGroup>

                            <InputOTPSeparator />

                            <InputOTPGroup>
                                <InputOTPSlot className="border-2  p-4 border-gray-500" index={3} />
                                <InputOTPSlot className="border-2  p-4 border-gray-500" index={4} />
                                <InputOTPSlot className="border-2 p-4 border-gray-500" index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4 mt-4">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleBack}
                    >
                        Back
                    </Button>

                    <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-sm text-muted-foreground"
                        onClick={handleContactSupport}
                    >
                        Having trouble? Contact Support
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}