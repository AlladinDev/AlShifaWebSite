import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/CustomComponents/FormInput";
import {
  Lock,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";

export interface OwnerFormData {
  name: string;
  mobile: string;
  address: string;
  password: string;
  email: string;
  aadhaarNumber: string;
  photo: File | null;
  gender: string;
}

interface OwnerFormProps {
  values: OwnerFormData;
  errors: Partial<Record<keyof OwnerFormData, string>>;

  onChange: (data: {
    key: keyof OwnerFormData;
    value: string | File | null;
  }) => void;

  onSubmit: () => void;

  styles?: string;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export const OwnerForm = ({
  values,
  errors,
  onChange,
  onSubmit,
  styles,

  loading = false,
  title = "Register as Clinic Owner",
  subtitle = "Fill in your information to continue.",
  buttonText = "Register",
}: OwnerFormProps) => {
  return (
    <Card
      className={`w-full max-w-3xl rounded-2xl border bg-background p-6 shadow-xl md:p-8 ${styles}`}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FormInput
          value={values.name}
          inputType="text"
          changeHandler={onChange as any}
          label="Full Name"
          error={errors.name}
          name="name"
          icon={<User size={18} />}
        />

        <FormInput
          value={values.mobile}
          inputType="tel"
          changeHandler={onChange as any}
          label="Mobile Number"
          error={errors.mobile}
          name="mobile"
          icon={<Phone size={18} />}
        />

        <FormInput
          value={values.email}
          inputType="email"
          changeHandler={onChange as any}
          label="Email Address"
          error={errors.email}
          name="email"
          icon={<Mail size={18} />}
        />

        <FormInput
          value={values.aadhaarNumber}
          inputType="text"
          changeHandler={onChange as any}
          label="Aadhaar Number"
          error={errors.aadhaarNumber}
          name="aadhaarNumber"
          icon={<User size={18} />}
        />

        <FormInput
          value={values.password}
          inputType="password"
          changeHandler={onChange as any}
          label="Password"
          error={errors.password}
          name="password"
          icon={<Lock size={18} />}
        />

        <FormInput
          value={values.address}
          inputType="text"
          changeHandler={onChange as any}
          label="Address"
          error={errors.address}
          name="address"
          icon={<MapPin size={18} />}
        />

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Gender
          </label>

          <select
            value={values.gender}
            onChange={(e) =>
              onChange({
                key: "gender",
                value: e.target.value,
              })
            }
            className="h-11 rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="na">Prefer not to say</option>
          </select>

          {errors.gender && (
            <span className="text-sm text-red-500">
              {errors.gender}
            </span>
          )}
        </div>


      </div>
      {/* File Upload */}
      <div className="lg:col-span-2 flex flex-col gap-2">
        <label className="text-sm font-medium">
          Profile Photo
        </label>

        <label
          htmlFor="photo"
          className="
      flex
      h-20
      w-full
      cursor-pointer
      items-center
      justify-between
      rounded-lg
      border
      border-dashed
      border-muted-foreground/30
      bg-muted/20
      px-4
      transition-all
      duration-300
      hover:border-primary
      hover:bg-primary/5
    "
        >
          <div className="flex items-center gap-3">
            <Upload size={20} className="text-primary" />

            <div>
              <p className="text-sm font-medium">
                {values.photo ? values.photo.name : "Choose Profile Photo"}
              </p>

              <p className="text-xs text-muted-foreground">
                PNG, JPG or JPEG
              </p>
            </div>
          </div>

          <span className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Browse
          </span>

          <Input
            id="photo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              onChange({
                key: "photo",
                value: e.target.files?.[0] ?? null,
              })
            }
          />
        </label>

        {errors.photo && (
          <span className="text-sm text-red-500">
            {errors.photo}
          </span>
        )}
      </div>

      <Button
        className="mt-8 h-11 w-full rounded-lg"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Please wait..." : buttonText}
      </Button>
    </Card>
  );
};