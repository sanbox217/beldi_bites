import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { CASABLANCA_NEIGHBORHOODS } from '@/utils/constants';
import { RegisterRequest } from '@/types/auth';
import { apiClient } from '@/services/api';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
  role: z.enum(['cook', 'customer'], { errorMap: () => ({ message: 'Please select a role' }) }),
  phone: z.string().optional(),
  neighborhood: z.string().optional()
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'customer'
    }
  });

  const selectedRole = watch('role');
  const isRTL = i18n.language === 'ar';

  const onSubmit = async (data: SignUpForm) => {
    try {
      setIsLoading(true);
      setError(null);

      const registerData: RegisterRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone || undefined,
        neighborhood: data.neighborhood || undefined
      };

      const response = await apiClient.register(registerData);

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      setSuccess(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-emerald-50 to-white">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {t('auth.registrationSuccess', 'Account created successfully! Welcome to Beldi Bites.')}
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
            >
              {t('common.continue', 'Continue')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-emerald-50 to-white">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-emerald-800">
            {t('auth.signUp', 'Sign Up')}
          </CardTitle>
          <CardDescription className="text-slate-600">
            {t('auth.signUpDescription', 'Join Beldi Bites marketplace')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                {t('auth.name', 'Full Name')} *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t('auth.namePlaceholder', 'Enter your full name')}
                {...register('name')}
                className={`${errors.name ? 'border-red-300' : 'border-gray-200'} ${isRTL ? 'text-right' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                {t('auth.email', 'Email')} *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder', 'Enter your email')}
                {...register('email')}
                className={errors.email ? 'border-red-300' : 'border-gray-200'}
                dir="ltr"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                {t('auth.password', 'Password')} *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.passwordPlaceholder', 'Enter your password')}
                  {...register('password')}
                  className={`pr-10 ${errors.password ? 'border-red-300' : 'border-gray-200'}`}
                  dir="ltr"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                {t('auth.phone', 'Phone Number')}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t('auth.phonePlaceholder', 'Enter your phone number')}
                {...register('phone')}
                className="border-gray-200"
                dir="ltr"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                {t('auth.role', 'I am a')} *
              </Label>
              <RadioGroup
                value={selectedRole}
                onValueChange={(value: 'cook' | 'customer') => setValue('role', value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer" className="text-sm font-normal cursor-pointer">
                    {t('auth.customer', 'Customer')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cook" id="cook" />
                  <Label htmlFor="cook" className="text-sm font-normal cursor-pointer">
                    {t('auth.cook', 'Cook')}
                  </Label>
                </div>
              </RadioGroup>
              {errors.role && (
                <p className="text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            {selectedRole === 'cook' && (
              <div className="space-y-2">
                <Label htmlFor="neighborhood" className="text-sm font-medium text-slate-700">
                  {t('auth.neighborhood', 'Neighborhood')}
                </Label>
                <Select onValueChange={(value) => setValue('neighborhood', value)}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder={t('auth.selectNeighborhood', 'Select your neighborhood')} />
                  </SelectTrigger>
                  <SelectContent>
                    {CASABLANCA_NEIGHBORHOODS.map((neighborhood) => (
                      <SelectItem key={neighborhood} value={neighborhood}>
                        {neighborhood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('auth.creating', 'Creating Account...')}
                </>
              ) : (
                t('auth.createAccount', 'Create Account')
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-slate-600">
              {t('auth.alreadyHaveAccount', 'Already have an account?')}{' '}
              <a
                href="/login"
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                {t('auth.signIn', 'Sign In')}
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}