import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { AppEndpoints } from "@infra/config/AppEndpoints";
import { AppRoutes } from "@infra/config/AppRoutes";
import { CookiesHandler } from "@infra/handlers/CookiesHandler";
import { HttpClientHandler } from "@infra/handlers/HttpClientHandler";
import {
  ISessionResponse,
  ISignInResponse,
} from "@infra/interfaces/ReponseInterfaces";
import { IUser } from "@models/UsersModels";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Required." })
    .max(100, { message: "Invalid." })
    .email({ message: "Invalid." }),
  password: z
    .string()
    .min(1, { message: "Required." })
    .min(4, { message: "Password needs at least 4 characters." }),
});

type IFormSchema = z.output<typeof schema>;

interface ISignFormState {
  success: boolean;
  msg: string | null;
}

interface ContextData {
  handleLogout: () => void;
  handleClearSignErrors: () => void;
  onSignIn: SubmitHandler<IFormSchema>;
  signInFormMethods: UseFormReturn<IFormSchema, any>;
  signInFormState: ISignFormState;
  userInfo: IUser | null;
}

interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextData | null>(null);

export const AuthProvider = ({ children }: ProviderProps) => {
  const router = useRouter();
  const formMethods = useForm<IFormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [user, setUser] = useState<IUser | null>(null);
  const [signInFormState, setSignFormState] = useState<ISignFormState>({
    msg: "",
    success: false,
  });

  const handleClearSignErrors = () => {
    setSignFormState({
      msg: "",
      success: false,
    });
  };

  const handleSignIn: SubmitHandler<IFormSchema> = async (data) => {
    const { email, password } = data;
    handleClearSignErrors();

    try {
      const res = await HttpClientHandler.post<ISignInResponse>(
        AppEndpoints.api.login,
        { email, password }
      );

      const { token, user, msg, success } = res;

      if (token) {
        // Fill user info
        setUser(user);

        // Redirect to application index
        router.push(AppRoutes.customersIndex);
      } else {
        setSignFormState({ msg, success });
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    CookiesHandler.deleteToken();
    router.push(AppRoutes.login);
  };

  const getUserInfo = useCallback(async () => {
    const res = await HttpClientHandler.get<ISessionResponse>(
      AppEndpoints.api.session
    );

    const { success, user } = res;

    if (!success) {
      router.push(AppRoutes.login);
    }

    setUser(user);
  }, [router]);

  // Refresh user info when reload  application
  useEffect(() => {
    const token = CookiesHandler.getToken();
    if (token && !user) {
      getUserInfo();
    }
  }, [getUserInfo, user]);

  return (
    <Context.Provider
      value={{
        handleLogout,
        handleClearSignErrors,
        onSignIn: handleSignIn,
        signInFormMethods: formMethods,
        signInFormState,
        userInfo: user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(Context);

  if (!context)
    throw new Error(
      `ERROR: to use context hook it's necessary wrap the component with ${AuthProvider.name} provider.`
    );

  return context;
};
